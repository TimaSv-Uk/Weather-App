import "./style.css";
import { icon_map } from "./iconGet";
import { getWeather } from "./weather";


navigator.geolocation.getCurrentPosition(positionSuccess, positionError)


function positionSuccess({ coords }){
  getWeather(
    coords.latitude,
    coords.longitude,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  ) 
    .then(renderWeather)
    .catch((e) => {
      console.error(e);
      alert("Error getting weather.");
    });
}

function positionError(){
  alert( "There was an error getting your location. Please allow us to use your location and refresh the page.")
}

function renderWeather({current, daily, hourly}) {
  renderCurrentWeather(current),
  renderDailyWeather(daily),
  renderHourlyWeather(hourly)
    document.body.classList.remove("blur");
}


function setValue(selector, value, { parent = document } = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value
}

function getIcon(iconCode) {
   return `${icon_map.get(iconCode)}.svg`
}
const currentIcon = document.querySelector('[data-current-icon]')
function renderCurrentWeather(current) {
  currentIcon.scr = getIcon(current.iconCode)
  document.querySelector("[data-current-temp]").textContent =
    current.currentTemp;
  document.querySelector("[data-current-high]").textContent =
    current.highTemp;
  document.querySelector("[data-current-fl-high]").textContent =
    current.highFeelsLike;
  document.querySelector("[data-current-wihd]").textContent =
    current.windSpeed;
  document.querySelector("[data-current-temp-low]").textContent =
    current.lowTemp;
  document.querySelector("[data-current-fl-low]").textContent =
    current.lowFeelsLike;
  document.querySelector("[data-current-precip]").textContent =
    current.precip;  
}



const dailySection = document.querySelector('[data-day-section]')
const dailyCard = document.querySelector('#day-card-tamplate')

function renderDailyWeather(daily) {
  dailySection.innerHTML = ""
  daily.forEach(day => {
    const element = dailyCard.content.cloneNode(true)
    setValue("temp", day.maxTemp, { parent: element })
    setValue("date", new Date(day.timestamp).toLocaleString(undefined, {  weekday: 'short' }), { parent: element })
    element.querySelector("[data-icon]").src = getIcon(day.iconCode)
    dailySection.append(element)
  })
}


const hourSection = document.querySelector('[data-hour-section]')
const hourRow = document.querySelector('#hour-row-template')


function renderHourlyWeather(hourly) {
  console.log(hourly)
  let hourlyShow = hourly.slice(0,60)
  hourSection.innerHTML = ""
  hourlyShow.forEach(hour => {
    const element = hourRow.content.cloneNode(true)
    setValue("temp", hour.temp, { parent: element })
    setValue("fl-tamp", hour.feelsLike, { parent: element })
    setValue("wind", hour.windSpeed, { parent: element })
    setValue("precip", hour.precip, { parent: element })
    setValue("date", new Date(hour.timestamp).toLocaleString(undefined, {  weekday: 'long' }), { parent: element })
    setValue("time", new Date(hour.timestamp).toLocaleString(undefined, {  hour: 'numeric' }), { parent: element })
    element.querySelector("[data-icon]").src = getIcon(hour.iconCode)
    hourSection.append(element)
  })
}