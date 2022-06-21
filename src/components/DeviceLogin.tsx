import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { DetailsList, DetailsListLayoutMode, IColumn, Icon, SelectionMode, Stack, Text } from "@fluentui/react";
import { TeamworkDeviceHealth } from "@microsoft/microsoft-graph-types-beta";
import { ConnectionStatusIcon } from "./ConnectionStatusIcon";
import { stackTokensChildrenGap } from "../styles/styles";
import { IConnectionHealth } from "../types/IConnectionHealth";

interface IDeviceLoginProps {
    deviceHealth: TeamworkDeviceHealth;
}

export const DeviceLogin: React.FunctionComponent<IDeviceLoginProps> = (props) => {

    const [loginHealth, setLoginHealth] = useState<IConnectionHealth[]>([]);

    const columnsDef: IColumn[] = [
        {
            key: "displayName",
            name: "Connection",
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

    // Render device health connections
    useEffect(() => {
        const newLoginHealth: IConnectionHealth[] = [];
        props.deviceHealth.loginStatus?.teamsConnection && newLoginHealth.push({ displayName: "Teams", connection: props.deviceHealth.loginStatus.teamsConnection, icon: <Icon iconName="TeamsLogo" /> })
        props.deviceHealth.loginStatus?.exchangeConnection && newLoginHealth.push({ displayName: "Exchange", connection: props.deviceHealth.loginStatus.exchangeConnection, icon: <Icon iconName="ExchangeLogo" /> })
        props.deviceHealth.loginStatus?.skypeConnection && newLoginHealth.push({ displayName: "Skype for Business", connection: props.deviceHealth.loginStatus.skypeConnection, icon: <Icon iconName="SkypeForBusinessLogo" /> })
        setLoginHealth(newLoginHealth);
    }, [props.deviceHealth])

    return (
        <Stack>
            <DetailsList
                selectionMode={SelectionMode.none}
                layoutMode={DetailsListLayoutMode.justified}
                columns={columnsDef}
                items={loginHealth}
            />
        </Stack>
    )

}
