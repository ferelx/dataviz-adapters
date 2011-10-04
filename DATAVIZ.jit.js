(function($){
    DATAVIZ.jit = { };
	DATAVIZ.jit.render = function(data_object, type, container_id){
			var jit_json = { };
			jit_json.label = new Array();
			jit_json.values = new Array();
			  var series_index = 0;
			  var values_index = 0;

			  $.each(data_object.series, function(series_index){
				jit_json.label.push(this.seriesName);
				//jit only looks at Y values for area/line graphs
				$.each(this.data, function(value_index){
					if(jit_json.values[value_index] != null) {
					  jit_json.values[value_index].values.push(this[1]);
				    } else {
					  jit_json.values.push({ 'label':this[0], 'values': [this[1]]});
				    }
				});

			  });

			// console.log(jit_json);

			switch(type) {
				case 'line':
				var areaChart = new $jit.AreaChart({  
				  //id of the visualization container  
				  injectInto: container_id,  
				  //add animations  
				  animate: true,  
				  //separation offsets  
				  Margin: {  
				    top: 5,  
				    left: 5,  
				    right: 5,  
				    bottom: 5  
				  },  
				  labelOffset: 10,  
				  //whether to display sums  
				  showAggregates: true,  
				  //whether to display labels at all  
				  showLabels: true,  
				  //could also be 'stacked'  
				  type: 'stacked',  
				  //label styling  
				  Label: {  
				    type: 'Native', //can be 'Native' or 'HTML'  
				    size: 15,  
				    family: 'Arial',  
				    color: 'black'  
				  },  
				  //enable tips  
				  Tips: {  
				    enable: true,  
				    onShow: function(tip, elem) {  
				      tip.innerHTML = "<div style='background:#CCC;'><b>" + elem.name + "</b>: " + elem.value + "</div>";  
				    }  
				  },  
				  //add left and right click handlers  
				  filterOnClick: true,  
				  restoreOnRightClick:true  
				});  
				//load JSON data.  
				areaChart.loadJSON(jit_json);

				break;

				case 'bar':

					var barChart = new $jit.BarChart({  
					  //id of the visualization container  
					  injectInto: container_id,  
					  //whether to add animations  
					  animate: true,  
					  //horizontal or vertical barcharts  
					  orientation: 'horizontal',  
					  //bars separation  
					  barsOffset: 0.5,  
					  //visualization offset  
					  Margin: {  
					    top: 5,  
					    left: 5,  
					    right: 5,  
					    bottom: 5  
					  },  
					  //labels offset position  
					  labelOffset:5,  
					  //bars style  
					  type:'stacked',  
					  //whether to show the aggregation of the values  
					  showAggregates:true,  
					  //whether to show the labels for the bars  
					  showLabels:true,  
					  //label styles  
					  Label: {  
					    type: 'Native', //Native or HTML  
					    size: 13,  
					    family: 'Arial',  
					    color: 'white'  
					  },  
					  //tooltip options  
					  Tips: {  
					    enable: true,  
					    onShow: function(tip, elem) {  
					      tip.innerHTML = "<div style='background:#CCC;'><b>" + elem.name + "</b>: " + elem.value + "</div>";  
					    }  
					  }  
					});  
					//load JSON data.  
					barChart.loadJSON(jit_json);
				break;

				case 'pie':
				var pieChart = new $jit.PieChart({  
				  //id of the visualization container  
				  injectInto: container_id,  
				  //whether to add animations  
				  animate: true,  
				  //offsets  
				  offset: 30,  
				  sliceOffset: 0,  
				  labelOffset: 20,  
				  //slice style  
				  type: 'stacked',  
				  //whether to show the labels for the slices  
				  showLabels:true,  
				  //resize labels according to  
				  //pie slices values set 7px as  
				  //min label size  
				  resizeLabels: 7,  
				  //label styling  
				  Label: {  
				    type: 'Native', //Native or HTML  
				    size: 20,  
				    family: 'Arial',  
				    color: 'black'  
				  },  
				  //enable tips  
				  Tips: {  
				    enable: true,  
				    onShow: function(tip, elem) {  
				       tip.innerHTML = "<div style='background:#FFF;border: solid 1px black;'><b>" + elem.label + "</b>: " + elem.value;  
				    }  
				  }  
				});  
				//load JSON data.  
				pieChart.loadJSON(jit_json);

				break;
				default:
				break;
			}
	};

})(jQuery);