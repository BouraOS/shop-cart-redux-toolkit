import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getCartItems = createAsyncThunk(
    'cart/getCartItems', async( name ,thunkAPI) => {
        let url = `https://course-api.com/${name}`
        try {
            const response = await axios.get(url)
            return response.data
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
    );


const cartSlice =  createSlice({
    name:'cart',
    initialState: {
        cartItems: [],
        amount: 3,
        total: 0, 
        isLoading: false,
    }, 
    reducers: {
        clearCart: (state, {payload}) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        },
        increase: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount + 1;
        },
        decrease: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount - 1;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total= 0;
            state.cartItems.forEach(item => {
                amount += item.amount
                total += item.amount * item.price
            })
            state.amount = amount
            state.total = total
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(getCartItems.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getCartItems.fulfilled, (state, action) => {
            state.cartItems = action.payload
            state.isLoading = false;
        })
        .addCase(getCartItems.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action);
        })
    }
})

export const {clearCart, removeItem, increase, decrease, calculateTotals} = cartSlice.actions

export default cartSlice.reducer 
