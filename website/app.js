/* Global Variables */
const { patch } = require('request')
const request = require('request')
// Value Elements
const zip = document.getElementById('zip')
const feelings = document.getElementById('feelings')
// Click Element
const generate = document.getElementById('generate')
// Dynamically Update Elements
const date = document.getElementById('date')
const temp = document.getElementById('temp')
const content = document.getElementById('content')
// Configrations of OpenWeatherAPI
const apiKey = 'fc4f0364d2752e832254a48e84712151'
const url = 'api.openweathermap.org/data/2.5/weather'
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Fetch weather data from OpenWeatherAPI
const weatherFetch = async(site,APIKey,Zip)=>{
    try{
        const request = await fetch(
        `${site}?zip=${Zip}&appid=${APIkey}`
    )
    const result = await request.json()
    const {main:{temp}} = result
    return temp
        }catch(e){
            throw e
        }
}

// Post Request To Store Data
const saveData = async(path,data)=>{
    try{
        await fetch(path,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data),
        })
    }catch(e){
        throw e
    }
}

// Dynamically Update UI
const updateUI = async(temperature,newDate,feelings)=>{
    date.innerText = newDate
    temp.innerText = temperature
    content.innerText = feelings
}

// Adding Event Listener

generate.addEventListener('click',()=>{
    weatherFetch(url,apiKey,zip.value)
    .then(temp=>{
        return (date:newDate,temp,content:feelings.value)
    })
    .then(data=>{
        saveData('api/projectData',data)
        return date
    })
    .then(({temp,date,content})=>updateUI(temp,date,content))
    .catch(e=>{
        console.error(e)
    })
})