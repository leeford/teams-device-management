import React, { } from "react";
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode, Stack, Text } from "@fluentui/react";
import { TeamworkDeviceOperation } from "@microsoft/microsoft-graph-types-beta";
import startCase from "lodash.startcase";
import { DateTime } from "luxon";

interface IDeviceHistoryProps {
    deviceOperations: TeamworkDeviceOperation[];
}

export const DeviceHistory: React.FunctionComponent<IDeviceHistoryProps> = (props) => {

    const columnsDef: IColumn[] = [
        {
            key: "startedDateTime",
            name: "Started",
            fieldName: "startedDateTime",
            minWidth: 200,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            data: "string",
            onRender: (item: TeamworkDeviceOperation) => {
                return <Text>{item.startedDateTime && DateTime.fromISO(item.startedDateTime).toLocaleString(DateTime.DATETIME_MED)}</Text>
            }
        },
        {
            key: "completedDateTime",
            name: "Completed",
            fieldName: "completedDateTime",
            minWidth: 200,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            data: "string",
            onRender: (item: TeamworkDeviceOperation) => {
                return <Text>{item.completedDateTime && DateTime.fromISO(item.completedDateTime).toLocaleString(DateTime.DATETIME_MED)}</Text>
            }
        },
        {
            key: "operationType",
            name: "Type",
            fieldName: "operationType",
            minWidth: 200,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            data: "string",
            onRender: (item: TeamworkDeviceOperation) => {
                return (item.operationType && startCase(item.operationType))
            }
        },
        {
            key: "status",
            name: "Status",
            fieldName: "status",
            minWidth: 200,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            data: "string",
            onRender: (item: TeamworkDeviceOperation) => {
                return (item.status)
            }
        }
    ];

    return (
        <Stack>
            <DetailsList
                selectionMode={SelectionMode.none}
                layoutMode={DetailsListLayoutMode.justified}
                columns={columnsDef}
                items={props.deviceOperations}
            />
        </Stack>
    )

}
