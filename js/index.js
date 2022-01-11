<<<<<<< Updated upstream:js/index.js
fetch("header.html")
=======
fetch("../partials/header.ejs")
>>>>>>> Stashed changes:views/js/index.js
.then(response => {
    return response.text()
})
.then(data => {
    document.querySelector("header").innerHTML = data;
});

console.log("出力");

// fetch("footer.html")
// .then(response => {
//     return response.text()
// })
// .then(data => {
//     document.querySelector("footer").innerHTML = data;
// });
