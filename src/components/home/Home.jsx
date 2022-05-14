import {useState, useEffect} from "react"
import axios from "axios"
import styled from "styled-components"

import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import Header from "../publicComponents/Header"
import Funko from "./Funko"
import funkobackground from "./images/funkobackground.jpg"
import { useProducts } from "../../contexts/ProductsContext"
import Footer from "../publicComponents/Footer";
import CurrentPageButton from "./CurrentPageButton";

export default function Home(){
    
    const [search, setSearch] = useState(null)
    
    const [quantityPages, setQuantityPages] = useState(9)
    const [currentPage, setCurrentPage] = useState(1)
    const [productPageControl, setProductPageControl] = useState(1)
    
    const {products, setProducts} = useProducts()
    
    const productsPerPage =( products.length / Number(quantityPages))
    const startInterval = (currentPage * 10)
    const endInterval = (startInterval + Number(productsPerPage))
    const funkos = products.slice(startInterval, endInterval)

    useEffect(() => {
        getFunkos()
    },[])
    useEffect(() => {
        getFunkos(productPageControl)
    }, [productPageControl])

    async function getFunkos(start){ 
        console.log("entrei no getFunkos")
        if(!start){
            start = 1
        }
        try{
            const response = await axios.get(`http://localhost:5000/products?start=${start}`)
            const funkos = response.data
            setProducts(funkos)        


        }catch(error){
            console.log(error)
        }
    }
    function addProductsToLocalStorage(products){
        localStorage.setItem("products",JSON.stringify(products))
    }

   const controls = {
       next(){
           console.log(currentPage)
           setCurrentPage(currentPage + 1)

           if ((productPageControl * 9) === currentPage){
               addProductsToLocalStorage(products)
               setProductPageControl(productPageControl + 1)
           }
       },
       prev(){
           console.log(currentPage)
           setCurrentPage(currentPage -1 )

           if ((currentPage-1) === ((productPageControl -1) * 9)) {
               setProductPageControl(productPageControl - 1)
           }
       },
       goTo(e){
            setCurrentPage(Number(e.target.value))
            console.log('entrei')
       }
   }
   console.log(products)
    return (
        <>
            <Header />
            <HomePage>
                <input type="search" placeholder="Search something" value={search}/>
                <img src={funkobackground} alt="" />
                <div className="filters">
                    <span>All products</span>
                </div>
                <main>
                    {funkos.map((funko,index) => {return <Funko image={funko.imageName} name={funko.title} series={funko.series} id={funko._id}/>}) }
                </main>
                <div className="pageNavigation">
                    <IoChevronBack onClick={() => controls.prev()}/> 
                    {Array.from(Array(quantityPages)).map((product, index) => 
                    <CurrentPageButton index={(index+1)} goTo={controls.goTo} currentPage={currentPage} pageControl={productPageControl}/>)}
                    <IoChevronForward onClick={() => controls.next()}/>
                </div>
            </HomePage>
                <Footer />
    
        </>
    )
}

const HomePage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: aliceblue;

    input{
        width: 100%;
        height: 40px;
        border: 1px gray solid;
        border-radius: 15px;
        padding: 15px;
        margin: 2px;
        box-shadow: 5px 12px 5px;
    }
    img{
        width: 100%;
        opacity: 0.88;
    }
    .filters{
        margin-top: 20px;
        font-size: 24px;
        font-family: 'Macondo', cursive
    }
    main{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        margin-top: 20px;
    }
    .pageNavigation{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        width: 350px;
        border: 1px dashed  #033a44;
        margin: 10px;
        border-radius: 10px;
        padding: 10px;
        svg{
            font-size: 20px;
            border: 1px dashed blue;
            border-radius: 10px;
        }
    }
`