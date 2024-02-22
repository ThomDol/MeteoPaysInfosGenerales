let url = "https://restcountries.com/v3.1/all";

let button = document.getElementById('button');
let input = document.getElementById('lettre');

input.addEventListener('keyup', afficher);


async function afficher() {
    let toRemove = document.querySelectorAll('.box');
    if (input.value) {

        toRemove.forEach(element => { element.remove(); });
        await fetch(url).then(response => {
            return response.json();
        })
            .then(data => {
                let resTot = data;
                resFiltered = resTot.filter(res => capitalizeFirstLetter(res.name.common).includes(capitalizeFirstLetter(input.value)));
                for (i = 0; i < resFiltered.length; i++) {
                    let box = document.createElement('div');
                    box.classList.add('col-3');
                    box.classList.add('box');
                    box.classList.add('text-center');
                    box.classList.add('mx-auto');
                    box.classList.add('ms-3');
                    box.classList.add('me-3');
                    let card = document.createElement('div');
                    let body = document.createElement('div');
                    let weather = document.createElement('p');
                    let map = document.createElement('div');
                    map.classList.add('map');
                    map.id = 'map' + i;
                    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + resFiltered[i].capital + "," + resFiltered[i].cca2 + "&lang=fr&units=metric&APPID=c6d95fe0c1ce7fa84a6cddfe533bfd94";
                    fetch(url).then(response => {
                        return response.json();
                    })
                        .then(data => {
                            let lat = data.coord.lat;
                            let long = data.coord.lon;
                            weather.textContent = "Temperature actuelle : " + data.main.temp;
                            map = L.map(map.id).setView([lat, long], 3);
                            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                maxZoom: 19,
                                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            }).addTo(map);
                            let marker = L.marker([lat, long]).addTo(map);
                        })
                        .catch(error => { console.error(error); })
                    let title = document.createElement('h1');
                    title.textContent = resFiltered[i].name.common;
                    let data1 = document.createElement('p');
                    data1.textContent = "Capitale : " + resFiltered[i].capital;
                    let data2 = document.createElement('p');
                    data2.innerHTML = "<img src=" + resFiltered[i].flags.png + " class=\"image\">";
                    let data3 = document.createElement('p');
                    data3.textContent = "Population : " + resFiltered[i].population;
                    let data4 = document.createElement('p');
                    data4.textContent = "Surface : " + resFiltered[i].area;

                    body.appendChild(title);
                    body.appendChild(data1);
                    body.appendChild(data2);
                    body.appendChild(data3);
                    body.appendChild(data4);
                    body.appendChild(weather);
                    body.appendChild(map);
                    card.appendChild(body);
                    box.appendChild(card);
                    document.getElementById('end').appendChild(box);
                }
            })


            .catch(error => { console.error(error); })
    }


}


function capitalizeFirstLetter(input) {
    if (input.length = 1) { return input.toUpperCase(); }
    else {
        return input.charAt(0).toUpperCase() + input.substring(1).toLowerCase();
    }
}