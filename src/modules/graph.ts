import { IMsalContext } from "@azure/msal-react";
import { Client, ClientOptions } from "@microsoft/microsoft-graph-client";
import { Presence, TeamworkDevice, TeamworkDeviceActivity, TeamworkDeviceConfiguration, TeamworkDeviceHealth, TeamworkDeviceOperation, User } from "@microsoft/microsoft-graph-types-beta";
import "isomorphic-fetch";
import { ClientCredentialAuthenticationProvider } from "./authenticationProvider";

export class Graph {

    client: Client;

    constructor(msalContext: IMsalContext) {
        const clientOptions: ClientOptions = {
            defaultVersion: "beta",
            debugLogging: false,
            authProvider: new ClientCredentialAuthenticationProvider(msalContext)
        };
        this.client = Client.initWithMiddleware(clientOptions);
    }

    async getMe(): Promise<User | undefined> {
        const uri = '/me';
        const request = await this.client.api(uri)
            .select("id, displayName, givenName, surname, mail")
            .get()
            .catch((error) => {
                console.log(error);
            });

        return request;
    }

    async getUserPresence(id: string): Promise<Presence | undefined> {
        const uri = `/users/${id}/presence`;
        const request = await this.client.api(uri)
            .get()
            .catch((error) => {
                console.log(error);
            });

        return request;
    }

    async getTeamworkDevices(): Promise<TeamworkDevice[]> {
        const uri = '/teamwork/devices';
        const request = await this.client.api(uri)
            .top(50)
            .get()
            .catch((error) => {
                console.log(error);
            });

        return request.value as TeamworkDevice[];
    }

    async getTeamworkDeviceActivity(id: string): Promise<TeamworkDeviceActivity> {
        const uri = `/teamwork/devices/${id}/activity`;
        const request = await this.client.api(uri)
            .get()
            .catch((error) => {
                console.log(error);
            });

        return request.value as TeamworkDeviceActivity;
    }

    async getTeamworkDeviceHealth(id: string): Promise<TeamworkDeviceHealth> {
        const uri = `/teamwork/devices/${id}/health`;
        const request = await this.client.api(uri)
            .get()
            .catch((error) => {
                console.log(error);
            });

        return request as TeamworkDeviceHealth;
    }

    async getTeamworkDeviceOperations(id: string): Promise<TeamworkDeviceOperation[]> {
        const uri = `/teamwork/devices/${id}/operations`;
        const request = await this.client.api(uri)
            .get()
            .catch((error) => {
                console.log(error);
            });

        return request.value as TeamworkDeviceOperation[];
    }

    async getTeamworkDeviceConfiguration(id: string): Promise<TeamworkDeviceConfiguration | undefined> {
        const uri = `/teamwork/devices/${id}/configuration`;
        const request = await this.client.api(uri)
            .get()
            .catch((error) => {
                console.log(error);
            });

        if (request.value) {
            return request as TeamworkDeviceConfiguration;
        }
    }

    async restartTeamworkDevice(id: string) {
        const uri = `/teamwork/devices/${id}/restart`
        await this.client.api(uri)
            .post(undefined);
    }

    private async handleError(error: any, errorObject: any, endpointUrl: string) {
        console.error(`${endpointUrl}: ${error.message}`);
        console.error(errorObject);
        throw new Error(error.message);
    }
}
