window.addEventListener("load", ()=> { 

let long; 
let lat;
let temperatureDescription = document.querySelector(".temperature-description"); 
let temperatureDegree = document.querySelector(".temperature-degree");
let locationTimezone = document.querySelector(".location-timezone");
let temperatureSection = document.querySelector(".temperature"); 
const temperatureSpan = document.querySelector(".temperature span"); 

if(navigator.geolocation){ 

    navigator.geolocation.getCurrentPosition(position => { 

    long = position.coords.longitude;
    lat = position.coords.latitude;

    const proxy =  `https://cors-anywhere.herokuapp.com/`; 
    const api =`${proxy}https://api.darksky.net/forecast/dde4f9cc5e1ceef80049cfc8bd4e86a8/${lat},${long}`; 

    fetch(api).then(response=> { 
    return response.json();
    })

    .then(response => { 
    const {temperature, summary, icon} = response.currently;
//Set dom elements from API
    temperatureDegree.textContent = temperature; 
    temperatureDescription.textContent = summary;
    locationTimezone.textContent = response.timezone;
    setIcons(icon, document.querySelector(".icon"));
    //Formular for c

    let celcius = (temperature - 32)*(5/9);
//change temperature to farnheit 
temperatureSection.addEventListener("click", () => { 

if(temperatureSpan.textContent ==="F"){ 
temperatureSpan.textContent= "C"; 
temperatureDegree.textContent = Math.floor(celcius);
}
else { 
temperatureSpan.textContent = "F";
temperatureDegree.textContent = temperature;
}

});
});
}); 

} 
function setIcons(icon, iconID) { 
const skycons = new Skycons({color:"white"});
const currentIcon = icon.replace(/-/g, "_").toUpperCase(); 
skycons.play(); 
return skycons.set(iconID, Skycons[currentIcon]);
}

});