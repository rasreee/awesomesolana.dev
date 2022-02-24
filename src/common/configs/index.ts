export interface IConfigs {
  github: { apiUrl: string };
}

export const configs = Object.freeze({
  hostUrl: 'https://awesomesolana.dev',
  github: {
    apiUrl: 'https://api.github.com',
  },
});
