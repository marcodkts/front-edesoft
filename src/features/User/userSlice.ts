import { createSlice } from '@reduxjs/toolkit';
import { getUsers, addUser, updateUser, deleteUser } from './userApi'

const initialState = {
    list: {
        status: "",
        values: [] as any,
        isLoading: false
    },
    save: {
        isSaving: false,
        isDeleting: false
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearSuccessMessage: (state, payload) => {
        // TODO: Update state to clear success message
        },
    },
    extraReducers: {
        [getUsers.pending.type]: (state, action) => {
            state.list.status = "pending"
            state.list.isLoading = true
        },
        [getUsers.fulfilled.type]: (state, { payload }) => {
            state.list.status = "success"
            state.list.values = payload
            state.list.isLoading = false
        },
        [getUsers.rejected.type]: (state, action) => {
            state.list.status = "failed"
            state.list.isLoading = false
        },
        [addUser.pending.type]: (state, action) => {
            state.save.isSaving = true
        },
        [addUser.fulfilled.type]: (state, {meta, payload}) => {
            state.save.isSaving = false
            state.list.values.push({...meta.arg, ...payload })
        },
        [addUser.rejected.type]: (state, action) => {
            state.save.isSaving = false
        },
        [updateUser.pending.type]: (state, action) => {
            state.save.isSaving = true
        },
        [updateUser.fulfilled.type]: (state, action) => {
            state.save.isSaving = false
        },
        [updateUser.rejected.type]: (state, action) => {
            state.save.isSaving = false
        },
        [deleteUser.pending.type]: (state, action) => {
            state.save.isDeleting = true
        },
        [deleteUser.fulfilled.type]: (state, action) => {
            state.save.isDeleting = false
        },
        [deleteUser.rejected.type]: (state, action) => {
            state.save.isDeleting = false
        }
    }
});

export default userSlice.reducer;