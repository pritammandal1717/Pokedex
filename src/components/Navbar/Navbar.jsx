import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar(){
    return(
        <div className='navbar'>
            <Link to= "/" style={{textDecoration : 'none'}}><h1 className="header">Pokedex</h1></Link>
            <span className='header-child'>The Pokemon World</span>
        </div> 
    );
}

export default Navbar;