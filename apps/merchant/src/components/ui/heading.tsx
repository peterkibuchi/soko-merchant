interface HeadingProps {
  title: string;
  description: string;
}

export function Heading({ title, description }: HeadingProps) {
  return (
    <div>
      <h2 className="font-cal text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
