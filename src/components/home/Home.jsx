import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import Header from "../publicComponents/Header";
import Funko from "./Funko";
import funkobackground from "./images/funkobackground.jpg";
import { useProducts } from "../../contexts/ProductsContext";
import Footer from "../publicComponents/Footer";
import CurrentPageButton from "./CurrentPageButton";

export default function Home() {
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [productPageControl, setProductPageControl] = useState(1);
  const { products, setProducts } = useProducts();
  const productsPerPage = 20;

  let quantityPages = Math.ceil(products.length / productsPerPage);
  const startInterval =
    currentPage * productsPerPage - (productPageControl - 1) * 200 - 20;
  const endInterval = startInterval + Number(productsPerPage);
  const funkos = products.slice(startInterval, endInterval);

  useEffect(() => {
    async function getFunkos(start) {
      if (!start) {
        start = 1;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/products?start=${start}`
        );
        const funkos = response.data;
        setProducts(funkos);
      } catch (error) {
        console.log(error);
      }
    }
    getFunkos(productPageControl);
  }, [productPageControl, setProducts]);

  const controls = {
    next() {
      window.scrollTo({ top: 380 });
      setCurrentPage(currentPage + 1);

      if (productPageControl * 10 === currentPage) {
        setProductPageControl(productPageControl + 1);
      }
    },
    prev() {
      window.scrollTo({ top: 300 });

      if (currentPage === 1) {
        return;
      }
      if (currentPage - 1 === (productPageControl - 1) * 10) {
        setProductPageControl(productPageControl - 1);
      }

      setCurrentPage(currentPage - 1);
    },
    goTo(e) {
      window.scrollTo({ top: 300 });
      setCurrentPage(Number(e.target.value));
    },
  };
  return (
    <>
      <Header />
      <HomePage>
        <input
          type="search"
          placeholder="Search something"
          value={search || ""}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img className="topImage" src={funkobackground} alt="" />
        <div className="filters">
          <select type="button">
            <option value="todos">todos</option>
            <option value="marvel">marvel</option>
            <option value="harry potter">harry potter</option>
          </select>
          <span>All products</span>
        </div>
        <main>
          {funkos.length > 0 ? (
            funkos.map((funko, index) => {
              return (
                <Funko
                  image={funko.imageName}
                  name={funko.title}
                  series={funko.series}
                  id={funko._id}
                  key={funko._id}
                  handle={funko.handle}
                  price={funko.price}
                />
              );
            })
          ) : (
            <span>There is no funkos</span>
          )}
        </main>
        <div className="pageNavigation">
          <IoChevronBack onClick={() => controls.prev()} />
          {Array.from(Array(quantityPages)).map((product, index) => (
            <CurrentPageButton
              index={index + 1}
              goTo={controls.goTo}
              currentPage={currentPage}
              pageControl={productPageControl}
              key={index}
            />
          ))}
          <IoChevronForward onClick={() => controls.next()} />
        </div>
      </HomePage>
      <Footer />
    </>
  );
}

const HomePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: aliceblue;
  min-height: 100vh;
  input {
    width: 100%;
    height: 40px;
    border: 1px gray solid;
    border-radius: 15px;
    padding: 15px;
    margin: 2px;
    box-shadow: 5px 12px 5px;
  }
  .topImage {
    width: 100%;
    opacity: 0.88;
  }
  .filters {
    margin-top: 20px;
    font-size: 24px;
    font-family: "Macondo", cursive;
  }
  select {
    position: absolute;
    right: 20px;
  }
  main {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-top: 20px;
    min-height: 100px;
  }
  .pageNavigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    width: 350px;
    border: 1px dashed #033a44;
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
    svg {
      font-size: 20px;
      border: 1px dashed blue;
      border-radius: 10px;
    }
  }
`;
