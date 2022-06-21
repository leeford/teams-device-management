import { NullableOption, TeamworkConnection } from "@microsoft/microsoft-graph-types-beta";

export interface IConnectionHealth {
    displayName: string;
    connection?: NullableOption<TeamworkConnection>;
    icon?: JSX.Element;
}