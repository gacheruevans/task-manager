import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <div className='text-black  flex justify-center items-center bg-cover'>
        <Routes>
            <Route path='/' element={ <Login />} />
            <Route path='register' element={ <Register />} />
            <Route path='home' element={ <Home />} />
        </Routes>
    
    </div>
  )
}
export default App;