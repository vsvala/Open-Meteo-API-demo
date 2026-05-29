import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [city, setCity] = useState("Helsinki");
  const [data, setData] = useState(null);
  //const [loading, setLoading] = useState(false);
  //const [error, setError] = useState("");



 async function getWeather() {
   const res = await fetch(
     `http://localhost:3001/api/weather?city=${city}`
   );
   const json = await res.json();
   setData(json);
 }



  return (
    <>
      <section id="center">

   <div style={{ padding: 20 }}>
     <h1>Weather App</h1>

     <input value={city} onChange={e => setCity(e.target.value)} />
     <button onClick={getWeather}>Hae sää</button>

     {data && (
       <div>
         <h2>{data.city}</h2>
         <p>{data.temperature} °C</p>
       </div>
     )}
   </div>

          {/*   <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
      <img src={viteLogo} className="vite" alt="Vite logo" />
        </div> */}
        <div>
          <h1>Weather today</h1>
          <p>
            Testataan Open-meteo API:sta säätietojen ja paikan hakua forecast ja geolocatio apista ja sitten laitetaan sovellus docker konttiin pyörimään.
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
       <div id="docs">
         {/*   <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                //<img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p> */}
          <ul>
            {/* <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li> */}
          
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
