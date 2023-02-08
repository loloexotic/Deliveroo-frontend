import logo from "./assets/img/logo-teal.svg";
import "./App.css";
import axios from "axios";

import { useEffect, useState } from "react";
import Category from "./components/Category";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const addToCart = (meal) => {
    setCart([...cart], meal);
  };

  const total = () => {
    let results = 0;
    for (let i = 0; i < cart.length; i++) {
      results += cart[i].price;
    }
  };
  setCartTotal(results);
}

const removeFromCart = (meal) => {
  const copyCart = [...cart];
  copyCart = copyCart.filter((cartItem) => cartItem.id !== meal.id);
  setCart(copyCart);
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://site--deliveroo-backend--t8zrd6vsdwcg.code.run/"
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  fetchData();
}, []);

return isLoading ? (
  <span>En cours de chargement...</span>
) : (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <main>
      <section className="Intro">
        <div>
          <h2>{data.restaurant.name}</h2>

          <p>{data.restaurant.description}</p>
        </div>
        <img src={data.restaurant.picture} alt="" />
      </section>
      <section className="Menu">
        {data.categories.map((elem, index) => {
          if (elem.meals.length !== 0) return <Category elem={elem} />;
        })}
      </section>

      <div className="Cart">
        {cart.length === 0 ? (
          <p>Votre panier est vide</p>
        ) : (
          <div>
            <h2>Panier</h2>
            {cart.map((meal) => {
              return (
                <div key={meal.id}>
                  <button
                    onClick={() => {
                      removeFromCart(meal);
                    }}
                  >
                    {" "}
                    -{" "}
                  </button>
                  <span>{meal.quantity}</span>
                  <button
                    onClick={() => {
                      addToCart(meal);
                    }}
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <button
          type="submit"
          value="addmeal"
          onClick={() => {
            total(meal);
          }}
        >
          Validez votre panier
        </button>
      </div>
    </main>
  </div>
);
        };

export default App;
