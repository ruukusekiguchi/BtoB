<<<<<<< HEAD
fetch("header.ejs")
=======
fetch("../partials/header.ejs")
>>>>>>> f8ed231fe5b467ae9e3c807856820435adb74acc
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
