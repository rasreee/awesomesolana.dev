import plur from 'plur';

function pluralize(word: string, count?: number): string;

function pluralize(word: string, plural: string, count: number): string;

function pluralize(word: string, ...args: any[]): string {
  return plur(word, ...args);
}

export default pluralize;
