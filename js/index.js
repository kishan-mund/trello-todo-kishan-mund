let board = "TBIzIsDB";
let key = "40e4aa957efe42fda2ef76468d527d37";
let token = "74715daaf8a964ae25d2cd542ab2ff27daaf4bd3ac014dd60b0edd8ee234a820";
let boardId = "5c99ac472d25a9809dadc35c";
let listId = "5c99ac7cbc8d80826134615f";
let cardId = "5c99ac9a41258086d689d553";
let checklistId = "5c99ace980151083b6e76c2a";
let arr = [];

const fetchArr = () => {
    return new Promise((resolve, reject) => {
        let arr1 = [];
        fetch('https://api.trello.com/1/checklists/' + checklistId + '/checkItems?key=' + key + '&token=' + token)
            .then(data => data.json())
            .then(data => {
                for (let i of data) {
                    arr1.push(i);
                }
                resolve(arr1);
            });
    });
};

const operations = arr => {
    return new Promise((resolve, reject) => {
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

            cb.addEventListener("click", async function (event) {
                arr = await updateElement(event, arr, i);
            });
            span.addEventListener("click", async function (event) {
                arr = await deleteElement(event, arr, i);
            });
        }
    });
};

const deleteElement = (event, arr, index) => {
    return new Promise((resolve, reject) => {
        var data = null;
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
            }
        });
        xhr.open(
            "DELETE",
            "https://api.trello.com/1/checklists/" +
            checklistId +
            "/checkItems/" +
            arr[index].id +
            "?key=" +
            key +
            "&token=" +
            token
        );
        xhr.send(data);
        event.target.parentElement.remove();

        resolve(fetchArr());
    });
};

let updateElement = (event, arr, index) => {
    return new Promise((resolve, reject) => {
        let state = "";

        event.target.checked ? (state = "complete") : (state = "incomplete");
        var data = null;
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
            }
        });
        xhr.open(
            "PUT",
            "https://api.trello.com/1/cards/" +
            cardId +
            "/checkItem/" +
            arr[index].id +
            "?state=" +
            state +
            "&key=" +
            key +
            "&token=" +
            token
        );
        xhr.send(data);
        resolve(fetchArr());
    });
};

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
    document.getElementById("myInput").value="";
    cb.setAttribute("type", "checkbox");
    cb1.textContent = inputValue;
    span.textContent = "\u00D7";
    if (inputValue === "") {
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
        xhr.open(
            "POST",
            "https://api.trello.com/1/checklists/" +
            checklistId +
            "/checkItems?name=" +
            inputValue +
            "&pos=bottom&checked=false&key=" +
            key +
            "&token=" +
            token
        );
        xhr.send(data);
        fetchArr();
    }

    cb.addEventListener("click", async function (event) {
        arr = await updateElement(event, arr, arr.length - 1);
    });
    span.addEventListener("click", async function (event) {
        arr = await deleteElement(event, arr, arr.length - 1);
    });
};

window.addEventListener("load", async function () {
    arr = await fetchArr();
    await operations(arr);
});
let btn = document.querySelector(".search-botton");
btn.addEventListener("click", async function () {
    await addElement();
    arr = await fetchArr();

});