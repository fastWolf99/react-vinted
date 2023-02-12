import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
  const [offerDetails, setOfferDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  const { id } = params; // 63ceb13bc18578beb3db52d3

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );

      setOfferDetails(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>On arrive...</p>
  ) : (
    <main>
      <img
        className="offer-image"
        src={offerDetails.product_image.secure_url}
        alt=""
      />

      <div className="offer-details">
        <h2>{offerDetails.product_price} €</h2>
        <div>
          {offerDetails.product_details.map((element, index) => {
            return (
              <div className="details-line" key={index}>
                <p>{Object.keys(element)[0]}</p>
                <p>{element[Object.keys(element)[0]]}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Link to="/payment" state={{ offerDetails: offerDetails }}>
        Acheter
      </Link>
    </main>
  );
};

export default Offer;
