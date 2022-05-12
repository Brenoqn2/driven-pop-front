import styled from "styled-components"
export default function Funko(props){
    const {_id,name,image,series} = props
    const replacedImage = image.replace("www","images")
    return (
        <FunkoContainer>
            <img src={replacedImage} alt="" />
            <span>{name}</span>
        </FunkoContainer>
    )
}

const FunkoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 150px;
    border: 1px black solid;
    border-radius: 5px;
    margin-top: 10px;

    img{
        width: 100px;
        height: 100px;
    }
    span{
        text-align: center;
    }
`