import { createSlice } from '@reduxjs/toolkit';
import { getUsers, addUser, updateUser, deleteUser } from './userApi'

export interface UserState {
    list: {
        status: string,
        values: any[],
        isLoading: boolean
    },
    save: {
        isSaving: boolean,
        isDeleting: boolean
    }
}

const initialState: UserState = {
    list: {
        status: "",
        values: [],
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
        createUser: (state, { payload }) => {
            state.list.values.push(payload)
        },
        updateUser: (state, { payload }) => {
            const index = state.list.values.findIndex((user: any) => user.id === payload.id)
            state.list.values[index] = payload
        },
        deleteUser: (state, { payload }) => {
            const index = state.list.values.findIndex((user: any) => user.id === payload.id)
            state.list.values.splice(index, 1)
        }
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
export const { createUser } = userSlice.actions;