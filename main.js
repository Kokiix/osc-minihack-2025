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
})
