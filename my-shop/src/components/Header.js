//// Students : Raz Butbul :319083747, Lion Miakshin :315992735
import { Link } from 'react-router-dom'
const Header = () => {//create a Header and Links to Home and Cart 
    return (
        <div className="shop-name">
            <p>
                <h1>🥯 The Good Taste by Lion and Raz </h1>
                <div className='CartAndHomelogo'> <Link to='/Cart'> 🛒 </Link>     <Link to='/'>🏠 </Link> </div>
            </p>
        </div>
    )
}
export default Header;
