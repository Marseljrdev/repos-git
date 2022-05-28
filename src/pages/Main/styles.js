import styled, {keyframes, css} from 'styled-components';


export const Container = styled.div`
    max-width: 700px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0,0,0, 0.3) ;
    padding: 30px;
    margin: 80px auto;

    h1{
    font-size: 20px;
    display:flex;
    align-items: center;
    flex-direction:row;
    
    svg{
      margin-right: 10px;
    }

  }

`;


export const Form = styled.form`
    margin-top: 10px;
    display: flex;
    flex-direction: row;

    input{
        flex: 1;
        border: 2px solid ${props => (props.error ? '#FF0000' : '#DDD')};
        padding: 10px 17px;
        border-radius: 5px;
        font-size: 17px;
    }
`;


const animate = keyframes`
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
`;


export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading,
}))`
    background: #0D2636;
    border: 0;
    border-radius: 5px;
    margin-left: 10px;
    padding: 0 17px;
    display: flex;
    justify-content: center;
    align-items: center;


    &[disabled]{
      cursor: not-allowed;
      opacity: 0.5;
    }


    ${props => props.loading && 
      css`
        svg{
          animation: ${animate} 2s linear infinite;
        }
      `
    }

`;


export const List = styled.ul`
  list-style: none;
  margin-top: 20px;


  li{
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;


    & + li{
      border-top: 2px solid #eee;
    }


    a{
      color: #0D2636;
      text-decoration: none;
    }


  }  

 
`;

export const DeleteButton = styled.button.attrs({
  type: 'button',
})`

  color: #0D2636;
  background: transparent;
  border: 0;
  padding: 8px 9px;
  outline: 0;
  border-radius: 5px;
  
`;