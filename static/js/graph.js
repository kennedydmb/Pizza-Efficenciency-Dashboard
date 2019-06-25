queue()
    .defer(d3.csv, "data/Results.csv")
    .await(makeGraphs)

//function for making and rendering graphs
function makeGraphs(error, staffData) {
    var ndx = crossfilter(staffData);
    
    staffData.forEach(function(d){
        d.PizzaTime = parseInt(d.PizzaTime);
    })
    
    staffData.forEach(function(d){
        d.YearsService = parseInt(d.YearsService);
    })

    show_rank_selector(ndx);
    show_rank_balance(ndx);
    show_average_time_by_rank(ndx);
    show_years_of_service_vs_rank(ndx);

    dc.renderAll();
}

//function to create a dropdown menu to select by rank
function show_rank_selector(ndx) {
    //takes all of the ranks from the Results.csv and counts how many are in each
    dim = ndx.dimension(dc.pluck('Rank'))
    //then groups these together
    group = dim.group()
    //allows the user to select rank from a list
    dc.selectMenu("#rank-selector")
        .dimension(dim)
        .group(group);
}


//function to show the balance in rank
function show_rank_balance(ndx) {
    //takes all of the ranks from the Results.csv and counts how many are in each
    var dim = ndx.dimension(dc.pluck('Rank'));
    //then groups these together
    var group = dim.group();

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
        .xAxisLabel("Rank")
        .yAxis().ticks(20);
}

function show_average_time_by_rank(ndx) {
    //takes all of the ranks from the Results.csv and counts how many are in each
    var dim = ndx.dimension(dc.pluck('Rank'));

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
        .valueAccessor(function(d){
            return d.value.average;
        })
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Rank")
        .yAxisLabel("Seconds")
        .yAxis().ticks(10);
}

//function to show average years of service vs rank
function show_years_of_service_vs_rank(ndx){
    //takes all of the ranks from the Results.csv and counts how many are in each
    var dim = ndx.dimension(dc.pluck('Rank'));

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
        .valueAccessor(function(d){
            return d.value.average;
        })
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Rank")
        .yAxisLabel("Years")
        .yAxis().ticks(10);
}