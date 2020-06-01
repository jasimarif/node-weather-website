//import { response } from "express";


// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })//after response is parsed into json
// }) // fetch is a browser based api which uses promises

fetch('http://localhost:3000/weather?address=karachi').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })//after response is parsed into json
}) // fetch is a browser based api which uses promises