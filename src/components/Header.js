import { Link } from "react-router-dom";
import { Range } from "react-range";

const Header = ({
  token,
  handleToken,
  setTitle,
  pricesRange,
  setPricesRange,
}) => {
  return (
    <header>
      <Link to="/">
        <h1>Vinted</h1>
      </Link>
      <input
        type="text"
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <Range
        step={1}
        min={0}
        max={1000}
        values={pricesRange}
        onChange={(values) => {
          return setPricesRange(values);
        }}
        renderTrack={({ props, children }) => {
          return (
            <div
              {...props}
              style={{
                ...props.style,
                height: "4px",
                width: "200px",
                backgroundColor: "#00b4d8",
              }}
            >
              {children}
            </div>
          );
        }}
        renderThumb={({ props }) => {
          return (
            <div
              {...props}
              style={{
                ...props.style,
                height: "12px",
                width: "12px",
                borderRadius: "50%",
                backgroundColor: "#00b4d8",
                display: "flex",
                justifyContent: "center",
                outline: "none",
              }}
            >
              <p className="price-thumb">{pricesRange[props.key] + " €"}</p>
            </div>
          );
        }}
      />

      <div>
        {token ? (
          <button
            onClick={() => {
              handleToken(null);
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <>
            <Link to="/signup">
              <button>S'inscrire</button>
            </Link>

            <Link to="/login">
              <button>Se connecter</button>
            </Link>
          </>
        )}

        <Link to="/publish">Vends tes articles</Link>
      </div>
    </header>
  );
};

export default Header;
