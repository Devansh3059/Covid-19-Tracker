window.onload = function () {
    //page selectors
    var Home = document.querySelector(".Home")
    var Summary = document.querySelector(".Summary")
    var Country = document.querySelector(".Country")
    var About = document.querySelector(".About")

    //Summary Page Selectors
    var cnew = document.querySelector(".c-new")
    var rnew = document.querySelector(".r-new")
    var dnew = document.querySelector(".d-new")
    var ctotal = document.querySelector(".c-total")
    var rtotal = document.querySelector(".r-total")
    var dtotal = document.querySelector(".d-total")

    //Country Page Selectors
    var csubmit = document.querySelector(".c-submit")
    var cselect = document.querySelector('.c-select');
    var dsubmit = document.querySelector(".d-submit");
    var dselect = document.querySelector('.d-select');
    var cases = document.querySelector('.cases');
    var countrychart = document.querySelector("#country-chart").getContext("2d")


    //Summary Page Code
    if (window.location.href == "http://127.0.0.1:5500/views/summary.html") {
        
        function getSummary()
        {fetch("https://api.covid19api.com/summary")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const { NewConfirmed, NewRecovered, NewDeaths, TotalConfirmed, TotalRecovered, TotalDeaths } = data.Global;
                // console.log(NewConfirmed)
                cnew.textContent = NewConfirmed;
                rnew.textContent = NewRecovered;
                dnew.textContent = NewDeaths;
                ctotal.textContent = TotalConfirmed;
                rtotal.textContent = TotalRecovered;
                dtotal.textContent = TotalDeaths;
                $(".counter").counterUp({delay:50,time:1500})
            })
            .catch(err => console.log(err))
        }
        getSummary();
    }



    //Country Page Code
    if (window.location.href == "http://127.0.0.1:5500/views/country.html") {
        if (csubmit != undefined) {
            csubmit.addEventListener("click", (e) => {
                e.preventDefault();
                var cvalue = cselect.value;
                // fetch(`https://api.covid19api.com/country/${cvalue}/status/confirmed`)
                //     .then(res => res.json())
                //     .then(data => {
                //         console.log(cvalue,data)
                //         console.log(data[20])
                //         const {Cases} = data[20];
                //         cases.textContent = Cases
                //     })
                //     // .then(data => console.log(data.Cases[10],cvalue))
                //     .catch(err => console.log(err))
                fetch("https://api.covid19api.com/summary")
                    .then(res => res.json())
                    .then(data => {
                        const { NewConfirmed, NewRecovered, NewDeaths, TotalConfirmed, TotalRecovered, TotalDeaths } = data.Countries[cvalue]
                        console.log(data.Countries[cvalue])
                        console.log(TotalConfirmed)
                        cases.textContent = NewConfirmed
                        makeChart(NewConfirmed, NewRecovered, NewDeaths, TotalConfirmed, TotalRecovered, TotalDeaths);
                    })
                function makeChart(NewConfirmed, NewRecovered, NewDeaths, TotalConfirmed, TotalRecovered, TotalDeaths){
                    var pieChart = new Chart(countrychart, {
                        type: 'pie',
                        data: {
                            labels:[NewConfirmed, NewRecovered, NewDeaths, TotalConfirmed, TotalRecovered, TotalDeaths],
                            datasets:[NewConfirmed, NewRecovered, NewDeaths, TotalConfirmed, TotalRecovered, TotalDeaths]
                        },
                        options: {
                            title:{
                                display:true,
                                text:"India"
                            }
                        }
                    });
                }
            })
        }
    }


}