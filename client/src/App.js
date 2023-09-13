import './App.css';

import { useState , useEffect} from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import Nav from './components/Nav/Nav';
import Paginador from './components/Paginador/Paginador';
import Detail from './components/Detail/Detail';




import axios from 'axios';


function App() {

  let location = useLocation();

  const [dogs, setDogs] = useState([]);  
  const [showing, setShowing] = useState([]);
  const [currentPage, setCurrentPage]= useState(0);
  const [loaded, setLoaded] = useState(false);
  const itemsPerPage = 8;


  useEffect (() => {
    const loadDogs = async () => {
      try {
        const response = await axios('http://localhost:3001/dogs')
        if (response.data){
          setDogs([response.data]);
          setLoaded(true);
        } else {
          window.alert('No se han podido cargar los perros');
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    loadDogs();
  }, [])

  useEffect (() => {
    if (loaded){
      let Dogs = [...dogs][0]
      const fragment = Dogs.slice(0, 8)
      setShowing(fragment);
    }
  }, [dogs])

  const prevHandler = () => {
   const antPag = currentPage - 1;
   const index = antPag * itemsPerPage;

   if (currentPage === 0) return

   let Dogs = [...dogs][0]
   const fragment = []
   for (let i = index; i < index+itemsPerPage; i++){
     fragment.push(Dogs[i]);
   }
   setShowing(fragment)
   setCurrentPage(antPag);
  }

  const nextHandler = () => {
    let Dogs = [...dogs][0]
    const sigtPag = currentPage + 1;
    const total = Dogs.length;
    const index = sigtPag * itemsPerPage;

    if (index >= total) return
    
    
    const fragment = []
    for (let i = index; i < index+itemsPerPage; i++){
      if (Dogs[i]){
        fragment.push(Dogs[i]);
      }
     
    }
    setShowing(fragment)
    setCurrentPage(sigtPag);
  }

  /*
  
  
  useEffect (() => {
    console.log(showing)
  }, [showing])*/



  return (
    <div className="App">
      {location.pathname !== '/' && <Nav /*SearchByName={SearchByName}*//>}
      <Routes>
        <Route path = '/' element = {<LandingPage/>}/>
        <Route path = '/home' element = {<Paginador prevHandler={prevHandler} nextHandler={nextHandler} currentPage={currentPage} dogs={showing}/>}/>
        <Route path = '/detail/:id' element = {<Detail/>}/>
        <Route path = '/createDog'/>
      </Routes>
    </div>
  );
}

export default App;



  

  /*const [dogsName, setDogsName] = useState([]);


  const SearchByName = async (name) => {
    try {
       const result = await axios(`http://localhost:3001/dogs/name?name=${name}`)
       if (result.data) {
          setDogsName([...dogsName, result.data])
       } else {
          window.alert("No existe una raza de perro con ese nombre")
       }
    } catch(error) {
       console.log(error)
       window.alert(error.result)
    }
 }*/