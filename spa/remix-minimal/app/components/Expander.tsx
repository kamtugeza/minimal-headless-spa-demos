import type { FC, MouseEvent } from 'react';
import { useState } from 'react';
import { EditableArea } from '@magnolia/react-editor';

type ExpanderProps = {
  expanderItems: any;
  metadata: any;
};

const Expander: FC<ExpanderProps> = ({ expanderItems, metadata }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const toggle = (event: MouseEvent<HTMLDivElement>) => {
    setIsCollapsed(isCollapsed => !isCollapsed);
    event.preventDefault();
  }

  return (
    <div className="expander">
      <div onClick={toggle} className={isCollapsed ? 'open expanderHeader' : 'closed expanderHeader'}>
        Expander
        <svg className="expanderIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
        </svg>
      </div>

      {!isCollapsed && (
        <div>
          <div className="hint">[EXPANDER OPENED]</div>
          <EditableArea content={expanderItems} parentTemplateId={metadata['mgnl:template']} />
        </div>
      )}
    </div>
  );
};

export default Expander;
