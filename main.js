async function main() {
    let data = {};
    let courseIDs = {};
    axios.get("/api/v1/courses")
        .then(async function (response) {
            [data, courseIDs] = await getData(response);

            document.head.innerHTML = `
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Dashboard</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
                <style>
                  .columns .column:not(:last-child) {
                    border-right: 1px solid #dbdbdb;
                  }
                  .menu-list {
                    display: none;
                  }
                  .menu-list a {
                    padding-top: 0.3em;
                    padding-bottom: 0.3em;
                  }
                  .menu-label.is-active + .menu-list {
                    display: block;
                  }
                  .menu-label {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  }
                  .menu-label .icon {
                    transition: transform 0.3s ease;
                  }
                  .menu-label.is-active .icon {
                    transform: rotate(180deg);
                  }
                </style>`;

            document.body.innerHTML = `
                <section class="section py-4">
                    <div id="column-parent" class="columns has-text-centered"></div>
                </section>`;

            for (let courseName in data) {
                let columnFrame = `
                    <div class="column">
                        <h2 class="title is-4 mt-4 has-text-centered">${courseName}</h2>
                        <hr class="my-3">
                        <aside id="${courseName}-module-container" class="menu has-text-left">`;

                for (let moduleName in data[courseName]) {
                    columnFrame += `<p class="menu-label is-clickable">
                                      <span>${moduleName}</span>
                                      <span class="icon is-small">
                                        <i class="fas fa-chevron-down"></i>
                                      </span>
                                    </p>
                                    <ul class="menu-list">`;
                    for (let assign_i in data[courseName][moduleName]) {
                        let assign = data[courseName][moduleName][assign_i];
                        columnFrame += `<li><a href="${assign.html_url}" class="has-text-link">${assign.title}</a></li>`;
                    }
                    columnFrame += "</ul>";
                }

                columnFrame += "</aside></div>";
                document.getElementById("column-parent").insertAdjacentHTML("beforeend", columnFrame);
            }

            document.querySelectorAll('.menu-label.is-clickable').forEach(label => {
                label.addEventListener('click', () => {
                    label.classList.toggle('is-active');
                });
            });
        });
}

async function getData(response) {
    let data = {};
    let courseIDs = {};
    // Pair course name to course id in courseIDs
    for (let i in response.data) {
        courseIDs[response.data[i].name] = response.data[i].id;
        // Pair course name to object w course modules/assign
        data[response.data[i].name] = {};
    }
    console.log("Get course IDs and names");

    // Use courseIDs to get modules/assignments
    for (let courseName in courseIDs) {
        await axios.get(`/api/v1/courses/${courseIDs[courseName]}/modules?include[]=items`)
            .then(function (response) {
                let moduleData = response.data;
                for (let module_i in moduleData) {
                    // Under each course name,
                    // pair each module name to an array w assignment objects
                    data[courseName][moduleData[module_i].name] = [];
                    for (let assignment_i in moduleData[module_i].items) {
                        data[courseName][moduleData[module_i].name][assignment_i] = moduleData[module_i].items[assignment_i];
                    }
                }
            });
    }

    // ken specific
    delete data["Civic Literacy 2025"];
    delete data["engi advising"];
    delete data["mental health"];
    delete data["undergrad research"];
    delete data["Voices for change"];

    console.log("Get modules");
    return [data, courseIDs];
}

main();