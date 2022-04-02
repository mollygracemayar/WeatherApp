const form = document.querySelector(".top-banner form");
const input = document.querySelector("#citySearch");
const list= document.querySelector(".cities")
form.addEventListener("submit", e => {
  e.preventDefault();
 

  const apiKey = "20f0c4153c50e1630bfa728eec53e6ea";
  const inputVal = input.value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())

    .then(data => {
      
      console.log(data);
      const { main, name, sys, weather, coord } = data;
      const{lat,lon}=coord
      const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]
        }@2x.png`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
    <h2 class="city-name" data-name="${name},${sys.country}">
      <span>${name}</span>
      <sup>${sys.country}</sup>
    </h2>
    <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup>
    </div>
    <figure>
      <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
      <figcaption>${weather[0]["description"]}</figcaption>
    </figure>
  `;
      li.innerHTML = markup;
      list.appendChild(li);

      
      form.reset();
      input.focus();

      const listItems = list.querySelectorAll(".ajax-section.city");
      const listItemsArray = Array.from(listItems);

      if (listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter(el => {
          let content = "";
          if (inputVal.includes(",")) {
            if (inputVal.split(",")[1].length > 2) {
              inputVal = inputVal.split(",")[0];
              content = el.querySelector(".city-name span").textcontent.toLowerCase();
            } else {
              content = el.querySelector(".city-name").dataset.name.toLowerCase();
            }
          } else {
            content = el.querySelector(".city-name span").textcontent.toLowerCase();
          }
          return content == inputVal.toLowerCase();
        });
        if (filteredArray.length > 0) {
          msg.textContent = `You already know the weather for ${filteredArray[0].querySelector(".city-name span").textContent
            } ...otherwise be more specific by providing the country code as well `;
          form.reset();
          input.focus();

        }
      }
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
.then(response=> response.json())
.then(data=>{
  const daily= data.daily
  console.log(daily)
  for(i=0;i<daily.length;i++){
    console.log(daily[i])
    const uvIndex=daily[i].uvi
    console.log(uvIndex);
    const windSpeed=daily[i].wind_speed
    const humidityIndex=daily[i].humidity
    const tempIndex=Math.round(parseInt(daily[i].temp.day)-273.15)
    const weatherCon=daily[i].main

const liDaily= document.createElement("li")
liDaily.classList.add("city")
const tempDiv=document.createElement("div")
tempDiv.textContent="temperture: " +tempIndex
const uvDiv=document.createElement("div")
uvDiv.textContent="uv:"+uvIndex
const windDiv=document.createElement("div")
windDiv.textContent="windspeed:"+windSpeed
const humidityDiv=document.createElement("div")
humidityDiv.textContent="humidity:"+humidityIndex
const weatherDiv=document.createElement("div")
weatherDiv.textContent="weather Conditions:"+weatherCon

liDaily.appendChild(tempDiv)
liDaily.appendChild(uvDiv)
liDaily.appendChild(windDiv)
liDaily.appendChild(humidityDiv)
liDaily.appendChild(weatherDiv)
list.appendChild(liDaily)
  }

})
    })
    .catch((error) => {
      console.log(error)
      alert("Please search for a valid city")

    });

});