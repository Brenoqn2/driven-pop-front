import styled from "styled-components";
import { useState, useEffect } from "react";

import CheckoutItem from "./CheckoutItem";

export default function CheckoutConfirm(props) {
  const { continuePurchase, visibility, products } = props;
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let sum = 0;
    if (products !== undefined) {
      products.forEach((product) => {
        const newPrice = product.price.replace("R$", "").split(",");

        sum += Number(newPrice[0] * Number(product.quantity));
      });
      setTotalPrice(Number(sum).toFixed(2));
    }
  }, [products]);

  return (
    <Background visibility={visibility}>
      <main>
        {products ? (
          <div className="products">
            <h4>Products</h4>
            {products.map((p) => (
              <CheckoutItem
                image={p.imageName}
                title={p.title}
                price={p.price}
                quantity={p.quantity}
                key={p._id}
              />
            ))}
          </div>
        ) : (
          <span>There is no products!</span>
        )}

        <span className="amount">Total: R${totalPrice}</span>
        <button onClick={() => continuePurchase("userInfos")}>Continue</button>
      </main>
    </Background>
  );
}
const Background = styled.div`
  display: ${(props) => props.visibility};
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  height: calc(100% - 210px);
  h2 {
    font-family: "Montserrat", sans-serif;
    font-size: 48px;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    position: relative;
    .products {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 30px;
      max-height: 500px;
      overflow-x: scroll;
      h4 {
        font-size: 44px;
        font-family: "Montserrat", sans-serif;
      }
    }
    .amount {
      font-size: 30px;
      font-family: "Montserrat", sans-serif;
      margin-top: 30px;
      font-weight: bold;
    }
    button {
      width: 300px;
      height: 50px;
      background-color: rgb(2, 152, 179);
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      border-radius: 30px;
      font-weight: bold;
      color: white;
    }
  }
`;
