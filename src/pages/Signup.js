import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email,
          username,
          password,
          newsletter,
        }
      );

      handleToken(data.token);
      Cookies.set("client-id", data._id);
      navigate("/");
    } catch (error) {
      console.log("catch Signup==>>>", error);
    }
  };

  return (
    <div>
      <h1>S'inscrire</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          placeholder="Username"
        />

        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="Email"
        />

        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="password"
        />

        <div>
          <input
            type="checkbox"
            name="newsletter"
            id="newsletter"
            value={newsletter}
            onChange={() => {
              setNewsletter(!newsletter);
            }}
          />
          <label htmlFor="newsletter">S'inscrire à notre newsletter</label>
        </div>

        <button>S'inscrire</button>
      </form>
    </div>
  );
};

export default Signup;
