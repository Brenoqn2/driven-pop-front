import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../publicComponents/Header";
import Footer from "../publicComponents/Footer";
import { UserContext } from "../../contexts/UserContext";

export default function ProductPage() {
  const [product, setProduct] = useState([]);
  const { productHandle } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { token } = useContext(UserContext);

  useEffect(() => {
    const URL = `http://localhost:5000/products/${productHandle}`;
    const promise = axios.get(URL);
    promise.then((response) => {
      setProduct(response.data);
    });
    promise.catch((error) => console.log(error));
  }, [productHandle, setProduct]);

  async function updateCart() {
    const URL = "http://localhost:5000/cart";
    const config = { headers: { authorization: `Bearer ${token}` } };
    const newData = { ...product[0], quantity: quantity };
    try {
      let cart = await axios.get(URL, config);
      cart = cart.data;
      if (!cart) cart = [];
      let index;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].handle === product[0].handle) {
          index = i;

          break;
        }
      }
      if (index !== undefined) {
        cart[index].quantity += quantity;
        await axios.put(URL, { products: cart }, config);
      } else {
        cart.push(newData);
        await axios.put(URL, { products: cart }, config);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Header />
      <ProductPageMain>
        {product.length > 0 ? (
          <>
            <img
              src={product[0].imageName.replace("www", "images")}
              alt={product[0].title}
            />
            <div className="division"></div>
            <ProductInfo>
              <h1>{product[0].title}</h1>
              <p>{product[0].price}</p>
              <div>
                <QuantityButton>
                  <ion-icon
                    name="remove-outline"
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                      }
                    }}
                  ></ion-icon>
                  <p>{quantity}</p>
                  <ion-icon
                    name="add-outline"
                    onClick={() => {
                      setQuantity(quantity + 1);
                    }}
                  ></ion-icon>
                </QuantityButton>
                <BuyButton onClick={() => updateCart()}>Comprar</BuyButton>
              </div>
            </ProductInfo>
          </>
        ) : (
          <span>NOT FOUND</span>
        )}
      </ProductPageMain>
      <Footer />
    </>
  );
}

const ProductPageMain = styled.main`
  display: flex;
  flex-direction: column;
  background-color: aliceblue;
  min-height: calc(100vh - 200px);
  span {
    margin-top: 50vh;
    font-size: 30px;
    font-family: "Montserrat", sans-serif;
  }
  img {
    margin: 0 auto;
    margin-top: 10px;
    width: 50vw;
    max-width: 500px;
  }
  .division {
    height: 1px;
    width: 95vw;
    margin: 0 auto;
    background-color: #b6b6b6;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const ProductInfo = styled.div`
  width: 90vw;
  margin: 0 auto;
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 28px;
    font-weight: bold;
  }
  p {
    font-size: 28px;
    color: rgb(2, 152, 179);
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  > div {
    display: flex;
    margin-bottom: 20px;
  }
`;

const QuantityButton = styled.div`
  width: 130px;
  height: 50px;
  border: black 1px solid;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 10px;
  ion-icon {
    font-size: 30px;
  }
  p {
    color: black;
    font-size: 16px;
  }
`;

const BuyButton = styled.div`
  width: 200px;
  height: 50px;
  background-color: rgb(2, 152, 179);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 30px;
  margin-left: 20px;
  font-weight: bold;
  color: white;
`;
