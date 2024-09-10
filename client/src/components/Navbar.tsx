import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const Navbar = () => {
  const navigate = useNavigate();
  
  const onLogout = async() => {
    localStorage.removeItem('token');

    try {
      await axios.post('http://localhost:5000/api/signout')
      .then((res)=> {
        if(res.status === 200) {
          Cookies.remove('access_token');
          Cookies.remove('user_data');
          navigate('/')
        }
      });
    } catch (error) {
      console.log(error);
    }

  };
  return (
    <div className='flex flex-col w-full'>
      <nav className="bg-blck border-gray-300 dark:bg-transparent">
        <div className="flex justify-end flex-wrap items-center mx-auto max-w-screen-xl p-4">
            <div className="flex items-center p-4">
              <button className=' text-[18px] p-6 rounded-md bg-slate-400 text-white hover:bg-cyan-600 hover:text-white py-2 transition-colors duration-300' type='submit' onClick={onLogout} >Logout</button>
            </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar