const { AuthenticationError } = require('apollo-server-express');
const { User, Listing, Notification, Rating } = require('../models');
const { signToken } = require('../utils/auth');
const { model } = require('mongoose');

const resolvers = {
    Query: {
     user: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
  
          return userData;
        }
        throw new AuthenticationError('Not logged in');
      },
      getAllListings: async (parent, args, context) => {
        const listingsData = await Listing.find({}).populate('ratings').populate('notifications');
        return listingsData;
      },
      getListingByUserId: async (parent, args, context) => {
        if (context.user) {
          const listingData = await Listing.find({ userId: context.user._id }).populate('ratings').populate('notifications');
          return listingData;
        }
        throw new AuthenticationError('You need to be logged in!');
      }
    },
    Mutation: {
      login: async (parent, { email, password }) => {
        console.log ("login",email,password)
        const user = await User.findOne({ email }).populate('listings');
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
        const token = signToken(user);
        return { token, user };
      },

      register: async (parent, { userData }) => {
        console.log ("register",userData);
        const user = await User.create(userData);
        const token = signToken(user);
  
        return { token, user };
      },

      updateUserDetails: async (parent, { firstName, lastName, username, image }, context) => {
        if (context.user) {
          try {
            const user = await User.findOneAndUpdate(
              {_id: context.user._id},
              { $set: { firstName, lastName, username, image }},
              { new: true });
              return user;
          } catch (error) {
            console.log(error);
          }
          }
          throw new AuthenticationError('You need to be logged in!');
        },

      createListing: async (parent, { listingData }, context) => {
        if (context.user) {
          const newListing = await Listing.create({
            ...listingData,
            userId: context.user._id,
            title: listingData.title,
            lat: listingData.lat,
            lng: listingData.lng,
            address: listingData.address,
            description: listingData.description,
            image: listingData.image,
            price: listingData.price,
            rating: listingData.rating 
          });
          return newListing;
        }
        throw new AuthenticationError('You need to be logged in!');
      },

      updateListing: async (parent, { listingId, listingData }) => {
        if (context.user) {
          const updatedListing = Listing.findByIdAndUpdate(
            listingId, {
              ...listingData,
              // userId: context.user._id,
              title: title,
              lat: lat,
              lng: lng,
              address: address,
              description: description,
              image: image,
              price: price,
              rating: rating
          },
          {
            new: true,
          });
          return updatedListing;
        }
        throw new AuthenticationError('You need to be logged in!');
      },

      removeListing: async (parent, { listingId }, context) => {
        if (context.user) {
          const removedListing = await Listing.findOneAndDelete({ _id: listingId });
            if (removedListing) {
              await Notification.deleteMany({ listingId: listingId });
              await Rating.deleteMany({ listingId: listingId });
              const thisUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { listings: listingId } },
                { new: true }
              );
            }
          return thisUser;
        }
        throw new AuthenticationError('You need to be logged in!');
      },

      createNotification: async (parent, { listingId, arrivingBy }, context) => {
        if (context.user) {
          const newNotification = await Notification.create({
            listingId: listingId,
            arrivingBy: arrivingBy,
            userId: context.user._id,
          });
          await Listing.findOneAndUpdate(
            { _id: listingId },
            { $addToSet: { notifications: newNotification } },
            { new: true }
          );
          return newNotification;
        }
        throw new AuthenticationError('You need to be logged in!');
      },

      removeNotification: async (parent, { notificationId, listingId }, context) => {
        if (context.user) {
          const removedNotification = await Notification.findOneAndDelete({ _id: notificationId });
          await Listing.findOneAndUpdate(
            { _id: removedNotification.listingId },
            { $pull: { notifications: removedNotification } },
            { new: true }
          );
          return;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      createRating: async (parent, { listingId, rating, comment }, context) => {
        if (context.user) {
          const newRating = await Rating.create({
            listingId: listingId,
            rating: rating,
            userId: context.user._id,
            comment: comment,
          });
          const thisListing = await Listing.findOneAndUpdate(
            { _id: listingId },
            { $addToSet: { ratings: newRating } },
            { new: true }
          );
          return thisListing;
        }
        throw new AuthenticationError('You need to be logged in!');
      }
    },
  };
  
  module.exports = resolvers;