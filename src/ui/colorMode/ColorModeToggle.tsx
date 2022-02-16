import Button from '@/ui/buttons/Button';

import { useColorMode } from './useColorMode';

export default function ColorModeToggle() {
  const { mode, toggle } = useColorMode();

  return (
    <Button variant={mode === 'dark' ? 'light' : 'dark'} onClick={toggle}>
      Mode
    </Button>
  );
}
