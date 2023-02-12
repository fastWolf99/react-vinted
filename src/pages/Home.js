import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ title, pricesRange }) => {
  const [offers, setOffers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let filters = `?priceMin=${pricesRange[0]}&priceMax=${pricesRange[1]}`;

      if (title) {
        filters = `?title=${title}`;
      }

      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers" + filters
        );

        if (response.data) {
          setOffers(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [title, pricesRange]);

  return isLoading === true ? (
    <p>Chargement...</p>
  ) : (
    <div className="offers-list">
      {offers.offers.map((offer, index) => {
        return (
          <Link
            to={`/offer/${offer._id}`}
            state={{ offer: offer }}
            key={offer._id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="offer">
              <div>
                {offer.owner.account.avatar && (
                  <img
                    src={offer.owner.account.avatar.secure_url}
                    alt="propriétaire de la fringue"
                  />
                )}

                <p>{offer.owner.account.username}</p>
              </div>
              <img
                src={offer.product_image.secure_url}
                alt="aperçu de la fringue"
              />
              <p>{offer.product_price} €</p>
              {offer.product_details.map((element, index) => {
                return element.TAILLE && <p key={index}>{element.TAILLE}</p>;
              })}
              {offer.product_details.map((element, index) => {
                return element.MARQUE && <p key={index}>{element.MARQUE}</p>;
              })}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
