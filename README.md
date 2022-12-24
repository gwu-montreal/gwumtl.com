# gwumtl.com

The website for Game Workers Unite Montréal.

![Screenshot of gwumtl.com](screenshot.png)

> Just want to make changes to the website text or images?
> [Access the admin panel](https://gwumtl.com/admin) to start editing content!
> No need to use Git or clone this repo.

## Contributing to the Code

Make sure you have [Node](https://nodejs.org/en/) installed before proceeding.
Then run `corepack enable` to ensure the [Yarn](https://classic.yarnpkg.com/)
package manager is available.

Then run:

```
yarn
```

to install dependencies. Run

```
yarn start
```

to launch the development server, which will allow you to make changes and
preview them live.

To preview a production-ready static HTML export of the site, run `yarn export`.
The output in the `out/` directory corresponds to what you'd see in the live
site — you can preview it with [`serve`](https://github.com/vercel/serve) or any
other local static server tool of your choice.

## Deploying

The website is deployed to [Github Pages](https://pages.github.com/)
automatically whenever there's a push or merge to the `master` branch on Github
(via [Github Actions](https://docs.github.com/en/actions)). Check the [Actions
workflow file](.github/workflows/gh-pages.yml) for details.

The Actions workflow process checks for errors by running the `yarn test`
command before deploying. The easiest way to ensure there are no errors is to
make sure your editor is set up to fix issues as you work.

You can use whatever you want, but one nice editor is [Visual Studio
Code](https://code.visualstudio.com/). Once you've installed it, open it up and
install the following extensions:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

The easiest way to do this is to open the **Extensions** tab
(<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd>) and type the
extension names in the search box.

Once they're installed, open the application settings
(<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>,</kbd>) and ensure the following
settings are **enabled**:

- **Editor: Format on Save**. This will automatically reformat your code whenever you save a file, saving you the effort of formatting anything manually.
- **Prettier: Require Config**. This ensures that Prettier won't try to format your files in any other repos where Prettier isn't in use.

You can also run Prettier on the command line to format all your files at once:

```
yarn prettier
```
