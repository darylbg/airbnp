const { Schema, model, Types } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedlistings` array in User.js
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng : {
    type: Number,
    required: true,
  },
  address: {
    type: String
  },

  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  userId: {
    type: Types.ObjectId,
    ref: 'User'
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number
  },
  notifications: [
    {
      type: Types.ObjectId,
      ref: 'Notification'
    }
]

});

const Listing = model("Listing", listingSchema);

module.exports = Listing;
