let board = "TBIzIsDB";
let key = "40e4aa957efe42fda2ef76468d527d37";
let token = "74715daaf8a964ae25d2cd542ab2ff27daaf4bd3ac014dd60b0edd8ee234a820";
let boardId = "5c99ac472d25a9809dadc35c";
let listId = "5c99ac7cbc8d80826134615f";
let cardId = "5c99ac9a41258086d689d553";
let checklistId = "5c99ace980151083b6e76c2a";
fetch('https://api.trello.com/1/checklists/5c99ace980151083b6e76c2a/checkItems').then(data => data.json()).then(data => {
    console.log(data);
})