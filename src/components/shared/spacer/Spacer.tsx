interface SpacerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size: number;
  axis?: 'horizontal' | 'vertical';
  style?: React.CSSProperties;
}

const Spacer = ({ size, axis, style = {}, ...delegated }: SpacerProps) => {
  const width = axis === 'vertical' ? 1 : size;
  const height = axis === 'horizontal' ? 1 : size;
  return (
    <span
      style={{
        display: 'block',
        width,
        minWidth: width,
        height,
        minHeight: height,
        ...style,
      }}
      {...delegated}
    />
  );
};

export default Spacer;

// Utility component that give spacing between elements

// Produces a 16px × 16px gap:
/* <Spacer size={16} /> */

// Produces a 32px × 1px gap:
/* <Spacer axis="horizontal" size={32} /> */
