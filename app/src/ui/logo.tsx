import { clsxm } from '@awesomesolana/tw';
import Image from 'next/image';

import { useBreakpoints } from './responsive/use-breakpoints';

function rem(px: number): string {
  return `${px / 16}rem`;
}

const imageSizes = {
  xs: 20,
  sm: 24,
  md: 28,
  lg: 32,
  xl: 36,
  ['2xl']: 40,
  ['3xl']: 44,
  ['4xl']: 48,
};

export const HideOnLarge = ({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <div className={clsxm('hidden md:block', className)}>{children}</div>;
};

export const Logo = ({ size = 'sm' }: { size?: keyof typeof imageSizes }) => {
  const breakpoints = useBreakpoints();

  if (!breakpoints) return <div />;

  return (
    <div
      className={clsxm(
        'flex items-center text-center font-heading font-extrabold uppercase leading-none text-indigo-600',
      )}
      style={{ fontSize: rem(imageSizes[size] + 4) }}
    >
      Awesome
      <div
        style={{
          height: rem(imageSizes[size]),
          width: rem(imageSizes[size]),
        }}
      >
        <Image
          height={imageSizes[size]}
          width={imageSizes[size]}
          src={'/images/solana.svg'}
          alt="solana-logo"
          objectFit="fill"
        />
      </div>
      olana{breakpoints.isLarge ? '.DEV' : ''}
    </div>
  );
};
