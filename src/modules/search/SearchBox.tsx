import { ErrorMessage, TextInput } from '@/ui/components';

import { StatefulSearchIcon } from './StatefulSearchIcon';

const DEFAULT_PLACEHOLDER = 'Search for any project, dependency, or topic';

export type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
  isRequesting: boolean;
  error: string | null;
};

export function SearchBox({
  value,
  onChange,
  isRequesting,
  error,
}: SearchBoxProps) {
  return (
    <div className="bg-surface flex w-full items-center gap-1 rounded-xl px-5 py-2">
      <ErrorMessage>{error}</ErrorMessage>
      <StatefulSearchIcon isRequesting={isRequesting} />
      <TextInput
        type="search"
        name="search"
        placeholder={DEFAULT_PLACEHOLDER}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
