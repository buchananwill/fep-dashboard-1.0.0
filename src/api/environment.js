'server only';
// environment.js

// Custom error for missing environment variables
class EnvironmentVariableNotFoundError extends Error {
  constructor(variableName) {
    super(`Environment variable not found: ${variableName}`);
    this.name = 'EnvironmentVariableNotFoundError';
  }
}

// Helper function to retrieve environment variables
function getEnv(variableName) {
  const value = process.env[variableName];
  if (!value) {
    throw new EnvironmentVariableNotFoundError(variableName);
  }
  return value;
}

// Define functions for retrieving specific environment variables
function getCreateSchemaSecret() {
  return getEnv('CREATE_SCHEMA');
}

function getRetrieveSchemaSecret() {
  return getEnv('RETRIEVE_SCHEMA');
}

function getBaseUrl() {
  return getEnv('BASE_URL');
}

function getFrontendUrl() {
  return getEnv('FRONTEND_URL');
}

function getMicrosoftEntraIdId() {
  return getEnv('AUTH_MICROSOFT_ENTRA_ID_ID');
}

function getMicrosoftEntraIdSecret() {
  return getEnv('AUTH_MICROSOFT_ENTRA_ID_SECRET');
}

// Export the retrieval functions
module.exports = {
  getCreateSchemaSecret,
  getRetrieveSchemaSecret,
  getBaseUrl,
  getFrontendUrl,
  getMicrosoftEntraIdId,
  getMicrosoftEntraIdSecret
};
