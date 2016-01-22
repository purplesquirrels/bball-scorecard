interface BarChartConfig {
	key: string;
	value: string;
	width: number;
	height: number;
	sort: string;
	data: any[];
}

class BarChart implements IChart {


	chart: any;

	constructor(container: string, config: BarChartConfig) {
		var key = config.key;//"name";
		var value = config.value;//"games";

		if (config.sort === "desc") {
			config.data.sort(function(a, b) {
				if (a[value] < b[value]) return 1;
				if (a[value] > b[value]) return -1;
				return 0;
			});
		}
		else if (config.sort === "asc") {
			config.data.sort(function(a, b) {
				if (a[value] < b[value]) return -1;
				if (a[value] > b[value]) return 1;
				return 0;
			});
		}

		var colors = d3.scale.linear().domain([0, ((config.data.length - 1) * 0.25), ((config.data.length - 1) * 0.5), ((config.data.length - 1) * 0.75), (config.data.length - 1)])
			.range(["#FB6C70", '#F9B450', '#29DDC0', '#5DDCF9', '#7463E7']);
		
		var margin = { top: 30, right: 0, bottom: 10, left: 0 }
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

		this.chart = d3.select(container)
			.attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		this.chart.selectAll("g.bar").data(config.data).enter()
			.append("g").attr("class", "bar")
			.append("rect")
			.attr("x", function(d) { return x(d[key]); })
			.attr("y", function(d) { return y(d[value]); })
			.attr("height", function(d) { return height - y(d[value]); })
			.attr("width", x.rangeBand())
			.attr('fill', (d, i) => {
				return colors(i);
			})
			.attr('stroke', (d, i) => {
				var rgb = d3.rgb(colors(i));
				return "rgba(" + [rgb.r, rgb.g, rgb.b, 0.5].join(",") + ")";
			})
			.attr('stroke-width', 0)
			.on('mouseover', (d, i) => {

				tooltip.transition()
					.style("opacity", 0.9)
					.style("visibility", "visible");

				tooltip.html(d[key])
					.style("left", d3.event.pageX + "px")
					.style("top", d3.event.pageY + "px")

				d3.select(d3.event.target)
					.attr('stroke-width', 8)
			})
			.on('mouseout', (d) => {


				tooltip.transition()
					.style("opacity", 0)
					.style("visibility", "hidden");

				d3.select(d3.event.target)
					.attr('stroke-width', 0)
			})
			

		this.chart.selectAll("g.bar")
			.append("text")
			.style("text-anchor", "middle")
			.attr("class", "barChartValue")
			.attr("x", function(d) { return x(d[key]) + (x.rangeBand() * 0.5); })
			.attr("y", function(d) { return y(d[value]) - 5; })
			.text(function(d) {
				return d[value];
			})
	}

	public update(data: {}[]): void {

		//this.chart.selectAll("g.bar rect").data(data).enter()

	}
}