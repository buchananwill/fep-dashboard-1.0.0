// validateEnv.js
import Env from './environment.mjs';

// Function to validate required environment variables
function validateEnv() {
  try {
    Object.keys(Env).forEach((key) => {
      const value = Env[key];
      if (typeof value === 'function') {
        // Call the function to validate the environment variable
        value();
      }
    });
    console.log('All required environment variables are validated.');
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      process.exit(1); // Exit the process if a required variable is missing
    }
  }
}

export default { validateEnv };
