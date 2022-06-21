import { useIsAuthenticated } from "@azure/msal-react";
import { Stack, Text } from "@fluentui/react";
import React from "react";
import { stackTokensChildrenGap } from "../styles/styles";
import { SignedInUser } from "./SignedInUser";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";

export const HeaderContent: React.FunctionComponent = () => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <Stack verticalAlign={"center"} tokens={stackTokensChildrenGap} horizontal>
            <Stack verticalAlign={"center"} horizontal horizontalAlign="start" tokens={stackTokensChildrenGap} grow>
                <Text variant={"xxLarge"}>Teams Device Management</Text>
            </Stack>
            <Stack verticalAlign={"center"} horizontal horizontalAlign="end" tokens={stackTokensChildrenGap}>
                {isAuthenticated
                    ? <React.Fragment>
                        <SignedInUser />
                        <SignOutButton />
                    </React.Fragment>
                    : <SignInButton />
                }
            </Stack>
        </Stack >
    )
}
