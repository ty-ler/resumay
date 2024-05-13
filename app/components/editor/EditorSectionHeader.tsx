type EditorSectionHeaderProps = {
  title: string;
};

export default function EditorSectionHeader({
  title,
}: EditorSectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">{title}</h2>
      <hr />
    </div>
  );
}
