import { makeAutoObservable } from 'mobx';

import { ITagTypeModalStore } from '@/app/stores/interfaces';
import { TagType } from '@/domains/tags/tags.types';

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
