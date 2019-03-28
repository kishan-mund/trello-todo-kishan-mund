let board = "TBIzIsDB";
let key = "40e4aa957efe42fda2ef76468d527d37";
let token = "74715daaf8a964ae25d2cd542ab2ff27daaf4bd3ac014dd60b0edd8ee234a820";
let boardId = "5c99ac472d25a9809dadc35c";
let listId = "5c99ac7cbc8d80826134615f";
let cardId = "5c99ac9a41258086d689d553";
let checklistId = "5c99ace980151083b6e76c2a";
let arr = [];


let fetchArr = async () => {
    let arr1 = [];
    let data1 = await fetch('https://api.trello.com/1/checklists/' +
        checklistId + '/checkItems?key=' + key + '&token=' + token);
    let data = await data1.json();
    for (let i of data) {
        arr1.push(i);
    }
    return arr1;
}
const operations = (arr) => {
    return new Promise((resolve, reject) => {
        // console.log(arr);
        checkboxElement(arr);
        updateElement(arr);
        deleteElement(arr);
    })
}
let checkboxElement = (arr) => {
    console.log(length);
    for (let i = 0; i < arr.length; i++) {
        console.log(arr);
        let cb = document.createElement("input");
        let cb1 = document.createElement("label");
        let span = document.createElement("span");
        let newdiv = document.createElement("div");
        cb.setAttribute("type", "checkbox");
        span.className = "close-span";
        cb.className = "radio";
        newdiv.className = "newdiv";
        span.className = "close";
        span.textContent = "\u00D7";
        if (arr[i].state === "complete") {
            cb.checked = true;
        }
        cb1.textContent = arr[i].name;
        document.getElementById("list").appendChild(newdiv);
        newdiv.appendChild(cb);
        newdiv.appendChild(cb1);
        newdiv.appendChild(span);
    }

}
let deleteElement = (arr) => {
    let close = document.querySelectorAll(".close");
    console.log(close);
    for (let i = 0; i < close.length; i++) {
        close[i].addEventListener("click", function (event) {
            event.target.parentElement.remove();
            var data = null;
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                    console.log(this.responseText);
                }
            });
            xhr.open("DELETE", "https://api.trello.com/1/checklists/" + checklistId +
                "/checkItems/" + arr[i].id + "?key=" + key + "&token=" + token);
            xhr.send(data);
        })

    }
}

let updateElement = (arr) => {
    let radio = document.querySelectorAll(".radio");
    for (let i = 0; i < radio.length; i++) {
        radio[i].addEventListener("click", function (event) {
            let state = '';
            console.log(radio);

            radio[i].checked ? state = 'complete' : state = 'incomplete'
            var data = null;
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                    console.log(this.responseText);
                }
            });
            xhr.open("PUT", "https://api.trello.com/1/cards/" + cardId + "/checkItem/" + arr[i].id + "?state=" + state + "&key=" + key + "&token=" + token);
            xhr.send(data);
        })

    }
}

let addElement = () => {
    let cb = document.createElement("input");
    let cb1 = document.createElement("label");
    let span = document.createElement("span");
    let newdiv = document.createElement("div");
    span.className = "close-span";
    cb.className = "radio";
    newdiv.className = "newdiv";
    span.className = "close";
    var inputValue = document.getElementById("myInput").value;
    cb.setAttribute("type", "checkbox");
    cb1.textContent = inputValue;
    span.textContent = "\u00D7";
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("list").appendChild(newdiv);
        newdiv.appendChild(cb);
        newdiv.appendChild(cb1);
        newdiv.appendChild(span);
        var data = null;
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
            }
        });
        arr = fetchArr();
        deleteElement();
        xhr.open("POST", "https://api.trello.com/1/checklists/" + checklistId + "/checkItems?name=" + inputValue + "&pos=bottom&checked=false&key=" + key + "&token=" + token);
        xhr.send(data);


    }

    console.log(arr);
}
window.addEventListener("load", async function () {
    arr = await fetchArr();
    await operations(arr);
})