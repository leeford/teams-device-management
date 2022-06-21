import React, { useEffect, useState } from "react";
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode, Stack } from "@fluentui/react";
import { TeamworkDeviceHealth, TeamworkSoftwareUpdateStatus, NullableOption } from "@microsoft/microsoft-graph-types-beta";
import startCase from "lodash.startcase";

interface IDeviceSoftwareProps {
    deviceHealth: TeamworkDeviceHealth;
}

interface ISoftwareHealth {
    displayName: string;
    updateStatus?: NullableOption<TeamworkSoftwareUpdateStatus>;
}

export const DeviceSoftware: React.FunctionComponent<IDeviceSoftwareProps> = (props) => {

    const [softwareUpdateHealth, setSoftwareUpdateHealth] = useState<ISoftwareHealth[]>([]);

    const columnsDef: IColumn[] = [
        {
            key: "displayName",
            name: "Software",
            fieldName: "displayName",
            minWidth: 200,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            data: "string",
            onRender: (item: ISoftwareHealth) => {
                return (item.displayName)
            }
        },
        {
            key: "softwareFreshness",
            name: "Status",
            fieldName: "softwareFreshness",
            minWidth: 200,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            data: "string",
            onRender: (item: ISoftwareHealth) => {
                return (item.updateStatus?.softwareFreshness && startCase(item.updateStatus?.softwareFreshness))
            }
        },
        {
            key: "currentVersion",
            name: "Current version",
            fieldName: "currentVersion",
            minWidth: 200,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            data: "string",
            onRender: (item: ISoftwareHealth) => {
                return (item.updateStatus?.currentVersion)
            }
        },
        {
            key: "availableVersion",
            name: "Available version",
            fieldName: "availableVersion",
            minWidth: 200,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            data: "string",
            onRender: (item: ISoftwareHealth) => {
                return (item.updateStatus?.availableVersion)
            }
        }
    ];

    // Render device health connections
    useEffect(() => {
        const newSoftwareUpdateHealth: ISoftwareHealth[] = [];
        props.deviceHealth.softwareUpdateHealth?.adminAgentSoftwareUpdateStatus && newSoftwareUpdateHealth.push({ displayName: "Admin agent", updateStatus: props.deviceHealth.softwareUpdateHealth.adminAgentSoftwareUpdateStatus })
        props.deviceHealth.softwareUpdateHealth?.companyPortalSoftwareUpdateStatus && newSoftwareUpdateHealth.push({ displayName: "Company portal", updateStatus: props.deviceHealth.softwareUpdateHealth.companyPortalSoftwareUpdateStatus })
        props.deviceHealth.softwareUpdateHealth?.firmwareSoftwareUpdateStatus && newSoftwareUpdateHealth.push({ displayName: "Firmware", updateStatus: props.deviceHealth.softwareUpdateHealth.firmwareSoftwareUpdateStatus })
        props.deviceHealth.softwareUpdateHealth?.operatingSystemSoftwareUpdateStatus && newSoftwareUpdateHealth.push({ displayName: "Operating system", updateStatus: props.deviceHealth.softwareUpdateHealth.operatingSystemSoftwareUpdateStatus })
        props.deviceHealth.softwareUpdateHealth?.partnerAgentSoftwareUpdateStatus && newSoftwareUpdateHealth.push({ displayName: "Partner agent", updateStatus: props.deviceHealth.softwareUpdateHealth.partnerAgentSoftwareUpdateStatus })
        props.deviceHealth.softwareUpdateHealth?.teamsClientSoftwareUpdateStatus && newSoftwareUpdateHealth.push({ displayName: "Teams client", updateStatus: props.deviceHealth.softwareUpdateHealth.teamsClientSoftwareUpdateStatus })
        setSoftwareUpdateHealth(newSoftwareUpdateHealth);
    }, [props.deviceHealth])

    return (
        <Stack>
            <DetailsList
                selectionMode={SelectionMode.none}
                layoutMode={DetailsListLayoutMode.justified}
                columns={columnsDef}
                items={softwareUpdateHealth}
            />
        </Stack>
    )

}
