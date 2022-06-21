import { DefaultPalette, IButtonStyles, IStackStyles, IStackTokens } from "@fluentui/react";

const defaultChildrenGap = "0.75rem";
const defaultPadding = "1rem";

export const stackTokensChildrenGap: IStackTokens = {
    childrenGap: defaultChildrenGap
};

export const stackTokensPadding: IStackTokens = {
    padding: defaultPadding
};

export const stackTokens: IStackTokens = {
    childrenGap: defaultChildrenGap,
    padding: defaultPadding
};

export const buttonStyles: IButtonStyles = {
    root: { minWidth: 100 }
}

export const roundedContainerStyles: IStackStyles = {
    root: {
        minWidth: 300,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: DefaultPalette.neutralQuaternary
    }
};