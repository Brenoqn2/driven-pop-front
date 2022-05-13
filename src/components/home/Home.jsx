import {useState, useEffect} from "react"
import axios from "axios"
import styled from "styled-components"


import Header from "../publicComponents/Header"
import Funko from "./Funko"
import funkobackground from "./images/funkobackground.jpg"
import { useProducts } from "../../contexts/ProductsContext"


export default function Home(){
    
    const [search, setSearch] = useState(null)
    
    const [productPerPage, setProductPerPage] = useState(20)
    const {products, setProducts} = useProducts()
    
    const [currentPage, setCurrentPage] = useState(0)
    const quantityPages = Math.ceil(products.length / productPerPage)
    const startInterval = (currentPage * 10)
    const endInterval = (startInterval + productPerPage)
    const funkos = products.slice(startInterval,endInterval)



    useEffect(() => {
        getFunkos()
    },[])
    async function getFunkos(interval){
        try{
            const funkos = await axios.get(`http://localhost:5000/products?interval=${interval}`)
            
            setProducts(funkos.data)
        }catch(error){
            console.log(error)
        }
    }

   const controls = {
       next(){
           setCurrentPage(currentPage + 1)
           if((currentPage+1) > quantityPages){
               getFunkos((currentPage * 10))
           }
       },
       prev(){},
       goTo(e){
            setCurrentPage(Number(e.target.value))

       }
   }
   console.log(Array(quantityPages))
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
                    {Array.from(Array(quantityPages)).map((product,index) => <button value={index} onClick={e => controls.goTo(e)}>{index}</button> )}
                </div>
            </HomePage>
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
        button{
            font-size: 10px;
            margin-left: 5px;
        }
    }
`