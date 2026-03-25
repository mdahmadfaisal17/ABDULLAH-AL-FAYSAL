type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="mx-6 my-10 rounded-3xl border border-dashed border-white/10 bg-slate-950/50 px-6 py-12 text-center">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}
