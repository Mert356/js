const apiKey = "Yout api key";
const myButton = document.getElementById("get");
const result = document.getElementById("result");
const nameId = document.getElementById("name");
const humidity = document.getElementById("humidity");
const temperature = document.getElementById("temperature");
const clouds = document.getElementById("clouds");
const img = document.getElementById("img");
const errorContainer = document.getElementById("error");

myButton.addEventListener("click",()=>{
    let cityName = document.getElementById("input").value.trim();
    cityName = cityName.slice(0,1).toUpperCase() + cityName.slice(1).toLowerCase();

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(url).then(response =>{
        if(!response.ok){
            throw new Error("Something went wrong");
        }
        return response.json();
    }).then(value =>{
        result.style.visibility = "visible";
        errorContainer.style.visibility = "hidden";
        img.style.visibility = "visible";
        console.log(value);

        nameId.textContent = cityName;
        temperature.textContent = (value.main.temp - 273.15).toFixed(1) + " °C";
        humidity.textContent = "Humidity: " + value.main.humidity + "%";
        clouds.textContent = value.weather[0].description;

        img.src = `https://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`;
    }).catch(error => {
        console.error(error);
        result.style.visibility = "hidden";
        errorContainer.style.visibility = "visible";
        img.style.visibility = "hidden";
    });
});