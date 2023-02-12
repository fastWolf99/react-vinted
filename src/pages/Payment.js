import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = () => {
  // récupérer les infos transmises grâce au state du Link :
  const location = useLocation();
  const offerDetails = location.state.offerDetails;

  return (
    <div className="payment-page">
      <div className="payment-bloc">
        <h2>Résumé de la commande :</h2>
        <div>
          <p>Commande</p>
          <p>{offerDetails.product_price.toFixed(2)} €</p>
        </div>
        <div>
          <p>Frais de protection acheteur</p>
          <p>{(0.4).toFixed(2)} €</p>
        </div>
        <div>
          <p>Frais de port</p>
          <p>{(0.8).toFixed(2)} €</p>
        </div>
        <div className="total-line">
          <p>Total</p>
          <p>{(offerDetails.product_price + 1.2).toFixed(2)} €</p>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            offerDetails={offerDetails}
            price={(offerDetails.product_price + 1.2).toFixed(2)}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
