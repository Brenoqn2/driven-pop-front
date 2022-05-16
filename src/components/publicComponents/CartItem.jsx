import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

export default function CartItem(props) {
  const { item } = props;
  const { title, quantity, price, imageName } = item;
  const [quantityItem, setQuantity] = useState(quantity);
  const { token, setCart, cart } = useContext(UserContext);
  const URL = "https://driven-pop.herokuapp.com/cart";
  const config = { headers: { authorization: `Bearer ${token}` } };

  let cost = price.replace("R$", "");
  cost = cost.replace(",", ".");
  cost = (Number(cost) * quantity).toFixed(2);

  useEffect(() => {}, [cart]);

  async function updateQuantity(qtt) {
    try {
      let newCart = [...cart];
      let index;

      for (let i = 0; i < newCart.length; i++) {
        if (newCart[i].title === title) index = i;
      }

      newCart[index].quantity = quantityItem + qtt;
      await axios.put(URL, { products: newCart }, config);

      const updatedCart = await axios.get(URL, config);
      setCart(updatedCart.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteItem() {
    try {
      let newCart = [...cart];
      let index;

      for (let i = 0; i < newCart.length; i++) {
        if (newCart[i].title === title) index = i;
      }

      newCart.splice(index, 1);
      await axios.put(URL, { products: newCart }, config);

      const updatedCart = await axios.get(URL, config);
      setCart(updatedCart.data);
    } catch (err) {
      window.alert("something went wrong, try again!");
    }
  }

  return (
    <Item>
      <img src={imageName.replace("www", "images")} alt={title} />
      <div>
        <p>{title}</p>
        <QuantityButton>
          <ion-icon
            name="remove-outline"
            onClick={() => {
              if (quantityItem > 1) {
                setQuantity(quantityItem - 1);
                updateQuantity(-1);
              }
            }}
          ></ion-icon>
          <p>{quantityItem}</p>
          <ion-icon
            name="add-outline"
            onClick={() => {
              setQuantity(quantityItem + 1);
              updateQuantity(1);
            }}
          ></ion-icon>
        </QuantityButton>
      </div>
      <ion-icon name="trash-outline" onClick={() => deleteItem()}></ion-icon>
      <p className="subtotal">{`R$${cost}`}</p>
    </Item>
  );
}

const Item = styled.div`
  box-sizing: border-box;
  height: 100px;
  margin-top: 15px;
  display: flex;
  position: relative;
  align-items: center;
  > ion-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
  }

  .subtotal {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  img {
    max-height: 90%;
    width: 60px;
    margin-left: 10px;
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 90%;
    margin-left: 30px;
    margin-right: 40px;
    p {
      font-size: 18px;
    }
  }
`;

const QuantityButton = styled.div`
  width: 100px;
  height: 35px;
  border: black 1px solid;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 10px;
  z-index: 3;
  ion-icon {
    font-size: 25px;
  }
  p {
    color: black;
    font-size: 16px;
    font-weight: bold;
  }
`;
