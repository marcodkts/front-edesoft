import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IUser } from "../models/user";
import { RootState, useAppDispatch } from "../store";
import { addUser, updateUser } from "../features/User/userApi";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

type UserDataProps = {
  userData?: IUser;
};

export const UserForm: React.FC<UserDataProps> = ( {userData} ) => {
  const isSaving = useSelector((state: RootState) => state.user.save.isSaving);
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<IUser>(userData || {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes("name.")) {
      setUser({
        ...user,
        name: {
          ...user.name,
          [name.split(".")[1]]: value,
        },
      });
    } else if (name.includes("address.")) {
      if (name.includes("geolocation")) {
        setUser({
          ...user,
          address: {
            ...user.address,
            geolocation: {
              ...user.address.geolocation,
              [name.split(".")[2]]: value,
            },
          },
        });
      } else {
        setUser({
          ...user,
          address: {
            ...user.address,
            [name.split(".")[1]]: value,
          },
        });
      }
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
  };

  const action = user.id === 0 ? addUser(user) : updateUser(user);

  const handleSave = () => {
    if (user.email && user.username && user.password) {
      dispatch(action)
        .unwrap()
        .then((response) => {
          if (response && user.id === 0) {
            handleClear();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setShowValidation(true);
    }
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
      {isSaving ? (
        <div className="has-text-centered">Saving...</div>
      ) : (
        <div className="userForm">
          <div className="formSection">
            <div className="formRow">
              <TextField
                label="Email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                error={showValidation && !user.email}
                helperText={
                  showValidation && !user.email && "Email is required"
                }
              />
              <TextField
                label="Username"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                error={showValidation && !user.username}
                helperText={
                  showValidation && !user.username && "Username is required"
                }
              />
              <TextField
                label="Password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                error={showValidation && !user.password}
                helperText={
                  showValidation && !user.password && "Password is required"
                }
              />
              <TextField
                label="First Name"
                name="name.firstname"
                value={user.name.firstname}
                onChange={handleInputChange}
              />
              <TextField
                label="Last Name"
                name="name.lastname"
                value={user.name.lastname}
                onChange={handleInputChange}
              />
              <TextField
                label="Street"
                name="address.street"
                value={user.address.street}
                onChange={handleInputChange}
              />
              <TextField
                label="City"
                name="address.city"
                value={user.address.city}
                onChange={handleInputChange}
              />
              <TextField
                label="Number"
                name="address.number"
                value={user.address.number}
                onChange={handleInputChange}
              />
              <TextField
                label="Zipcode"
                name="address.zipcode"
                value={user.address.zipcode}
                onChange={handleInputChange}
              />
              <TextField
                label="Latitude"
                name="address.geolocation.lat"
                value={user.address.geolocation.lat}
                onChange={handleInputChange}
              />
              <TextField
                label="Longitude"
                name="address.geolocation.long"
                value={user.address.geolocation.long}
                onChange={handleInputChange}
              />
              <TextField
                label="Phone"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="formActions">
              <Button onClick={handleSave} variant="contained">
                Save
              </Button>
              <Button onClick={handleClear} variant="contained">
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
