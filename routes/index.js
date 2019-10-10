/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const Message = require('./messages')

const getMessages = async () => {
    let list = []
    await Message.messageModel.find({}, null, { sort: { '_id': -1 } }, (err, messages) => {
        if (messages.length > 0) {
            messages.forEach((message) => {
                if (message.name && message.body) {
                    list.push({ 'name': message.name, 'body': message.body, 'timestamp': message._id.getTimestamp() })
                }
            });
        }
    });
    return list;
}

const setMessage = (name, message) => {
    try {
        Message.create(({name: name, body: message}))
    } catch (err) {
        if (err.name == "ValidationError") {
            console.error('validation error: ' + err)
        } else {
            console.error('could not save: ' + err)
        }
    }
}

module.exports = {
    getMessages,
    setMessage
};
