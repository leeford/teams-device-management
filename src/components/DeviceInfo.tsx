import React, { useEffect, useState } from "react";
import { DefaultPalette, Persona, PersonaPresence, PersonaSize, Stack, Text } from "@fluentui/react";
import { NullableOption, Presence, TeamworkDevice, TeamworkDeviceHealth, TeamworkPeripheralHealth } from "@microsoft/microsoft-graph-types-beta";
import { InfoContainer } from "./InfoContainer";
import startCase from "lodash.startcase";
import { stackTokens } from "../styles/styles";
import { PropertyAndValue } from "./PropertyAndValue";
import { renderInitials } from "../modules/helpers";

interface IDeviceLoginProps {
    device: TeamworkDevice;
    deviceHealth: TeamworkDeviceHealth;
    userPresence?: Presence;
}

export const DeviceInfo: React.FunctionComponent<IDeviceLoginProps> = (props) => {

    const [peripheralsConnected, setPeripheralsConnected] = useState<number>(0);
    const [peripheralsDisconnected, setPeripheralsDisconnected] = useState<number>(0);
    const [peripheralsUnknown, setPeripheralsUnknown] = useState<number>(0);

    const renderGraphToPersonaPresence = (availability: string): PersonaPresence => {
        switch (availability) {
            case "Available":
            case "AvailableIdle":
                return PersonaPresence.online
            case "Busy":
            case "BusyIdle":
                return PersonaPresence.busy
            case "Away":
            case "BeRightBack":
                return PersonaPresence.away
            case "DoNotDisturb":
                return PersonaPresence.dnd
            default:
                return PersonaPresence.offline
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const calculatePeripherals = () => {
        let connected = 0;
        let disconnected = 0;
        let unknown = 0;
        const allPeripherals: NullableOption<TeamworkPeripheralHealth>[] = []
        props.deviceHealth.hardwareHealth?.computeHealth && allPeripherals.push(props.deviceHealth.hardwareHealth.computeHealth)
        props.deviceHealth.peripheralsHealth?.roomCameraHealth && allPeripherals.push(props.deviceHealth.peripheralsHealth.roomCameraHealth)
        props.deviceHealth.peripheralsHealth?.microphoneHealth && allPeripherals.push(props.deviceHealth.peripheralsHealth.microphoneHealth)
        props.deviceHealth.peripheralsHealth?.speakerHealth && allPeripherals.push(props.deviceHealth.peripheralsHealth.speakerHealth)
        props.deviceHealth.peripheralsHealth?.displayHealthCollection?.map((display, i) => display && allPeripherals.push(display))
        props.deviceHealth.hardwareHealth?.hdmiIngestHealth && allPeripherals.push(props.deviceHealth.hardwareHealth.hdmiIngestHealth)
        props.deviceHealth.peripheralsHealth?.communicationSpeakerHealth && allPeripherals.push(props.deviceHealth.peripheralsHealth.communicationSpeakerHealth)
        props.deviceHealth.peripheralsHealth?.contentCameraHealth && allPeripherals.push(props.deviceHealth.peripheralsHealth.contentCameraHealth)
        allPeripherals.forEach((peripheral) => {
            if (peripheral) {
                switch (peripheral.connection?.connectionStatus) {
                    case "connected":
                        connected++
                        break;
                    case "disconnected":
                        disconnected++
                        break;
                    case "unknown":
                    default:
                        unknown++
                        break;
                }
            }
        })
        setPeripheralsConnected(connected);
        setPeripheralsDisconnected(disconnected);
        setPeripheralsUnknown(unknown);
    }

    useEffect(() => {
        calculatePeripherals();
    }, [calculatePeripherals])

    return (
        <Stack
            horizontal
            wrap
            tokens={stackTokens}
        >
            <InfoContainer title="User">
                {props.userPresence?.availability && props.device.currentUser?.displayName &&
                    <Persona
                        imageInitials={renderInitials(props.device.currentUser.displayName)}
                        text={props.device.currentUser.displayName}
                        secondaryText={props.userPresence.availability}
                        size={PersonaSize.size56}
                        presence={renderGraphToPersonaPresence(props.userPresence.availability)}
                    />
                }
            </InfoContainer>
            <InfoContainer title="Device">
                <PropertyAndValue property="Current status">
                    {props.device.healthStatus && startCase(props.device.healthStatus)}
                </PropertyAndValue>
                <PropertyAndValue property="Device type">
                    {startCase(props.device.deviceType)}
                </PropertyAndValue>
                <PropertyAndValue property="Manufacturer">
                    {props.device.hardwareDetail?.manufacturer && startCase(props.device.hardwareDetail.manufacturer)}
                </PropertyAndValue>
                <PropertyAndValue property="Model">
                    {props.device.hardwareDetail?.model && startCase(props.device.hardwareDetail.model)}
                </PropertyAndValue>
                <PropertyAndValue property="Serial number">
                    {props.device.hardwareDetail?.serialNumber}
                </PropertyAndValue>
                <PropertyAndValue property="MAC address">
                    {props.device.hardwareDetail?.macAddresses?.join(", ")}
                </PropertyAndValue>
            </InfoContainer>
            <InfoContainer title="Hardware">
                <PropertyAndValue property="Peripherals connected">
                    <Text variant="xxLarge" styles={{ root: { color: DefaultPalette.green } }}>{peripheralsConnected}</Text>
                </PropertyAndValue>
                <PropertyAndValue property="Peripherals unknown">
                    <Text variant="xxLarge" styles={{ root: { color: DefaultPalette.orangeLighter } }}>{peripheralsUnknown}</Text>
                </PropertyAndValue>
                <PropertyAndValue property="Peripherals disconnected">
                    <Text variant="xxLarge" styles={{ root: { color: DefaultPalette.red } }}>{peripheralsDisconnected}</Text>
                </PropertyAndValue>
            </InfoContainer>
        </Stack>
    )

}
