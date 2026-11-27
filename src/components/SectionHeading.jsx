export function SectionHeading({
  as: Tag = 'h2',
  id,
  darkText,
  mutedText,
  className = '',
}) {
  return (
    <Tag
      id={id}
      className={`font-extrabold tracking-tight leading-[1.12] text-balance ${className}`}
    >
      <span className="text-[#141414]">{darkText}</span>
      {mutedText ? (
        <>
          {' '}
          <span className="text-[#737373]">{mutedText}</span>
        </>
      ) : null}
    </Tag>
  );
}
