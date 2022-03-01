import dotenv from 'dotenv';

import invariant from './invariant';

dotenv.config({
  path: process.env.NODE_ENV !== 'production' ? '.env.local' : '.env',
});

export default function getEnvVar(envVarKey: string): string {
  const value = process.env[envVarKey];

  invariant(value, `${envVarKey} environment variable was not defined`);

  return value;
}
