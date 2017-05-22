# Trigger Pull Repo
This little NodeJS app updates your local git repository when there is a change on the branch *master* of your remote repository. It uses a github webhook.

## Prerequisites
* OS: Ubuntu
* Already installed: [NodeJS](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions), [npm](https://docs.npmjs.com/getting-started/installing-node)
* Have an SSH access to Github: [Documentation](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)

## Installation
### Server Side
#### Install nodegit Dependencies
```bash
$ sudo add-apt-repository ppa:ubuntu-toolchain-r/test
$ sudo apt update
$ sudo apt install libstdc++-4.9-dev
$ sudo apt install libssl-dev
```
#### Install pm2
```bash
$ npm install pm2 -g
```

#### Install App
```bash
$ git clone https://github.com/petersg83/trigger_pull_repo
$ cd trigger_pull_repo
$ cp config.js.dist config.js
$ npm install
```
Edit `config.js` with your information.
Example:
```javascript
module.exports = {
  repositoryPath: '/home/myname/myrepository',
  urlToListen: '/updateRepository',
  portToListen: 8000
}
```

#### Launch App
```bash
$ pm2 start track_blog_modification.js
```

### Github Side
Go to your Github repository page: **Settings > Webhooks > Add webhook**.
* **Payload URL**: put your payload URL according to your `config.js`.
For example: `http://mywebsite.com:8000/updateRepository`
* **Content type**: choose `application/json`
* **Secret**: let empty
* **Which events would you like to trigger this webhook?**: choose `Just the push event.`
* **Active**: check it

You're done :blush:

## Bonus

If you need to restart your application after updating your local repository, it can be done automatically by using `pm2` and the option `--watch`.
For example to launch an [Hexo](https://hexo.io/) blog, I use this  script (hexo.sh):
```bash
# !/usr/bin/env bash
hexo server -p 8081 -i 127.0.0.1
```
and this command line to launch it:
```bash
$ pm2 start hexo.sh --watch --ignore-watch="db.json node_modules"
```
