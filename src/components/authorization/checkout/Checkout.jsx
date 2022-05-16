import styled from "styled-components"
import {useState,useContext} from "react"
import axios from "axios"

import Header from "../../publicComponents/Header"
import Footer from "../../publicComponents/Footer"
import CheckoutConfirm from "./CheckoutConfirm"
import { UserContext } from "../../../contexts/UserContext";
import UserInfos from "./UserInfos"

export default function Checkout(){
    const [checkoutStage, setCheckoutStage] = useState("checkoutConfirm")
    const { token, cart } = useContext(UserContext);
    
    async function continuePurchase(nextStage){
        const response = window.confirm("Are you sure to continue purchase?")
        if(!response){
            return
        }
        setCheckoutStage(nextStage)
    }

    async function finishPurchase(userInfos){
        const config = {
            headers: {
                "authorization": `Bearer ${token}`
            }
        }
        try {
                const checkoutData = {
                    userInfos,
                    products: cart
                }
                const checkoutResponse = await axios.post("https://driven-pop.herokuapp.com/checkout", checkoutData, config)

            
        } catch (error) {
            window.alert("something went wrong, try again!")
        }
    }
    return (
        <Background>
            <Header />
            {checkoutStage === "checkoutConfirm" ? <CheckoutConfirm continuePurchase={continuePurchase} visibility="flex" products={cart} /> 
                : <CheckoutConfirm continuePurchase={continuePurchase} visibility="none" />}
            
            {checkoutStage === "userInfos" ? <UserInfos finishPurchase={finishPurchase} visibility="flex"/>
                : <UserInfos finishPurchase={finishPurchase} visibility="none" />}

            <Footer />
        </Background>
    )
}
const Background = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: calc(100vh);
    overflow-x: hidden;
    position: relative;

    h2{
        font-family: 'Macondo', cursive;
        font-size: 48px;
    }
    main{  
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 90%;
        position: relative;
        margin-top: 30px;
        .products{
            margin-top: 30px;
        }
        .amount{
            margin-top: 15px;
        }
        button{
            width: 170px;
            height: 30px;
            margin-top: 25px;
            border-radius: 15px;
            border: 1px black solid;
            background-color: #63c063;
            opacity: 0.9;
            color: white;
            font-size: 20px;
            font-family: "macondo", cursive;
        }
    }
`