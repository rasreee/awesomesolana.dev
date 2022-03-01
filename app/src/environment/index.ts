const environment = Object.freeze({
  baseUrl: process.env.BASE_URL,
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  },
  github: {
    accessToken: process.env.GITHUB_ACCESS_TOKEN,
  },
});

export default environment;
