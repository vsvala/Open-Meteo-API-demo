import express from "express";
import cors from "cors"; //sallii Reactin (eri portti) kutsua backendia

const app = express();
app.use(cors());

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get("/api/weather", async (req, res) => {
  const city = req.query.city || "Helsinki";

  const geo = await fetch(
     `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
   // `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
  );
  const geoData = await geo.json();
  //console.log("geodatata", geoData);

  const place = geoData.results[0];
   // console.log("Ekaa", geoData.results[0]);
  console.log("place.latitude", place.latitude);
    console.log("place.longitude", place.longitude);

  const weather = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m`
  );
  const weatherData = await weather.json();
  console.log("weatherdata", weatherData);

  res.json({ //res.json(...) lähettää JSON-vastauksen selaimelle/frontendille.
    city: place.name,
    country: place.country,
    temperature: weatherData.current.temperature_2m
  });
});

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)