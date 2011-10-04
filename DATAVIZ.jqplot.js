(function($){
	DATAVIZ.jqplot = { };
	DATAVIZ.jqplot.render = function(data_object, type, container_id) {
		var options = { };
		options.seriesDefaults = { };
		options.series = new Array();
		var aggregated_series = new Array();
		  $.each(data_object.series, function(series_index){
			aggregated_series.push(this.data);
			series_options = { };
			if(data_object.options.seriesOptions[series_index]){
			  options.series[series_index] = data_object.options.seriesOptions[series_index].seriesOptions;
			  options.series[series_index].label = data_object.series[series_index].seriesName;
		    }
		});
		
		//Title and description
		options.title = data_object.options.title.text;
		options.description = data_object.options.description.text;
		
		//Add the legend
		if(data_object.options.legend) {
			options.legend = data_object.options.legend;
		}
		
		//tooltip
		//THIS DOESNT WORK WITH JQPLOT
		// if(data_object.options.tooltip) {
		// 			options.cursor = { };
		// 			options.cursor.showTooltip = true;
		// 			options.cursor.tooltipLocation = 'se';
		// 			options.cursor.showTooltipUnitPosition = true;
		// 		}
		
		switch(type) {
				case 'line':
					//Do stuff specific to line graphs
				break;

				case 'bar':
			        options.seriesDefaults.renderer = $.jqplot.BarRenderer;
			        options.seriesDefaults.pointLabels = { show: true, location: 'e', edgeTolerance: -15 };
			        // options.seriesDefaults.shadowAngle = 135;
			        // options.seriesDefaults.rendererOptions = { barDirection : data_object.options.barDirection };
			        options.axes = { yaxis: {renderer: $.jqplot.CategoryAxisRenderer} };
					// options.stackSeries = true;
				break;

				case 'pie':
					options.seriesDefaults.renderer = jQuery.jqplot.PieRenderer;
				    options.seriesDefaults.rendererOptions = { showDataLabels: true };
				break;

				default:
				break;
			}
			
			$.jqplot(container_id, aggregated_series, options);
	}

})(jQuery);