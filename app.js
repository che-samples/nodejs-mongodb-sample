/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const express = require('express')
const path = require('path');
const app = express();
const bodyParser = require('body-parser')
const messages = require('./routes/messages')
const index = require('./routes/index')

const util = require('./utils')

// Connect to MongoDB, will retry only once
messages.connectToMongoDB()

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))

const router = express.Router()
app.use(router)

app.use(express.static('public'))
router.use(bodyParser.urlencoded({ extended: false }))

// Starts an http server on the 8080 port
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

// Handles GET request to /
router.get("/", async (req, res) => {
  // retrieve list of messages from the db, and use them to render the HTML template
  let savedMessages = await index.getMessages();
  console.log(`Read all mesages`)
  const result = util.formatMessages(savedMessages)
  res.render("home", { messages: result })
})

// Handles POST request to /post
router.post('/post', (req, res) => {
  console.log(`received request: ${req.method} ${req.url}`)

  // validate request
  const name = req.body.name
  const message = req.body.message
  if (!name || name.length == 0) {
    res.status(400).send("name is not specified")
    return
  }

  if (!message || message.length == 0) {
    res.status(400).send("message is not specified")
    return
  }

  // send the new message to the db and redirect to the homepage
  console.log(`posting to db: name: ${name} body: ${message}`)
  index.setMessage(name, message)
  res.redirect('/')
});
