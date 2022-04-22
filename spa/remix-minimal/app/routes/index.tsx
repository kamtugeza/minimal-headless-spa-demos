import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { EditablePage } from '@magnolia/react-editor';
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react';

import Navigation from '~/components/Navigation';
import Basic from '~/pages/Basic';
import Contact from '~/pages/Contact';
import Headline from '~/components/Headline';
import Image from '~/components/Image';
import Paragraph from '~/components/Paragraph';
import Expander from '~/components/Expander';
import List from '~/components/List';
import Item from '~/components/Item';
import { setURLSearchParams } from '~/utils';
import { languages, getCurrentLanguage } from '~/utils/index.server';

import stylesUrl from "~/styles/globals.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesUrl }];

const nodeName = '/remix-minimal';
const config = {
  componentMappings: {
    'remix-minimal-lm:pages/basic': Basic,
    'remix-minimal-lm:pages/contact': Contact,

    'spa-lm:components/headline': Headline,
    'spa-lm:components/image': Image,
    'spa-lm:components/paragraph': Paragraph,
    'spa-lm:components/expander': Expander,
    'spa-lm:components/list': List,
    'spa-lm:components/listItem': Item,
  } as Record<string, FC<unknown>>,
};

// More info about personalization of headless projects https://docs.magnolia-cms.com/product-docs/6.2/Developing/SPA-development-and-Magnolia/Personalization-of-headless-SPA-projects.html
// Fetch all variants inside Magnolia WYSIWYG in edit mode
const p13n = (pagePath: string, isPagesAppEdit: boolean): string => {
  let newPagePath = pagePath;

  if (isPagesAppEdit) {
    newPagePath += newPagePath.indexOf('?') > -1 ? '&' : '?';
    newPagePath += 'variants=all';
  }

  return newPagePath;
}

declare global {
  var mgnlInPageEditor: boolean;
}

export const loader: LoaderFunction = async ({ request }) => {
  // Use different defaultBaseUrl to point to public instances
  const defaultBaseUrl = process.env.MGNL_HOST;
  const pagesApi = defaultBaseUrl + '/.rest/delivery/pages/v1';
  const templateAnnotationsApi = defaultBaseUrl + '/.rest/template-annotations/v1';
  const pagenavApi = defaultBaseUrl + '/.rest/delivery/pagenav/v1';
  const resolvedUrl = new URL(request.url);
  const currentLanguage = getCurrentLanguage(resolvedUrl.pathname);
  const isDefaultLanguage = currentLanguage === languages[0];
  const isPagesApp = resolvedUrl.searchParams.get('mgnlPreview') || null;
  let props = {
    isPagesApp,
    isPagesAppEdit: isPagesApp === 'false',
    basename: isDefaultLanguage ? '' : '/' + currentLanguage,
    page: {},
    pagenav: {},
    pagePath: nodeName + resolvedUrl.pathname.replace(new RegExp('.*' + nodeName), ''), // Find out page path to fetch from Magnolia
    templateAnnotationsApi,
    currentLanguage,
    languages,
  };

  global.mgnlInPageEditor = props.isPagesAppEdit;

  if (!isDefaultLanguage) {
    props.pagePath = props.pagePath.replace('/' + currentLanguage, '');
  }

  // Fetching page content
  const pagesRes = await fetch(
    p13n(setURLSearchParams(pagesApi + props.pagePath, 'lang=' + currentLanguage), props.isPagesAppEdit)
  );
  props.page = await pagesRes.json();

  // Fetching page navigation
  const pagenavRes = await fetch(setURLSearchParams(pagenavApi + nodeName, 'lang=' + currentLanguage));
  props.pagenav = await pagenavRes.json();

  return json(props);
};

const Index: FC = () => {
  const [templateAnnotations, setTemplateAnnotations] = useState<Record<string, undefined>>();
  const { currentLanguage, languages, page, pagenav, isPagesApp, isPagesAppEdit, basename, pagePath, templateAnnotationsApi } = useLoaderData() ?? {};

  // Fetch template annotations only inside Magnolia WYSIWYG
  useEffect(() => {
    async function fetchTemplateAnnotations() {
      const templateAnnotationsRes = await fetch(templateAnnotationsApi + pagePath);
      const templateAnnotationsJson = await templateAnnotationsRes.json();

      setTemplateAnnotations(templateAnnotationsJson);
    }

    if (isPagesApp) fetchTemplateAnnotations();
  }, [isPagesApp, pagePath, templateAnnotationsApi]);

  // In Pages app wait for template annotations before rendering EditablePage
  const shouldRenderEditablePage = page && (isPagesApp ? templateAnnotations : true);

  return (
    <div className={isPagesAppEdit ? 'disable-a-pointer-events' : ''}>
      {pagenav && <Navigation currentLanguage={currentLanguage} content={pagenav} languages={languages} nodeName={nodeName} basename={basename} />}
      {shouldRenderEditablePage && (
        <EditablePage content={page} config={config} templateAnnotations={templateAnnotations} />
      )}
    </div>
  );
}

export default Index;
