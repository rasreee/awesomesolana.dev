import { Project } from './types';

export const ALL_PROJECTS: Project[] = [
  {
    id: 'foo-bar',
    title: 'Foo Bar',
    description: 'Foo Bar is an AMM built with Typescript and Rust',
    githubUrl: 'https://github.com/rasreee/foo-bar',
    tags: [
      { type: 'npm-dependency', name: '@project-serum/anchor' },
      { type: 'language', name: 'typescript' },
      { type: 'topic', name: 'dao' },
    ],
  },
];
