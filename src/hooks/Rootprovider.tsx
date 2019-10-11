import React from 'react';
import { Api } from '../services/api/api';
import { ApiContext } from './api/ApiContext';
import { KeycloakContext, ParsedKeycloak } from "./keycloak/KeycloakContext";
import { I18nContext } from './i18n/I18nContext';

interface RootProviderProps {
  children: React.ReactNode
  i18n: any
  keycloak: ParsedKeycloak
  api: Api
}

/**
 * Wraps the app in all required global providers
 * @param props the context values to pass to the providers
 */
export default function RootProvider(props: RootProviderProps) {
  return (
    <I18nContext.Provider value={props.i18n}>
    <KeycloakContext.Provider value={props.keycloak}>
      <ApiContext.Provider value={props.api}>
        {props.children}
      </ApiContext.Provider>
    </KeycloakContext.Provider>
    </I18nContext.Provider>
  );
}

