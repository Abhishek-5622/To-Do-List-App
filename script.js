// ******************************************JavaScript Code*******************************************

//this line is used to find error.
'use strict';

//Store Reference 
let colorBtn = document.querySelectorAll(".filter_color");
let mainContainer = document.querySelector(".main_container");
let bothElementsArr = document.querySelectorAll(".icon-container");
let crossBtn = bothElementsArr[1]
let plusButton = bothElementsArr[0];
let body = document.body;

//if deleteState is false => cross button is not press.
//if deleteState is true => cross button is press.
let deleteState = false;

//empty array list 
let taskArr = [];

//data of local storage is displayed in screen.  
//if allTask name is present in localStorage then this loop run.
if (localStorage.getItem("allTask")) {
    //Convert into JSOn
    taskArr = JSON.parse(localStorage.getItem("allTask"));
    // UI
    for (let i = 0; i < taskArr.length; i++) {
        //array of object is store in local storage
        let { id, color, task } = taskArr[i];
        createTask(color, task, false, id);
    }
}

//Add event listener
plusButton.addEventListener("click", createModal);
crossBtn.addEventListener("click", setDeleteState);

// function that use to create modal .
function createModal() {
    // create modal
    let modalContainer = document.querySelector(".modal_container");
    //if modal is not created.
    if (modalContainer == null) {
        //create div
        modalContainer = document.createElement("div");
        //set class
        modalContainer.setAttribute("class", "modal_container");
        //Add html
        modalContainer.innerHTML = `<div class="input_container">
        <textarea class="modal_input" 
        placeholder="Enter Your text"></textarea>
    </div>
    <div class="modal_filter_container">
        <div class="filter pink"></div>
        <div class="filter blue"></div>
        <div class="filter green"></div>
        <div class="filter black"></div>
    </div>`;
    //Append child
        body.appendChild(modalContainer);

        handleModal(modalContainer);
    }
    let textarea = modalContainer.querySelector(".modal_input");
    //content of modal box remove
    textarea.value = "";
}

// function that use to handle modal (add text in modal) .
function handleModal(modal_container) {
    //default color = black
    let cColor = "black";

    let modalFilters = document.querySelectorAll(".modal_filter_container .filter");

    // /remove previous attr new attrs
    // modalFilters[3].setAttribute("class", "border");

    // border -> black
    modalFilters[3].classList.add("border");
    for (let i = 0; i < modalFilters.length; i++) {
        modalFilters[i].addEventListener("click", function () {
            //    remove broder from elements
            modalFilters.forEach((filter) => {
                filter.classList.remove("border");
            })
            //  add border
            modalFilters[i].classList.add("border")
            //  color 
            cColor = modalFilters[i].classList[1];
            // console.log("current color of task", cColor);
        })
    }
    let textArea = document.querySelector(".modal_input");
    textArea.addEventListener("keydown", function (e) {
        if (e.key == "Enter" && textArea.value != "") {
            console.log("Task ", textArea.value, "color ", cColor);
            //  remove modal
            modal_container.remove();
            // create taskBox
            createTask(cColor, textArea.value, true);

        }
    })


}

// function that use to create task .
function createTask(color, task, flag, id) {
    let taskContainer = document.createElement("div");
    //generate short unique ID
    let uifn = new ShortUniqueId();

    //if id is given then uid = id ,else uid=uifn(); 
    let uid = id || uifn();

    taskContainer.setAttribute("class", "task_container");
    taskContainer.innerHTML = `<div class="task_filter ${color}"></div>
    <div class="task_desc_container">
        <h3 class="uid">#${uid}</h3>
        <div class="task_desc" contenteditable="true" >${task}</div>
    </div>
</div >`;

    mainContainer.appendChild(taskContainer);
    let taskFilter = taskContainer.querySelector(".task_filter");
    //if flag is true , it means new task is create
    //if flag is false, it mean previous task ( that are save in local storage) are create in UI.
    if (flag == true) {
        let obj = { "task": task, "id": `${uid}`, "color": color };
        //add task to array
        taskArr.push(obj);
        //convert array data into string
        let finalArr = JSON.stringify(taskArr);
        //add task to local storage
        localStorage.setItem("allTask", finalArr);
    }
    //Add event listener
    taskFilter.addEventListener("click", changeColor);
    taskContainer.addEventListener("click", deleteTask);
    
    let taskDesc = taskContainer.querySelector(".task_desc");
    taskDesc.addEventListener("keypress", editTask);
}

// function that use to change color of priority bar .
function changeColor(e) {
    //  e.currentTarget => add event listener 
    // e.target => event occur 
    let taskFilter = e.currentTarget;
    //Array of color
    let colors = ["pink", "blue", "green", "black"];
    //Current color
    let cColor = taskFilter.classList[1];
    //Get current colour index
    let idx = colors.indexOf(cColor);
    //get new color in circular manner
    let newColorIdx = (idx + 1) % 4;
    //remove current color
    taskFilter.classList.remove(cColor);
    // add new color
    taskFilter.classList.add(colors[newColorIdx]);
}

// function that use to delete state .
function setDeleteState(e) {
    let crossBtn = e.currentTarget;
    if (deleteState == false) {
        //it change color of cross box if deletestate is false
        crossBtn.classList.add("active");
    } else {
        crossBtn.classList.remove("active");
    }
    //toggle the delete state
    deleteState = !deleteState;
}

// function that use to delete task .
function deleteTask(e) {
    let taskContainer = e.currentTarget;
    if (deleteState) {
        // local storage search -> remove
        let uidElem = taskContainer.querySelector(".uid");
        //get id without #
        let uid = uidElem.innerText.split("#")[1];
        for (let i = 0; i < taskArr.length; i++) {
            let { id } = taskArr[i];
            // if id and uid is same
            if (id == uid) {
                taskArr.splice(i, 1);
                //convert into string
                let finalTaskArr = JSON.stringify(taskArr);
                //save changes in local storage
                localStorage.setItem("allTask", finalTaskArr);
                //remove task from UI
                taskContainer.remove();
    
                break;
            }
        }
    }
}

// function that use to edit task .
function editTask(e) {
    let taskDesc = e.currentTarget;
    let uidElem = taskDesc.parentNode.children[0];
    //get id without #
    let uid = uidElem.innerText.split("#")[1];
    for (let i = 0; i < taskArr.length; i++) {
        let { id } = taskArr[i];
        // if id and uid is same
        if (id == uid) {
            taskArr[i].task = taskDesc.innerText
            //convert into string
            let finalTaskArr = JSON.stringify(taskArr);
            //save changes in local storage
            localStorage.setItem("allTask", finalTaskArr);

            break;
        }
    }
}