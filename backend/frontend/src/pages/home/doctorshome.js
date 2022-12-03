import Header from "../../components/header"
import classes from "./doctorshome.module.css"
import { useParams } from "react-router-dom";
import api from "../../api"
import { useState, useEffect } from "react";
import * as React from 'react'
function Doctorshome () {
    async function data() {
        const did = doctlist[0]._id
        const pid = lst[0][0]._id
        const res = api.post("/data", {
            did,
            pid,
            status,
            accepted,
            meet
        })
    }
    function print() {
        setStatus(true)
        setAccepted(true)
        console.log(accepted)
        data()
    }
    function print1() {
        setStatus(true)
        setAccepted(false)
        console.log(status)
        data()
    }
    const { id } = useParams();
    const [res,setRes] = useState('')
    const [doctlist, setDoclist] = useState('')
    const [lst, setLst] = useState('')
    const [status, setStatus] = useState(false)
    const [accepted, setAccepted] = useState(false)
    const [meet,setMeet] = useState('')
    async function fetch() {
        const res = await api.get(`/doctorshome/${id}`)
        setRes(res)
        setDoclist(res.data.doctorlist)
        setLst(res.data.lst)
        
        
        
        // console.log(lst)
    }
    useEffect(() => {
        fetch();
    }, [])
    
    if (!res) {
        return <h1>....loading</h1>
    }
    if (lst == '') {
        return <div className={classes.display}>
        <b className={classes.name}>{doctlist[0].name}</b>
        <div className={classes.card}>
            <img className={classes.img} src={doctlist[0].url} alt={doctlist[0].name} ></img>
            <div className = {classes.display2}>
                <span className = {classes.text}>
                    {doctlist[0].name}
                </span>
                <p className={classes.t1}><span className = {classes.text1}>
                    {doctlist[0].gender}
                </span>
                    
                <span className= {classes.text2}>
                 {doctlist[0].specality}
                </span></p>
                
                <b>contact</b>
                <span className= {classes.text}>
                 {doctlist[0].email}
                </span>
            </div>
            </div>
            </div>
            
    }
    return <div className={classes.display}>
        <b className={classes.name}>{doctlist[0].name}</b>
        <div className={classes.card}>
            <img className={classes.img} src={doctlist[0].url} alt={doctlist[0].name} ></img>
            <div className = {classes.display2}>
                <span className = {classes.text}>
                    {doctlist[0].name}
                </span>
                <p className={classes.t1}><span className = {classes.text1}>
                    {doctlist[0].gender}
                </span>
                    
                <span className= {classes.text2}>
                 {doctlist[0].specality}
                </span></p>
                
                <b>contact</b>
                <span className= {classes.text}>
                 {doctlist[0].email}
                </span>
            </div>
        </div>
        
        <div>
            <h2><i>Pending requests</i></h2>
            <div className={classes.pending}>
            <span>
                <b>Patient's name </b> : {lst[0][0].name}
                </span>
            <span>
                <b>Patient's gender </b> : {lst[0][0].gender}
                </span>
            <span>
                <b>Patient's Age </b> : {lst[0][0].age}
                </span>
                
                <span>
                    <b>Time slot</b> : {res.data.s1}
                </span>
                <div>
                    <input className={classes.search} type="text" placeholder="meet-link" onChange={(e) => { setMeet(e.target.value) }}></input>
                </div>
                <div className={classes.buttons}>
                    <div><button className={classes.button1} onClick={ print}>
                    accept
                </button></div>
                    <div className={classes.shift}>
                        <button className={classes.button2}
                            onClick={print1}>
                    reject
                    </button>
                </div>
                    
                </div>
        </div>

        </div>
    </div>
}
export default Doctorshome