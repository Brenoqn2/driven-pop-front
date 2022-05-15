import styled from "styled-components"
export default function Funko(props){
    const {_id,name,image,series} = props
    const replacedImage = image.replace("www","images")

    function scrollPage(e){
        e.targetscrollIntoView()  
    }
    return (
        <FunkoContainer>
            <img src={replacedImage} alt="" />
            <span>{name}</span>
            <span className="price">R$20,00</span>
        </FunkoContainer>
    )
}

const FunkoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 200px;
    border: 1px black solid;
    border-radius: 5px;
    margin-top: 10px;
    background-color: #fff;
    box-sizing: border-box;
    img{
        width: 80px;
        height: 105px;
    }
    span{
        text-align: center;
        font-size: 16px;
        overflow-x: hidden;
        overflow-y: hidden;
        margin-top: 5px;
        font-family: 'Macondo', cursive;
        max-height: 60px;
    }
    .price{
        font-weight: bold;
        margin-top: 10px;
    }
`