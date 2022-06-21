import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { DetailsList, DetailsListLayoutMode, IColumn, Icon, SelectionMode, Stack, Text } from "@fluentui/react";
import { TeamworkDeviceHealth } from "@microsoft/microsoft-graph-types-beta";
import { ConnectionStatusIcon } from "./ConnectionStatusIcon";
import { stackTokensChildrenGap } from "../styles/styles";
import { IConnectionHealth } from "../types/IConnectionHealth";

interface IDeviceHardwareProps {
    deviceHealth: TeamworkDeviceHealth;
}

export const DeviceHardware: React.FunctionComponent<IDeviceHardwareProps> = (props) => {

    const [peripheralHealth, setPeripheralHealth] = useState<IConnectionHealth[]>([]);

    const columnsDef: IColumn[] = [
        {
            key: "displayName",
            name: "Peripheral",
            fieldName: "displayName",
            minWidth: 200,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            data: "string",
            onRender: (item: IConnectionHealth) => {
                return (
                    <Stack
                        horizontal
                        verticalAlign="center"
                        tokens={stackTokensChildrenGap}
                    >
                        {item.icon}
                        <Text>{item.displayName}</Text>
                    </Stack>)
            }
        },
        {
            key: "connectionStatus",
            name: "Connection status",
            fieldName: "connectionStatus",
            minWidth: 200,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            data: "string",
            onRender: (item: IConnectionHealth) => {
                return <ConnectionStatusIcon connectionStatus={item.connection?.connectionStatus} />
            }
        },
        {
            key: "lastModifiedDateTime",
            name: "Last updated",
            fieldName: "lastModifiedDateTime",
            minWidth: 200,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            data: "string",
            onRender: (item: IConnectionHealth) => {
                return <Text>{item.connection?.lastModifiedDateTime && DateTime.fromISO(item.connection.lastModifiedDateTime).toLocaleString(DateTime.DATETIME_MED)}</Text>
            }
        }
    ];

    // Render device health peripherals
    useEffect(() => {
        const newPeripheralHealth: IConnectionHealth[] = [];
        props.deviceHealth.hardwareHealth?.computeHealth && newPeripheralHealth.push({ displayName: "Compute", connection: props.deviceHealth.hardwareHealth.computeHealth.connection, icon: <Icon iconName="HardDrive" /> })
        props.deviceHealth.peripheralsHealth?.roomCameraHealth && newPeripheralHealth.push({ displayName: "Camera", connection: props.deviceHealth.peripheralsHealth.roomCameraHealth.connection, icon: <Icon iconName="FrontCamera" /> })
        props.deviceHealth.peripheralsHealth?.microphoneHealth && newPeripheralHealth.push({ displayName: "Microphone", connection: props.deviceHealth.peripheralsHealth.microphoneHealth.connection, icon: <Icon iconName="Microphone" /> })
        props.deviceHealth.peripheralsHealth?.speakerHealth && newPeripheralHealth.push({ displayName: "Speaker", connection: props.deviceHealth.peripheralsHealth.speakerHealth.connection, icon: <Icon iconName="Speakers" /> })
        props.deviceHealth.peripheralsHealth?.displayHealthCollection?.map((display, i) => display && newPeripheralHealth.push({ displayName: `Display #${i + 1}`, connection: display.connection, icon: <Icon iconName="TVMonitor" /> }))
        props.deviceHealth.hardwareHealth?.hdmiIngestHealth && newPeripheralHealth.push({ displayName: "HDMI ingest", connection: props.deviceHealth.hardwareHealth.hdmiIngestHealth.connection, icon: <Icon iconName="Presentation" /> })
        props.deviceHealth.peripheralsHealth?.communicationSpeakerHealth && newPeripheralHealth.push({ displayName: "Communications speaker", connection: props.deviceHealth.peripheralsHealth.communicationSpeakerHealth.connection, icon: <Icon iconName="Speakers" /> })
        props.deviceHealth.peripheralsHealth?.contentCameraHealth && newPeripheralHealth.push({ displayName: "Content camera", connection: props.deviceHealth.peripheralsHealth.contentCameraHealth.connection, icon: <Icon iconName="WhiteBoardApp16" /> })
        setPeripheralHealth(newPeripheralHealth);
    }, [props.deviceHealth])

    return (
        <Stack>
            <DetailsList
                selectionMode={SelectionMode.none}
                layoutMode={DetailsListLayoutMode.justified}
                columns={columnsDef}
                items={peripheralHealth}
            />
        </Stack>
    )

}
