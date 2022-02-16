export function isProduction() {
  return process.env.NODE_ENV === 'production';
}

export const isBrowser = () => {
  return typeof window !== 'undefined';
};
