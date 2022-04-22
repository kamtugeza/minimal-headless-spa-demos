import type { FC } from 'react';

type ItemProps = {
	text: string;
};

const Item: FC<ItemProps> = ({ text }) => <li className="Item">{text}</li>;

export default Item;
