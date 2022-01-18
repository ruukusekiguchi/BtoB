fetch("../partials/header.ejs")
.then(response => {
    return response.text()
})
.then(data => {
    document.querySelector("header").innerHTML = data;
});
console.log("出力");
