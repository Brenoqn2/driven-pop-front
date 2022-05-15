import styled from "styled-components"
export default function CheckoutConfirm(props){
    const {continuePurchase, visibility} = props
    return (
        <Background visibility={visibility}>
            <main>
                <div className="products">
                    <span>Products</span>
                </div>
                <span className="amount">amount:R$20,00</span>
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
            margin-top: 30px;
        }
        span{
            font-family: 'Macondo', cursive;
            font-size: 32px;
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