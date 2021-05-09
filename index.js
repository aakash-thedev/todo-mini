var content = document.getElementById('content');
var addTaskButton = document.getElementById('add-task');

var taskBox = document.getElementById('all-task-items-box');
var CompletedtaskBox = document.getElementById('completed-task-items-box');


var allTasks = document.getElementsByClassName('task-item');
var deleteTaskButtons = document.getElementsByClassName('remove-task');
var tasksLeft = document.getElementById('task-left-count');

// ------------------ clear all tasks button ---------------------- //
var clearAllTasks = document.getElementById('complete-all-task-check');
var clearCompletedTask = document.getElementById('clear-completed-task');

// ------------------------- use recursion ----------------------- //

var clearTasksFunction = function(){

    // base case
    if(taskBox.childElementCount == 0){
        return;
    }

    taskBox.childNodes.forEach(childNode => {
        CompletedtaskBox.appendChild(childNode);
        clearTasksFunction();
    });

    // -------------------------- disable all the check boxes under completed tab -------------------------- //
    CompletedtaskBox.querySelectorAll('input[type=checkbox]').forEach(box => {

        box.setAttribute('checked', true);
        box.setAttribute('disabled', true);
    });

    updateAllTasks();
}

var clearCompletedFunction = function(){

    // base case
    if(CompletedtaskBox.childElementCount == 0){
        return;
    }

    CompletedtaskBox.childNodes.forEach(childNode => {
        CompletedtaskBox.removeChild(childNode);
        clearCompletedFunction();
    });

    updateAllTasks();
}

clearAllTasks.addEventListener('click', clearTasksFunction);
clearCompletedTask.addEventListener('click', clearCompletedFunction);


// var taskCount = 0;
// var completedTaskCount = 0;

function updateAllTasks(){
    tasksLeft.innerHTML = taskBox.childElementCount;
    document.getElementById('task-completed-count').innerHTML = CompletedtaskBox.childElementCount;
}


function createTask(){

    if(content.value.length  == 0){
        return;
    }

    var newTask = document.createElement('span');
    newTask.classList.add('task-item');
    // newTask.setAttribute('id', `task-id-${id}`);
    // id++;

        var newTaskRadio = document.createElement('input');
        newTaskRadio.setAttribute('type', 'checkbox');
        newTaskRadio.setAttribute('name', 'task-item-select');
        newTaskRadio.classList.add('radio-btn');

        newTaskRadio.onclick = function(){

            // const copyOfParentElement = this.parentElement.cloneNode(true);

            if(this.checked){

                // taskCount--;
                // completedTaskCount++;

                this.parentNode.style.textDecoration = "line-through";
                this.parentNode.style.backgroundColor = "lightgrey";
                this.parentNode.style.color = "grey";

                
                // CompletedtaskBox.appendChild(copyOfParentElement);
                CompletedtaskBox.append(this.parentElement);
                CompletedtaskBox.querySelectorAll('input[type=checkbox]').forEach(box => {
                    box.setAttribute('disabled', true);
                });

                updateAllTasks();

            }
            else{

                this.parentNode.style.textDecoration = "none";
                this.parentNode.style.backgroundColor = "white";
                this.parentNode.style.color = "black";

                // remove the child from CompletedTaskBox which has id as of copyOfParenElement;
                    // const reqId = copyOfParentElement.getAttribute('id');
                    // let elementToBeRemoved = CompletedtaskBox.querySelector(`#${reqId}`);
                    // CompletedtaskBox.removeChild(elementToBeRemoved);

                taskBox.append(this.parentElement);
                CompletedtaskBox.removeChild(this.parentElement);
                
                updateAllTasks();
                
            }
        }

        var newTaskContent = document.createElement('span');
        newTaskContent.classList.add('task-content');
        newTaskContent.innerHTML = content.value + '';

        var newRemoveTask = document.createElement('span');
        newRemoveTask.classList.add('remove-task');
        newRemoveTask.innerHTML = '&times';

        // --------------- Delete Task ----------------- //

        newRemoveTask.onclick = function(){

            const parentElement = this.parentNode;
            const thisCheckBox = parentElement.querySelector('input[type=checkbox]');

            this.parentNode.remove();

            // if(!thisCheckBox.checked){
            //     taskCount--;
            // }

            // else{
            //     completedTaskCount--;
            // }
            // const reqId = this.parentNode.getAttribute('id');
            // const completedTaskToBeDelete = CompletedtaskBox.querySelector(`#${reqId}`);
            // CompletedtaskBox.removeChild(completedTaskToBeDelete);
            updateAllTasks();
        }

    newTask.appendChild(newTaskRadio);
    newTask.appendChild(newTaskContent);
    newTask.appendChild(newRemoveTask);

    taskBox.prepend(newTask);
    // taskCount++;
    updateAllTasks();

    // first thing first
    // clear the content area
    content.value = "";

}

addTaskButton.addEventListener('click', createTask);
document.addEventListener('onload', updateAllTasks());

// ----------------------- Dynamic Tabs Faeture ------------------------ //

var task_tab_pages = document.getElementsByClassName('task-tab');
var taskPages = document.getElementById('task-pages');
var tabs = document.querySelectorAll('.tab');

tabs.forEach(clickedTab => {
    // Add onClick event listener on each tab
    clickedTab.addEventListener('click', () => {

        // Remove the active class from all the tabs (this acts as a "hard" reset)
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });

        // Add the active class on the clicked tab
        clickedTab.classList.add('active');

        // select data-for's value
        const tabForData = clickedTab.dataset.forTab;
        console.log(tabForData);
        const activateTab = taskPages.querySelector(`.task-tab[data-tab="${tabForData}"]`);


        taskPages.querySelectorAll('.task-tab').forEach(taskTab => {
            taskTab.classList.remove('tab__active');
            // console.log(taskTab);
        });

        activateTab.classList.add('tab__active');

        // console.log(activateTab);

    });
});