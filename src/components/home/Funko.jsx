import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Funko(props) {
  const { name, image, handle, price } = props;
  const replacedImage = image.replace("www", "images");
  const navigate = useNavigate();

  return (
    <FunkoContainer
      onClick={() => {
        navigate(`/products/${handle}`);
      }}
    >
      <img src={replacedImage} alt="" />
      <span>{name}</span>
      <span className="price">{price}</span>
    </FunkoContainer>
  );
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
  img {
    width: 80px;
    height: 105px;
  }
  span {
    text-align: center;
    font-size: 16px;
    overflow-x: hidden;
    overflow-y: hidden;
    margin-top: 5px;
    font-family: "Montserrat", sans-serif;
    max-height: 60px;
  }
  .price {
    font-weight: bold;
    margin-top: 10px;
  }
`;
