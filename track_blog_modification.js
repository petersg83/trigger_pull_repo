var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var config = require('./config.js')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post(config.urlToListen, (req, res) => {
  var Git = require('nodegit')
  var repo

  console.log(req.body)

  if (req.body.ref === 'refs/heads/master') {
    Git.Repository.open(config.repositoryPath)
    .then((repository) => {
      repo = repository

      return repo.fetchAll({
        callbacks: {
          credentials: (url, username) => Git.Cred.sshKeyFromAgent(username),
          certificateCheck: () => 1
        }
      })
    })
    .then(() => repo.mergeBranches('master', 'origin/master'))
    .catch((e) => console.log(e))
  }

  res.end()
})

app.listen(config.portToListen)
