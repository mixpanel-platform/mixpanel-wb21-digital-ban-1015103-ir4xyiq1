//this file can be used to add any type of "custom" event that a client my be interested in seeing in a dashbaord
MP.api.segment('Transfer Sent Sucessfully', {from: moment().subtract(30, 'days'), unit: 'day'}).done(function(transferResults) {
	//chart monthly transfer date
    var transferData = transferResults.values()
    var transferChart = $('#transfer-graph').MPChart({chartType: 'line', highchartsOptions: {  // Create a line chart
      legend: {
        enabled: false,
        y:-7
      },
    }});                                
    transferChart.MPChart('setData', transferResults.values()); // Set the chart's data
	$("#transfer-header").show()           //display chart header
	//update the transfer header pannel
	var today = moment().format('YYYY-MM-DD')
	var todaysTransfers = transferData['Transfer Sent Sucessfully'][today]
	$('#dau-header').text(addCommas(todaysTransfers));
});

//get the average transfer amount 
var avgparams = {
    from: moment().subtract(30, 'days'),    // the earliest date you'd like to include in the query
    to: moment(),                           // the latest date you'd like to include in the query
    limit: 100,                             // maximum number of results to return
    type: 'general',                        // analysis type for the data, can be 'general', 'unique', or 'average'
    unit: 'day',                            // level of granularity of the data, can be 'minute', 'hour', 'day', or 'month'
    'on': 'properties["Transfer Amount"]', 	// selector
    'method': 'average'
    
};
var minParams = {
    from: moment().subtract(30, 'days'),    // the earliest date you'd like to include in the query
    to: moment(),                           // the latest date you'd like to include in the query
    limit: 100,                             // maximum number of results to return
    type: 'general',                        // analysis type for the data, can be 'general', 'unique', or 'average'
    unit: 'day',                            // level of granularity of the data, can be 'minute', 'hour', 'day', or 'month'
    'on': 'properties["Transfer Amount"]', 	// selector
    'method': 'min'
    
};
var maxParams = {
    from: moment().subtract(30, 'days'),    // the earliest date you'd like to include in the query
    to: moment(),                           // the latest date you'd like to include in the query
    limit: 100,                             // maximum number of results to return
    type: 'general',                        // analysis type for the data, can be 'general', 'unique', or 'average'
    unit: 'day',                            // level of granularity of the data, can be 'minute', 'hour', 'day', or 'month'
    'on': 'properties["Transfer Amount"]', 	// selector
    'method': 'max'
    
};


MP.api.segment('Transfer Sent Sucessfully', avgparams).done(function(avgTransferResults) {
	transferData = {}
	//get averages
	console.log('avg trans', avgTransferResults.values())
	var avgTransfers  = {}
	avgTransferResults['Average Transfer Amount'] = avgTransferResults.values()
	MP.api.segment('Transfer Sent Sucessfully', minParams).done(function(minTransferResults) {
		//get averages
		console.log('min trans', minTransferResults.values())
		var avgTransfers  = {}
		avgTransferResults['Min Transfer Amount'] = minTransferResults.values()
		MP.api.segment('Transfer Sent Sucessfully', maxParams).done(function(maxTransferResults) {
			//get averages
			console.log('max trans', maxTransferResults.values())
			var avgTransfers  = {}
			avgTransferResults['Max Transfer Amount'] = maxTransferResults.values()
			transferData['Max Transfer Amount'] = maxTransferResults.values()
			transferData['Min Transfer Amount'] = minTransferResults.values()
			transferData['Average Transfer Amount'] = avgTransferResults.values()
			var transferAmountChart = $('#transfer-amounts-graph').MPChart({chartType: 'line', highchartsOptions: {  // Create a line chart
		      legend: {
		        enabled: false,
		        y:-7
		      },
		    }});
		 $("#transfer-amount-header").show()           //display chart header
		 transferAmountChart.MPChart('setData', transferData); // Set the chart's data
		})
	})
})