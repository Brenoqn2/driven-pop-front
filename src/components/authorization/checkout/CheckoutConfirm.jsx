import styled from "styled-components"
import { useState,useEffect } from "react";

import CheckoutItem from "./CheckoutItem";

export default function CheckoutConfirm(props){
    const {continuePurchase, visibility, products} = props
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        let sum = 0;
        products.forEach(product=> {
            const newPrice = product.price.replace("R$","").split(",")

            sum += Number(newPrice[0] * Number(product.quantity))
            console.log("sum", sum)
        })
        setTotalPrice(Number(sum).toFixed(2))
        
        console.log("cart",products)
    },[])


    return (
        <Background visibility={visibility}>
            <main>
                {products? 
                <div className="products">
                    <h4>Products</h4>
                        {products.map(p => <CheckoutItem image={p.imageName} title={p.title} price={p.price} quantity={p.quantity} />)}
                </div>
                : <span>There is no products!</span>}

                <span className="amount">amount:R${totalPrice}</span>
                <button onClick={() => continuePurchase("userInfos")}>Continue purchase</button>

            </main>
        </Background>
    )
}
const Background = styled.div`
    display: ${props => props.visibility};
    flex-direction: column;
    align-items: center;
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
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 30px;
            max-height: 500px;
            overflow-x: scroll;
            h4{
                font-size: 44px;
                font-family: "macondo",cursive;
            }
        }
        .amount{
            font-size: 44px;
            font-family: "macondo",cursive;
            margin-top: 30px;
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