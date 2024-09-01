import React, { useState } from "react";
import axios from "axios";

function Registration() {
  const [formData, setFormDate] = useState({
    email: "",
    studentName: "",
    password: "",
  });

  function signup(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8000/signup", formData)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <form onSubmit={(e) => signup(e)}>
        <div>
          <label htmlFor="E-mail">E-Mail:</label>
          <input
            type="email"
            id="E-mail"
            name="E-mail"
            onChange={(e) =>
              setFormDate((f) => ({ ...f, email: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <label htmlFor="UserName">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) =>
              setFormDate((f) => ({ ...f, studentName: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) =>
              setFormDate((f) => ({ ...f, password: e.target.value }))
            }
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Registration;
