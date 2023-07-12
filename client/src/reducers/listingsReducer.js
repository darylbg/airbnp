import { createSlice } from "@reduxjs/toolkit";


export const listingReducer = createSlice({
    name: 'listing',
    initialState: {
        address: '',
        description: '',
        image: '',
        lat: '',
        lng: '',
        price: '',
        title: '',
        userId: '',
        notifications: [],
        ratings: []
    },
    reducers: {
        user_listings(state, action) {
            return {
                ...state,
                address: action.payload.listings.address,
                description:  action.payload.listings.description,
                image:  action.payload.listings.image,
                lat:  action.payload.listings.lat,
                lng:  action.payload.listings.lng,
                price:  action.payload.listings.price,
                title:  action.payload.listings.title,
                userId:  action.payload.listings.userId,
                notifications: action.payload.listings.notifications,
                ratings: action.payload.listings.ratings
            }
        }
    }
});

export const { user_listings } = listingReducer.actions;
export default listingReducer.reducer;