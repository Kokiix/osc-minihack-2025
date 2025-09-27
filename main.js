let data = {};
let courseIDs = {};
axios.get("/api/v1/courses")
.then(function (response) {
    for (i in response.data) {
        courseIDs[response.data[i].name] = response.data[i].id;
        data[response.data[i].name] = {};
    }
    console.log("Get course IDs and names");
    
    for (let courseName in courseIDs) {
        axios.get(`/api/v1/courses/${courseIDs[courseName]}/modules?include[]=items`)
            .then(function (response) {
                let moduleData = response.data;
                for (let module_i in moduleData) {
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
