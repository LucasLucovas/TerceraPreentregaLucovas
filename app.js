import axios from "axios";
 
const buttonAddTask = document.getElementById("AddTask")
const buttonRemoveTask = document.getElementById("RemoveTask")
const input = document.querySelector('.input-btn input');
const listTasks = document.querySelector('.list-tasks ul');
const message = document.querySelector('.list-tasks');
let tasks = [];

eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', () => {
        tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        createHTML();
    });

    listTasks.addEventListener('click', deleteTask);
}

buttonAddTask.addEventListener('click', addTasks)
buttonRemoveTask.addEventListener('click', deleteAll)

function deleteTask(e){
    if (e.target.tagName == 'SPAN') {
        const deleteId = parseInt(e.target.getAttribute('task-id'));
        tasks = tasks.filter(task => task.id !== deleteId);
        createHTML();
    }
}

function deleteAll(){
    tasks = [];
    createHTML();
}

function addTasks(){
    const task = input.value;
    if (task === '') {
        showError('The field is empty...');
        return;
    }

    const taskObj = {
        task,
        id: Date.now()
    }
    tasks = [...tasks, taskObj]

    createHTML();
    input.value = '';
}

function createHTML(){
    clearHTML();

    if (tasks.length > 0) {
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `${task.task} <span task-id="${task.id}" >X</span>`;

            listTasks.appendChild(li);
        });
    }

    sincronizationStorage();
}

function sincronizationStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showError(error){
    const messageError = document.createElement('p');
    messageError.textContent = error;
    messageError.classList.add('error');

    message.appendChild(messageError);
    setTimeout(() => {
        messageError.remove();
    },2000);

}

function clearHTML(){
    listTasks.innerHTML = '';
}

//-------------------------------------------------------

//Fetch a Api con axios
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';
const apiKey = 'eac47e3f6961e870b5ac7f92f1d0cf97';

const getWeatherData = async (cityname) => {
    try{
        const data = await axios.get(baseUrl + `q=${cityname}&appid=${apiKey}`);
        console.log(data)
        return data;
    }catch(error) {
        throw error;
    }
}


getWeatherData("cordoba")
