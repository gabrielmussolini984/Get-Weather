const el = document.querySelector('form');
   
el.addEventListener("submit", async (e)=>{
  e.preventDefault();
  // Convert Lower Case and Remove Invalid Character
  const city = e.target.elements[0].value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  getApi(city);
  getTopCities();
});

const getApi = value => {
  const request = $.ajax({
    url: "https://weatherapi.gabrielmussolini.com.br",
    type: "POST",
    data: {city: value},
  })
  .done(function(msg){
    $("#resultado").html(msg);
    renders(msg);
  })
}

const getTopCities = () => {
  const request = $.ajax({
    url: "https://weatherapi.gabrielmussolini.com.br/topcities",
    type: "GET"
  })
  .done(function(msg){
    $("#resultado").html(msg);
    renderTopCities(msg)
  })
}

const renderTopCities = data => {
  const elHeader = document.querySelector('.headerBox2');
  const elListTop = elHeader.lastElementChild;
  elListTop.innerHTML = '';
  data.forEach(element => {
    const elLi = document.createElement('li');
    elLi.innerHTML = element.name;
    elListTop.appendChild(elLi);
  });
}

const renders = data => {
  if (data !== 'error'){
    console.log('veio aqui')
    addDescription(data)
    attLocalStorage(data);
  }else {
    addDescription(data)
  }
}

const addDescription = data => {
  const elDescription = document.querySelector('.description');
  if (data !== 'error'){
    // Title.
    const elTitle = document.createElement('h2');
    elTitle.innerHTML = data.name;
    // SubTitle.
    const elSubTitle = document.createElement('p');
    let dateNow = (new Date(data.dt * 1000));
    let daysWeek = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
    elSubTitle.innerHTML = `${daysWeek[dateNow.getDay()]}, ${dateNow.toLocaleTimeString('en-US')}, ${data.weather[0].description} `;
    // Temperature
    const elTemp = document.createElement('span');
    const elIcone = document.createElement('img');
    elIcone.setAttribute('src',`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    elTemp.innerHTML = `${data.main.temp}°C `;
    elTemp.appendChild(elIcone);
    // Inner Description
    elDescription.innerHTML = '';
    elDescription.appendChild(elTitle);
    elDescription.appendChild(elSubTitle);
    elDescription.appendChild(elTemp);
  }else{
    const elTitle = document.createElement('h2');
    elTitle.innerHTML = 'Cidade Não Encotrada!';
    elDescription.innerHTML = '';
    elDescription.appendChild(elTitle);
  }
}

const attLocalStorage = data => {
  let storage = new Array;
  if (localStorage.length != 0){
    storage = JSON.parse(localStorage.getItem('city'));   
  }      
  if (storage.length == 5){
    storage.pop();
  }
  storage.unshift({dados: `${data.name}, ${data.main.temp}°C, ${data.weather[0].description}`, hora: new Date});
  localStorage.setItem('city', JSON.stringify(storage));
  setHistory();
}

const setHistory = () => {
  const elSection = document.querySelector('.description2');
  const elListHistory = elSection.lastElementChild;
  console.log(elListHistory)
  elListHistory.innerHTML = '';
  let local = localStorage.getItem('city');
  local = JSON.parse(local);
  
  local.forEach(element => {
    const elLi = document.createElement('li');
    console.log(new Date(element.hora))
    const date1 = new Date;
    const date2 = new Date(element.hora);
    const diff = Math.abs(date1.getTime() - date2.getTime());
    const min = Math.round(diff / (1000 * 60));
    console.log(diff / (1000 * 60 * 60))
    elLi.innerHTML = element.dados+', há '+min+' minutos';
    elListHistory.appendChild(elLi);
  });
}

window.onload = setHistory();
window.onload = getTopCities;