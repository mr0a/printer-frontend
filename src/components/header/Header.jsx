import './header.css'
import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { userDetailsContext } from '../../state/UserDetailsProvider'
import { useNavigate } from 'react-router-dom'

export default function Header() {

    const { isAuthenticated } = useContext(userDetailsContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated){
            navigate('/files');
        }
    })

    return (
        <header className="mt-12">
            <div className="grid grid-cols-2 header-box items-center">
                <div className='ml-20 text-white'>
                    <h2 className='text-6xl mb-7 max-w-xl leading-snug'>Why wait in queue while you can print in a easy way!?</h2>
                    <h3 className='text-xl mb-12 max-w-md'>We have designed this website to make it easy to print files from anywhere.</h3>
                    <Link to="/login">
                        <span className="text-black font-bold border-solid border-2 rounded-lg px-12 py-4 border-black hover:border-white hover:text-white">
                            Try Now!
                        </span>
                    </Link>
                </div>
                <div>
                    <img src="./printing-invoice.svg" alt="Printing Invoice" width="770rem" />
                </div>
            </div>
        </header>
    )
}