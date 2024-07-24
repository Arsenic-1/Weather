const wF = document.querySelector(".weatherForm"),
      cI = document.querySelector(".cityInput"),
      c = document.querySelector(".card"),
      aK = "";

wF?.addEventListener("submit", async e => {
    e.preventDefault();
    const city = cI?.value;
    if (!city) return dE("Please enter a city");
    try {
        const { name, main: { temp, humidity }, weather: [{ description, id }] } = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${aK}`)).json();
        if (!c) return;
        c.style.display = "flex";
        c.innerHTML = `<h1>${name}</h1><p>${((temp - 273.1) * 9 / 5 + 32).toFixed(1)}F</p><p>Humidity: ${humidity}%</p><p>${description}</p><p>${gWE(id)}</p>`;
    } catch (error) {
        console.error(error);
        dE(error);
    }
});

const gWE = wId => 
    wId >= 200 && wId <= 232 ? "⛈️" :
    wId >= 300 && wId <= 321 ? "🌧️" :
    wId >= 500 && wId <= 531 ? "☔" :
    wId >= 600 && wId <= 622 ? "❄️" :
    [701, 721, 741].includes(wId) ? "🌫️" :
    [711, 731, 751, 761, 771].includes(wId) ? "💨" :
    wId === 762 ? "🌋" :
    wId === 781 ? "🌪️" :
    wId === 800 ? "☀️" :
    wId === 801 ? "🌤️" :
    wId === 802 ? "🌥️" :
    wId === 803 ? "🌦️" :
    wId === 804 ? "☁️" :
    "❓";

const dE = error => {
    if (!c) return;
    c.style.display = "flex";
    c.innerHTML = `<p>${error.message || error}</p>`;
};

export {};
