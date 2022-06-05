import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Home = () => {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  return (
    <div>
      <h2>Add a Note</h2>
      <form>
        <div class="mb-3">
          <label for="exampleInputPassword" class="form-label">
            password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          ></input>
        </div>
      </form>
      <form>
        <div class="mb-3">
          <label for="exampleInputPassword" class="form-label">
            password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          ></input>
        </div>
      </form>
      <div className="container my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return note.title;
        })}
      </div>
    </div>
  );
};

export default Home;
