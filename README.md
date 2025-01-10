# gwumtl.com

The website for Game Workers Unite Montréal.

![Screenshot of gwumtl.com](screenshot.png)

## Contributing to the Code

This website is built with [Astro](https://astro.build/). You can make simple changes online using the [StackBlitz web editor](https://pr.new/github/gwu-montreal/gwumtl.com) right in your browser if you login to GitHub. For more sweeping changes, read on for local setup instructions.

First, ensure sure you've installed Node, ideally at least the version of that's listed in [the `.node-version` file](.node-version). You can also use [`fnm`](https://github.com/Schniz/fnm) and let it pick the correct Node version to use automatically.

With the right version of Node installed, ensure [corepack](https://nodejs.org/docs/latest/api/corepack.html) is enabled:

```sh
corepack enable
```

Next, install deps with [pnpm](https://pnpm.io/):

```sh
pnpm install
```

to install dependencies. Finally, run

```sh
pnpm start
```

to launch the development server, which will allow you to make changes and preview them live.

To preview a production-ready static HTML export of the site, run `pnpm build`. The output in the `dist/` directory corresponds to what you'd see in the live site. After doing this, you can preview it by running `pnpm preview`.

## Deploying

The website is deployed to [Github Pages](https://pages.github.com/) automatically whenever there's a push or merge to the `master` branch on Github (via [Github Actions](https://docs.github.com/en/actions)). Check the [Actions workflow file](.github/workflows/gh-pages.yml) for details.

The Actions workflow process checks for errors by running the `pnpm test` command before deploying. The easiest way to ensure there are no errors is to make sure your editor is set up to fix issues as you work.

You can use whatever you want, but one nice editor is [Visual Studio Code](https://code.visualstudio.com/). If you open the project folder with it, it'll suggest some extensions for you on the **Extensions tab** (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd>). Install them for a better experience editing the site.

You can run Prettier on the command line to format all your files at once:

```sh
pnpm prettier
```
