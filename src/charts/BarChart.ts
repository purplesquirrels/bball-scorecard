interface BarChartConfig {
	key: string,
	value: string,
	data:any[]
}

class BarChart {


	constructor(container: string, config: BarChartConfig) {
		var key = config.key;//"name";
		var value = config.value;//"games";

		var colors = d3.scale.category20c();


		var margin = { top: 20, right: 30, bottom: 30, left: 50 }
		var width = 760 - margin.left - margin.right,
			height = 400 - margin.top - margin.bottom;



		var domain = config.data.map(function(d) { return d[key]; });

		var x = d3.scale.ordinal()
			.domain(domain)
			.rangeRoundBands([0, width], 0.1);

		var y = d3.scale.linear()
			.range([height, 0])
			.domain([0, d3.max(config.data, function(d) { return d[value] })]);

		var xAxis = d3.svg.axis().scale(x).orient("bottom");
		var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "02d");

		var chart = d3.select(container)
			.attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
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
			.text(value);


		chart.selectAll(".bar").data(config.data).enter()
			.append("rect").attr("class", "bar")
			.attr("x", function(d) { return x(d[key]); })
			.attr("y", function(d) { return y(d[value]); })
			.attr("height", function(d) { return height - y(d[value]); })
			.attr("width", x.rangeBand())
			.attr('fill', (d, i) => {
				return colors(i * 5);
			});
	}
}