import { Tag, TagType } from './types';

export const TAG_TYPES = [
  'topic',
  'framework',
  'language',
  'dependency',
] as TagType[];

export const TAG_NAMES = Object.freeze({
  language: [
    'C',
    'Golang',
    'Java',
    'JavaScript',
    'Kotlin',
    'Python',
    'Rust',
    'Swift',
    'Typescript',
  ],
  framework: [
    'Anchor',
    'Angular',
    'Express',
    'Next.js',
    'Node.js',
    'React Native',
    'React.js',
    'Svelte',
    'Vue.js',
    'Web3.js',
  ],
  topic: [
    'associated-token-account',
    'program-derived-address',
    'decentralized-identity',
    'did',
    'spl-token',
    'wallet',
    'nft',
    'solana-name-service',
    'staking',
    'lending',
    'program-deployment',
    'dao',
    'exchange',
    'game',
    'token-program',
    'system-program',
    'rent',
    'transaction',
    'token-swap-program',
    'token-program',
    'automated-market-marker',
    'amm',
    'cross-program-invocations',
    'program-signed-accounts',
  ],
});

export const DEPENDENCIES = Object.freeze({
  npm: [
    '@project-serum/anchor-cli',
    '@project-serum/anchor',
    '@project-serum/associated-token',
    '@project-serum/awesome-serum',
    '@project-serum/borsh',
    '@project-serum/common',
    '@project-serum/lockup',
    '@project-serum/pool',
    '@project-serum/registry',
    '@project-serum/serum',
    '@project-serum/sol-wallet-adapter',
    '@project-serum/spl-token-swap',
    '@project-serum/swap-ui',
    '@project-serum/swap',
    '@project-serum/token',
    '@project-serum/tokens',
    '@solana/buffer-layout',
    '@solana/spl-name-service',
    '@solana/spl-token-lending',
    '@solana/spl-token-registry',
    '@solana/spl-token',
    '@solana/token-swap',
    '@solana/wallet-adapter-phantom',
    '@solana/wallet-adapter-react',
    '@solana/wallet-adapter',
    '@solana/web3.js',
  ],
  cargo: ['cronos-sdk'],
});

const DEPENDENCY_FILTERS: Tag[] = Object.values(DEPENDENCIES)
  .map((tagNames) =>
    tagNames.map((name) => ({ type: `dependency`, name } as Tag)),
  )
  .flat();

const TAG_FILTERS: Tag[] = Object.entries(TAG_NAMES)
  .map(([type, values]) =>
    values.map((name) => ({ type, name: name.toLowerCase() } as Tag)),
  )
  .flat();

export const SEARCH_TAGS: Tag[] = [...TAG_FILTERS, ...DEPENDENCY_FILTERS];
