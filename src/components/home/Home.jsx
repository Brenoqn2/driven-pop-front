import {useState, useEffect} from "react"
import axios from "axios"
import styled from "styled-components"


import Header from "../publicComponents/Header"
import Funko from "./Funko"
import funkobackground from "./images/funkobackground.jpg"


export default function Home(){
    const [funkos, setFunkos] = useState([])

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
                <img src={funkobackground} alt="" />

                <main>
                    {funkos.map(funko => {return <Funko image={funko.imageName} name={funko.title} series={funko.series} id={funko._id}/>}) }
                </main>
            </HomePage>
        </>
    )
}

const HomePage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    img{
        width: 100%;
        opacity: 0.88;
    }
    main{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        margin-top: 50px;
    }
`