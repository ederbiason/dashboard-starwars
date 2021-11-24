const charactersCounter = document.getElementById("characters");
const moonsCounter = document.getElementById("moons");
const planetsCounter = document.getElementById("planets");
const spaceshipsCounter = document.getElementById("spaceships");

fillCounters()
fillTable()

function fillCounters() {
    Promise.all([swapiGet('people/'),
    swapiGet('vehicles/'),
    swapiGet('planets/'),
    swapiGet('starships/')])
        .then(function (results) {
            charactersCounter.innerHTML = results[0].data.count;
            moonsCounter.innerHTML = results[1].data.count;
            planetsCounter.innerHTML = results[2].data.count;
            spaceshipsCounter.innerHTML = results[3].data.count;
        });
}

async function fillTable() {
    const response = await swapiGet('films/');
    const tableData = response.data.results;

    tableData.forEach(film => {
        $('#filmsTable').append(`<tr>
        <td>${film.title}</td>
        <td>${moment(film.release_date).format("DD/MM/YYYY")}</td>
        <td>${film.director}</td>
        <td>${film.episode_id}</td>
        </tr>`);
    })
}

// Param = Parameter
function swapiGet(param) {
    // Make a request for a user with a given ID
    return axios.get(`https://swapi.dev/api/${param}`)
}

// Google Charts
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
    const response = await swapiGet('vehicles/');
    const vehiclesArray = response.data.results

    const dataArray = [];
    dataArray.push(["Vehicles", "Passengers"])
    vehiclesArray.forEach(vehicle => {
        dataArray.push([vehicle.name, Number(vehicle.passengers)])
    })

    var data = google.visualization.arrayToDataTable(dataArray);

    var options = {
        title: 'Most used vehicles',
        legend: 'none'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}

// // Show modal
// function showPopup(id) {
//     document.getElementById(id).style.visibility = "visible";
//     document.getElementsByClassName("modal").style.visibility = "visible";
  
//     document.getElementById(id).setAttribute("class", "modal__container");
// }
  
// // Hide modal
// function hidePopup(id) {
//     document.getElementById(id).style.visibility = "hidden";
//     document.getElementsByClassName("modal").style.visibility = "hidden";
  
//     document.getElementById(id).setAttribute("class", "modal__container");
// }

function startModal(modalID) {
    const modal = document.getElementById(modalID);
    if(modal) {
        modal.classList.add("show__modal");
        modal.addEventListener("click", (e) => {
            if(e.target.id == modalID || e.target.className == "close") {
                modal.classList.remove("show__modal")
            }
        })
    }
}

const dashboard = document.getElementById("modal")
dashboard.addEventListener('click', () => startModal())