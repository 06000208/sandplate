# Sandplate (Initial Development)

Sandplate is an opinionated boilerplate/template [discord.js](https://discord.js.org) bot, and can be used as a base to expand upon.

It's purpose is to cover all the basics of a discord bot's internals, such as, but not limited to:

- Automatically generating the configuration file
- Logging in with either a persisted token (stored in the config) or non-persisted (command prompt argument)
- Framework for commands and event modules (also known as a command handler)
- Reloadable command and event modules
- Command access control
- Blocking users or guilds from interacting with the bot
- Supporting any number of command prefixes alongside @mention support
- Improved console logging (timestamps and labels)
- Batch script for running & automatically restarting the bot
- A full set of default commands written in the framework

This way, you don't need to write these things in full yourself, they're available to expand upon and use, whatever your purpose, and you can merge fixes/improvements from this repository into your project as they occur.

However, the idea is *not* to skip learning how to code what sandplate does for you. Rather, to make use of sandplate properly, you'll need to know how things are implemented and familiarize yourself with the internals.

Sandplate is currently in initial development, during which anything may change at any time, and releases are not being utilized.

## Installation
**NOTE: If you want sandplate to be usable through a systemd service and gain it's features, see: <a href="systemd-service-setup"> Setup systemd sandplate service</a> post-installation**

### Debian, Ubuntu & Arch Linux

**Default behaviour**
```bash
$ ./setup.sh
```
This will presume that you have Nodejs and npm installed, and ignores nvm. In turn, it will only install the npm packages for sandplate. 

**Installing Nodejs & npm through nvm if not installed already**

**DOES NOT install nvm for Arch Linux**
```bash
$ ./setup.sh --install
```


### <a href="systemd-service-setup"></a> Setup systemd sandplate service

**Be sure you're inside the root directory of the project and sandplate.service file is visible:**

![Imgur](http://i.imgur.com/Bx91m4C.gif)

```bash
sudo cp sandplate.service /etc/systemd/system
sudo systemctl daemon-reload
sudo systemctl enable sandplate
```
## Contributing

If you'd like to contribute to sandplate or get involved, read our [contributing](CONTRIBUTING.md) file! Reporting issues, bugs, and requesting features are also described there.

## Contact

While sandplate uses it's [issue section](https://github.com/06000208/sandplate/issues) for collaboration and project planning, for real time communication, the preferred method is [this discord server](https://discord.gg/xErQY6M).

<a href="https://discord.gg/xErQY6M"><img src="https://discordapp.com/api/guilds/273550655673860106/embed.png" alt="Discord Server" /></a>

Additionally, you can get in touch with the project lead directly by emailing [`a06000208@protonmail.com`](mailto:a06000208@protonmail.com) if necessary.

## Code Of Conduct

This project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating, you're expected to abide by its terms. Please report unacceptable behavior to [`a06000208@protonmail.com`](mailto:a06000208@protonmail.com).

