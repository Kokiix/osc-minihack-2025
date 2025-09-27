console.log("hello world");

let data = {};
let courseIDs = {};
axios.get("/api/v1/courses")
.then(function (response) {
    console.log(response.data);
    for (i = 0; i < response.data.length; i++) {
        courseIDs[response.data[i].name] = response.data[i].id;
        data[response.data[i].name] = {};
    }

    // for ()
})
