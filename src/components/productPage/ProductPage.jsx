import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../publicComponents/Header";
import Footer from "../publicComponents/Footer";

export default function ProductPage() {
  const [product, setProduct] = useState([]);
  const { productHandle } = useParams();
  useEffect(() => {
    const URL = `http://localhost:5000/products/${productHandle}`;
    console.log(URL);
    const promise = axios.get(URL);
    promise.then((response) => {
      setProduct(response.data);
      console.log(response.data);
    });
    promise.catch((error) => console.log(error));
  }, [productHandle, setProduct]);

  return (
    <>
      <Header />
      <ProductPageMain>
        {product.length > 0 ? (
          <>
            <img src={product[0].imageName.replace("www", "images")} />
            <div className="division"></div>
            <h1>{product[0].title}</h1>
          </>
        ) : (
          <span>NOT FOUND</span>
        )}
      </ProductPageMain>
      <Footer />
    </>
  );
}

const ProductPageMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: aliceblue;
  min-height: 100vh;
  span {
    margin-top: 50vh;
    font-size: 30px;
  }
  img {
    margin-top: 10px;
    width: 70vw;
    max-width: 500px;
  }
  .division {
    height: 1px;
    width: 95vw;
    margin: 0 auto;
    background-color: #b6b6b6;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  h1 {
    font-size: 28px;
    font-weight: bold;
  }
`;
