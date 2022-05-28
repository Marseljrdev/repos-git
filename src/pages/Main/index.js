import React, { useState, useCallback, useEffect } from 'react';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
import {Container, Form, SubmitButton, List, DeleteButton} from './styles';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

export default function Main(){

    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    //BUSCAR
    useEffect(() => {
        const reposStorage = localStorage.getItem('repos');

        if(reposStorage){
            setRepositorios(JSON.parse(reposStorage));
        }

    }, []);


    //SALVAR ALTERAÇOES
    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repositorios));
    }, [repositorios]);


   const handleSubmit = useCallback((e) => {
       e.preventDefault();

        async function submit(){
            setLoading(true);
            setAlert(null);
            try{

                if(newRepo === ''){
                    throw new Error('Voce precisa indicar um repositorio existente');
                }

                const response = await api.get(`repos/${newRepo}`);

                const hasRepo = repositorios.find(repo => repo.name === newRepo);

                if(hasRepo){
                    throw new Error('Repositorio duplicado');
                }

                const data = {
                    name: response.data.full_name,
                };
    
                setRepositorios([...repositorios, data]);
                setNewRepo('');

            }catch(error){
                setAlert(true);
                toast.error(error);
                console.log(error);
            }finally{
                setLoading(false);
            }


        }

        submit();

    }, [newRepo, repositorios]);



    function handleinputChande(e){
        setNewRepo(e.target.value);
        setAlert(null);
    }

    const handleDelete = useCallback((repo) => {
        const find = repositorios.filter(r => r.name !== repo);
        setRepositorios(find);
    }, [repositorios]);



    return(
        <Container>
        
        
        <h1>
            <FaGithub size={25} />
            Meus repositorios
        </h1>

        <Form onSubmit={handleSubmit} error={alert} >
            <input 
            type="text" 
            placeholder="Adicionar repositorio" 
            value={newRepo}
            onChange={handleinputChande}  
            />

        <SubmitButton loading={loading ? 1 : 0} >
        {loading ? (
            <FaSpinner color="#fff" size={15} />
        ) : (
            <FaPlus color="#fff" size={15} /> 
        )}
        </SubmitButton> 

        </Form>

        <List>
            {repositorios.map(repo => (
                <li key={repo.name} >
                    <span> 
                        <DeleteButton onClick={() => handleDelete(repo.name)} >
                            <FaTrash size={15} />
                        </DeleteButton>
                        {repo.name} 
                    </span>
                    <Link to={`/repositorio/${encodeURIComponent(repo.name)}`} >
                        <FaBars size={20} />
                    </Link>
                </li>
            ))}
        </List>


        
        </Container>
    
  )
}