import type { FC } from 'react';
import { EditableArea } from '@magnolia/react-editor';

type BasicProps = {
  extras: any;
  main: any;
  metadata: any;
  title: string;
};

const Basic: FC<BasicProps> = ({ extras, main, metadata, title }) => (
  <div className='Basic'>
    <h2 className='hint'>[Basic Page]</h2>
    <h1>{title || metadata['@name']}</h1>

    <main>
      <h2 className='hint'>[Main Area]</h2>
      {main && <EditableArea className='Area' content={main} />}
    </main>

    <div className='Extras'>
      <h2 className='hint'>[Secondary Area]</h2>
      {extras && <EditableArea className='Area' content={extras} />}
    </div>
  </div>
);

export default Basic;
