const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedToilets` array in User.js
const toiletSchema = new Schema({
    name: [
    {
      type: String,
      required: true
    },
  ],
  lat : {
    type: Number,
    required: true,
  },
  lng : {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  // saved toilet id from Googletoilets API
  toiletId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = toiletSchema;