export function Container({
  children,
  className = "",
  id = "",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div className={`container-px max-w-7xl mx-auto ${className}`}>
      {children}
    </div>
  );
}
