import invariant from './invariant';

export default function getEnvVar(envVarKey: string): string {
  const value = process.env[envVarKey];

  invariant(value, `${envVarKey} environment variable was not defined`);

  return value;
}
