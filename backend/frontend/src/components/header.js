import classes from './header.module.css'
import { useNavigate, useParams, Link } from "react-router-dom";
function Header() {
    const {id} = useParams()
    return <div className={classes.display}>
        <div className={classes.logo}>
            <h3>Logo</h3>
        </div>
        <div className={classes.header}>
            <Link to={`/profiledata/${id}`}>profile</Link>
            
        </div>
        <div className={classes.header}>
        <Link to="/">Back?</Link>
            
        </div>

    </div>
}

export default Header;