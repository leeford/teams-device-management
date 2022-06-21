import React from 'react';
import { Stack, Text } from '@fluentui/react';
import './App.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { AuthenticatedContent } from "./components/AuthenticatedContent";
import { HeaderContent } from "./components/HeaderContent";
import { stackTokens } from "./styles/styles";


export const App: React.FunctionComponent = () => {
  return (
    <Stack verticalFill tokens={stackTokens}>
      <HeaderContent />
      <UnauthenticatedTemplate>
        <Text>Please sign-in</Text>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <AuthenticatedContent />
      </AuthenticatedTemplate>
    </Stack>
  );
};
