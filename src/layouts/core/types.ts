import type { SeoProps } from '@/ui/components/Seo';

export type LayoutProps = {
  children?: React.ReactNode;
  seo?: SeoProps;
  title?: string;
  description?: string;
};
