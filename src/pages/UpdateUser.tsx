import React, { useState, useEffect } from "react";
import { UserForm } from "../components/UserForm";
import { IUser } from "../models/user";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { getUsers } from "../features/User/userApi";
import Button from "@mui/material/Button";

function UpdateUser() {
  const isSaving = useSelector((state: RootState) => state.user.save.isSaving);
  
  const [user, setUser] = useState<IUser>({
    id: 0,
    email: "",
    username: "",
    password: "",
    name: {
      firstname: "",
      lastname: "",
    },
    address: {
      street: "",
      city: "",
      number: "",
      zipcode: "",
      geolocation: {
        lat: "",
        long: "",
      },
    },
    phone: "",
  });
  const dispatch = useAppDispatch();
  
  const userList = useSelector((state: RootState) => state.user.list.values);
  
  useEffect(() => {
      dispatch(getUsers());
  }, [dispatch]);

  function UserSelector() {
    const handleChange = (event: SelectChangeEvent) => {
      const selectedId = Number(event.target.value)
      const selectedUser = userList.find((user: IUser) => user.id === selectedId);
      if (selectedUser) {
        setUser(selectedUser);
      }
    };

    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Username</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user.username}
            label="Username"
            onChange={handleChange}
          >
            {userList.map((user: IUser) => (
              <MenuItem key={user.id} value={user.id}>
                {user.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }

  return (
    <div className="App">
      <div className="addUser">
        <h1>Update User</h1>
      </div>
      {user.id === 0 ? (
        <div className="displayUsers">
          <h3>Select a user to update.</h3>
          <UserSelector />
        </div>
      ) : (
        <div className="displayUsers">
            <UserForm userData={user} />
            {!isSaving && (<Button onClick={() => setUser({...user, id: 0})} variant="contained" color="error">Cancel</Button>)}
        </div>
      )}
    </div>
  );
}

export default UpdateUser;
