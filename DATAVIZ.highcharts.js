(function($){
	DATAVIZ.highcharts = { };
	DATAVIZ.highcharts.render = function(data_object, type, container_id){

		chart_object = { };
		chart_object.series = new Array();
		chart_object.colors = new Array();
		
		if(data_object.options.colors){
			chart_object.colors = data_object.options.colors;
		}

		switch(type){
			case 'line':

				chart_object.chart = {
			         renderTo: container_id,
			         defaultSeriesType: 'line',
					 backgroundColor : (data_object.options.plotOptions.backgroundColor) ? data_object.options.plotOptions.backgroundColor : '#FFF'
			      };
			
			    chart_object.title = { text: data_object.options.title.text, x: -20 /* center */ };
			    if(data_object.options.description){
				  chart_object.subtitle = { text: data_object.options.description.text, x: -20 };
			    }
			
				chart_object.xAxis = { };
				
				//Axes
				if(data_object.options.axes) {
					if(data_object.options.axes.yaxis){
						chart_object.yAxis = {
						         title: {
						            text: (data_object.options.axes.yaxis.title) ? data_object.options.axes.yaxis.title : null
						         },
						         plotLines: [{
						            value: 0,
						            width: 1,
						            color: '#808080'
						         }]
						      };
					}
					
					if(data_object.options.axes.xaxis){
						chart_object.xAxis = {
								title: {
									text: (data_object.options.axes.xaxis) ? data_object.options.axes.xaxis.title : null
								},
								tickInterval : (data_object.options.axes.xaxis) ? parseInt(data_object.options.axes.xaxis.tickinterval) : 1
						};
					}
				}
				
				chart_object.xAxis.categories = new Array();
				chart_object.xAxis.labels = { };
				chart_object.xAxis.labels.items = new Array();
				
				//Build the data series for the high charts graph from the data object
				$.each(data_object.series, function(series_index) {
					series_object = { };
					series_object.data = new Array();

					series_object.name = this.seriesName;

					$.each(this.data, function(data_index){
						if(this.constructor == Array){
							series_object.data.push(this);
							chart_object.xAxis.categories.push(this[0]);
					     
						}else{
							series_object.data.push(this);
							chart_object.xAxis.categories.push('');
						}
					});
					chart_object.series.push(series_object);
					
					if(data_object.options.seriesOptions[series_index].seriesOptions.color) {
					  chart_object.colors.push(data_object.options.seriesOptions[series_index].seriesOptions.color);
				    }
				});
				
				
			    chart_object.tooltip =  {
				         formatter: function() {
				                   return '<b>'+ this.series.name +'</b><br/>'+
				               this.x +': '+ this.y;
				         }
				      };
				if(data_object.options.tooltip){
					chart_object.tooltip.enabled = data_object.options.tooltip.enabled;
				}
				
				if(data_object.options.legend) {
					
					legend_align = 'right';
					legend_valign = 'middle';
					
					switch(data_object.options.legend.location) {
						case 'n':
						legend_align = 'center';
						legend_valign = 'top';
						break;
						
						case 'e':
						legend_align = 'right';
						legend_valign = 'middle';
						break;
						
						case 'w':
						legend_align = 'left';
						legend_valign = 'middle';
						break;
						
						case 's':
						legend_align = 'center';
						legend_valign = 'bottom';
						break;
						
						case 'nw':
						legend_align = 'left';
						legend_valign = 'top';
						break;
						
						case 'ne':
						legend_align = 'right';
						legend_valign = 'top';
						break;
						
						case 'sw':
						legend_align = 'left';
						legend_valign = 'bottom';
						break;
						
						case 'se':
						legend_align = 'right';
						legend_valign = 'bottom';
						break;
					}
				
				  chart_object.legend = {
				         layout: 'vertical',
				         align: legend_align,
				         verticalAlign: legend_valign,
				         borderWidth: 0,
						 enabled: data_object.options.legend.show
				   };
				}
			break;

			case 'bar':
				chart_object.chart = {
			         renderTo: container_id,
			         defaultSeriesType: 'bar',
					 backgroundColor : (data_object.options.plotOptions.backgroundColor) ? data_object.options.plotOptions.backgroundColor : '#FFF'
			      };
			    chart_object.title = { text: data_object.options.title.text };
					if(data_object.options.description){
				  chart_object.subtitle = { text: data_object.options.description.text, x: -20 };
			    }
				chart_object.xAxis = {
			         categories: [/*'Africa', 'America', 'Asia', 'Europe', 'Oceania' */],
			         title: {
			            text: null
			         }
			      };
			
			    if(data_object.options.axes){
					chart_object.yAxis = { min: 0, title: { text : data_object.options.axes.yaxis.title, align: 'high' } };
			    } else{
					chart_object.yAxis = { min: 0, title: { text : '', align: 'high' } };
			    }
				
				chart_object.tooltip = { formatter: function() { return ''+ this.series.name +': '+ this.y; } };
				if(data_object.options.tooltip){
					chart_object.tooltip.enabled = data_object.options.tooltip.enabled;
				}
				
				chart_object.plotOptions = { bar: { dataLabels: { enabled: true } } };
				if(data_object.options.legend) {
					legend_align = 'right';
					legend_valign = 'middle';
					switch(data_object.options.legend.location) {
						case 'n':
						legend_align = 'center';
						legend_valign = 'top';
						break;
						
						case 'e':
						legend_align = 'right';
						legend_valign = 'middle';
						break;
						
						case 'w':
						legend_align = 'left';
						legend_valign = 'middle';
						break;
						
						case 's':
						legend_align = 'center';
						legend_valign = 'bottom';
						break;
						
						case 'nw':
						legend_align = 'left';
						legend_valign = 'top';
						break;
						
						case 'ne':
						legend_align = 'right';
						legend_valign = 'top';
						break;
						
						case 'sw':
						legend_align = 'left';
						legend_valign = 'bottom';
						break;
						
						case 'se':
						legend_align = 'right';
						legend_valign = 'bottom';
						break;
					}
					
				  chart_object.legend = {
			         align: legend_align,
			         verticalAlign: legend_valign,
			         floating: true,
			         borderWidth: 1,
			         backgroundColor: '#FFFFFF',
			         shadow: true,
			         enabled: data_object.options.legend.show
			      };
			    }
				chart_object.credits = 	{ enabled: false };
				
				$.each(data_object.series, function(series_index) {
					series_object = { };
					series_object.data = new Array();

					series_object.name = this.seriesName;

					$.each(this.data, function(data_index){
						if(this.constructor == Array){
							series_object.data.push(this[1]);
							chart_object.xAxis.categories.push(this[0]);
						}else{
							series_object.data.push(this);
							chart_object.xAxis.categories.push('');
						}
					});
					chart_object.series.push(series_object);
					
					if(data_object.options.seriesOptions[series_index].seriesOptions.color) {
					  chart_object.colors.push(data_object.options.seriesOptions[series_index].seriesOptions.color);
				    }
				});
			break;

			case 'pie':
				chart_object.chart = {
			         renderTo: container_id,
			         plotBackgroundColor: null,
			         plotBorderWidth: null,
			         plotShadow: false,
					 defaultSeriesType: 'pie',
					 backgroundColor : (data_object.options.plotOptions.backgroundColor) ? data_object.options.plotOptions.backgroundColor : '#FFF'
			      };
			
				chart_object.title = 	{ text: data_object.options.title.text };
				if(data_object.options.description){
			    chart_object.subtitle = { text: data_object.options.description.text, x: -20 };
		    }
		
				chart_object.tooltip = {
			         formatter: function() {
			            return '<b>' + this.point.name + '</b>: ' + this.y;
			         }
			      };
			
				if(data_object.options.tooltip){
					chart_object.tooltip.enabled = data_object.options.tooltip.enabled;
				}
				
				chart_object.plotOptions = 	{
			            allowPointSelect: true,
			            cursor: 'pointer',
			            dataLabels: {
			               enabled: true,
			               color: '#000000',
			               connectorColor: '#000000',
			               formatter: function() {
			                  return '<b>'+ this.point.name +'</b>: '+ this.y;
			               }
			            },
						pie : { allowPointSelect: true,
						            cursor: 'pointer',
						            dataLabels: {
						               enabled: !data_object.options.legend.show
						            },
						            showInLegend: data_object.options.legend.show }
			      };
			    
			    $.each(data_object.series, function(series_index){
					series_object = { };
					series_object.data = new Array();

					series_object.name = this.seriesName;

					$.each(this.data, function(data_index){
							series_object.data.push(this);
					});

					chart_object.series.push(series_object);
				});
				
				// chart_object.series = 	[{
				//          name: 'Browser share',
				//          data: [
				//             ['Firefox',   45.0],
				//             ['IE',       26.8],
				//             {
				//                name: 'Chrome',    
				//                y: 12.8,
				//                sliced: true,
				//                selected: true
				//             },
				//             ['Safari',    8.5],
				//             ['Opera',     6.2],
				//             ['Others',   0.7]
				//          ]
				//       }];
			break;

			default:
			break;
		}
		// console.log(chart_object);
		chart = new Highcharts.Chart(chart_object);
	};

})(jQuery);