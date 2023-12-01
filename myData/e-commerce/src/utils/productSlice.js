
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 
export const fetchProduct = createAsyncThunk('fetchProduct', async () => {
  
  try {
    
    // const response = await fetch(`https://fakestoreapi.com/products`);
    // const data = await response.json();
    //  return data;
    const response = await axios(`https://fakestoreapi.com/products`);
    const data = await response.data;
     return data;


  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
 
});


export const postData = createAsyncThunk('postData', async (data) => {
  
  const postData = {
    method: 'POST',
    body: JSON.stringify(data),
  };
  
  const response = await fetch('https://fakestoreapi.com/products', postData);
  return response.json();


});

export const getData = createAsyncThunk('getData', async (id) => { 
  
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  return response.json();
});


const productSlice = createSlice({
  name: "pro",
  initialState: {
    isLoading: false,
    products: [],
    isError: false,
    Filter: "",
    data:{ 
    title: "",
    price: "",
    description: "",
    category: "",    
    }
  }, reducers: {
    setFilter: (state, action) => {

      state.Filter = action.payload;

    },
    
     update: (state, action) => { 
       

},

    add: (state, action) => {
      const newData = {
        ...action.payload
      }
      state.products.push(newData);

    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      // console.log("Error", action.payload);
      state.isError = true;
    });


    builder.addCase(postData.pending, (state) => {
      state.status = 'loading';
    });
      builder.addCase(postData.fulfilled, (state, action) => {
        // console.log("succdess");
        state.isLoading = false; 
        const newData = {
          ...action.payload
        }
        state.products.push(newData);

      });


      builder.addCase(getData.pending, (state) => {
        state.status = 'loading';
      });
        builder.addCase(getData.fulfilled, (state, action) => {
          
          state.isLoading = false; 
          state.data = action.payload;
  
        });

  },
});


export const { setFilter, add,getProduct ,update } = productSlice.actions


export default productSlice.reducer;











 