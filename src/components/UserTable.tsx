import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IUser } from "../models/user";
import { RootState, useAppDispatch } from "../store";
import { getUsers } from "../features/User/userApi";

export function UserTable() {
    const dispatch = useAppDispatch();
  
    const userList = useSelector((state: RootState) => state.user.list.values);
  
    const isLoadingTable = useSelector(
      (state: RootState) => state.user.list.isLoading
    );
    
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
      <>
        {isLoadingTable ? (
          <div className="has-text-centered">Fetching...</div>
        ) : (
          <table className="userTable">
            <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Street</th>
                <th>City</th>
                <th>Zipcode</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user: IUser) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.name.firstname || ""}</td>
                  <td>{user.name.lastname || ""}</td>
                  <td>{user.address.street || ""}</td>
                  <td>{user.address.city || ""}</td>
                  <td>{user.address.zipcode || ""}</td>
                  <td>{user.address.geolocation.lat || ""}</td>
                  <td>{user.address.geolocation.long || ""}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    );
  }