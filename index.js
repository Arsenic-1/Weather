const weatherForm = document.querySelector(".weatherForm")
const cityInput = document.querySelector(".cityInput")
const card = document.querySelector(".card")
const apiKey = "e5d86a47200bcb8965f6b247e85b893f"

if (weatherForm) {
  weatherForm.addEventListener("submit", async event => {
    event.preventDefault()

    if (cityInput) {
      const city = cityInput.value

      if (city) {
        try {
          const weatherData = await getWeatherData(city)
          displayWeatherInfo(weatherData)
        } catch (error) {
          console.error(error)
          displayError(error)
        }
      } else {
        displayError("Please enter a city")
      }
    }
  })
}

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  const response = await fetch(apiUrl)

  if (!response.ok) {
    throw new Error("Could not fetch weather data")
  }

  return await response.json()
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }]
  } = data

  if (card) {
    card.textContent = ""
    card.style.display = "flex"

    const cityDisplay = document.createElement("h1")
    const tempDisplay = document.createElement("p")
    const humidityDisplay = document.createElement("p")
    const descDisplay = document.createElement("p")
    const weatherEmoji = document.createElement("p")

    cityDisplay.textContent = city
    tempDisplay.textContent = `${((temp - 273.1) * (9 / 5) + 32).toFixed(1)}F`
    humidityDisplay.textContent = `Humidity: ${humidity}%`
    descDisplay.textContent = description
    weatherEmoji.textContent = getWeatherEmoji(id)

    cityDisplay.classList.add("cityDisplay")
    tempDisplay.classList.add("tempDisplay")
    humidityDisplay.classList.add("humidityDisplay")
    descDisplay.classList.add("descDisplay")
    weatherEmoji.classList.add("weatherEmoji")

    if (card) {
      card.appendChild(cityDisplay)
      card.appendChild(tempDisplay)
      card.appendChild(humidityDisplay)
      card.appendChild(descDisplay)
      card.appendChild(weatherEmoji)
    }
  }
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId <= 232:
      return "⛈️" // thunderstorm
    case weatherId >= 300 && weatherId <= 321:
      return "🌧️" // drizzle
    case weatherId >= 500 && weatherId <= 531:
      return "☔" // rain
    case weatherId >= 600 && weatherId <= 622:
      return "❄️" // snow
    case weatherId === 701:
      return "🌫️" // mist
    case weatherId === 711:
      return "💨" // smoke
    case weatherId === 721:
      return "🌫️" // haze
    case weatherId === 731:
      return "💨" // dust or sand/dust whirls
    case weatherId === 741:
      return "🌫️" // fog
    case weatherId === 751:
      return "💨" // sand
    case weatherId === 761:
      return "💨" // dust
    case weatherId === 762:
      return "🌋" // volcanic ash
    case weatherId === 771:
      return "💨" // squalls
    case weatherId === 781:
      return "🌪️" // tornado
    case weatherId === 800:
      return "☀️" // clear
    case weatherId >= 801 && weatherId <= 810:
      return "☁️" // clouds
    default:
      return "❓"
  }
}

function displayError(error) {
  if (card) {
    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = error.message
    errorDisplay.classList.add("errorDisplay")

    card.textContent = ""
    card.style.display = "flex"
    card.appendChild(errorDisplay)
  }
}
export {}
