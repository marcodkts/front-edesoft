import React from "react";
import { UserForm } from "../components/UserForm";

function AddUser() {
  return (
    <div className="App">
      <div className="addUser">
        <h1>Add User</h1>
      </div>
      <div className="displayUsers">
        <UserForm />
      </div>
    </div>
  );
}

export default AddUser;
