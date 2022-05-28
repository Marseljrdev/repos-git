import React, { useEffect, useState } from "react";
import api from '../../services/api';
import { Container, Owner, Loading, BackButton, IssuesList, PageActions, FilterList } from './styles';
import { FaArrowLeft } from 'react-icons/fa';

// {decodeURIComponent(match.params.repositorio) }



 export default function Repositorio({match}){

    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    
    const [filters, setFilters] = useState([
        {state: 'all', label: 'Todas', active: true},
        {state: 'open', label: 'Abertas', active: false},
        {state: 'closed', label: 'Fechadas', active: false},
    ]);

    const [filterIndex, setFilterIndex] = useState(0);




    useEffect(() => {

        async function load(){

            const nomeRepo = decodeURIComponent(match.params.repositorio);

            const [repoData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
                    params:{
                        state: filters.find(f => f.active).state,
                        per_page: 5
                    }
                })
            ]);

            setRepositorio(repoData.data);
            setIssues(issuesData.data);
            setLoading(false);

            //console.log(repoData.data);
            //console.log(issuesData.data);

        }

        load();

    }, [match.params.repositorio]);



    useEffect(() => {

        async function loadPage(){

            const nomeRepo = decodeURIComponent(match.params.repositorio);

            const response = await api.get(`/repos/${nomeRepo}/issues`, {
                params:{
                    state: filters[filterIndex].state,
                    page,
                    per_page: 5,
                },
            });

            setIssues(response.data);
            //console.log(filterIndex);

        }

        loadPage();

    }, [match.params.repositorio, page, filters, filterIndex]);


    function handlePage(action){
        setPage(action === 'back' ? page - 1 : page + 1);
        
    }



    function hadnleFilter(index){
        setFilterIndex(index);
    }




    if(loading){
        return(
            <Loading>
                <h1>Carregando detalhes da pagina...</h1>
            </Loading>
        );
    }




    return(
       
        <Container>

            <BackButton to="/" >
                <FaArrowLeft color="#000" size={30} />
            </BackButton>

            <Owner>
                <img 
                src={repositorio.owner.avatar_url} 
                alt={repositorio.owner.login}
                 /> 

                 <h1> {repositorio.name} </h1>
                 <p> {repositorio.description} </p>

            </Owner>


            <FilterList active={filterIndex} >
                {filters.map((filter, index) => (
                    <button type="button" key={filter.state} onClick={() => hadnleFilter(index)} >
                        {filter.label}
                    </button>
                ))}

            </FilterList>


            <IssuesList>
                {issues.map(issue => (
                    <li key={String(issue.id)} >
                        <img src={issue.user.avatar_url} alt={issue.user.login} />

                        <div>
                            <strong>
                                <a href={issue.html_url} > {issue.title} </a>

                                {issue.labels.map(label => (
                                    <span key={String(label.id)} > {label.name} </span>
                                ))}

                            </strong>

                            <p> {issue.user.login} </p>

                        </div>

                        

                    </li>
                ))}

            </IssuesList>

            <PageActions>
                <button type="button" onClick={() => handlePage('back')} disabled={ page < 2 } >
                Voltar
                </button>

                <button type="button" onClick={() => handlePage('next')} >
                Proxima
                </button>

            </PageActions>



        </Container>
     
    );
} 