import clsxm from '@/lib/clsxm';

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
      className={clsxm('bg-app rounded border-none', className)}
      readOnly={readOnly}
      {...props}
    />
  );
}
