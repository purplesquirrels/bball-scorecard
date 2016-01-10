
interface LineChartConfig {

}

class LineChart {

	constructor(container:string, config:LineChartConfig) {

	}
}




var LineChart = function(container, config){

	var margin = {top: 20, right: 30, bottom: 30, left: 50}
	var width = 760 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;

	var interpolation = config.interpolation || "linear";
	var invertY = config.invertY || false; 
	var invertX = config.invertX || false; 
	var xaxis = config.xlabel;
	var yaxis = config.ylabel;
	var colors = d3.scale.category20c();

	var dataGroup = d3.nest()
	    .key(function(d) {
	        return d.id;
	    })
	    .entries(config.data);

	//var key = xaxis;//"name";
	//var value = yaxis;//"games";

	//console.log(data);

	var x = d3.scale.linear()
				.domain([1, d3.max(config.data, function(d) { return d.x })])
				.range(invertX ? ([width, 0]) : ([0, width]));

	var x2 = d3.scale.linear()
				.domain([1, d3.max(config.data, function(d) { return d.x })])
				.range([0, width]);

	var y = d3.scale.linear()
				.domain([1, d3.max(config.data, function(d) { return d.y })])
				.range(invertY ? ([0, height]) : ([height, 0]));

	var lineFunc = d3.svg.line()
	.x(function(d) {
		return x(d.x);
	})
	.y(function(d) {
		return y(d.y);
	})	
	.interpolate(interpolation);



	

	

	//var domain = data.map(function(d) { return d[key]; });

	
	var xAxis = d3.svg.axis().scale(x2).orient("bottom");
	var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "02d");

	var chart = d3.select(container)
					.attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom) )
					//.attr("width", width + margin.left + margin.right)
					//.attr("height", height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	chart.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

	chart.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("x", height / -2)
			.attr("dy", "-3.5em")
			.style("text-anchor", "middle")
			.text(yaxis);



	//chart.selectAll('path').data(function(d){return d.values}).enter()

	dataGroup.forEach(function(d, i) {

		var n = i;

		chart.append('path')
	        .attr('d', lineFunc(d.values))
	        .attr('stroke', function(d, i) {
				return colors(n);
			})
	        .attr('opacity', 1)
	        .attr('stroke-width', 1)
	        .attr('fill', 'none')

	     chart.append('path')
	        .attr('d', lineFunc(d.values))
	        .attr('stroke', function(d, i) {
				return colors(n);
			})
	        .attr('opacity', 0.01)
	        .attr('stroke-width', 10)
	        .attr('fill', 'none')
	        .on('mouseover', function(d, i) {
	        	console.log(dataGroup[n].values[0].name);

	        	d3.select(this).attr("opacity", 1)
	        })
	        .on('mouseout', function(d) {
	        	d3.select(this).attr("opacity", 0.01)
	        });
	});

	


	
}