import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DefaultButton, Panel, Pivot, PivotItem, Stack } from "@fluentui/react";
import { LoadingSpinner } from "./LoadingSpinner";
import { buttonStyles, stackTokensChildrenGap } from "../styles/styles";
import { Presence, TeamworkDevice, TeamworkDeviceHealth, TeamworkDeviceOperation } from "@microsoft/microsoft-graph-types-beta";
import { useMsal } from "@azure/msal-react";
import { Graph } from "../modules/graph";
import { DeviceHardware } from "./DeviceHardware";
import { DeviceLogin } from "./DeviceLogin";
import { DeviceSoftware } from "./DeviceSoftware";
import { DeviceInfo } from "./DeviceInfo";
import { DeviceHistory } from "./DeviceHistory";

interface IDeviceViewProps {
    device: TeamworkDevice;
    isOpen: boolean;
    onClose: () => Promise<void>;
}

export const DeviceView: React.FunctionComponent<IDeviceViewProps> = (props) => {

    const msalContext = useMsal();
    const graph = useMemo(() => new Graph(msalContext), [msalContext]);

    const [deviceHealth, setDeviceHealth] = useState<TeamworkDeviceHealth>();
    const [deviceOperations, setDeviceOperations] = useState<TeamworkDeviceOperation[]>();
    const [userPresence, setUserPresence] = useState<Presence>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loadDeviceInfo = useCallback(
        async () => {
            if (props.device.id) {
                const deviceId = props.device.id
                setIsLoading(true);
                await graph.getTeamworkDeviceHealth(deviceId)
                    .then((response) => {
                        setDeviceHealth(response);
                    })
                    .then(async () => {
                        if (props.device.currentUser?.id) {
                            await graph.getUserPresence(props.device.currentUser.id)
                                .then((response) => {
                                    setUserPresence(response);
                                })
                        }
                        await graph.getTeamworkDeviceOperations(deviceId)
                            .then((response) => {
                                setDeviceOperations(response);
                            })
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    })
            }
        }, [graph, props.device.currentUser?.id, props.device.id]
    )

    const onRenderFooterContent = () => {
        return (
            <Stack
                horizontal
                tokens={stackTokensChildrenGap}
            >
                <DefaultButton
                    onClick={props.onClose}
                    styles={buttonStyles}
                    text="Close"
                />
            </Stack>
        )
    }

    useEffect(() => {
        (async () => {
            if (props.device) {
                loadDeviceInfo();
            }
        })()
    }, [loadDeviceInfo, props.device])

    return (
        <Panel
            isLightDismiss
            type={4}
            isOpen={props.isOpen}
            onDismiss={props.onClose}
            closeButtonAriaLabel="Close"
            onRenderFooterContent={onRenderFooterContent}
            isFooterAtBottom={true}
        >
            {isLoading
                ? (<LoadingSpinner />)
                : (<Stack>
                    {props.device && deviceHealth &&
                        <Stack>
                            <DeviceInfo device={props.device} deviceHealth={deviceHealth} userPresence={userPresence} />
                            <Pivot
                                aria-label="View Device"
                                linkSize="normal"
                            >
                                <PivotItem
                                    itemKey="loginStatus"
                                    headerText="Login"
                                    itemIcon="SignIn"
                                    headerButtonProps={{
                                        "data-order": 1,
                                        "data-title": "loginStatus"
                                    }}
                                >
                                    <DeviceLogin deviceHealth={deviceHealth} />
                                </PivotItem>
                                <PivotItem
                                    itemKey="hardwareStatus"
                                    headerText="Hardware"
                                    itemIcon="Devices2"
                                    headerButtonProps={{
                                        "data-order": 1,
                                        "data-title": "hardwareStatus"
                                    }}
                                >
                                    <DeviceHardware deviceHealth={deviceHealth} />
                                </PivotItem>
                                <PivotItem
                                    itemKey="softwareStatus"
                                    headerText="Software"
                                    itemIcon="AppIconDefaultList"
                                    headerButtonProps={{
                                        "data-order": 1,
                                        "data-title": "softwareStatus"
                                    }}
                                >
                                    <DeviceSoftware deviceHealth={deviceHealth} />
                                </PivotItem>
                                {deviceOperations &&
                                    <PivotItem
                                        itemKey="operations"
                                        headerText="History"
                                        itemIcon="History"
                                        headerButtonProps={{
                                            "data-order": 1,
                                            "data-title": "operations"
                                        }}
                                    >
                                        <DeviceHistory deviceOperations={deviceOperations} />
                                    </PivotItem>}
                            </Pivot>
                        </Stack>}
                </Stack>)
            }
        </Panel>
    )

}
