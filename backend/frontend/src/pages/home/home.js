import Header from "../../components/header"
import classes from "./home.module.css"
import { useParams } from "react-router-dom";
import api from "../../api"
import { useState, useEffect } from "react";
import * as React from 'react'

function Home() {
    async function print() {
        
        const res1 = await api.post('/doctorslist', {
            id,
            cat,
            slot,
        })
        setRes1(res1.data)
        console.log(res1.data)
    }
    async function send() {
        const res2 = await api.post('/response', {
            id,
            doctors,
            slot,
        })
    }
    const { id } = useParams()
    const [res, setRes] = useState('')
    const [cat, setCat] = useState('')
    const [slot, setSlot] = useState('')
    const [res1, setRes1] = useState([])
    const [doctors,setDoctors] = useState()
    async function fetch() {
        const res = await api.get('/specalists')
        
        setRes(res.data)
    }
    useEffect(() => {
        fetch();
    }, [])
    
    if (!res) {
        return <h1>....loading</h1>
    }
    
        return <div>
            <Header />
            <div className={classes.display}>
                <form className={classes.form_div}>
                
                    <p className={classes.card}>
                        <h3>Search for specality</h3>
                    </p>
                </form>
                {res.map(c => {
                    return <p className={classes.checkbox}>
                        <input type='radio' name="cat" value={c} onChange={() => {
                            setCat(c)
                        }} />
                        <div>{c}</div>
                    </p>
                })}
                <form className={classes.form_div}>
                
                    <p className={classes.card}>
                        <h3>Time slots</h3>
                    </p>
                </form>
                <div className={classes.slot}>
                    <input type='radio' name="slot" onChange={() => {
                        setSlot('ts1')
                    }}></input>
                    <p className={classes.smallcard}>10-12</p>
                
                </div>
                <div className={classes.slot}>
                    <input type='radio' name="slot" onChange={() => {
                        setSlot('ts2')
                    }}></input>
                    <p className={classes.smallcard}>14-16</p>
                
                </div>
                <div className={classes.slot}>
                    <input type='radio' name="slot" onChange={() => {
                        setSlot('ts3')
                    }} ></input>
                    <p className={classes.smallcard}>18-20</p>
                
                </div>
                <div >
                    <button className={classes.div_button} onClick={print}>submit</button>
                </div>
                <form className={classes.form_div}>
                
                <p className={classes.card}>
                    <h3>Filtered doctors</h3>
                </p>
                </form>
                {res1.map(c => {
                    return <p className={classes.checkbox}>
                        <input type='radio' name="name" value={c} onChange={() => { setDoctors(c) }}
                        />
                        <div>Dr {c.name}</div>
                    </p>
                })}
                <div >
                    <button className={classes.div_button} onClick={send}>Select doctor</button>
                </div>
            </div>
            
        </div>
    

    
}
export default Home