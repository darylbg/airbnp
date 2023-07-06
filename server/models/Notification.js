const { Schema, model, Types } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedToilets` array in User.js
const notificationSchema = new Schema({
    listingId: {
        type: Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date.now()
    }
});

const Notification = model("Notification", notificationSchema);

module.exports = Notification;
