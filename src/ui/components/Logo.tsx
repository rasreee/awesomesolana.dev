import clsxm from '@utils/clsxm';
import Image from 'next/image';

import { useBreakpoints } from '../responsive';

const imageSizes = {
  sm: 18,
  md: 26,
  lg: 44,
};

const fontSizes = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-[27px] sm:text-5xl',
};

const imageContainerSizes = {
  sm: 'h-[18px] w-[20px] sm:h-6 sm:w-6',
  md: 'h-[22px] w-[21px]',
  lg: 'h-6 w-6 sm:h-11 sm:w-11',
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

export const Logo = ({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const breakpoints = useBreakpoints();

  if (!breakpoints) return <div>BREAKPOINTS NOT READY</div>;

  return (
    <div
      className={clsxm(
        fontSizes[size],
        'flex items-center text-center font-heading font-extrabold uppercase leading-none text-indigo-600',
      )}
    >
      Awesome
      <div className={clsxm(imageContainerSizes[size])}>
        <Image
          height={imageSizes[size]}
          width={imageSizes[size]}
          src={'/images/solana.svg'}
          alt="solana-logo"
          objectFit="scale-down"
        />
      </div>
      olana{breakpoints.isLarge ? '.DEV' : ''}
    </div>
  );
};
