import { ContentTag } from '../tags';

type SearchMenuProps = {
  onTagClick: (tag: ContentTag) => void;
  tags: ContentTag[];
};

export function SearchMenu({
  onTagClick: handleTagClick,
  tags,
}: SearchMenuProps) {
  const tagsToShow = tags.filter(
    (tag) => !tags.map((selectedTag) => selectedTag.name).includes(tag.name),
  );

  const onTagClick = (tag: ContentTag) => () => {
    handleTagClick(tag);
  };

  return (
    <ul>
      {tagsToShow.map((tag) => (
        <li className="w-full" key={tag.name}>
          <button className="w-full py-3 text-left" onClick={onTagClick(tag)}>
            {tag.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
