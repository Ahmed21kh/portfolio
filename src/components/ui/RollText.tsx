/**
 * Text that rolls up on hover of its parent <a>/<button> (styles in globals.css → .roll).
 * The rolling copy is CSS-generated, so screen readers only read the label once.
 */
export default function RollText({ children }: { children: string }) {
  return (
    <span className="roll" data-text={children}>
      <span>{children}</span>
    </span>
  )
}
