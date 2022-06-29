import { DefaultPalette, Icon, Stack, Text } from "@fluentui/react";
import { NullableOption, TeamworkConnectionStatus } from "@microsoft/microsoft-graph-types-beta";
import startCase from "lodash.startcase";
import { stackTokensChildrenGap } from "../styles/styles";

interface IConnectionStatusIconProps {
    connectionStatus?: NullableOption<TeamworkConnectionStatus>;
}

export const ConnectionStatusIcon: React.FunctionComponent<IConnectionStatusIconProps> = (props) => {

    let icon;

    switch (props.connectionStatus) {
        case "connected":
            icon = (<Icon aria-label="connected" iconName="Accept" styles={{ root: { color: DefaultPalette.green } }} />)
            break;
        case "disconnected":
            icon = (<Icon aria-label="disconnected" iconName="Cancel" styles={{ root: { color: DefaultPalette.red } }} />)
            break;
        default:
            icon = (<Icon aria-label="unknown" iconName="Help" styles={{ root: { color: DefaultPalette.orangeLighter } }} />)
            break;
    }

    return (
        <Stack
            horizontal
            verticalAlign="center"
            tokens={stackTokensChildrenGap}
        >
            {icon}
            <Text>{props.connectionStatus && startCase(props.connectionStatus)}</Text>
        </Stack>
    )
}