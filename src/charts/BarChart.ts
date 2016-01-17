interface BarChartConfig {
	key: string;
	value: string;
	width: number;
	height: number;
	data: any[];
}

class BarChart {


	constructor(container: string, config: BarChartConfig) {
		var key = config.key;//"name";
		var value = config.value;//"games";

		//var colors = d3.scale.category20c();

		var colors = d3.scale.linear().domain([0, ((config.data.length - 1) * 0.25), ((config.data.length - 1) * 0.5), ((config.data.length - 1) * 0.75), (config.data.length - 1)])
			.range(["#FB6C70", '#F9B450', '#29DDC0', '#5DDCF9', '#7463E7']);
		
		var margin = { top: 20, right: 0, bottom: 0, left: 0 }
		var width = config.width - margin.left - margin.right,
			height = config.height - margin.top - margin.bottom;



		var domain = config.data.map(function(d) { return d[key]; });

		var x = d3.scale.ordinal()
			.domain(domain)
			.rangeRoundBands([0, width], 0.1);

		var y = d3.scale.linear()
			.range([height, 0])
			.domain([0, d3.max(config.data, function(d) { return d[value] })]);

		var xAxis = d3.svg.axis().scale(x).orient("bottom");
		var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "02d");

		var tooltip = d3.select("body").append("div")
			.attr("class", "chartTip barChartTip");

		var chart = d3.select(container)
			.attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
			//.attr("width", width + margin.left + margin.right)
			//.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


		/*chart.append("g")
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
			.text(value);*/


		chart.selectAll(".bar").data(config.data).enter()
			.append("rect").attr("class", "bar")
			.attr("x", function(d) { return x(d[key]); })
			.attr("y", function(d) { return y(d[value]); })
			.attr("height", function(d) { return height - y(d[value]); })
			.attr("width", x.rangeBand())
			.attr('fill', (d, i) => {
				return colors(i);
			})
			.on('mouseover', (d, i) => {
				//console.log(this.dataGroup[n].values[0].name);

				tooltip.transition()
					.style("opacity", 0.9)
					.style("visibility", "visible");

				tooltip.html(d[key])
					.style("left", d3.event.pageX + "px")
					.style("top", d3.event.pageY + "px")

				//d3.select(d3.event.target).attr("opacity", 1)
			})
			.on('mouseout', (d) => {


				tooltip.transition()
					.style("opacity", 0)
					.style("visibility", "hidden");

				//d3.select(d3.event.target).attr("opacity", 0.01)
			});
	}
}