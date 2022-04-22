import type { FC } from 'react';

type ParagraphProps = {
  richText: string;
};

const Paragraph: FC<ParagraphProps> = ({ richText }) => <div className='Paragraph' dangerouslySetInnerHTML={{ __html: richText }} />;

export default Paragraph;
