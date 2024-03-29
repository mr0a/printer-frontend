import './navbar.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { userDetailsContext } from '../../state/UserDetailsProvider'
import UserMenu from '../user_menu/UserMenu';


function Navbar() {

    const { userDetails, isAuthenticated } = useContext(userDetailsContext);

    console.log(userDetails);
    console.log(`User logged in ${isAuthenticated}`);

    if (!isAuthenticated) {
        return (
            <nav>
                <div className="grid grid-cols-3 justify-items-center items-center">
                    <img src="/logo.png" alt="Easyq Logo" className="logo justify-self-start"></img>
                    <div className='grid gap-6 grid-cols-4 grid-rows-1 nav-menu justify-items-center'>
                        <Link><p>Home</p></Link>
                        <Link><p>Features</p></Link>
                        <Link><p>Contribute</p></Link>
                        <Link><p>Contact</p></Link>
                    </div>
                    <div className='flex gap-2'>
                        <Link to="/signup">
                            <div className='justify-self-end'>
                                <p className='sign-up-btn border-solid border-2 rounded-lg'>Sign Up</p>
                            </div>
                        </Link>
                        <Link to="/login">
                            <div className='justify-self-end'>
                                <p className='sign-up-btn border-solid border-2 rounded-lg'>Login</p>
                            </div>
                        </Link>
                    </div>
                </div>

            </nav>
        )
    }

    return (
        <nav>
            <div className="grid grid-cols-2 justify-items-center items-center">
                <img src="/logo.png" alt="Easyq Logo" className="logo justify-self-start"></img>
                <div className='grid grid-cols-3 grid-rows-1 nav-menu justify-items-center items-center'>
                    <Link to="/files">
                        Files
                    </Link>
                    <Link to="/orders">
                        Orders
                    </Link>
                    <div className='justify-self-end'>
                        <UserMenu username={userDetails.username} credits={userDetails.credits} />
                    </div>
                </div>
            </div>

        </nav>
    )
}

export default Navbar;