const { Schema, model, Types } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Book.js
// const Listing = require('./Listing.js');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedToilets to be an array of data that adheres to the ToiletSchema
    listings: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Listing',
          default: []
        },
      ],
    image: {
      type: String,
      default: 'https://media.istockphoto.com/id/1316947194/vector/messenger-profile-icon-on-white-isolated-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=1iQ926GXQTJkopoZAdYXgU17NCDJIRUzx6bhzgLm9ps='
    }
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `toiletCount` with the number of saved toilets we have
userSchema.virtual('listingCount').get(function () {
  return this.listings.length;
});

const User = model('User', userSchema);

module.exports = User;
