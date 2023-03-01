import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api"
import { IUser } from "../../models/user";

export const getUsers = createAsyncThunk("user/getUsers", async () => {
    try {
        const response = await api.get("/users")
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const addUser = createAsyncThunk("user/addUser", async (user: IUser) => {
    try {
        const response = await api.post("/users", user, {})
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const updateUser = createAsyncThunk("user/updateUser",
    async (user: IUser) => {
        try {
            const response = await api.patch(`/users/${user.id}`, user);
            return response.data
        } catch (error) {
            console.log(error)
        }
    }) 

export const deleteUser = createAsyncThunk("user/deleteUser", async (id: number) => {
    try {
        const response = await api.delete(`/users/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})