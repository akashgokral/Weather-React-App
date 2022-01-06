import { useState } from 'react';
import axios from 'axios';
import './App.css';

let apikey = '32eebe6e02a23d3b5ad19d9f19b18710'
const current = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const date = `${day[current.getDay()]} ${current.getDate()}th ${monthNames[current.getMonth()]} ${current.getFullYear()}`;


function App() {

  const [city, setcity] = useState('')
  const [weather, setweather] = useState({})

  const handlecity = e => {
    setcity(e.target.value);
  }

  const handleweather = (e) => {
    e.preventDefault()
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apikey}`

    axios.get(url)
      .then((response) => {
        setweather(response.data)
        setcity('')
        console.log(weather)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  return (
    <div className='maindiv'>
      <div className='overlay'>
        <div className='seconddiv'>
          <form onSubmit={handleweather}>
            <input type='text' placeholder='Search...' value={city} onChange={handlecity} required />
            <input type='submit' value='Search' />
          </form>
        </div>

        {
          (typeof weather.main != 'undefined') ? (
            <div>
              <div className='dynamic'>
                <div className='city'><h1>{weather.name}</h1></div>
                <div className='date'><h3>{date}</h3></div>
                <div className='degree'><h1>{Math.round(weather.main.temp)}&deg;C</h1></div>
              </div>
            </div>
          ) : (<div className='nodata'><h1>Enter a Location</h1></div>)
        }
      </div>
    </div >
  );
}

export default App;
