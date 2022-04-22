import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

type EnvVars = {
	MGNL_HOST: string | undefined;
	MGNL_LANGUAGES: string | undefined;
};
type Env = { ENV: EnvVars };

export const loader: LoaderFunction = async () =>
  json({
    ENV: {
      MGNL_HOST: process.env.MGNL_HOST,
      MGNL_LANGUAGES: process.env.MGNL_LANGUAGES,
    },
  } as const);

declare global {
	interface Window {
		ENV: EnvVars;
	}
}

export default function App() {
  const data = useLoaderData<Env>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(
              data.ENV
            )}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
