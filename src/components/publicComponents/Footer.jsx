import styled from "styled-components"
import { Link } from "react-router-dom"
export default function Footer(){
    return (
        <FooterContainer>
            <span>
                Copyright © 
            </span>
            <div>
                <Link to="/">
                    home
                </Link>
                <Link to="/login">
                    login
                </Link>
                <Link to="/sign-up">
                    sign-up
                </Link>
            </div>
        </FooterContainer>
    )
}


const FooterContainer = styled.div`
        display: flex;
        align-items: center;
        height: 100px;
        background-color: #eec0c6;
        background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
        -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0); 
        box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
        /* border-radius: 10px; */
        border-radius:10px 10px 0 0 ;
        opacity: 0.88;
        width: 100%;
        position: absolute;
        bottom: 0;
        justify-content: space-evenly;
        div{
            display: flex;
            flex-direction: column;

            a{
                margin-top: 5px;
            }
        }
`