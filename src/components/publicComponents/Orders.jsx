import styled from "styled-components";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import Order from "./Order";

export default function Orders() {
  const { token } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const URL = "http://localhost:5000/checkout";
    const config = { headers: { authorization: `Bearer ${token}` } };
    const promise = axios.get(URL, config);
    promise.then((response) => {
      setOrders(response.data);
    });
    promise.catch((err) => {
      console.log(err);
    });
  }, [token]);
  return (
    <OrdersPage>
      <Header>Orders</Header>
      <ItemsContainer>
        {orders.map((order) => {
          return <Order key={order._id} order={order} />;
        })}
      </ItemsContainer>
    </OrdersPage>
  );
}

const OrdersPage = styled.aside`
  height: 100vh;
  width: 100vw;
  background: aliceblue;
  position: fixed;
  z-index: 2;
  top: -90px;
  left: 0px;
  margin-top: 90px;
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
  height: calc(100vh - 60px);
  overflow-y: auto;
`;
