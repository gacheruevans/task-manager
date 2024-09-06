import { useState } from 'react';
import axios from 'axios';
import { useNavigate }  from 'react-router-dom';
import {BiUser} from 'react-icons/bi';
import {AiOutlineUnlock} from 'react-icons/ai';
import { Link } from 'react-router-dom';


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  async function onSubmit(e: { preventDefault: () => void; }) {
    const userData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    }

    try {
      await axios.post('http://localhost:5000/api/signup', userData)
      .then((res)=> {
        if(res.status ===401) {
          alert('Passwords do not match');
          navigate('/');
        }
        if(res.status ===403) {
          alert('User already exists');
          navigate('/');
        }
        if(res.status === 201) {
          navigate('/login'); 
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div className='bg-slate-100 border border-slate-400 rounded-md p-8 shadow-lg backdrop:filter backdrop:blur-sm bg-opacity-30 relative'>
        <h1 className='text-4xl text-slate-600 font-bold text-center mb-6'>Register</h1>
          <form action="POST">
            <div className='relative my-6'>
              <input onChange={(e)=> {setEmail(e.target.value)}} type='email' name='email' id='email' className='block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer'/>
              <label htmlFor='' className='absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Email</label>
              <BiUser className='absolute top-0 right-4'/>
            </div>
            <div className='relative my-6'>
              <input onChange={(e)=> {setPassword(e.target.value)}} type='password' name='password' id='password' className='block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer'/>
              <label htmlFor='' className='absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Password</label>
              <AiOutlineUnlock className='absolute top-0 right-4'/>
            </div>
             <div className='relative my-6'>
              <input onChange={(e)=> {setConfirmPassword(e.target.value)}} type='password' name='confirmPassword' id='confirmPassword' className='block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer'/>
              <label htmlFor='' className='absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Password</label>
              <AiOutlineUnlock className='absolute top-0 right-4'/>
            </div>
            <button className='w-full mb-4 text-[18px] mt-6 rounded-full bg-slate-200 text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300' type='submit' onClick={onSubmit} >Register</button>
            <div>
              <span className='m-4'> Already have an account? <Link to='/' className='text-blue-500'>Login</Link></span>
            </div>
          </form>
      </div>
    </div>
  )
}

export default Register