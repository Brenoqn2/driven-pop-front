import styled from "styled-components";
export default function CheckoutItem(props) {
  const { title, price, quantity } = props;
  const image = props.image.replace("www", "images");
  return (
    <Background>
      <img src={image} alt="" />
      <div className="itemInfos">
        <span>{title}</span>
        <span className="price">PRICE: {price}</span>
        <span className="quantity">quantity: {quantity}</span>
      </div>
    </Background>
  );
}

const Background = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 100px;
  border: 1px dashed black;
  border-radius: 8px;
  position: relative;
  justify-content: center;
  margin-top: 30px;
  img {
    position: absolute;
    left: 5px;
    width: 50px;
    height: 75px;
  }
  .itemInfos {
    display: flex;
    flex-direction: column;
    width: 200px;
    margin-left: 50px;
    span {
      font-size: 18px;
      font-family: "Montserrat", sans-serif;
      margin-bottom: 4px;
    }
    .price {
      font-weight: bold;
    }
  }
`;
