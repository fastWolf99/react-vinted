import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const CheckoutForm = ({ offerDetails, price }) => {
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const elements = useElements();
  const stripe = useStripe();
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const clientId = Cookies.get("client-id");
        const cardElement = elements.getElement(CardElement);
        // création du token stripe pour identifier la transaction :
        const stripeResponse = await stripe.createToken(cardElement, {
          name: clientId,
        });
        // stockage du token (transaction) dans la variable `stripeToken` :
        const stripeToken = stripeResponse.token.id;
        // envoie de la requete de paiement au back :

        try {
          const purchase = await axios.post(
            "https://lereacteur-vinted-api.herokuapp.com/payment",
            {
              token: stripeToken,
              // le token que vous avez reçu de l'API Stripe
              title: offerDetails.product_name,
              amount: price,
              // le prix indiquée dans l'annonce
            }
          );

          // if the response has the status `succeeded`, then I switch my state `isPaymentDone`:
          if (purchase.data.status === "succeeded") {
            setIsPaymentDone(true);
            // allons tenter de supprimer l'offre de la base de données via la route /delete du back :

            const deleteResponse = await axios.delete(
              `https://lereacteur-vinted-api.herokuapp.com/offer/delete/${offerDetails._id}`,
              {
                headers: {
                  authorization: "Bearer " + Cookies.get("token"),
                },
              }
            );
            console.log("ca donne ya pas à dire => ", deleteResponse.data);
          }
        } catch (error) {
          console.log(error.response);
        }
      }}
    >
      <CardElement />
      {isPaymentDone ? (
        <p>Le paiement a été accepté !</p>
      ) : (
        <button>PAY</button>
      )}
    </form>
  );
};

export default CheckoutForm;
