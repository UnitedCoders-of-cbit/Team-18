import { useState } from "react";
import classes from "./patientsignup.module.css"
import logo from "./doct1.png"
import api from "../../api"
import { useNavigate,Link } from "react-router-dom";

function Patientsignup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState();
    const [img, setImage] = useState();
   const insert = async(e)=> {
       
       try {
           const res = await api.post('/patientsignup', {
               email,
               password,
               name,
               gender,
               age,
               img,
           }) 
           navigate('/')
       }
       catch (err) {
           console.log(err)
       }
    }
    return <div className={classes.body}>
        <div className={classes.div}>
            <div className={classes.mainbody}>
                
                <form className={classes.from_div}>
                <span className={classes.para}>
                        <h3 >Welcome to Doctors on call </h3>
                        <h3 >
                        Fill the following details to signup
                    </h3>
                    </span>
                    
                    <span>
                        Email
                    </span>
                    
                    <input className={classes.input} type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)}></input>
                    <br/>
                    <span>
                        Password
                    </span>
                    
                    <input className={classes.input} type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}></input>
                    <br />
                    <span>
                        Username
                    </span>
                    <input className={classes.input} type="text" placeholder="Name" required onChange={(e) => setName(e.target.value)}></input>
                    <br></br>
                    <span>
                        Gender
                    </span>
                    <input className={classes.input} type="text" placeholder="Gender" required onChange={(e) => setGender(e.target.value)}></input>
                    <br />
                    <span>
                        Age
                    </span>
                    <input className={classes.input} type="text" placeholder="Age" required onChange={(e) => setAge(e.target.value)}></input>
                    <br />
                    <span>
                        Image
                    </span>
                    <input className={classes.input} type="text" placeholder="image" required onChange={(e) => setImage(e.target.value)}></input>
                    <button className={classes.button} type="button" onClick={insert}>submit</button>
                    <Link to="/doctorlogin">Back?</Link>
                    <Link to = "/">logout?</Link>
            </form>
            
        </div>
        <div>
                <img src={logo} className={classes.logo} alt="doctor"/>
        </div>
        
    </div>
    </div>
}
export default Patientsignup