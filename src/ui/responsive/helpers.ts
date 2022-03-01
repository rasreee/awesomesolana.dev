import invariant from '@/lib/invariant';

export const isValidEmString = (s: string): boolean => {
  return Boolean(s.match(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)(em)?$/)?.toString());
};

const PX_PER_EM = 16;

export const emToPx = (em: string): number => {
  invariant(isValidEmString(em), `invalid em value: ${em}`);

  const value = em.replace('em', '');
  const parsed = parseFloat(value);

  invariant(!isNaN(parsed), `parsed float was NaN given ${parsed}`);

  return parsed * PX_PER_EM;
};
