import { FilterCategory, Tag } from './types';

export const FILTER_CATEGORIES = [
  'topic',
  'framework',
  'language',
  'npm-dependency',
  'cargo-dependency',
] as FilterCategory[];

export const TAG_NAMES = Object.freeze({
  language: [
    'Rust',
    'JavaScript',
    'Typescript',
    'C',
    'Golang',
    'Python',
    'Java',
    'Swift',
    'CLI',
    'Kotlin',
  ],
  framework: ['Anchor', 'Web3.js', 'React.js', 'Svelte', 'Vue.js', 'Next.js'],
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
    '@solana/wallet-adapter',
    '@solana/web3.js',
    '@solana/wallet-adapter-react',
    '@solana/wallet-adapter-phantom',
  ],
  cargo: ['cronos-sdk'],
});

const DEPENDENCY_FILTERS: Tag[] = Object.entries(DEPENDENCIES)
  .map(([category, values]) =>
    values.map((name) => ({ category: `${category}-dependency`, name } as Tag)),
  )
  .flat();

const TAG_FILTERS: Tag[] = Object.entries(TAG_NAMES)
  .map(([category, values]) =>
    values.map((name) => ({ category, name: name.toLowerCase() } as Tag)),
  )
  .flat();

export const SEARCH_FILTERS: Tag[] = [...TAG_FILTERS, ...DEPENDENCY_FILTERS];
