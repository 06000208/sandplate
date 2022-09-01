# Sandplate (Initial Development)

Sandplate is an opinionated discord.js bot template/sandbox, intended to be used as a base to expand upon or quickly iterate/try out ideas.

It's purpose is to cover all the basics of a discord bot's internals, such as, but not limited to:

- Framework for commands and event modules (also known as a command handler)
- Reloadable message command and event modules
- Command access control
- Blocking users or guilds from interacting with the bot
- Supporting any number of command prefixes alongside @mention support
- A full set of default commands and event listeners written in the framework

This way, you don't need to write these things in full yourself, they're available to expand upon and use whatever your purpose, and you can merge fixes/improvements from this repository as they occur.

However, the idea is *not* to skip learning how to code what sandplate does for you. Rather, to make use of sandplate properly, you'll need to know how things are implemented and familiarize yourself with the internals.

⚠️ Sandplate is currently in initial development, during which anything may change at any time.

## Contributing & Contact

- Bug reports, issues, and suggestions are welcome via our [issue tracker](https://github.com/06000208/sandplate/issues), and the preferred method for real time communication is [this discord server](https://discord.gg/WppqegJdTw).
  <a href="https://discord.gg/WppqegJdTw"><img src="https://discordapp.com/api/guilds/273550655673860106/embed.png" alt="Discord Server" /></a>

- Questions may be directed [here](https://github.com/06000208/sandplate/discussions/categories/q-a) in our discussions forum or to the discord server

- If you've made something using sandplate, feel free to share it on our [discussions forum](https://github.com/06000208/sandplate/discussions/categories/project-showcase)!

- Pull requests/code contributions are accepted & encouraged, more details in may be found in our [contributing file](./github/CONTRIBUTING.md). 👍

This project is released with a [Contributor Code of Conduct](./github/CODE_OF_CONDUCT.md). By participating in its development, you're expected to abide by its terms. Please report unacceptable behavior to [a06000208@protonmail.com](mailto:a06000208@protonmail.com)

## Installation

- Install [node.js](https://nodejs.org), [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [pnpm](https://pnpm.io/installation), and [git](https://git-scm.com/downloads)
- Navigate to your repository of choice and clone sandplate via `git clone https://github.com/06000208/sandplate.git`
- Optional: If you want to use sandplate as an upstream...
  - In your cloned directory, use `git remote -v` to check if the `origin` remote is sandplate's repository. If it is, use `git remote rm origin` to remove it.
  - Use `git remote add upstream https://github.com/06000208/sandplate.git` to add sandplate's repository as a new remote named upstream
  - If you want, you can overwrite the push url for the upstream remote via `git remote set-url --push upstream no_push_for_upstream` to prevent accidental attempted pushes
  - Use `git fetch upstream` to fetch upstream branch info
- Optional: If you want your project on github...
  - Create a github repository and don't initialize it with any files (readme, gitignore, etc.)
  - In your cloned directory, use `git remote -v` to check if the `origin` remote is sandplate's repository. If it is, use `git remote rm origin` to remove it.
  - Use `git remote add origin <url>`, with `<url>` being the git link for the repository you created
  - Use `git branch -M main` and `git push -u origin main` to push your local repository to the one you created
- Run `npm install` or `pnpm install` in the root to install dependencies
- I strongly recommend repurposing the the package.json and README.md files to be about your project, and deleting or doing the same with the files in the `/.github/` folder and CHANGELOG.md
- Use `node index.js` or `npm start` to run your project

## License

This project is licensed under the [unlicense](https://unlicense.org)
