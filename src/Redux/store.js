import { configureStore } from "@reduxjs/toolkit";

import questionsSlice from "./questionsSlice";

const store = configureStore({reducer:{
    questionsSlice,
}})

export default store;