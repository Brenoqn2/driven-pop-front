import styled from "styled-components"

import { IoCartOutline, IoPerson } from "react-icons/io5"

export default function Header(){
    return (
        <HeaderContainer>
            <h1>PopDriven</h1>
            <div className="navigators">

                <IoPerson  />
                <IoCartOutline/>
            </div>
        </HeaderContainer>
    )
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
    -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0); 
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);

    h1{
        font-family: 'Macondo', cursive;
        /* font-family: 'Lobster', cursive; */
        font-size: 38px;
        margin-left: 15px;
        color: black;
        text-shadow: 1px 0px 1px #CCCCCC, 0px 1px 1px #EEEEEE, 2px 1px 1px #CCCCCC, 1px 2px 1px #EEEEEE, 3px 2px 1px #CCCCCC,
         2px 3px 1px #EEEEEE, 4px 3px 1px #CCCCCC, 3px 4px 1px #EEEEEE, 5px 4px 1px #CCCCCC, 4px 5px 1px #EEEEEE, 2px 2px 1px #CCCCCC, 
         5px 2px 1px black, 2px 2px 1px black;
    }
    .navigators{
        margin-right: 15px;
        display: flex;
        width: 100px;
        justify-content: space-around;
        align-items: center;
        
        svg{
            width: 35px;
            height: 35px;
            border: 1px black solid;
            border-radius: 10px;
        }
    }
    
`