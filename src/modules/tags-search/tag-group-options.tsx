import { Tag, TagType } from '@/domains/tags/tags.types';
import pluralize from '@/lib/utils/pluralize';
import { capitalize } from '@/lib/utils/string';

export interface TagGroupOptionsProps {
  type: TagType;
  tags: Tag[];
  onSelect: (tag: Tag) => void;
}

const TagGroupOptions = ({ type, tags, onSelect }: TagGroupOptionsProps) => {
  const handleSelect = (tag: Tag) => () => onSelect(tag);

  return (
    <div className="flex w-full flex-col gap-2 px-1">
      <span className="px-3 py-2 text-lg font-semibold">
        {capitalize(pluralize(type))} {`(${tags.length})`}
      </span>
      <ul className="max-h-[16rem] overflow-y-auto">
        {tags.map((tag) => (
          <li
            className="w-full"
            key={`group-tags-item__${tag.type}-${tag.name}`}
          >
            <button
              className="hover:bg-surface-1 w-full rounded-md py-3 px-3 text-left"
              onClick={handleSelect(tag)}
            >
              {tag.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagGroupOptions;
