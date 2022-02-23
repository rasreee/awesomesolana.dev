import invariant from '@/lib/invariant';

export type ContentTag = { name: string; type: 'content-type' | 'dependency' };

export function toContentTag(tagName: string): ContentTag {
  const found = tags.find((tag) => tag.name === tagName);
  invariant(found, `tag not found for name: ${tagName}`);
  return found;
}

export const tags: ContentTag[] = [
  { name: '@project-serum/anchor', type: 'dependency' },
  { name: '@project-serum/serum', type: 'dependency' },
  { name: '@solana/web3.js', type: 'dependency' },
  { name: '@solana/wallet-adapter', type: 'dependency' },
  { name: '@solana/spl-token', type: 'dependency' },
];
