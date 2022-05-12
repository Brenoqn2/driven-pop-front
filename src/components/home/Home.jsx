import {useState, useEffect} from "react"
import axios from "axios"
import styled from "styled-components"


import Header from "../publicComponents/Header"
import Funko from "./Funko"
import funkobackground from "./images/funkobackground.jpg"


export default function Home(){
    const [funkos, setFunkos] = useState([])
    const [search, setSearch] = useState(null)
    async function getFunkos(){
        try{
            const funkos = await axios.get("http://localhost:5000/products")
            
            setFunkos(funkos.data)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(() => {
        getFunkos()
    },[])
    console.log(funkos)
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
                    {funkos.map(funko => {return <Funko image={funko.imageName} name={funko.title} series={funko.series} id={funko._id}/>}) }
                </main>
                <div className="pageNavigation"></div>
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
`