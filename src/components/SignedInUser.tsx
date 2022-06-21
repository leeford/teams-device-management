import { useMsal } from "@azure/msal-react";
import { Persona, PersonaSize } from "@fluentui/react";
import React from "react";
import { renderInitials } from "../modules/helpers";

export const SignedInUser: React.FunctionComponent = () => {

    const msalContext = useMsal();

    return (
        <Persona
            imageInitials={renderInitials(msalContext.accounts[0].username)}
            text={msalContext.accounts[0].name || ""}
            secondaryText={msalContext.accounts[0].username || ""}
            size={PersonaSize.size40}
        />
    );
}
