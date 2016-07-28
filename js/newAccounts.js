var params = {
    from: moment().subtract(30, 'days'),    // the earliest date you'd like to include in the query
    to: moment(),                           // the latest date you'd like to include in the query
    limit: 100,                             // maximum number of results to return
    type: 'unique',                        // analysis type for the data, can be 'general', 'unique', or 'average'
    unit: 'day',                            // level of granularity of the data, can be 'minute', 'hour', 'day', or 'month'
};

MP.api.segment("Initial Funds Successfully Deposited", params).done(function(results){
	var newAccountsChart = $('#new-accounts-graph').MPChart({chartType: 'line', highchartsOptions: {  // Create a line chart
      legend: {
        enabled: true,
        y:-7,
        labelFormatter: function () {
	  	return 'New Accounts'
	  	}
      }
    }});                                
    newAccountsChart.MPChart('setData', results.values()); // Set the chart's data
	$("#new-accounts-header").show()           //display chart header
})