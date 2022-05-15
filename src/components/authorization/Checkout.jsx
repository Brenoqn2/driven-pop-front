import styled from "styled-components"


import Header from "../publicComponents/Header"
import Footer from "../publicComponents/Footer"

export default function Checkout(){
    return (
        <Background>
            <Header />
            <main>
                    <h2>Checkout</h2>
                    <div className="products">
                        <span>Products</span>

                    </div>
            </main>
            <Footer />
        </Background>
    )
}
const Background = styled.div`
    display: flex;
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

        .products{}
        span{
            font-family: 'Macondo', cursive;
            font-size: 32px;
        }
    }
`