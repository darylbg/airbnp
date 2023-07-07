const { Schema, model, Types } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedToilets` array in User.js
const ratingSchema = new Schema({
    listingId: {
            type: Schema.Types.ObjectId,
            required: true
        },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    rating: {
        type: Number
    },
    comment: {
        type: String,
        max: 100
    }
});

const Rating = model("Rating", ratingSchema);

module.exports = Rating;
