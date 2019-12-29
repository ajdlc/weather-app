console.log("Client side javascript file is loaded!");

// Utilizing the Fetch API because we are doing client-side javascript. Fetch is not available to node.js because it's an HTML5

// fetch("http://localhost:3000/weather?address=Lancaster,%20CA")
// .then(res => {
//   res.json()
//   .then(data => {
//       if (data.error) {
//         console.log(data.error);
//       } else {
//         console.log(data.forecast, data.location);
//       }
//   })
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("#address");
const messageOne = document.querySelector("#message");
const messageTwo = document.querySelector("#error");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = search.value;

    fetch("/weather?address=" + location)
    .then(res => {
        res.json()
            .then(data => {
                if (data.error) {
                    messageTwo.textContent = data.error;
                } else {
                    messageOne.textContent = data.forecast + "\n" + data.location;
                }
            })
    });

})