import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IUser } from "../models/user";
import { RootState, useAppDispatch } from "../store";
import {
  deleteUser,
} from "../features/User/userApi";
import { TextField, Button } from "@mui/material";

function DeleteUser() {
  const isDeleting = useSelector(
    (state: RootState) => state.user.save.isDeleting
  );

  const dispatch = useAppDispatch();

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

  const [showValidation, setShowValidation] = useState<boolean>(false);

  function DeleteForm() {
    const action = deleteUser(user.id);

    const handleDeleteUser = () => {
      setShowValidation(true);
      if (user.id) {
        dispatch(action).unwrap().then((response) => {
          if (response) {
            handleClear();
          }
        })
          .catch((error) => {
            console.log(error);
          }
          );
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
    };

    const handleClear = () => {
      setUser({
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
      setShowValidation(false);
    };

    return (
      <>
        {isDeleting ? (
          <div className="has-text-centered">Deleting...</div>
        ) : (
          <div className="deleteUser">
            <div className="userForm">
              <div className="formRow">
                <TextField
                  id="id"
                  name="id"
                  label="User Id"
                  variant="outlined"
                  value={user.id}
                  onChange={handleInputChange}
                  error={showValidation && !user.id}
                  helperText={showValidation && !user.id && "Id is required"}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDeleteUser}
                  disabled={isDeleting}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  return (
    <div className="App">
      <div className="addUser">
        <h1>Delete User</h1>
      </div>
      <div className="displayUsers">
        <DeleteForm />
      </div>
    </div>
  );
}

export default DeleteUser;
