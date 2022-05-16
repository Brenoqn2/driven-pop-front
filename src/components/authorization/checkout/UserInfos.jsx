import styled from "styled-components"
import {useState, useContext} from "react"
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { UserContext } from "../../../contexts/UserContext"
import axios from "axios"

export default function UserInfos(props){
    const {visibility,continuePurchase} = props
    const [asideState, setAsideState] = useState("none")

    const {token} = useContext(UserContext)
    
    const [zipcode, setZipcode] = useState(null)
    const [adress, setAdress] = useState(null)
    const [adress_number, setAdress_number] = useState(null)
    const [adress_complement, setAdress_complement] = useState(null)
    const [payment_method, setPayment_method] = useState(null)

    const [infos, setInfos] = useState([])
    console.log(payment_method)

    async function getOlderInfos(flex){
        console.log("entrei1")
        if(asideState === "flex"){
            console.log("entrei2")
            setAsideState(flex)
            return
        }
        console.log("entrei3",flex)
        setAsideState(flex)
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }
        try{
            const infos = await axios.get("http://localhost:5000/checkout/infos")
            setInfos(infos)
        }catch{
            console.log("deu ruim")
        }
    }
    return  (
        <>
            <Background visibility={visibility}>
                    <h3>Fields marked with an asterisk are required!</h3>
                    <button className="olderInfos" onClick={() => getOlderInfos("flex")}><IoArrowBackCircleOutline />Show older infos</button>
                <main>
                    <form action="">
                        <div>
                            <label htmlFor="">Zip code *</label>
                            <input type="text" placeholder="EX: 75710" value={zipcode || ""} onChange={(e) => setZipcode(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="">Adress *</label>
                            <input type="text" placeholder="street - avenue EX: " value={adress || ""} onChange={(e) => setAdress(e.target.value)}/>
                        </div>

                        <div>
                            <label htmlFor="">Adress number *</label>
                            <input type="text" placeholder="430" value={adress_number || ""} onChange={(e) => setAdress_number(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="">Adress complement</label>
                            <input type="text" placeholder="front of the square" value={adress_complement || ""} onChange={(e) => setAdress_complement(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="">Payment method *</label>
                            <select name="" id="" value={payment_method} onChange={(e) => setPayment_method(e.target.value)}>
                                <option value=""></option>
                                <option value="debit">Debit</option>
                                <option value="credit card">Credit card</option>

                            </select>
                        </div>
                    </form>
                    <button onClick={() => continuePurchase("finishPurchase")}>Continue purchase</button>
                </main>
                <Aside visibility={asideState}>
                    {infos ?
                        <div className="infos">
                            <span>{infos.zipcode}</span>
                            <span>adress</span>
                            <span>adress number</span>
                            <span>adress complement</span>
                            <span>payment method</span>
                            <button>Use infos</button>
                    </div> : <span>There is no infos</span> }
                    <button onClick={() => setAsideState("none")}>Back to form</button>
                </Aside>
            </Background>
        </>
    )
}

const Background = styled.div`
    display: ${props => props.visibility};
    align-items: center;
    flex-direction: column;
    position: relative;
    width:100%;
    overflow-x: hidden;
    overflow-y: scroll;
    height: calc(100% - 210px);
    /* min-height: 100vh; */
    h3{
        font-size: 24px;
        text-align: center;
        font-family: "macondo", cursive;
        text-decoration: underline;
        margin-top: 50px;
    }
    main{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 90%;
        margin-top: 80px;
    }
    span{
        font-family: "macondo",cursive;
        font-size: 18px;
        font-weight: bold;
    }
    form{    
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        justify-content: space-between;
        margin-top: 50px;

        label {
            margin-bottom: 5px;
        }

        input {
            border-radius: 15px;
            border: 1px gray solid;
            width: 100%;
            padding: 0 10px 0 10px;
            height: 30px;
            margin-bottom: 25px;
        }

        div{
            width: 75%;
        }
        select{
            width: 100%;
            font-size: 20px;
            font-weight: 500;
            border-radius: 10px;
            text-align: center;
            font-family: "macondo",cursive;
        }
    }
    main div{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .olderInfos{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200px;
        height: 30px;
        border-radius: 15px;
        border: 1px black solid;
        background-color: #63c063;
        opacity: 0.9;
        color: white;
        font-size: 20px;
        font-family: "macondo", cursive;
        position: absolute;
        top: 140px;
        left: calc(100vw - 170px);
        svg{
            position: absolute;
            left: 5px;
        }
    }
    
`
const Aside = styled.div`
    display: ${props => props.visibility} ;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 50%;
    right: 0;
    height: calc(100vh - 190px);
    background-color: black;
    opacity: 0.8;

    .infos{
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px dashed whitesmoke;
        border-radius: 5px;
        margin-top: 10px;
        overflow-x: hidden;
        box-sizing: border-box;
        width: 90%;
        min-height: 150px ;

    }
    span{
        width: 100%;
        color: #fff;
        margin-top: 2px;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    button{
        width: 170px;
        height: 30px;
        margin-top: 25px;
        border-radius: 15px;
        border: 1px black solid;
        background-color: #63c063;
        font-size: 20px;
        font-family: "macondo", cursive;
    }

`