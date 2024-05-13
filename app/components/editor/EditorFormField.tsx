import { Label } from '@/components/ui/label';
import { ReactNode } from 'react';

type EditorFormFieldProps = {
  label: string;
  htmlFor: string;
  children: ReactNode;
};

export default function EditorFormField({
  label,
  htmlFor,
  children,
}: EditorFormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
