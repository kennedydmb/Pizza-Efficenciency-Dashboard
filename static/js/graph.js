queue()
    .defer(d3.json, "data/results.json")
    .await(makeGraphs)

//function for making and rendering graphs
function makeGraphs(error, staffData) {
    var ndx = crossfilter(staffData);

    staffData.forEach(function(d) {
        d.PizzaTime = parseInt(d.PizzaTime);
    })

    staffData.forEach(function(d) {
        d.YearsService = parseInt(d.YearsService);
    })

    show_rank_balance(ndx);
    show_average_time_by_rank(ndx)
    show_years_of_service_vs_rank(ndx);
    show_years_service_vs_pizza_time(ndx);
    show_course_balance(ndx);
    show_number_of_staff(ndx);
    show_fastest_and_slowest_pizza_maker(ndx);
    show_percentage_split_of_under_40_seconds(ndx);
    show_longest_and_shortest_serving_worker(ndx);

    dc.renderAll();

}

//function to show the balance in rank
function show_rank_balance(ndx) {
    //takes all of the ranks from the Results.csv and counts how many are in each
    var dim = ndx.dimension(dc.pluck('Rank'));
    //then groups these together
    var group = dim.group();

    var rankColors = d3.scale.ordinal()
        .domain(["Manager", "MIT", "Instore"])
        .range(["#FFAA00", "#6BE400", "#AA00A2"]);

    //creates a bar chart using the rank vs how many are in each rank
    dc.barChart("#rank-balance")
        .width(400)
        .height(300)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .colorAccessor(function(d) {
            return d.key[3];
        })
        .colors(rankColors)
        .xAxisLabel("Rank")
        .yAxis().ticks(20);
}

function show_average_time_by_rank(ndx) {
    //takes all of the ranks from the Results.csv and counts how many are in each
    var dim = ndx.dimension(dc.pluck('Rank'));

    var rankColors = d3.scale.ordinal()
        .domain(["Manager", "MIT", "Instore"])
        .range(["#FFAA00", "#6BE400", "#AA00A2"]);

    function add_item(p, v) {
        p.count++;
        p.total += v.PizzaTime;
        p.average = p.total / p.count;
        return p;
    }

    function remove_item(p, v) {
        p.count--;
        if (p.count == 0) {
            p.total = 0;
            p.average = 0;
        }
        else {
            p.total -= v.PizzaTime;
            p.average = p.total / p.count;
        }
        return p;
    }

    function initialise() {
        return { count: 0, total: 0, average: 0 };
    }


    var averageTimeByRank = dim.group().reduce(add_item, remove_item, initialise);

    dc.barChart("#average-time-rank")
        .width(400)
        .height(300)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(dim)
        .group(averageTimeByRank)
        .valueAccessor(function(d) {
            return d.value.average;
        })
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .colorAccessor(function(d) {
            return d.key[3];
        })
        .colors(rankColors)
        .xAxisLabel("Rank")
        .yAxisLabel("Seconds")
        .yAxis().ticks(10);
}
//function to show average years of service vs rank
function show_years_of_service_vs_rank(ndx) {
    //takes all of the ranks from the Results.csv and counts how many are in each
    var dim = ndx.dimension(dc.pluck('Rank'));

    var rankColors = d3.scale.ordinal()
        .domain(["Manager", "MIT", "Instore"])
        .range(["#FFAA00", "#6BE400", "#AA00A2"]);

    function add_item(p, v) {
        p.count++;
        p.total += v.YearsService;
        p.average = p.total / p.count;
        return p;
    }

    function remove_item(p, v) {
        p.count--;
        if (p.count == 0) {
            p.total = 0;
            p.average = 0;
        }
        else {
            p.total -= v.YearsService;
            p.average = p.total / p.count;
        }
        return p;
    }

    function initialise() {
        return { count: 0, total: 0, average: 0 };
    }


    var averageYearsVsRank = dim.group().reduce(add_item, remove_item, initialise);

    dc.barChart("#years-service-against-rank")
        .width(400)
        .height(300)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(dim)
        .group(averageYearsVsRank)
        .valueAccessor(function(d) {
            return d.value.average;
        })
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .colorAccessor(function(d) {
            return d.key[3];
        })
        .colors(rankColors)
        .xAxisLabel("Rank")
        .yAxisLabel("Years")
        .yAxis().ticks(10);
}

function show_years_service_vs_pizza_time(ndx) {

    var rankColors = d3.scale.ordinal()
        .domain(["Manager", "MIT", "Instore"])
        .range(["#FFAA00", "#6BE400", "#AA00A2"]);

    //creates years of service axis, to work out the bounds of the x axis
    var yearsDim = ndx.dimension(dc.pluck("YearsService"));

    //Returns an array with 4 parts
    var pizzaTimeDim = ndx.dimension(function(d) {
        return [d.YearsService, d.PizzaTime, d.Name, d.Rank]
    });
    var experienceRankGroup = pizzaTimeDim.group();

    var minExperience = yearsDim.bottom(1)[0].YearsService;
    var maxExperience = yearsDim.top(1)[0].YearsService;

    dc.scatterPlot('#years-service-against-pizza-time')
        .width(400)
        .height(300)
        .x(d3.scale.linear().domain([minExperience, maxExperience]))
        .brushOn(false)
        .symbolSize(8)
        .clipPadding(10)
        .yAxisLabel("Seconds")
        .title(function(d) {
            return d.key[2] + ", time: " + d.key[1] + "s"
        })
        .colorAccessor(function(d) {
            return d.key[3];
        })
        .colors(rankColors)
        .dimension(pizzaTimeDim)
        .group(experienceRankGroup)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 });

}

function show_course_balance(ndx) {
    //takes all of the ranks from the Results.csv and counts how many are in each
    var dim = ndx.dimension(dc.pluck('Course'));
    //then groups these together
    var group = dim.group();

    var courseColors = d3.scale.ordinal()
        .domain(["AMC", "BMC", "Intro"])
        .range(["purple", "orange", "maroon"]);

    var courseColorDim = ndx.dimension(function(d) {
        return [d.Course];
    })



    //creates a bar chart using the rank vs how many are in each rank
    dc.barChart("#course-balance")
        .width(400)
        .height(300)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .colorAccessor(function(d) {
            return d.key[0];
        })
        .colors(courseColors)
        .xAxisLabel("Course")
        .yAxis().ticks(20);
}

function show_fastest_and_slowest_pizza_maker(ndx) {
    var timeDim = ndx.dimension(dc.pluck("PizzaTime"));
    var minPizzaTimeName = timeDim.bottom(1)[0].Name;
    var maxPizzaTimeName = timeDim.top(1)[0].Name;
    var minPizzaTimeNamePosition = timeDim.bottom(1)[0].Rank;
    var maxPizzaTimeNamePosition = timeDim.top(1)[0].Rank;
    d3.select('#minPizzaTimeName')
        .text(minPizzaTimeName);
    d3.select('#maxPizzaTimeName')
        .text(maxPizzaTimeName);
    d3.select('#minPizzaTimeNamePosition')
        .text(minPizzaTimeNamePosition);
    d3.select('#maxPizzaTimeNamePosition')
        .text(maxPizzaTimeNamePosition);   

}

function show_number_of_staff(ndx) {
    var dim = ndx.dimension(dc.pluck('Rank'));

    function add_item(p, v) {
        if (v.Rank == "Manager") {
            p.manager_count++;
        }
        else if (v.Rank == "MIT") {
            p.mit_count++;
        }
        else if (v.Rank == "Instore") {
            p.instore_count++;
        }
        return p;
    }

    function remove_item(p, v) {
        if (v.Rank == "Manager") {
            p.manager_count--;
        }
        else if (v.Rank == "MIT") {
            p.mit_count--;
        }
        else if (v.Rank == "Instore") {
            p.instore_count--;
        }
        return p;
    }

    function initialise(p, v) {
        return { manager_count: 0, mit_count: 0, instore_count: 0 };

    }

    var staffCounter = ndx.groupAll().reduce(add_item, remove_item, initialise);
    
    dc.numberDisplay("#managerCount")
        .formatNumber(d3.format(".0"))
        .valueAccessor(function(d) {
            return d.manager_count; // no .value here
        })
        .group(staffCounter);
        
    dc.numberDisplay("#mitCount")
        .formatNumber(d3.format(".0"))
        .valueAccessor(function(d) {
            return d.mit_count; // no .value here
        })
        .group(staffCounter);
        
    dc.numberDisplay("#instoreCount")
        .formatNumber(d3.format(".0"))
        .valueAccessor(function(d) {
            return d.instore_count; // no .value here
        })
        .group(staffCounter);
}

function show_percentage_split_of_under_40_seconds(ndx) {
    var percentageUnder40 = ndx.groupAll().reduce(
        function(p, v) {
            p.count++;
            if (v.PizzaTime <= 40) {
                p.under_40++;
            }
            return p;
        },
        function(p, v) {
            p.count--;
            if (v.PizzaTime <= 40) {
                p.under_40--;
            }
            return p;
        },
        function(p, v) {
            return { count: 0, under_40: 0 }
        },
    );

    dc.numberDisplay("#under40Secs")
        .formatNumber(d3.format(".2%"))
        .valueAccessor(function(d) {
            if (d.count == 0) {
                return 0;
            }
            else {
                return (d.under_40 / d.count);
            }
        })
        .group(percentageUnder40);

    var percentageOver40 = ndx.groupAll().reduce(
        function(p, v) {
            p.count++;
            if (v.PizzaTime > 40) {
                p.over_40++;
            }
            return p;
        },
        function(p, v) {
            p.count--;
            if (v.PizzaTime > 40) {
                p.over_40--;
            }
            return p;
        },
        function(p, v) {
            return { count: 0, over_40: 0 }
        },
    );

    dc.numberDisplay("#over40Secs")
        .formatNumber(d3.format(".2%"))
        .valueAccessor(function(d) {
            if (d.count == 0) {
                return 0;
            }
            else {
                return (d.over_40 / d.count);
            }
        })
        .group(percentageOver40);
}

function show_longest_and_shortest_serving_worker(ndx) {
    var serviceDim = ndx.dimension(dc.pluck("YearsService"));
    var minServiceName = serviceDim.bottom(1)[0].Name;
    var maxServiceName = serviceDim.top(1)[0].Name;
    d3.select('#minServiceName')
        .text(minServiceName);
    d3.select('#maxServiceName')
        .text(maxServiceName);

}
