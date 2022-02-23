import { Project } from './types';

export const projects: Project[] = [
  {
    id: 'foo-bar',
    title: 'Foo Bar',
    description: 'Foo Bar is an AMM built with Typescript and Rust',
    githubUrl: 'https://github.com/rasreee/foo-bar',
    dependencies: ['@project-serum/anchor', '@solana/web3.js'],
    topics: ['amm'],
  },
];
