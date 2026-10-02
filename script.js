const internships = [

    {
        title: "Frontend Developer Intern",
        company: "PixelCraft Labs",
        domain: "Frontend",
        location: "Remote",

        skills: [
            "HTML",
            "CSS",
            "JavaScript"
        ]
    },


    {
        title: "Python Developer Intern",
        company: "CodeNest Technologies",
        domain: "Backend",
        location: "Remote",

        skills: [
            "Python",
            "APIs",
            "Git"
        ]
    },


    {
        title: "Full Stack Developer Intern",
        company: "WebForge",
        domain: "Full Stack",
        location: "Hybrid",

        skills: [
            "JavaScript",
            "Node.js",
            "SQL"
        ]
    },


    {
        title: "Data Analyst Intern",
        company: "InsightWorks",
        domain: "Data",
        location: "Remote",

        skills: [
            "Python",
            "Excel",
            "SQL"
        ]
    },


    {
        title: "UI/UX Design Intern",
        company: "CreativeGrid",
        domain: "Design",
        location: "On-site",

        skills: [
            "Figma",
            "Wireframes",
            "Prototyping"
        ]
    },


    {
        title: "AI/ML Intern",
        company: "NeuralPath",
        domain: "AI/ML",
        location: "Remote",

        skills: [
            "Python",
            "Machine Learning",
            "Pandas"
        ]
    }

];



const internshipList =
    document.querySelector(
        "#internship-list"
    );


const searchInput =
    document.querySelector(
        "#search"
    );


const domainSelect =
    document.querySelector(
        "#domain"
    );


const clearButton =
    document.querySelector(
        "#clear-filters"
    );


const resultCount =
    document.querySelector(
        "#result-count"
    );


const status =
    document.querySelector(
        "#status"
    );


const domains = [

    ...new Set(

        internships.map(
            internship =>
                internship.domain
        )

    )

].sort();


domains.forEach(domain => {

    const option =
        document.createElement(
            "option"
        );

    option.value = domain;

    option.textContent = domain;

    domainSelect.appendChild(
        option
    );

});



function createCard(internship) {

    const article =
        document.createElement(
            "article"
        );

    article.className = "card";


    article.innerHTML = `

        <h3>
            ${internship.title}
        </h3>

        <p class="company">
            ${internship.company}
        </p>

        <div
            class="tags"
            aria-label="Skills"
        >

            ${internship.skills
            .map(
                skill =>
                    `<span class="tag">
                        ${skill}
                    </span>`
            )
            .join("")
        }

        </div>


        <div class="card-footer">

            <span class="location">
                ${internship.location}
                ·
                ${internship.domain}
            </span>

            <a
                href="#about"
                class="apply"
            >
                View
            </a>

        </div>

    `;


    return article;

}




function renderInternships(items) {

    internshipList.innerHTML = "";




    if (items.length === 0) {

        const empty =
            document.createElement(
                "div"
            );

        empty.className = "empty";


        empty.innerHTML = `

            <h3>
                No internships found
            </h3>

            <p>
                Try another keyword
                or select a different domain.
            </p>

        `;


        internshipList.appendChild(
            empty
        );

    }


    /* RESULTS */

    else {

        const fragment =
            document.createDocumentFragment();


        items.forEach(
            internship => {

                fragment.appendChild(
                    createCard(internship)
                );

            }
        );


        internshipList.appendChild(
            fragment
        );

    }


    /* RESULT COUNT */

    resultCount.textContent =

        `${items.length}
        internship${items.length === 1
            ? ""
            : "s"
        } found`;

}


function filterInternships() {

    const query =
        searchInput.value
            .trim()
            .toLowerCase();


    const selectedDomain =
        domainSelect.value;


    const filtered =
        internships.filter(
            internship => {


                const searchableText = [

                    internship.title,

                    internship.company,

                    internship.domain,

                    internship.location,

                    ...internship.skills

                ]
                    .join(" ")
                    .toLowerCase();


                const matchesSearch =

                    !query ||
                    searchableText.includes(
                        query
                    );


                const matchesDomain =

                    selectedDomain === "all" ||
                    internship.domain ===
                    selectedDomain;


                return (
                    matchesSearch &&
                    matchesDomain
                );

            }
        );


    renderInternships(filtered);


    if (
        query ||
        selectedDomain !== "all"
    ) {

        status.textContent =
            "Filters updated.";

    }

    else {

        status.textContent = "";

    }

}





searchInput.addEventListener(
    "input",
    filterInternships
);





domainSelect.addEventListener(
    "change",
    filterInternships
);


clearButton.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        domainSelect.value = "all";

        filterInternships();

        searchInput.focus();

    }
);



renderInternships(
    internships
);