import React from "react";
import { Stack } from "@fluentui/react";
import { DeviceList } from "./DeviceList";

export const AuthenticatedContent: React.FunctionComponent = () => {

    return (
        <Stack>
            <DeviceList />
        </Stack>
    )

}