var params = {
    from: moment().subtract(30, 'days'),    // the earliest date you'd like to include in the query
    to: moment(),                           // the latest date you'd like to include in the query
    limit: 100,                             // maximum number of results to return
    type: 'general',                        // analysis type for the data, can be 'general', 'unique', or 'average'
    unit: 'day',                            // level of granularity of the data, can be 'minute', 'hour', 'day', or 'month'
    'where': 'properties["Visit Number"] > 5'
    
};

MP.api.segment("View Page", params).done(function(results){
	var returningUsersChart = $('#returning-users-graph').MPChart({chartType: 'line', highchartsOptions: {  // Create a line chart
      legend: {
        enabled: true,
        y:-7
      },
    }});                                
    returningUsersChart.MPChart('setData', results.values()); // Set the chart's data
	$("#returning-users-header").show()           //display chart header
})