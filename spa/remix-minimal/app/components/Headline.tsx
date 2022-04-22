import type { FC } from 'react';

type HeadlineProps = {
	text: string;
};

const Headline: FC<HeadlineProps> = ({ text }) => <h2 className="Headline">{text}</h2>;

export default Headline;
