import { ISpinnerStyles, Spinner, SpinnerSize, Stack } from "@fluentui/react";
import { stackTokens } from "../styles/styles";

export const LoadingSpinner = () => {

    const spinnerStyles: ISpinnerStyles = {
        label: {
            fontSize: 20
        }
    }

    return (
        <Stack
            tokens={stackTokens}
        >
            <Spinner
                size={SpinnerSize.large}
                label="Please wait..."
                ariaLive="assertive"
                labelPosition="bottom"
                styles={spinnerStyles}
            />
        </Stack>
    );
}
