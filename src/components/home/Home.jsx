import {useState, useEffect} from "react"
import axios from "axios"
import styled from "styled-components"


import Header from "../publicComponents/Header"
import Funko from "./Funko"
import funkobackground from "./images/funkobackground.jpg"
import { useProducts } from "../../contexts/ProductsContext"


export default function Home(){
    const [funkos, setFunkos] = useState([])
    const [search, setSearch] = useState(null)
    const [page, setPage] = useState(0)
    const [productPerPage, setProductPerPage] = useState(20)
    const {products, setProducts} = useProducts()
    const pages = Math.ceil(products.length / productPerPage)


    useEffect(() => {
        getFunkos()
    },[])
    console.log(Array(pages))
    async function getFunkos(interval){
        try{
            const funkos = await axios.get(`http://localhost:5000/products?interval=${interval}`)
            
            setProducts(funkos.data)

            const visibleFunkos = (funkos.data).slice(0,20)
            setFunkos(visibleFunkos)
        }catch(error){
            console.log(error)
        }
    }

   const controls = {
       next(){
           setPage(page + 1)
           if(page === 5){
               getFunkos(6)
           }
       },
       prev(){},
       goTo(e){
           const page = Number(e.target.value)
           if(page > 19){
               getFunkos()
           }
            setPage(page)
            const visibleFunkos = products.slice(page*10,(page*10) + 20)
            setFunkos(visibleFunkos)

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
                    {Array.from(Array(pages)).map((product,index) => <button value={index} onClick={e => controls.goTo(e)}>{index}</button> )}
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