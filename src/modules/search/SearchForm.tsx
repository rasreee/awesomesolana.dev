import { useEffect } from 'react';

import { waitFor } from '@/lib/waitFor';
import { ErrorMessage } from '@/ui/components';

import { SearchInput } from './SearchInput';
import { StatefulSearchIcon } from './StatefulSearchIcon';

const DEFAULT_PLACEHOLDER = 'Search for any project, dependency, or topic';

type SearchFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (query: string) => void;
  error: string | undefined | null;
  isRequesting: boolean;
  placeholder?: string;
};

export function SearchForm({
  value,
  onChange: handleChange,
  error,
  isRequesting,
  onSubmit,
  placeholder = DEFAULT_PLACEHOLDER,
}: SearchFormProps) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    handleChange(event.currentTarget.value);
  };

  useEffect(() => {
    waitFor(300).then(() => onSubmit(value));
  }, [value]);

  return (
    <div className="flex items-center gap-1 px-5 py-2">
      <ErrorMessage>{error}</ErrorMessage>
      <StatefulSearchIcon isRequesting={isRequesting} />
      <SearchInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
