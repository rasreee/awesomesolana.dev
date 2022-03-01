import invariant from './invariant';

const validateEnv = (...envVars: string[]) => {
  envVars.forEach((envVar) => {
    invariant(
      process.env[envVar],
      `Environment variable ${envVar} was undefined`,
    );
  });
};

export default validateEnv;
