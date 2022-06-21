import { useMsal } from "@azure/msal-react";
import { DetailsList, DetailsListLayoutMode, IColumn, Link, SelectionMode, Stack, Text } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import { TeamworkDevice } from "@microsoft/microsoft-graph-types-beta";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Graph } from "../modules/graph";
import { LoadingSpinner } from "./LoadingSpinner";
import { DeviceView } from "./DeviceView";
import startCase from "lodash.startcase";
import { DateTime } from "luxon";

export const DeviceList: React.FunctionComponent = () => {

    const msalContext = useMsal();
    const graph = useMemo(() => new Graph(msalContext), [msalContext]);

    const [devices, setDevices] = useState<TeamworkDevice[]>();
    const [selectedDevice, setSelectedDevice] = useState<TeamworkDevice>();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, { setTrue: openPanel, setFalse: closePanel }] = useBoolean(false);

    const loadDevices = useCallback(
        async () => {
            setSelectedDevice(undefined);
            setIsLoading(true)
            await graph.getTeamworkDevices()
                .then((response) => {
                    setDevices(response);
                })
            setIsLoading(false);
        }, [graph]
    )

    const onClose = async () => {
        closePanel();
        await loadDevices();
    }

    const columnsDef: IColumn[] = [
        {
            key: "displayName",
            name: "User",
            fieldName: "displayName",
            minWidth: 200,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            data: "string",
            onRender: (item: TeamworkDevice) => {
                return (
                    <Link
                        onClick={() => {
                            setSelectedDevice(item);
                        }}
                    >{item.currentUser?.displayName}</Link >
                )
            }
        },
        {
            key: "healthStatus",
            name: "Status",
            fieldName: "healthStatus",
            minWidth: 100,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            data: "string",
            onRender: (item: TeamworkDevice) => {
                return (item.healthStatus && startCase(item.healthStatus));
            }
        },
        {
            key: "deviceType",
            name: "Type",
            fieldName: "deviceType",
            minWidth: 150,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            data: "string",
            onRender: (item: TeamworkDevice) => {
                return startCase(item.deviceType);
            }
        },
        {
            key: "manufacturer",
            name: "Manufacturer",
            fieldName: "manufacturer",
            minWidth: 100,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            data: "string",
            onRender: (item: TeamworkDevice) => {
                return (item.hardwareDetail?.manufacturer && startCase(item.hardwareDetail?.manufacturer));
            }
        },
        {
            key: "model",
            name: "Model",
            fieldName: "model",
            minWidth: 100,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            data: "string",
            onRender: (item: TeamworkDevice) => {
                return (item.hardwareDetail?.model && startCase(item.hardwareDetail?.model));
            }
        },
        {
            key: "lastModifiedDateTime",
            name: "Last seen",
            fieldName: "lastModifiedDateTime",
            minWidth: 200,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            data: "string",
            onRender: (item: TeamworkDevice) => {
                return <Text>{item.lastModifiedDateTime && DateTime.fromISO(item.lastModifiedDateTime).toLocaleString(DateTime.DATETIME_MED)}</Text>
            }
        }
    ];

    useEffect(() => {
        (async () => {
            await loadDevices();
        })();
    }, [loadDevices])

    useEffect(() => {
        if (selectedDevice) {
            openPanel();
        }
    }, [openPanel, selectedDevice])

    return (
        <Stack>
            {isLoading
                ? <LoadingSpinner />
                : <Stack>
                    {devices && devices.length > 0 &&
                        <Stack>
                            <DetailsList
                                selectionMode={SelectionMode.none}
                                layoutMode={DetailsListLayoutMode.justified}
                                columns={columnsDef}
                                items={devices}
                            />
                            {selectedDevice &&
                                <DeviceView device={selectedDevice} onClose={onClose} isOpen={isOpen} />
                            }
                        </Stack>
                    }
                </Stack>
            }
        </Stack>
    )

}