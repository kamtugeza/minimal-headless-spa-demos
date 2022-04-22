import { Link } from '@remix-run/react';
import type { FC } from 'react';
import { Fragment } from 'react';

const renderLink = (item: any, nodeName: string, basename: string) => (
  <Fragment key={item['@id']}>
    <Link to={basename + item['@path'].replace(nodeName, '') || '/'} >
      {item['@name']}
    </Link>
    {item['@nodes'].length > 0 && item['@nodes'].map((node: string) => renderLink(item[node], nodeName, basename))}
  </Fragment>
);

type NavigationProps = {
  basename: string;
  content: any;
  currentLanguage: string;
  languages: Array<string>;
  nodeName: string;
};

const Navigation: FC<NavigationProps> = ({ basename, content, currentLanguage, languages, nodeName }) => {
  return (
    <nav>
      {renderLink(content, nodeName, basename)}
      {languages.map((language, i) => (
        <button disabled={currentLanguage === language} onClick={() => (window.location.href = '/' + (i === 0 ? '' : language))} key={language}>{language}</button>
      ))}
    </nav>
  );
}

export default Navigation;
