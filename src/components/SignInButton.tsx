import React from "react";
import { useMsal } from "@azure/msal-react";
import { PrimaryButton } from "@fluentui/react";
import { graphScopes } from "../modules/auth";

export const SignInButton: React.FunctionComponent = () => {
    const { instance } = useMsal();

    const handleLogin = async () => {
        const msalResponse = await instance.loginPopup(graphScopes)
            .catch(e => {
                console.error(e);
            })
            .finally(() => {
                console.info("MSAL loginPopup finished");
            });
        console.log("msalResponse: ", msalResponse);
    }

    return (
        <PrimaryButton
            text="Sign in"
            onClick={handleLogin}
        />
    )

}
