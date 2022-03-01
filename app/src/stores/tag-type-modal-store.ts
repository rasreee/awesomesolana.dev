import { makeAutoObservable } from 'mobx';

import { TagType } from '@/domains/tags/types';

import { ITagTypeModalStore } from './interfaces';

export class TagTypeModalStore implements ITagTypeModalStore {
  tagType: TagType | null = null;

  onClose = () => {
    this.tagType = null;
  };

  get isOpen(): boolean {
    return Boolean(this.tagType);
  }

  openTagType = (type: TagType) => {
    this.tagType = type;
  };

  constructor() {
    makeAutoObservable(this, {}, { name: 'FiltersModal' });
  }
}
