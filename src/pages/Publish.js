import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [picture, setPicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [preview, setPreview] = useState("");

  const token = Cookies.get("token");
  const navigate = useNavigate();

  return token ? (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData();
          formData.append("title", title);
          formData.append("description", description);
          formData.append("price", price);
          formData.append("condition", condition);
          formData.append("city", city);
          formData.append("brand", brand);
          formData.append("size", size);
          formData.append("color", color);
          formData.append("picture", picture);
          try {
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.data._id) {
              setErrorMessage("");
              alert("Votre offre a bien été postée !");
              navigate("/");
            } else {
              setErrorMessage("Une erreur est survenue !");
            }
          } catch (error) {
            setErrorMessage("Une erreur est survenue !");
          }
        }}
      >
        <input
          type="file"
          onChange={(event) => {
            setPicture(event.target.files[0]);
            setPreview(URL.createObjectURL(event.target.files[0]));
          }}
        />
        {preview && <img src={preview} alt="aperçu de l'upload" />}
        <label>Titre :</label>
        <input
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <label htmlFor="">Description :</label>
        <textarea
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        ></textarea>
        <label>Marque :</label>
        <input
          type="text"
          value={brand}
          onChange={(event) => {
            setBrand(event.target.value);
          }}
        />
        <label>Taille :</label>
        <input
          type="text"
          value={size}
          onChange={(event) => {
            setSize(event.target.value);
          }}
        />
        <label>Couleur :</label>
        <input
          type="text"
          value={color}
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />
        <label>État :</label>
        <input
          type="text"
          value={condition}
          onChange={(event) => {
            setCondition(event.target.value);
          }}
        />
        <label>Lieu :</label>
        <input
          type="text"
          value={city}
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />
        <label>Prix :</label>
        <input
          type="number"
          value={price}
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        {errorMessage && <p className="publish-error">{errorMessage}</p>}
        <button>Ajouter</button>
      </form>
    </div>
  ) : (
    <Navigate to="/login" state={{ from: "/publish" }} />
  );
};

export default Publish;
