export interface PagerProps {
  page: number;
  onNext: () => void;
  onPrev: () => void;
}

export const Pager = ({ page, onNext, onPrev }: PagerProps) => {
  return <div>Page: {page}</div>;
};
