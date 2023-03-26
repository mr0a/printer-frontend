import { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';

let BASE_URL = "http://127.0.0.1:8000"


export default function Signup() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignup(event) {
        event.preventDefault();

        let userData = {
            username, email, password
        };
        fetch(BASE_URL + '/api/v1/auth/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
            mode: 'cors',
        })
            .then(response => response.json().then(data => {
                if (response.ok) {
                    NotificationManager.success('Welcome to Easyq! Now you can login', 'Successful!', 3000);
                    navigate("/login");
                }else{
                    NotificationManager.error(data.detail, 3000);
                }
            }))
            .catch(error => {
                console.log(error)
                NotificationManager.error("Error while signing up", "Failed", 3000);
                return;
            })
        // Create User and show dialog
    }


    return (
        <div className='grid h-full place-items-center text-center'>
            <div className='signup gap-10 grid border-2 border-black justify-center'>
                <div className='inline-grid gap-1 items-center'>
                    <Link to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </Link>
                    <h1 className='text-5xl font-bold justify-self-center'>Sign Up</h1>
                </div>
                <form action="/signup" onSubmit={handleSignup}>
                    <div className='grid gap-4'>
                        <input type="text" placeholder="Name" value={username} onChange={(event) => setUsername(event.target.value)} />
                        <input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        <input type="submit" onClick={handleSignup} value="Signup" className='cursor-pointer' />
                    </div>
                </form>
                <p>Existing User? <Link to="/login" className='link'>Login!</Link></p>
            </div>
        </div>
    )
}