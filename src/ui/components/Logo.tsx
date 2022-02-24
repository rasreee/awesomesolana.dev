import Image from 'next/image';

import { clsxm } from '@/ui/utils';

const imageSizes = {
  sm: 18,
  md: 26,
  lg: 44,
};

const fontSizes = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-[28px] sm:text-5xl',
};

const imageContainerSizes = {
  sm: 'h-[22px] w-[20px] sm:h-6 sm:w-6',
  md: 'h-[24px] w-[20px]',
  lg: 'h-6 w-6 sm:h-11 sm:w-11',
};

export const Logo = ({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) => {
  return (
    <div
      className={clsxm(
        'flex items-center text-center font-heading font-extrabold uppercase leading-none text-indigo-600',
        fontSizes[size],
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
      olana.DEV
    </div>
  );
};
