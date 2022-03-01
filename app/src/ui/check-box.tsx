import { clsxm } from '@awesomesolana/tw';

export interface CheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function CheckBox({
  className,
  readOnly = false,
  ...props
}: CheckBoxProps) {
  return (
    <input
      type="checkbox"
      className={clsxm(
        'form-checkbox',
        'bg-app rounded dark:border-base-700 dark:checked:bg-blue-500',
        className,
      )}
      readOnly={readOnly}
      {...props}
    />
  );
}
