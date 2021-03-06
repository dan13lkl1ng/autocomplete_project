/** IIFE to fetch data from the file and start autocomplete function. **/
(function() {
    fetch('/dogs.json')
        .then(response => {
            return response.json();
        })
        .then(myJson => {
            dogs = myJson;
            autocomplete(document.querySelector('#search'), dogs);
        });
})();

const autocomplete = (inp, arr) => {
    /* Eventlistener for input field */
    inp.addEventListener("input", function(e) {
        let a, b, i;
        let val = this.value;
        /* closing lists of autocompled results */
        closeAllLists();

        if (!val) {
            return false;
        }

        /** creates div element with items **/
        a = document.createElement("div");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        /* append div element as a child */
        this.parentNode.appendChild(a);

        for (let i = 0; i < arr.length; i++) {
            /** Checks if item starts with same letters **/
            if (arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].name.substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";
                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    showDescription(inp.value);
                });
                a.appendChild(b);
            }
        }
    });

    /** Closing autocomplete list **/
    const closeAllLists = el => {
        let list = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < list.length; i++) {
            if (el != list[i] && el != inp) {
                list[i].parentNode.removeChild(list[i]);
            }
        }
    }

    /** Closing list if selected item **/
    document.addEventListener("click", evt => {
        closeAllLists(evt.target);
    });

    const showDescription = text => {
        dogs.forEach(el => {
            if (el.name == text) {
                document.querySelector("#description").innerHTML = el.description;
            }
        });
    }
}