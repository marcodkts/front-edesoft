import React from "react";
import { UserTable } from "../components/UserTable";

function Home() {
  return (
    <div className="App">
      <div className="displayUsers">
        <h1>Users</h1>
        <UserTable />
      </div>
    </div>
  );
}

export default Home;
