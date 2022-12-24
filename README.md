## gwumtl.com

> Just want to make changes to the website text or images?
> [Access the admin panel](https://gwumtl.com/admin) to start editing content!
> No need to use Git or clone this repo.

### Contributing to the Code

Make sure you have [Node](https://nodejs.org/en/) installed before proceeding.
Then run `corepack enable` to ensure [Yarn](https://classic.yarnpkg.com/) is
available.

Then run:

```
yarn
```

to install dependencies. Run

```
yarn start
```

to spin up the development server, which will allow you to make changes and
preview them live.

To preview a production-ready static HTML export of the site, run `yarn export`.
The output in the `out/` directory corresponds to what you'd see in the live
site — you can preview it with [`serve`](https://github.com/vercel/serve) or any
other local static server tool of your choice.
