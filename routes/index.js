/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const Message = require('./messages');

const getMessages = async () => {
    let list = [];
    try {
        // Find messages sorted by _id in descending order
        const messages = await Message.messageModel.find({}).sort({ '_id': -1 });
        
        // Process messages if they exist
        if (messages.length > 0) {
            messages.forEach((message) => {
                if (message.name && message.body) {
                    list.push({ 'name': message.name, 'body': message.body, 'timestamp': message._id.getTimestamp() });
                }
            });
        }
    } catch (err) {
        console.error('Error retrieving messages:', err);
    }
    return list;
};

const setMessage = async (name, message) => {
    try {
        // Create new message and save it
        await Message.create({ name: name, body: message });
    } catch (err) {
        if (err.name === 'ValidationError') {
            console.error('Validation error: ' + err);
        } else {
            console.error('Could not save message: ' + err);
        }
    }
};

module.exports = {
    getMessages,
    setMessage
};
