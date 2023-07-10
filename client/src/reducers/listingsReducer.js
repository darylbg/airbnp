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
        userId: ''
    },
    reducers: {
        create_listing(state, action) {
            return {
                ...state,
                address: action.payload.address,
                description:  action.payload.description,
                image:  action.payload.image,
                lat:  action.payload.lat,
                lng:  action.payload.lng,
                price:  action.payload.price,
                title:  action.payload.title,
                userId:  action.payload.userId,
            }
        }
    }
});

export const { create_listing } = listingReducer.actions;
export default listingReducer.reducer;