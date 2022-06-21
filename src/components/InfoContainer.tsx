import React from "react";
import { Stack, Text } from "@fluentui/react";
import { roundedContainerStyles, stackTokensPadding } from "../styles/styles";

interface IInfoContainerProps {
    title: string
}

export const InfoContainer: React.FunctionComponent<IInfoContainerProps> = (props) => {

    return (
        <Stack
            styles={roundedContainerStyles}
            tokens={stackTokensPadding}
        >
            <Text variant={'xLarge'} block>{props.title}</Text>
            {props.children}
        </Stack>
    )
}
