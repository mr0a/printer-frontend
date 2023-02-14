import { Link, useNavigate } from 'react-router-dom';
import './signup.css';


export default function Signup() {

    const navigate = useNavigate();

    function handleSignup() {
        console.log("Click")
        // event.preventDefault();
        // Create User and show dialog
        navigate("/login")
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
                <div className='grid gap-4'>
                    <input type="text" name="email" id="email" placeholder="Email" />
                    <input type="password" name="password" id="password" placeholder="Password" />
                    <input type="submit" onClick={handleSignup} value="Signup" className='cursor-pointer' />
                </div>
                <p>Existing User? <Link to="/login" className='link'>Login!</Link></p>
            </div>
        </div>
    )
}