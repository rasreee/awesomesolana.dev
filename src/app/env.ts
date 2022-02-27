export const host = must('host', process.env.BASE_URL);

/** API Host */
export const apiHost = must('apiHost', process.env.API_URL);

function must(name: string, variable?: string): string {
  if (variable == null) {
    throw new Error(
      `Invalid value for environment variable ${name}, you need to configure it in env file`,
    );
  }
  return variable;
}
