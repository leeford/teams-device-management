import { IMsalContext } from "@azure/msal-react";
import { AuthenticationProvider } from "@microsoft/microsoft-graph-client";
import { graphScopes } from "./auth";

export class ClientCredentialAuthenticationProvider implements AuthenticationProvider {

    private msalContext: IMsalContext;

    constructor(msalContext: IMsalContext) {
        this.msalContext = msalContext;
    }

    public async getAccessToken(): Promise<string> {
        const accessToken = (await this.msalContext.instance.acquireTokenSilent({ ...graphScopes })).accessToken
        return accessToken;
    }
}