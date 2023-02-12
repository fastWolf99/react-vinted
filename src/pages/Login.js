import { useState } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email,
          password,
        }
      );

      handleToken(data.token);
      Cookies.set("client-id", data._id);
     
      if (!location.state) {
        navigate("/");
      } else {
        console.log(location);
        navigate(location.state.from);
      }
    } catch (error) {
      if (error.response?.data.message === "User not found") {
        setErrorMessage("Utilisateurs non trouvé");
      } else {
        setErrorMessage("Une erreur est survenue, veuillez réesayer !");
      }

      console.log("catch login >>>", error.response);
    }
  };

  return (
    <div>
      <h1>Se connecter</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <button>Se connecter</button>

        {errorMessage && <p>{errorMessage}</p>}
      </form>

      <p>
        Pas encore de compte ? <Link to="/signup">Inscrivez-vous !</Link>
      </p>
    </div>
  );
};

export default Login;
