import { clsxm } from '@awesomesolana/tw';
import times from 'lodash.times';

export interface PagerProps {
  page: number;
  onNext: () => void;
  onPrev: () => void;
  jumpTo: (index: number) => void;
}

export const Pager = ({ page, onNext, onPrev, jumpTo }: PagerProps) => {
  const handleClick = (index: number) => () => {
    if (page === index) return;

    if (Math.abs(page - index) > 1) return jumpTo(index);

    if (page > index) return onPrev();

    onNext();
  };

  return (
    <ul className="flex items-center gap-2">
      {times(5, (index) => (
        <li key={index}>
          <button
            onClick={handleClick(index)}
            className={clsxm(
              page === index && 'text-blue-500',
              'text-lg font-medium leading-none',
              'h-8 w-8',
            )}
          >
            {index + 1}
          </button>
        </li>
      ))}
    </ul>
  );
};
