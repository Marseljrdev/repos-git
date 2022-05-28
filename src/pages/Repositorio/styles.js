import styled from "styled-components";
import { Link } from 'react-router-dom';



export const Loading = styled.div`
    color: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

`;


export const Container = styled.div`

background: #FFF;
max-width: 700px;
padding: 30px;
margin: 80px auto;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
border-radius: 5px;


`;


export const Owner = styled.header`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;


    img{

        width: 230px;
        border-radius: 20%;
        margin: 20px 0;
    }

    h1{
        font-size: 35px;
        color: #0D2636;
    }

    p{
        margin-top: 5px;
        font-size: 15px;
        text-align: center;
        line-height: 1.5;
        color: #000;
        max-width: 400px;
    }

`;


export const BackButton = styled(Link)`

    border: 0;
    outline: 0;
    background: transparent;
    
`;


export const IssuesList = styled.ul`

    margin-top: 30px;
    padding-top: 30px;
    border-top: 2px solid #eee;
    border-bottom: 2px solid #eee;
    list-style: none;


    li{
        display: flex;
        padding: 15px 10px;
        


        & + li{
            margin-top: 12px;
        }



       img{

           width: 40px;
           height: 40px;
           border-radius: 50%;
           border: 2px solid #0D2636;
       }

       div{

           flex: 1;  
           margin-left: 10px;


           p{
               color: #222;
               margin-top: 10px;
               font-size: 15px;
           }


           strong{
               font-size: 15px;


                a{
                    text-decoration: none;
                    color: #222;
                    transition: all 0.3s;

                    &:hover{
                        color: #0071db;
                    }

                }

                span{
                    background: #222;
                    color: #fff;
                    border-radius: 5px;
                    padding: 5px 7px;
                    margin-left: 10px;
                    font-weight: 600;
                }

           }

       }     


    }
    

`;


export const PageActions = styled.div`

    display: flex;
    align-items: center;
    justify-content: space-between;

    button{
        border: 0;
        outline: 0;
        border-radius: 5px;
        padding: 10px 9px;
        margin-top: 8px;
        transition: all 0.5s;
        background: transparent;

        &:hover{
            background: #0D2636;
            color: #fff;
        }

        &:disabled{
            cursor: not-allowed;
            background: transparent;
            color: #222;
        }
    }

`;


export const FilterList = styled.div`

    margin: 15px 0;

    button{
        outline: 0;
        border: 0;
        padding: 8px;
        border-radius: 5px;
        margin: 0 4px;


        &:nth-child(${props => props.active + 1 }){
            background: #0071db;
            color: #FFF;
        }

    }

`;


