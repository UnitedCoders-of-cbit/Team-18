import { useState } from "react";
import classes from "./patientlogin.module.css"
import logo from "./doct1.png"
import api from "../../api";
import { Link, useNavigate } from "react-router-dom";
import FlashMessage from 'react-flash-message'
function Doctorlogin() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function check() {
        const res = await api.post("/doctorlogin", {
            email,
            password,
        })
        if (res.data.val == true) {
            navigate(`/doctorshome${res.data.id}`)
        }
        else {
            console.log("error")
        }
    }
    return <div className={classes.body}>
        <div className={classes.div}>
            <div className={classes.mainbody}>
                
                <form className={classes.from_div}>
                <span className={classes.para}>
                    <h3 >Welcome to Doctors on call </h3>
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
                    <button className={classes.button} type="button" onClick={check}>submit</button>
                    <Link to = "/doctorsignup">New user?</Link>
                
            </form>
            
        </div>
        <div>
                <img src={logo} className={classes.logo} />
        </div>
        
    </div>
    </div>
}
export default Doctorlogin
