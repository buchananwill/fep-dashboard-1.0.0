// @azure/identity

import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import { ClientSecretCredential } from '@azure/identity';

const tenantDir = process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID!;

const credential = new ClientSecretCredential(
  tenantDir,
  process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
  process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET!
);

// @microsoft/microsoft-graph-client/authProviders/azureTokenCredentials
const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  // The client credentials flow requires that you request the
  // /.default scope, and pre-configure your permissions on the
  // app registration in Azure. An administrator must grant consent
  // to those permissions beforehand.
  scopes: ['https://graph.microsoft.com/.default']
});

export const graphClient = Client.initWithMiddleware({
  authProvider: authProvider
});
