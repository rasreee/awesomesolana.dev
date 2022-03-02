import { TextInputProps } from '@awesomesolana/ui';
import { computed, makeAutoObservable } from 'mobx';

export class SearchStore {
  error: string | null = null;
  value = '';
  setValue = (value: string) => (this.value = value);

  getTextInputProps = (props?: Partial<TextInputProps>): TextInputProps =>
    computed(() => ({
      ...props,
      value: this.value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        this.setValue(e.currentTarget.value),
    })).get();

  reset = () => {
    this.error = null;
  };

  constructor() {
    makeAutoObservable(this, {}, { name: 'SearchStore' });
  }
}
