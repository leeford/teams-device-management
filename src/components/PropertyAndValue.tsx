import React from "react";
import { FontWeights, ITextStyles, Separator, Stack, Text } from "@fluentui/react";
import { stackTokensChildrenGap } from "../styles/styles";

interface IPropertyAndValueProps {
    property: string;
}

export const PropertyAndValue: React.FunctionComponent<IPropertyAndValueProps> = (props) => {

    const propertyTextStyles: ITextStyles = {
        root: {
            width: 100,
            fontWeight: FontWeights.semibold
        }
    }

    return (
        <Stack>
            <Separator />
            <Stack
                tokens={stackTokensChildrenGap}
                horizontal
            >
                <Text styles={propertyTextStyles}>{props.property}:</Text>
                {props.children}
            </Stack>
        </Stack>
    )
}
