import styled from "styled-components";
import axios from "axios";
import { useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import CartItem from "./CartItem";

export default function Cart() {
  const { token, cart, setCart } = useContext(UserContext);

  useEffect(() => {
    const URL = "http://localhost:5000/cart";
    const config = { headers: { authorization: `Bearer ${token}` } };
    const promise = axios.get(URL, config);
    promise.then((response) => {
      setCart(response.data);
    });
    promise.catch((error) => {
      console.error(error);
    });
  }, [token, setCart]);

  let total = 0;
  cart.forEach((item) => {
    let price = item.price;
    price = price.replace("R$", "");
    price = Number(price.replace(",", "."));
    price = price * item.quantity;
    total += price;
  });
  return (
    <CartPage>
      <Header>Shopping Cart</Header>
      <ItemsContainer>
        {cart.map((item) => {
          return <CartItem item={item} key={item._id} />;
        })}
      </ItemsContainer>
      <Footer>
        <p className="total">Total:</p>
        <p className="value">R${total}</p>
        <BuyButton>Checkout</BuyButton>
      </Footer>
    </CartPage>
  );
}

const CartPage = styled.aside`
  height: 100vh;
  width: 100vw;
  background: aliceblue;
  position: fixed;
  z-index: 2;
  top: 0px;
  left: 0px;
`;

const Header = styled.div`
  height: 60px;
  background: rgb(2, 152, 179);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  color: white;
  font-size: 30px;
`;

const ItemsContainer = styled.div`
  height: calc(100vh - 200px);
  overflow-y: auto;
`;

const Footer = styled.div`
  width: 100%;
  height: 140px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  z-index: 3;
  border-top: 1px solid #b6b6b6;
  font-family: "Montserrat", sans-serif;

  .total {
    position: absolute;
    font-weight: bold;
    color: rgb(0, 85, 100);
    font-size: 28px;
    top: 10px;
    left: 10px;
  }

  .value {
    position: absolute;
    font-weight: bold;
    color: rgb(0, 85, 100);
    font-size: 28px;
    top: 10px;
    right: 10px;
  }
`;

const BuyButton = styled.div`
  width: 300px;
  height: 50px;
  background-color: rgb(2, 152, 179);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 30px;
  font-weight: bold;
  color: white;
  position: absolute;
  bottom: 25px;
  left: calc(50vw - 150px);
`;
