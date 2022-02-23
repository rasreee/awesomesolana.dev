import { useEffect } from 'react';

import { waitFor } from '@/lib/waitFor';
import { StatefulSearchIcon } from '@/modules/search';
import { ErrorMessage, TextInput } from '@/ui/components';

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
  onChange,
  error,
  isRequesting,
  onSubmit,
  placeholder = DEFAULT_PLACEHOLDER,
}: SearchFormProps) {
  useEffect(() => {
    waitFor(300).then(() => onSubmit(value));
  }, [value]);

  return (
    <div className="flex items-center gap-1 px-5 py-2">
      <ErrorMessage>{error}</ErrorMessage>
      <StatefulSearchIcon isRequesting={isRequesting} />
      <TextInput
        type="search"
        name="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
