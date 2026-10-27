export default function Link({ href, children, prefetch, ...resto }) {
  return (
    <a href={href} {...resto}>
      {children}
    </a>
  );
}
