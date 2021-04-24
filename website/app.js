/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=c86f01ccdec8fff8e91969ab634364fa';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//Add event listener in a existing HTML element
document.getElementById('generate').addEventListener('click', performAction);

//Callback function chaining promises 
function performAction(e){
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(baseURL, newZip, apiKey)
        //function to POST all data from API and from user input, on server
        .then(function(data){
            console.log('API object received by the getWeather, showing in the promise chaining function', data);
            postData('/add', {temp: data.main.temp, date: newDate, feeling: feelings})
            updateUI();
        })
}

//GET call to API
const getWeather = async(baseUrl, zip, key)=>{

    const res = await fetch(baseUrl + zip + key)

    try{
        const data = await res.json();
        console.log('API object received by the getWeather function',data);
        return data;
    }catch(error){
        console.log('Error getting object from API', error);
    }
}

//POST request client side
const postData = async (url='', data={})=>{

    const response = await fetch(url, {
        method: 'POST',
        credential: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) //transform data into string to server side
    });

    try{
        const newData = await response.json();
        console.log('Data saved on the server:', newData);
        return newData;
    }catch(error){
        console.log('Error creating object for server side', error);
    }
}

//Async function to update UI
const updateUI = async ()=> {

    const request = await fetch('/all');

    try{
        const allData = await request.json();
        console.log('Object retrieved from the server', allData);
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.userResponse;
    }catch(error){
        console.log('Error when updating the UI', error);
    }
}
