import './App.css';
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import Card from './components/Card';
import DogCreate from './components/DogCreate';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
         <Routes>
            <Route path='/' element = {<LandingPage/>}   />  
            <Route path='/home' element ={<HomePage/>}  />
            <Route path='/dogs' element = {<DogCreate/>} />
            <Route path='/home/:id' element = {<Detail/>}/> 
         </Routes>
            
        
          
        
      </div>
    </BrowserRouter>
  );
}

export default App;
