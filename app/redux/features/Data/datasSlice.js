import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/app/firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
export const fetchData = createAsyncThunk("data/fetchData", async (name) => {
  try {
    const collectionRef = collection(db, "View");
    const data = [];
    await getDocs(collectionRef).then((res) => {
      res.docs.map((doc) => {
        return data.push(doc.data());
      });
    });
    return data;
  } catch (error) {
    return console.log(error.message);
  }
});
const initialState = {
  data: [],
  isLoading: false,
};
const datasSlice = createSlice({
  name: "data",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      console.log(action.payload);
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export default datasSlice.reducer;
