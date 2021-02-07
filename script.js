let input = document.querySelector("#inputValue");
const plusIcon = document.querySelector(".fa-plus-circle");
const buttons = document.querySelector(".buttons");
const allBtn = buttons.querySelector(".all");
const completeBtn = buttons.querySelector(".complete");
const incompleteBtn = buttons.querySelector(".incomplete");
const ul = document.querySelector("ul");
let todos;
let List = [];
let id = 0;

function inputHandler(e){
    e.preventDefault();
    const inputValue = input.value;
    if(typeof inputValue == "undefined" || inputValue == null || inputValue == ""){
        return;
    }else{
        const li = document.createElement("li");
        const check = document.createElement("button");
        const leftList = document.createElement("div");
        // leftList.classList.add("leftList");

        // check.className = "dynamicBtn checkBtn";
        // check.innerHTML = `<i class="fas fa-check"></i>`;
        // leftList.appendChild(check);
        // const span = document.createElement("span");
        // span.className = "dynamicText";
        // span.innerHTML = `${inputValue}`;
        // leftList.appendChild(span);
        // li.appendChild(leftList);

        const item =
        `<div class="leftList">
            <button class="dynamicBtn checkBtn"><i class="fas fa-check"></i></button>
            <span class="dynamicText">${inputValue}</span>
        </div>
        <button class="dynamicBtn editBtn"><i class="fas fa-edit"></i></button>
        <button class="dynamicBtn trashBtn"><i class="fas fa-trash-alt"></i></button>
        `;
        li.innerHTML =`${item}`;
        ul.appendChild(li);

        //saveLocalStorage(`${inputValue}`);

        // const editBtn = document.createElement("button");
        // editBtn.className="dynamicBtn editBtn";
        // editBtn.innerHTML = `<i class="fas fa-edit"></i>`;
        // li.appendChild(editBtn);
        // const trashBtn = document.createElement("button");
        // trashBtn.className="dynamicBtn trashBtn";
        // trashBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;
        // li.appendChild(trashBtn);
        // ul.appendChild(li);
        input.value="";
        }
}

function editBtnHandler(e){
    e.preventDefault();
    const clickedBtn = e.target;

    if(clickedBtn.classList.contains("fa-edit")){
        if(confirm("수정하시겠습니까?")){
            // li
            const list = clickedBtn.parentNode.parentNode;
            const div = list.childNodes[0];
            console.log(clickedBtn.parentNode.parentNode);
            console.log(list.childNodes[0]);
            console.log(list.childNodes[1]);
            console.log(list.childNodes[2]);
            
            //console.log(list);
            // edit 버튼 누르면 새 input창 생성함
            const dynamicInput = document.createElement("input");
            // 이 때 당시의 li의 text값을 변수에 담음(addEventLister의 조건문에 활용)
            const ListText = div.childNodes[1].innerText;
            // 기존 li의 text값을 새 input의 값에 넣음
            dynamicInput.value = ListText;
            // 로컬스토리지에서 지운 li의 text값 삭제
            const index = todos.indexOf((div.childNodes[1].innerText));
            deleteLocalStorage(div.childNodes[1].innerText);
            // 기존 li의 text값을 지움
            div.childNodes[1].innerText = "";
            // 체크, 수정, 삭제 버튼 안보이게 함
                // console.log(div.childNodes[0]);
                // console.log(div.childNodes[1]);
                // console.log(list.childNodes[1]);
                // console.log(list.childNodes[2]);
            div.childNodes[0].style.display = "none";
            list.childNodes[1].style.display = "none";
            list.childNodes[2].style.display = "none";
            dynamicInput.type = "text";
            dynamicInput.className = "dynamicEditText";
            // 수정 버튼 생성
            const dynamicPlusBtn = document.createElement("button");
            dynamicPlusBtn.className="dynamicPlusBtn";
            dynamicPlusBtn.innerHTML = `<i class="fas fa-plus-circle"></i>`;
            // 삭제 버튼 생성
            const dynamicCancelBtn = document.createElement("button");
            dynamicCancelBtn.className = "dynamicCancelBtn";
            dynamicCancelBtn.innerHTML = `<i class="fas fa-window-close"></i>`;

            // li의 text에 새 input을 appendChild
            div.childNodes[1].appendChild(dynamicInput);
            dynamicInput.after(dynamicPlusBtn);
            dynamicPlusBtn.after(dynamicCancelBtn);

            //addEventListner
            function fillDynamicInput(){
                let li = document.querySelector("li");
                    // let arr = [];
                    // li.forEach((elem)=>{
                    //     arr.push(elem);
                    // })
                    // console.log(li);
                    // console.log(index);
                // li의 text값에 새 input값(수정한 값)을 넣음
                div.childNodes[1].innerText = dynamicInput.value;
                     //li.splice(index, 0, "div.childNodes[1].innerText");
                // 로컬스토리지에 수정된 text값 저장
                //saveLocalStorage(div.childNodes[1].innerText);
                console.log(div.childNodes[1].innerText);
                console.log(todos.indexOf(div.childNodes[1].innerText));
                // 안보이게 한 체크, 수정, 삭제 버튼을 다시 보이게 함
                div.childNodes[0].style.display = "";
                list.childNodes[1].style.display = "";
                list.childNodes[2].style.display = "";
            }

            ul.addEventListener("keypress", (e)=>{
                if(e.key === "Enter"){
                    // 새 input창에서 넣은 값이 기존의 li의 text값과 같다면 리턴(엔터쳐도 아무 동작 안함)
                    if(dynamicInput.value === ListText){
                        return;
                    } else {
                        fillDynamicInput();
                    }
                }
            })
            dynamicPlusBtn.addEventListener("click", ()=>{
                if(dynamicInput.value === ListText){
                    return;
                } else {
                    fillDynamicInput();
                }
            })
            // 수정취소 버튼 누르면
            dynamicCancelBtn.addEventListener("click", ()=>{
                // li의 text값을, 기존의 원래 있던 li의 text값과 같게 함
                div.childNodes[1].innerText = ListText;
                div.childNodes[0].style.display = "";
                list.childNodes[1].style.display = "";
                list.childNodes[2].style.display = "";
            })
        
            //saveLocalStorage(`${div[0].className}, ${div[1].innerText}`);

        // 수정하시겠습니까? - 아니오 했을 때
        }else{
            return;
        }
    }
}

function deleteBtnHandler(e){
    e.preventDefault();
    const clickedBtn = e.target;
    if(clickedBtn.classList.contains("fa-trash-alt")){
        if(confirm("삭제하시겠습니까?")){
            const li = clickedBtn.parentNode.parentNode;
            li.remove();
            // 제거된 li의 배열 인덱스[0] 을 변수에 담음(div)
            const div = li.childNodes[0];
            // div의 배열 인덱스[1]을(text) 매개변수로 전달
            deleteLocalStorage(div.childNodes[1].innerText);
        }else{
            return;
        }
    }
}

function checkBtnHandler(e){
    e.preventDefault();
    const clickedBtn = e.target;
    if(clickedBtn.classList.contains("fa-check")){
        const li = clickedBtn.parentNode.parentNode.parentNode;
        li.classList.toggle("checkedLi");
        // if(li.classList.contains("checkedLi")){
        //     console.log("나중에");
        // }
        //let clickedLi = li.classList
        //saveLocalStorage(JSON.stringify(li.classList.value));
    }
}








// 로컬스토리지

// todos 유무 확인
function checkTodosExist(){
    // 로컬스토리지 key에 todos가 있으면
    if(localStorage.getItem("todos")){
        // 로컬스토리지에 있는 todos 받아와서 todos변수에 할당
        todos = JSON.parse(localStorage.getItem("todos"));
    }else{
        // 로컬스토리지에 없으면 배열 만들어서 todos변수에 할당
        todos = [];
    }
}

// function temprarySave(todo){
//     return todo;
// }

// function tempraryEditSave(todo){
//     return todo;
// }

// function totalTempSave(){
//     tem
// }

function saveLocalStorage(todo){
    checkTodosExist();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalStorage(){
    checkTodosExist();
    todos.forEach(function(todo){
        const li = document.createElement("li");
        const check = document.createElement("button");
        const leftList = document.createElement("div");
        leftList.classList.add("leftList");

        check.className = "dynamicBtn checkBtn";
        check.innerHTML = `<i class="fas fa-check"></i>`;
        leftList.appendChild(check);
        const span = document.createElement("span");
        span.className = "dynamicText";
        span.innerHTML = todo;
        leftList.appendChild(span);
        li.appendChild(leftList);

        const editBtn = document.createElement("button");
        editBtn.className="dynamicBtn editBtn";
        editBtn.innerHTML = `<i class="fas fa-edit"></i>`;
        li.appendChild(editBtn);
        const trashBtn = document.createElement("button");
        trashBtn.className="dynamicBtn trashBtn";
        trashBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;
        li.appendChild(trashBtn);
        ul.appendChild(li);
        input.value="";
    })
}

// 제거된 list의 text를 매게변수로 받아옴
function deleteLocalStorage(todo){
    checkTodosExist();
    console.log(todos.indexOf(todo));
    todos.splice(todos.indexOf(todo), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function editSaveLocalStorage(){
    //getLocalStorage();
}

// addEventListener
input.addEventListener("keypress", (e)=>{
    if (e.key==="Enter"){
        inputHandler(e);
    }
});

plusIcon.addEventListener("click", (e)=>{
    inputHandler(e);
    ul.style.overflow = "scroll";
});

ul.addEventListener("click", (e)=>{
    const li = document.querySelector("li");
    if(e.target.classList.contains("fa-edit")){
        if(li.classList.contains("checkedLi")){
            alert("체크된 리스트는 수정할 수 없습니다")
        }else{
            editBtnHandler(e);
        }
    }
    deleteBtnHandler(e);
    checkBtnHandler(e);
});

document.addEventListener("keydown", ()=>{
    ul.style.overflow = "scroll";
    // ul의 값이 없으면
    if(ul.length == 0){
        ul.style.overflow = "hidden";
    }
})

document.addEventListener("DOMContentLoaded", getLocalStorage);












