import { useEffect, useState } from 'react';

import { waitFor } from '@/lib/waitFor';
import { ErrorMessage } from '@/ui/components';

import { SearchInput } from './SearchInput';
import { StatefulSearchIcon } from './StatefulSearchIcon';

const PLACEHOLDER_TEXT = 'Search for any project, dependency, or topic';

type SearchFormProps = {
  onSubmit: (query: string) => void;
  error: string | undefined | null;
  isRequesting: boolean;
};

export function SearchForm({ error, isRequesting, onSubmit }: SearchFormProps) {
  const [value, setValue] = useState('');

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.currentTarget.value);
  };

  useEffect(() => {
    waitFor(300).then(() => onSubmit(value));
  }, [value]);

  return (
    <div className="flex items-center gap-1 px-5 py-2">
      <ErrorMessage>{error}</ErrorMessage>
      <StatefulSearchIcon isRequesting={isRequesting} />
      <SearchInput
        placeholder={PLACEHOLDER_TEXT}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
