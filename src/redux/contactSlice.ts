import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type dispatchObject from "../types/types";
import type { contactListsInitial } from "../types/types";

const initialState: contactListsInitial = {
    contactLists: []
};

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<dispatchObject>) => {
            state.contactLists.push(action.payload)
            localStorage.setItem("contactLists", JSON.stringify(state.contactLists));
            return;
        },
        getContacts: (state) => {
            if(localStorage.getItem("contactLists")) {
                const list = localStorage.getItem("contactLists")!;
                const lists = JSON.parse(list);
                state.contactLists = lists
            }
            return;
        }
    }
})

export const {addContact, getContacts} = contactSlice.actions;
export default contactSlice.reducer;