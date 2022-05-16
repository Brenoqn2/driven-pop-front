import styled from "styled-components";
export default function Order(props) {
  const { order } = props;
  const { amount, products } = order;
  return (
    <OrderItem>
      {products.map((product) => {
        let price = product.price;
        price = price.replace("R$", "");
        price = Number(price.replace(",", "."));
        price = price * product.quantity;
        return (
          <ProductItem key={product._id}>
            <img
              src={product.imageName.replace("www", "images")}
              alt={product.title}
            />
            <h1>{`${product.title} (x${product.quantity})`}</h1>
            <h2>{`R$${price}`}</h2>
          </ProductItem>
        );
      })}
      <h1>{`Total: R$${amount}`}</h1>
    </OrderItem>
  );
}

const OrderItem = styled.div`
  margin-bottom: 30px;
  > h1 {
    font-family: "Montserrat", sans-serif;
    font-weight: bold;
    color: rgb(0, 85, 100);
    font-size: 20px;
    margin-left: 10px;
    margin-top: 10px;
  }
`;

const ProductItem = styled.div`
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(82, 82, 82);
  img {
    height: 40px;
  }
  h1 {
    font-family: "Montserrat", sans-serif;
    margin-left: 20px;
    margin-right: 50px;
  }
  h2 {
    position: absolute;
    right: 10px;
  }
`;
