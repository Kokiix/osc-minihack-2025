let data = {};
let courseIDs = {};
axios.get("/api/v1/courses")
.then(function (response) {
    // Pair course name to course id in courseIDs
    for (i in response.data) {
        courseIDs[response.data[i].name] = response.data[i].id;
        // Pair course name to object w course modules/assign
        data[response.data[i].name] = {};
    }
    console.log("Get course IDs and names");
    
    // Use courseIDs to get modules/assignments
    for (let courseName in courseIDs) {
        axios.get(`/api/v1/courses/${courseIDs[courseName]}/modules?include[]=items`)
            .then(function (response) {
                let moduleData = response.data;
                for (let module_i in moduleData) {
                    // Under each course name,
                    // pair each module name to an array w assignment objects
                    data[courseName][moduleData[module_i].name] = []
                    for (let assignment_i in moduleData[module_i].items) {
                        data[courseName][moduleData[module_i].name][assignment_i] = moduleData[module_i].items[assignment_i]
                    }
                }
        })
    }
    console.log("Get modules");
    console.log(data)

    // ken specific
    delete data["Civic Literacy 2025"]
    delete data["engi advising"]
    delete data["mental health"]
    delete data["undergrad research"]
    delete data["Voices for change"]


    document.head.innerHTML = `
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Dashboard</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
<style>
  .columns .column:not(:last-child) {
    border-right: 1px solid #dbdbdb;
  }
</style>`
    document.body.innerHTML = `
<div id="column-parent" class="columns has-text-centered"></div>`

    for (let course in data) {
        let column = `
<div class="column">
    <h2 class="title is-4 mt-4 has-text-centered">${course}</h2>
    <hr class="is-divider">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
</div>`
        document.getElementById("column-parent").insertAdjacentHTML("beforeend", column);
    }
})


//   <div class="column">
//     <h2 class="title is-4">Column 2 Header</h2>
//     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
//   </div>
//   <div class="column">
//     <h2 class="title is-4">Column 3 Header</h2>
//     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
//   </div>