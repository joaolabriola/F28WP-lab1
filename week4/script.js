var cityContainer = document.getElementById("city-info");

var btn = document.getElementById("btn");
btn.addEventListener("click", function () {

    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://joaolabriola.github.io/F28WP-lab1/week4/cities1.json');
    ourRequest.onload = function () {
        var ourData = JSON.parse(ourRequest.responseText);
        renderHTML(ourData);
        btn.classList.add("hide-me");       // hide button after data is displayed
    };
    ourRequest.send();

});

function renderHTML(data) {
    var htmlString = "";

    // loop through data object, adding data into strings
    for (i = 0; i < data.length; i++) {
        htmlString += "<p>" + data[i].name + " is a city in " + data[i].country + ",</br> Where you can enjoy indoor places like: ";

        for (ii = 0; ii < data[i].places.indoor.length; ii++) {
            // Loop through the indoor places of the current city.
            if (ii == 0) {
                htmlString += data[i].places.indoor[ii];
            } else {
                htmlString += ", and " + data[i].places.indoor[ii];
            }
        }

        htmlString += '. & enjoy outdoor places like: ';
        // Loop through the outdoor places of the current city.
        for (ii = 0; ii < data[i].places.outdoor.length; ii++) {
            if (ii == 0) {
                htmlString += data[i].places.outdoor[ii];
            } else {
                htmlString += " and " + data[i].places.outdoor[ii];
            }
        }

        htmlString += '.</p>';
        
    }

    // add string created with data to html document
    cityContainer.insertAdjacentHTML('beforeend', htmlString);
}