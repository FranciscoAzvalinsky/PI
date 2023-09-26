import './App.css';

import { useState , useEffect} from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { connect, useDispatch } from "react-redux";

import LandingPage from './components/LandingPage/LandingPage';
import Nav from './components/Nav/Nav';
import Paginador from './components/Paginador/Paginador';
import Detail from './components/Detail/Detail';
import Form from  './components/Form/Form';

import axios from 'axios';

import { loadDogs, loadNamed, loadTemperaments, loadedDogs, } from './redux/actions';

function App({dogs, loadDogs, loadTemperaments, loadedDogs, loadedDogsSwitch}) {

  let location = useLocation();
  const dispatch = useDispatch();

  useEffect (() => {
    const cargarDogs = async () => {
      try {
        const response = await axios('http://localhost:3001/dogs')
        if (response.data){
          dispatch(loadDogs(response.data));
        } else {
          window.alert('No se han podido cargar los perros');
        }
      } catch (error) {
        console.log(error.message)
      }
    }

    cargarDogs();
   
  }, [loadedDogsSwitch])

  useEffect(() => {
    const cargarTemperaments = async () => {
      try{
        const response = await axios('http://localhost:3001/temperaments')
        if (response.data){
          dispatch(loadTemperaments(response.data))
        } else {
          window.alert('No se han podido cargar los temperamentos');
        }
      }
      catch (e){
        console.log(e.message)
      }
    }
    cargarTemperaments();
  }, [])

  const SearchByName = async () => {
    dispatch(loadNamed())
 }

 const createDog = async (dogReceived) => {
  let dogSend = {
    id: dogs.length+93,
    name: dogReceived.name,
    weight: {metric: `${dogReceived.weightMin} - ${dogReceived.weightMax}`},
    height: {metric: `${dogReceived.heightMin} - ${dogReceived.heightMax}`},
    life_span: dogReceived.life_span,
    temperament: dogReceived.temperament,
    reference_image_id: dogReceived.reference_image_id
  }
  try {
    const URL='http://localhost:3001/dogs'
    let response = await axios.post(URL, dogSend);
    dispatch(loadedDogs());
  } catch (error) {
    console.log('Error: ')
    console.log(error);
  }
 }

  return (
    <div className="App">
      {location.pathname !== '/' && <Nav SearchByName={SearchByName}/>}
      <Routes>
        <Route path = '/' element = {<LandingPage/>}/>
        <Route path = '/home' element = {<Paginador home={true}/>}/>
        <Route path = '/home/name' element = {<Paginador home={false}/>}/>
        <Route path = '/detail/:id' element = {<Detail/>}/>
        <Route path = '/createDog' element = {<Form createDog={createDog}/>}/>
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
     dogs: state.dogs,
     temperaments: state.temperaments,
     loadedDogsSwitch: state.loadedDogsSwitch,
     dogsName: state.dogsName,
  }
}

function mapDispatchToProps (dispatch){
  return {
     loadDogs: (dogs) => dispatch(loadDogs(dogs)),
     loadTemperaments: (temperaments) => dispatch(loadTemperaments(temperaments)),
     loadedDogs: () => dispatch(loadedDogs()),
     loadNamed: () => dispatch(loadNamed()),
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(App);



  

