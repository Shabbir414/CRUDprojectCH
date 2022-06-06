import React, { useContext } from "react";
import Notes from "./Notes";

const Home = () => {
  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword" className="form-label">
              password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            ></input>
          </div>
        </form>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword" className="form-label">
              password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            ></input>
          </div>
        </form>
      </div>
      <Notes />
    </div>
  );
};

export default Home;
