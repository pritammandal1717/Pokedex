import './Pokemon.css'
import { Link } from 'react-router-dom';

function Pokemon({name, image, id}){
    return(
        <div className='pokemon'>
            <Link to = {`/pokemon/${id}`} style={{ textDecoration: 'none' }}>
                <div className='poke-image'><img src={image} alt={name} width={160} height={160} /></div>
                <div className='poke-name'>{name}</div>
            </Link>
        </div>
    )
}

export default Pokemon;