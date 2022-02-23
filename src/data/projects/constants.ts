import { Project } from './types';

export const ALL_PROJECTS: Project[] = [
  {
    id: 'foo-bar',
    title: 'Foo Bar',
    description: 'Foo Bar is an AMM built with Typescript and Rust',
    githubUrl: 'https://github.com/rasreee/foo-bar',
    tags: [
      { type: 'dependency', name: '@project-serum/anchor' },
      { type: 'dependency', name: '@solana/web3.js' },
      { type: 'topic', name: 'dao' },
      { type: 'language', name: 'typescript' },
    ],
  },
];
