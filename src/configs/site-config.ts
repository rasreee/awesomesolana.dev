const baseUrl = 'https://github.com/rasreee/awesomesolana.dev';

export const siteConfig = Object.freeze({
  copyright: `Copyright © ${new Date().getFullYear()} Lesley Chang. All Rights Reserved.`,
  author: {
    name: 'Lesley Chang',
    github: 'https://github.com/rasreee',
    twitter: 'https://twitter.com/rasreee',
    linkedin: 'https://linkedin.com/in/lesleyhchang',
    email: 'lesley.hanna98@gmail.com',
  },
  repo: {
    url: baseUrl,
    editUrl: `${baseUrl}/edit/main/website/pages`,
    blobUrl: `${baseUrl}/blob/main`,
  },
  socials: {
    github: {
      href: 'https://github.com/rasreee/awesomesolana.dev',
    },
  },
  youtube: 'https://www.youtube.com/channel/UC4TmDovH46TB4S0SM0Y4CIg',
  seo: {
    title: 'Awesome Solana',
    titleTemplate: '%s - Awesome Solana',
    description:
      'Browse open-source projects built on Solana, filterable by dependencies, languages, frameworks, and/or topics.',
    siteUrl: 'https://awesomesolana.dev',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://awesomesolana.dev',
      title: 'Awesome Solana',
      description:
        'Browse open-source projects built on Solana, filterable by dependencies, languages, frameworks, and/or topics.',
      site_name:
        'Awesome Solana: Browse open-source projects built on Solana, filterable by dependencies, languages, frameworks, and/or topics.',
      images: [
        {
          url: 'https://awesomesolana.dev/og-image.png',
          width: 1240,
          height: 480,
          alt: 'Awesome Solana: Browse open-source projects built on Solana, filterable by dependencies, languages, frameworks, and/or topics.',
        },
        {
          url: 'https://awesomesolana.dev/twitter-og-image.png',
          width: 1012,
          height: 506,
          alt: 'Awesome Solana: Browse open-source projects built on Solana, filterable by dependencies, languages, frameworks, and/or topics.',
        },
      ],
    },
  },
});
