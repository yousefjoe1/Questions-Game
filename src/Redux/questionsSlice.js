import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
    name:'questionSlice',
    initialState:{Questions:[],time:60,scores:[]},
    reducers:{
        setQuestions: (state,action)=> {
            state.Questions = action.payload;
        },
        startTime: (state,action)=> {
            if(state.time > 0){
                state.time = state.time - 1;
            }
        },
        decreasTen: (state,action) => {
            if(state.time > 0){
                state.time = state.time - 10;
            }else {
                state.time = 0;
            }
        },
        checkTime: (state,action)=> {
            if(state.time < 1){
                state.time = 0;
            }
        },
        resetTime: (state,action)=> {
            state.time = 0;
        },
        setTime: (state,action)=> {
            state.time = 60
        },
        updateScores: (state,action)=> {
            state.scores = action.payload
        }
    }
})

export const {setQuestions,startTime,decreasTen,checkTime,resetTime,setTime,updateScores} = questionSlice.actions;

export default questionSlice.reducer