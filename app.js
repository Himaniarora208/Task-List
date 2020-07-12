//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection'); // ul
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//List of all Event Listeners
loadEventListeners(); // calling of a function


//Load all Event Listeners
function loadEventListeners() {
    document.addEventListener('DOMContentLoaded',getTasks);
    //Add task event
    form.addEventListener('submit', addTask); 
    //remove task event
    taskList.addEventListener('click', removeTask);
    //Clear all tasks
    clearBtn.addEventListener('click', clearTasks);
    //filters tasks event
    filter.addEventListener('keyup', filterTasks);
}

//Get tasks from Local Storage
function getTasks(){
    let tasks; 
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task){
        //create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);
    //add li to ul
    taskList.appendChild(li);


    });
}

//addTask()
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }

    //create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);
    //add li to ul
    taskList.appendChild(li);

    //Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);
    
    //clear input
    taskInput.value = '';
    e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task){
    let tasks; 
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));


}

//Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure')) {
            e.target.parentElement.parentElement.remove();
        

        //Remove from LOcal Storage
        removeTaskFromLocalStorage( e.target.parentElement.parentElement);
        }
    }
}


//Remove From Local Storage
function removeTaskFromLocalStorage(taskItem){
    let tasks; 
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
if(taskItem.textContent ===task){
    tasks.splice(index,1);
}
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));

}
//clear All Tasks
function clearTasks() {
    taskList.innerHTML = '';

//Clear the Local Storage
clearTaskFromLocalStorage();
}

//Clear Tasks From Local Storage
function clearTaskFromLocalStorage(){
    localStorage.clear();
}



//Filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }
        else {
            task.style.display = 'none';
        }
    });
}