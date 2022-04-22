import type { FC } from 'react';
import { EditableArea } from '@magnolia/react-editor';

type ListProps = {
  items: any;
  metadata: any;
};

const List: FC<ListProps> = ({ items, metadata }) => (
    <>
      <div className='hint'>[LIST]</div>
      <ul className='List'>
        <EditableArea content={items} parentTemplateId={metadata['mgnl:template']} />
      </ul>
    </>
  );

export default List;
