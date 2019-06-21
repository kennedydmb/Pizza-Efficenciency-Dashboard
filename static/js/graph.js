queue()
    .defer(d3.csv, "data/Results.csv")
    .await(makeGraphs)
    
function makeGraphs(error, staffData){
    var ndx =crossfilter(staffData);
    
    show_time_rank_balance(ndx);
    
    dc.renderAll();
}

function show_time_rank_balance(ndx){
    var dim =ndx.dimension(dc.pluck('Rank'));
    var group =dim.group();
    
    dc.barChart("#time-rank-balance")
        .width(400)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left:50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Rank")
        .yAxis().ticks(20);
}