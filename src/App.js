import React,{useState,useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [ repositories, setRepositories ]= useState([]);

   //LIstar TOdos os repositorios
   useEffect(()=>{
    api.get('repositories').then(response =>
      {setRepositories(response.data)})
   },[]);

  async function handleAddrepositories() {

   //Pegando dados
 const objeto =  await api.post('repositories',{

   
      title: 'Escola de Programação',
      url: 'url-teste',
      techs: [ 'TesteTechs', 'TechsTeste']
   });
   const repoNew = objeto.data;

    setRepositories([...repositories,repoNew]);
    

  }

 

    async function handleRemoverepositories(id) {
      console.log(id)
      await api.delete(`repositories/${id}`);
  
       setRepositories(repositories.filter(repository => repository.id !== id));
       
    }

  

  return (
  <div>
    <ul data-testid="repository-list">
      {repositories.map(repository => {
        return  (
          <li key={repository.id}>
            {repository.title}
            
            <button onClick={()=>handleRemoverepositories(repository.id)}>
              Remover
            </button>
          </li>
        )
      })}
     
    </ul>

    <button onClick={handleAddrepositories}>Adicionar</button>
  </div>
);
}
export default App;