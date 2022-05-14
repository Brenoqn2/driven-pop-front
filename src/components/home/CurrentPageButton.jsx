import styled from "styled-components"

export default function currentPageButton(props){
    const {currentPage, goTo,pageControl} = props
    let {index} = props
    
    if(pageControl > 1){
        index = (pageControl - 1) * 10 + index - (pageControl - 1)
    }
    return (     
        index === currentPage ? <Button background="gray" color="white" >{index} </Button >
         : <Button value={index} background="white" color="black" onClick={(e) => goTo(e) }>{index}</Button>
    )
}
const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    width: 27px;
    height: 25px;
    border-radius: 5px;
    border: 1px solid gray;
    background-color: ${props => props.background};
    color: ${props => props.color};
`