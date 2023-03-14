import './App.css';
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import Card from './components/Card';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
         <Routes>
            <Route path='/' element = {<LandingPage/>}   />  
            <Route path='/home' element ={<HomePage/>}  />
            <Route path='/home' element = {<Card/>} />
         </Routes>
            
        
          
        
      </div>
    </BrowserRouter>
  );
}

export default App;
