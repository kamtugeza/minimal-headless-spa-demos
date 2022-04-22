# Minimal Headless SPA Demos

The new Visual SPA Editor allows authors to edit your SPA, reducing your ongoing maintenance duties. (win!) But you get to keep everything fully headless.

This demo shows you how to use the basic features for both React and Angular.

![The App](magnolia/_dev/README-screenshot-app.png)

## Pages and Components

The demo contains:

- Basic page template
- Contact page template

- Header component
- Paragraph component
- Image component
- List component
- Item component (available inside List component)
- Expander component

- Navigation component

## Setup

### Requirements

- Java (JDK)

- [Magnolia CLI](https://www.npmjs.com/package/@magnolia/cli) installed ([installation documentation](https://documentation.magnolia-cms.com/display/DOCS/Magnolia+CLI+v3))

### Install Magnolia with Magnolia CLI

In a terminal, navigate to the `magnolia` directory and run:

```bash
mgnl jumpstart
```

Choose `magnolia-community-demo-webapp` or `magnolia-dx-core-demo-webapp` as the version to download.

> Note: If you want to try the personalization feature - you will need `dx-core`. To get `dx-core` you will need an enterprise account, please contact Magnolia Sales team if you do not have one.
> Additionally you will need the version 2.1.0 higher of the [personalization modules](https://docs.magnolia-cms.com/product-docs/6.2/Modules/List-of-modules/Personalization-module.html).

(Magnolia is downloaded.)

### Add the demo light modules to Magnolia

Nothing to do here!
(The Magnolia instance is pre-configured to access the existing 'light-modules' directory.)

### Start Magnolia

From within the `magnolia` start Magnolia with:

```bash
mgnl start
```

Once the terminal shows `Server startup in X ms`

In your browser, open Magnolia at: <http://localhost:8080/magnoliaAuthor/>

### Accessing Magnolia

You can log in to Magnolia using the credentials **_username: `superuser`,
password: `superuser`._**
This will give you complete access to all content and configuration.

To access the apps that are mentioned in these instructions use the grid icon at the top of the page, to the right of the search bar.

## Configuring REST and DAM security

### Content endpoint permissions

The app has anonymous access to Magnolia REST endpoints with no additional configuration because:

- "Web access" is allowed, because the restEndpoint files are under the `/delivery` path
- "Access contol list" access is allowed, beause the restEndponts have the `bypassWorkspaceAcls` property.

**NOTE** Allowing anonymous access may not be suitable for a production environment where you wish to keep data private.

### DAM

In order for images to be displayed:
Open the Security app, open the `Roles` tab, edit the `rest-anonymous` role, go to `Web access` tab, `Add new` with this path `/dam/*` set to GET.

![Image Access for Anonymous](magnolia/_dev/README-security-anonymous-dam.png)

In `Access control lists` tab modify `Dam` workspace by allowing `Read-only` access to `Selected and sub nodes` to `/`.

## Deploy your SPA

Build and deploy the SPA to make it available for editing.

(These demos use a fully headless approach where the frontends are running on their own servers. If you would like to host the frontend as a bundle in a Magnolia light module see [README-host-in-light-module](README-host-in-light-module.md).
)

### Remix

Go to `/spa/remix-minimal` on the terminal and run `npm install`, and then `npm run dev`.

It will start start the Remix server.

All Magnolia specific configurations can be find in `app/routes/index.tsx` file.

## Create Sample Content

**_Either_** import some content, or create it manually.

### Import

**_In the Pages app_**, Use the 'Import' action (with nothing selected) and select the appropriate file from `/magnolia/_dev/content-to-import/`, depending on which 'flavor' you are using.

### Manually

Open the `Pages` app in Magnolia and **_click Add Page_** add a `Remix: Basic` **_template_** and name it `remix-minimal`

> The page name is important as the SPA's are hardcoded to treat those names as the base of the app.

Then add components into the `Main` or `Extras` area of the page.
You can also add additional pages as children of that page.
