export interface IConfigs {
  github: { apiUrl: string };
}

export const configs = Object.freeze({
  github: {
    apiUrl: 'https://api.github.com',
  },
});
