let input = document.querySelector("#inputValue");
const plusIcon = document.querySelector(".fa-plus-circle");
const buttons = document.querySelector(".buttons");
const allBtn = buttons.querySelector(".all");
const completeBtn = buttons.querySelector(".complete");
const incompleteBtn = buttons.querySelector(".incomplete");
const ul = document.querySelector("ul");

function inputHandler(e){
    e.preventDefault();
    const inputValue = input.value;
    if(typeof inputValue == "undefined" || inputValue == null || inputValue == ""){
        return;
    }else{
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.className = "dynamicText";
        span.innerHTML = `${inputValue}`;
        li.appendChild(span);
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
        }
}

function deleteAditBtnHandler(e){
    e.preventDefault();
    const clickedBtn = e.target;
    if(clickedBtn.classList.contains("fa-edit")){
        if(confirm("수정하시겠습니까?")){
            const list = clickedBtn.parentNode.parentNode;
            list.childNodes[0].innerText = "";
            list.childNodes[1].style.display = "none";
            list.childNodes[2].style.display = "none";
            const dynamicInput = document.createElement("input");
            dynamicInput.type = "text";
            dynamicInput.className = "dynamicEditText";
            const dynamicPlusBtn = document.createElement("button");
            dynamicPlusBtn.className="dynamicPlusBtn";
            dynamicPlusBtn.innerHTML = `<i class="fas fa-plus-circle"></i>`;
            list.childNodes[0].appendChild(dynamicInput);
            dynamicInput.after(dynamicPlusBtn);
            window.addEventListener("keypress", (e)=>{
                if(e.key === "Enter"){
                    if(typeof dynamicInput.value == "undefined" || dynamicInput.value == null || dynamicInput.value == ""){
                        return;
                    } else {
                        list.childNodes[1].style.display = "";
                        list.childNodes[2].style.display = "";
                        list.childNodes[0].innerText = dynamicInput.value;
                    }
                }
            dynamicPlusBtn.addEventListener("click", ()=>{
                if(typeof dynamicInput.value == "undefined" || dynamicInput.value == null || dynamicInput.value == ""){
                    return;
                } else {
                    list.childNodes[0].innerText = dynamicInput.value;
                    console.log(list.childNodes[1]);
                    list.childNodes[1].style.display = "";
                    list.childNodes[2].style.display = "";
                }
            });
            })
        }else{
            return;
        }
    }
    if(clickedBtn.classList.contains("fa-trash-alt")){
        if(confirm("삭제하시겠습니까?")){
            clickedBtn.parentNode.parentNode.remove();
        }else{
            return;
        }
    }
}


// addEventListener
input.addEventListener("keypress", (e)=>{
    if (e.key==="Enter"){
        inputHandler(e);
    }
});
plusIcon.addEventListener("click", (e)=>{
    inputHandler(e);
    ul.style.overflowY = "scroll";
    ul.style.overflowX = "hidden";
});

ul.addEventListener("click", (e)=>{
    deleteAditBtnHandler(e)
});

window.addEventListener("keypress", (e)=>{
    if(e.key==="Enter"){
        ul.style.overflowY = "scroll";
        ul.style.overflowX = "hidden";
    }
})