import { useMsal } from "@azure/msal-react";
import { PrimaryButton } from "@fluentui/react";
import React from "react";

export const SignOutButton: React.FunctionComponent = () => {
    const { instance } = useMsal();

    const handleLogout = () => {
        instance.logoutPopup({
            mainWindowRedirectUri: "/"
        });
    }

    return (
        <PrimaryButton
            text="Sign out"
            onClick={handleLogout}
        />
    )

}
