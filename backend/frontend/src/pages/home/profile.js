import Header from "../../components/header"
import classes from "./profile.module.css"
import { useParams } from "react-router-dom";
import api from "../../api"
import { useState, useEffect } from "react";
import * as React from 'react'
function Profile() {
    const [pats, setpat] = useState([])
    const [dict1,setDict] = useState({})
    const [l, setL] = useState([])
    const [res, setRes] = useState([])
    const [res1, setG] = useState([])
    const { id } = useParams()
    async function fetch() {
        const res = await api.get(`/patientdata/${id}`)
        setG(res.data.g)
        setRes(res.data.l)
        console.log(res1)
        console.log(res)
        console.log(res.data.l)

        setpat(res.data.patientlist[0])
        
        
        
        
    }
    useEffect(() => {
        fetch();
    }, [])
    if (res == {} || res1 == []) {
        return <h1>...loading</h1>
    }
    return <div className={classes.display}>
        <b className={classes.name}>{pats.name}</b>
        <div className={classes.card}>
            <img className={classes.img} src={pats.url} alt={pats.name} ></img>
            <div className={classes.display2}>
                <span className={classes.text}>
                    {pats.name}
                </span>
                <p className={classes.t1}><span className={classes.text1}>
                    {pats.gender}
                </span>
                </p>
                
                
                <b>contact</b>
                <span className={classes.text}>
                    {pats.email}
                </span>
            </div>
            
        </div>
        <div>
            <b>History</b>
            
        
            
                {res1.map(function(name){
                    return <div className={classes.cards}>
                        <div className={classes.display3}>
                            Doctor's name:{res[name][0]}
                           
                        </div>
                        <div className={classes.display3}>
                            
                            Doctor's speciality :{res[name][1]}
                        </div>
                        <div className={classes.display3}>
                            time slot :{res[name][2]}
                        </div>
                        <div className={classes.display3}>
                            meet-link :<a href={res[name][3]}>{res[name][3]}</a>
                        </div>
                        
                    </div>;
                  })}
           
        
    
            </div>
        </div>
}


export default Profile