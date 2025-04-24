/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const mongoose = require('mongoose')

const mongoURI = process.env.MONGODB_URI || 'mongodb://user:password@localhost:27017/guestbook';
const db = mongoose.connection;

db.on('disconnected', () => {
    console.error(`Disconnected: unable to reconnect to ${mongoURI}`);
    throw new Error(`Disconnected: unable to reconnect to ${mongoURI}`);
});
db.on('error', (err) => {
    console.error(`Unable to connect to ${mongoURI}: ${err}`);
});

db.once('open', () => {
  console.log(`connected to ${mongoURI}`);
});

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            connectTimeoutMS: 2000
        });
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
};

const messageSchema = mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'] },
    body: { type: String, required: [true, 'Message Body is required'] },
    timestamps: {}
});

const messageModel = mongoose.model('Message', messageSchema);

const construct = (params) => {
    const name = params.name;
    const body = params.body;
    const message = new messageModel({ name: name, body: body });
    return message;
};

const save = async (message) => {
    try {
        console.log("saving message...");
        await message.save();  // Save asynchronously
    } catch (err) {
        console.error("Error saving message:", err);
        throw err;
    }
};

// Constructs and saves message
const create = async (params) => {
    try {
        const msg = construct(params);
        const validationError = msg.validateSync();
        if (validationError) { throw validationError; }
        await save(msg);  // Ensure save is awaited
    } catch (error) {
        console.error("Error in create method:", error);
        throw error;
    }
}

module.exports = {
    create: create,
    messageModel: messageModel,
    connectToMongoDB: connectToMongoDB
}
