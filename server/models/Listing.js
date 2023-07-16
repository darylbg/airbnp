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
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  price: {
    type: Number,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: false
  },
  notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Notification',
        default: null
      }
  ],
  ratings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Rating',
      default: null
    }
  ]
});

const Listing = model("Listing", listingSchema);

module.exports = Listing;
