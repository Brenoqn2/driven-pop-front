import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { IoCartOutline, IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Orders from "./Orders";
import Cart from "./Cart";

export default function Header() {
  const [showCart, setShowCart] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  return (
    <>
      <HeaderContainer>
        <h1 onClick={() => navigate("/")}>PopDriven</h1>
        <div className="navigators">
          {token ? (
            <>
              <IoPerson onClick={() => setShowOrders(true)} />
              <IoCartOutline onClick={() => setShowCart(true)} />
            </>
          ) : (
            <>
              <IoPerson onClick={() => navigate("/login")} />
            </>
          )}
        </div>
      </HeaderContainer>
      {showCart ? (
        <>
          <ExitCart>
            <ion-icon
              name="close-circle-outline"
              onClick={() => setShowCart(false)}
            ></ion-icon>
          </ExitCart>
          <Cart setShowCart={setShowCart} />
        </>
      ) : (
        <></>
      )}
      {showOrders ? (
        <>
          <ExitCart>
            <ion-icon
              name="close-circle-outline"
              onClick={() => setShowOrders(false)}
            ></ion-icon>
          </ExitCart>
          <Orders />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 90px;
  width: 100%;
  background-color: #eec0c6;
  background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);

  h1 {
    font-family: "Macondo", cursive;
    /* font-family: 'Lobster', cursive; */
    font-size: 38px;
    margin-left: 15px;
    color: black;
    text-shadow: 1px 0px 1px #cccccc, 0px 1px 1px #eeeeee, 2px 1px 1px #cccccc,
      1px 2px 1px #eeeeee, 3px 2px 1px #cccccc, 2px 3px 1px #eeeeee,
      4px 3px 1px #cccccc, 3px 4px 1px #eeeeee, 5px 4px 1px #cccccc,
      4px 5px 1px #eeeeee, 2px 2px 1px #cccccc, 5px 2px 1px black,
      2px 2px 1px black;
  }
  .navigators {
    margin-right: 15px;
    display: flex;
    width: 100px;
    justify-content: space-around;
    align-items: center;

    svg {
      width: 35px;
      height: 35px;
      border: 1px black solid;
      border-radius: 10px;
    }
  }
`;

const ExitCart = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 3;
  ion-icon {
    font-size: 40px;
    color: white;
  }
`;
