//Read reference.
// let colorBtn = document.querySelectorAll(".filter_color");
let mainContainer = document.querySelector(".main_container");
let body = document.body;
let plusButton = document.querySelector(".fa-plus");

// for (let i = 0; i < colorBtn.length; i++) {
//     colorBtn[i].addEventListener("click", function (e) {
//         let color = colorBtn[i].classList[1];
//         mainContainer.style.backgroundColor = color;
//     })
// }


//Add event listener of click to plus button.
plusButton.addEventListener("click", createModal);

// create modal function
function createModal() {
    //create div of name modal_container
    let modal_container = document.createElement("div");
    //give them class name
    modal_container.setAttribute("class", "modal_container");
    //add innerHtml (Html code)
    modal_container.innerHTML = `<div class="input_container">
    <textarea class="modal_input" 
    placeholder="Enter Your text"></textarea>
</div>
<div class="modal_filter_container">
    <div class="filter pink"></div>
    <div class="filter blue"></div>
    <div class="filter green"></div>
    <div class="filter black"></div>
</div>`;
//Append child to body
    body.appendChild(modal_container);

    handleModal(modal_container);


}

function handleModal(modal_container) {
    // set current color to black
    let cColor = "black";

    let modalFilters = document.querySelectorAll(".modal_filter_container .filter");
    // modalFilters contain div.filter.pink, div.filter.blue, div.filter.green, div.filter.black

    // /remove previous attr new attrs
    // modalFilters[3].setAttribute("class", "border");

    // add border -> black(by default)
    // This is a way to add class.
    modalFilters[3].classList.add("border");

    for (let i = 0; i < modalFilters.length; i++) {
        modalFilters[i].addEventListener("click", function () {

            //    remove border from elements
            modalFilters.forEach((filter) => {
                filter.classList.remove("border");
            })

            //  add border 
            modalFilters[i].classList.add("border")

            //  current color 
            cColor = modalFilters[i].classList[1];

        })
    }

    let textArea = document.querySelector(".modal_input");
    textArea.addEventListener("keydown", function (e) {
        if (e.key == "Enter"&& textArea.value!="") {
            //  remove modal
            modal_container.remove();
            // create taskBox
            createTask(cColor, textArea.value,modalFilters);
        }
    })


}
function createTask(color, task,modalFilters) {
    let taskContainer = document.createElement("div");
    taskContainer.setAttribute("class", "task_container");
    taskContainer.innerHTML = `<div class="task_filter ${color}"></div>
    <div class="task_desc_container">
        <h3 class="uid">#example</h3>
        <div class="task_desc">${task}</div>
    </div>
</div >`;
    mainContainer.appendChild(taskContainer);

    priorityfun(color,modalFilters);
}


function priorityfun(color,modalFilters)
{
    
    let taskFilter = document.querySelectorAll(".task_filter");

    for(let j=0;j<taskFilter.length;j++)
    {
    let i=0;
    taskFilter[j].addEventListener("click",function()
    {
        let newcolor =modalFilters[i].classList[1];
        taskFilter[j].setAttribute("class", "task_filter "+newcolor);
        i=(i+1)%modalFilters.length;
    })
    }
    
}
