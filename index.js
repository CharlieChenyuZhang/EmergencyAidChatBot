'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})



  app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
      let event = req.body.entry[0].messaging[i]
      let sender = event.sender.id
      if (event.message && event.message.text) {
        let text = event.message.text
        if (text === 'bleeding') {
            BleedingMessage(sender)
            continue
        }else if (text === 'bee sting'){
            BeeStingMessage(sender)
            continue
        }
        sendTextMessage(sender, "Text received, please type in 'bleeding' or 'bee sting' to test on this version of prototype. :)")
      }
      if (event.postback) {
        let text = JSON.stringify(event.postback)
        sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
        continue
      }
    }
    res.sendStatus(200)
  })

const token = "EAAZAhArT0keoBADeQlzZBgAoijnZAiTWQXeTW9SZBP9LbYDTBKhxPwPIVUrpeG1gqx6tJfUBUnGPP45Al4WmDDAJWsjDF2pnb6JxyfrdjL4LGrqCTZBusODkFCM6gDrN4ZBH62H7fxsDyWUnd4FjfVJhZC1tEynXSSmFRZAxNKCEvQZDZD"


function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function BleedingMessage(sender) {
    let messageData = {






        "attachment": {

            "type": "template",
            "payload": {
                "template_type": "generic",

                "elements": [{
                    "title": "First Step",
                    "subtitle": "Apply pressure to the wound to stop the bleeding.",
                    "image_url": "http://pad1.whstatic.com/images/thumb/e/e3/Treat-a-Wound-Step-1-Version-2.jpg/aid89621-900px-Treat-a-Wound-Step-1-Version-2.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "CALL 911"
                    }],
                }, {
                    "title": "Second Step",
                    "subtitle": "Clean the wound. Rinse it with clean water.",
                    "image_url": "http://pad1.whstatic.com/images/thumb/a/a3/Treat-a-Wound-Step-2-Version-2.jpg/aid89621-900px-Treat-a-Wound-Step-2-Version-2.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "CALL 911",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }, {
                    "title": "Third Step",
                    "subtitle": "Prevent infection with a topical antibiotic.",
                    "image_url": "http://pad3.whstatic.com/images/thumb/3/3b/Treat-a-Wound-Step-3-Version-2.jpg/aid89621-900px-Treat-a-Wound-Step-3-Version-2.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "CALL 911",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }, {
                    "title": "Fourth Step",
                    "subtitle": "Cover the wound with a bandage.",
                    "image_url": "http://pad1.whstatic.com/images/thumb/9/95/Treat-a-Wound-Step-4-Version-2.jpg/aid89621-900px-Treat-a-Wound-Step-4-Version-2.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "CALL 911",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }, {
                    "title": "Last Step",
                    "subtitle": "Monitor the wound to make sure it does not get infected.",
                    "image_url": "http://pad1.whstatic.com/images/thumb/0/07/Treat-a-Wound-Step-5-Version-2.jpg/aid89621-900px-Treat-a-Wound-Step-5-Version-2.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "CALL 911",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }]


            }


        }


    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function BeeStingMessage(sender) {
    let messageData = {






        "attachment": {

            "type": "template",
            "payload": {
                "template_type": "generic",

                "elements": [{
                    "title": "First Step",
                    "subtitle": "(if it is a wasp then you can't) remove the stinger as soon as possible.",
                    "image_url": "http://pad1.whstatic.com/images/thumb/2/25/Treat-a-Bee-Sting-Step-1-Version-2.jpg/aid55698-900px-Treat-a-Bee-Sting-Step-1-Version-2.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "CALL 911"
                    }],
                }, {
                    "title": "Second Step",
                    "subtitle": "Look for symptoms of an allergic reaction.",
                    "image_url": "http://pad2.whstatic.com/images/thumb/f/f6/Treat-a-Bee-Sting-Step-2.jpg/aid55698-900px-Treat-a-Bee-Sting-Step-2.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "CALL 911",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }, {
                    "title": "Third Step",
                    "subtitle": "Take ibuprofen or acetaminophen for pain relief if no symptoms of allergic reactions are present.",
                    "image_url": "http://pad2.whstatic.com/images/thumb/2/22/Treat-a-Bee-Sting-Step-3.jpg/aid55698-900px-Treat-a-Bee-Sting-Step-3.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "CALL 911",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }, {
                    "title": "Fourth Step",
                    "subtitle": "Apply dampened baking soda to bee sting area, and relief is sure to come.",
                    "image_url": "http://pad3.whstatic.com/images/thumb/6/64/Treat-a-Bee-Sting-Step-4-Version-2.jpg/aid55698-900px-Treat-a-Bee-Sting-Step-4-Version-2.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "CALL 911",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }, {
                    "title": "Last Step",
                    "subtitle": "Apply one of the following remedies...",
                    "image_url": "http://pad2.whstatic.com/images/thumb/1/18/Treat-a-Bee-Sting-Step-5.jpg/aid55698-900px-Treat-a-Bee-Sting-Step-5.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "CALL 911",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }]


            }


        }


    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}
