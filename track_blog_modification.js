var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var config = require('./config.js')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/blog_modified', (req, res) => {
  var Git = require('nodegit')
  var repo

  Git.Repository.open(config.repository)
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

  res.end()
})

app.listen(8000)
