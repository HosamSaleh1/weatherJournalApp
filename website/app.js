/* Global Variables */

// Click Element
const generate = document.getElementById('generate')

// Dynamically Update Element
const datee = document.getElementById('date')
const temp = document.getElementById('temp')
const content = document.getElementById('content')

// Configrations of OpenWeatherAPI
const apiKey = 'fc4f0364d2752e832254a48e84712151'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() +'/'+ (d.getMonth()+1) +'/'+ d.getFullYear();

// Fetch weather data from OpenWeatherAPI
const fetchWeatherData = async(zipCode)=>{
    try{
        const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`
        
        const request = await fetch(url)
        const result = await request.json()
        const tempe = result.main.temp
        return tempe
        }catch(e){
            console.log(e)
        }
}

// Get request from End-Point on the Server
const getWeatherData = async()=>{
    const weatherData = await fetch('/getData')
    return weatherData
}

// Post Request To Store Data
const saveWeatherData = async(data)=>{
    try{
        const req = await fetch('/postData',{
        method:'POST',
        credentials: 'same-origin',
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
const updateUI = async ()=>{
    Const data = Await getWeatherData()
    Const allData = Await data.json()
    datee.innerHTML =  'The Date Is : ' + allData.date
    temp.innerHTML =  'The Temperature Is : ' + allData.tempe
    content.innerHTML =  'And It Feeling : ' + allData.feelings
}

// Adding Event Listener
generate.addEventListener('click',async ()=>{
        // Value Elements
        const feelings = document.getElementById('feelings').value
        const zip = document.getElementById('zip').value
        if(!zip){
            alert('Enter your zip code.')
            return
        }else if(!feelings){
            alert('Enter your feelings.')
            return
        }
        const Temperature = fetchWeatherData(zip)
        .then((Temperature)=>{
            
            saveWeatherData({date:newDate,temp:Temperature,content:feelings})
            updateUI()
        })
        .catch((e)=>{
            throw e
        })
})
