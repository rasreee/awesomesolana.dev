export type Tag = { name: string; type: 'content-type' | 'dependency' };

export const tags: Tag[] = [
  { name: '@project-serum/anchor', type: 'dependency' },
  { name: '@project-serum/serum', type: 'dependency' },
  { name: '@solana/web3.js', type: 'dependency' },
  { name: '@solana/wallet-adapter', type: 'dependency' },
  { name: '@solana/spl-token', type: 'dependency' },
];
