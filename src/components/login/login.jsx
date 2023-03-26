import { Link, useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { useContext, useState } from 'react'
import { userDetailsContext } from '../../state/UserDetailsProvider'
import './login.css';

let BASE_URL = "http://127.0.0.1:8000"


export default function Login() {

    const navigate = useNavigate();
    const { setIsAuthenticated, setUserDetails } = useContext(userDetailsContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin(event) {
        event.preventDefault();

        fetch(BASE_URL + '/api/v1/auth/token', {
            method: "POST",
            mode: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${email}&password=${password}`
        })
            .then(response => response.json().then(data => {
                if(!response.ok) throw Error(data.detail.error)
                localStorage.setItem('token', data.access_token)
                setIsAuthenticated(true);
                setUserDetails(data)
                navigate("/files");
                NotificationManager.success(`Welcome Back ${data.username}!`, 'Login Successful!', 5000);
            })
            )
            .catch(error => {
                console.log(error)
                NotificationManager.error(String(error), "Failed", 3000);
                return;
            })
    }

    return (
        <div className='grid h-full place-items-center text-center'>
            <div className='login gap-10 grid border-2 border-black justify-center'>
                <div className='inline-grid gap-1 items-center'>
                    <Link to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </Link>
                    <h1 className='text-5xl font-bold justify-self-center'>Login</h1>
                </div>
                    <form action="/login" onSubmit={handleLogin}>
                        <div className='grid gap-4'>
                            <input type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                            <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                            <input type="submit" onClick={handleLogin} value="Login" className='cursor-pointer' />
                        </div>
                    </form>
                <div>
                    <Link to="/reset-password" className='link'>Forgot Password?</Link>
                    <p>New User? <Link to="/signup" className='link'>Sign Up!</Link></p>
                </div>
            </div>
        </div>
    )
}