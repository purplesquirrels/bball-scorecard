interface BubbleChartConfig {
	key: string;
	value: string;
	width: number;
	height: number;
	data: any[];
}

class BubbleChart implements IChart {

	chart: any;

	constructor(container: string, config: BubbleChartConfig) {
		var key = config.key;//"name";
		var value = config.value;//"games";


		//var colors = d3.scale.linear().domain([0, ((config.data.length - 1) * 0.25), ((config.data.length - 1) * 0.5), ((config.data.length - 1) * 0.75), (config.data.length - 1)])
		//	.range(["#FB6C70", '#F9B450', '#29DDC0', '#5DDCF9', '#7463E7']);
		var maxsizeval = d3.max(config.data, function(d) { return d["size"] });
		var maxval = d3.max(config.data, function(d) { return d[value] });
		var colors = d3.scale.linear().domain([0, maxsizeval/2, maxsizeval])
			.range(["#FB6C70", '#5ddcf9', '#f9b450'].reverse());
		
		var margin = { top: 30, right: 20, bottom: 10, left: 20 }
		var width = config.width - margin.left - margin.right,
			height = config.height - margin.top - margin.bottom;



		var domain = config.data.map(function(d) { return d[key]; });

		var x = d3.scale.ordinal()
			.domain(domain)
			.rangeRoundBands([0, width], 0.1);

		var y = d3.scale.linear()
			.range([height, 0])
			.domain([0, d3.max(config.data, function(d) { return d[value] })]);

		var size = d3.scale.linear()
			.range([50, 15])
			.domain([d3.max(config.data, function(d) { return d["size"] }), 0]);

		var xAxis = d3.svg.axis().scale(x).orient("bottom");
		var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "02d");

		var tooltip = d3.select("body").append("div")
			.attr("class", "chartTip barChartTip");

		this.chart = d3.select(container)
			.attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		
		function getRadius(val) {
			return 15 + (val / maxval * (x.rangeBand() * 3));
		}

		// create bubble backgrounds
		this.chart.selectAll("g.circbg").data(config.data).enter()
			.append("g").attr("class", "circbg")
			.append("circle")
			.attr("cx", function(d:Object) { return x(d[key]) + (x.rangeBand()); })
			.attr("cy", function(d, i) {
				return height * 0.35 + (i === 0 || i % 2 === 0 ? -10 : 10)
			})
			.attr("r", 0)
			.attr('fill', "#000");


		// create bubble colours
		this.chart.selectAll("g.bar").data(config.data).enter()
			.append("g").attr("class", "bar")
			.append("circle")
			.attr("cx", function(d:Object) { return x(d[key]) + (x.rangeBand()); })
			.attr("cy", function(d, i) {
				return height * 0.35 + (i === 0 || i % 2 === 0 ? -10 : 10)
			})
			.attr("r", 0)
			.style("mix-blend-mode", "screen")
			.attr('fill', (d, i) => {
				return colors(d["size"]);
			})

			.on('mouseover', (d, i) => {

				tooltip.transition()
					.style("opacity", 0.9)
					.style("visibility", "visible");

				tooltip.html(d["size"])
					.style("left", d3.event['pageX'] + "px")
					.style("top", d3.event['pageY'] + "px")

			})
			.on('mousemove', (d, i) => {

				tooltip.style("left", d3.event['pageX'] + "px")
					.style("top", d3.event['pageY'] + "px")

			})
			.on('mouseout', (d) => {

				tooltip.transition()
					.style("opacity", 0)
					.style("visibility", "hidden");

				d3.select(d3.event['target'])
					.attr('stroke-width', 0)
			})

		// Animate on bubbles
		this.chart.selectAll("g.circbg circle").transition()
			.duration(1000)
			.delay(function(d, i) {
				return i * 50;
			})
			.attr("r", function(d:Object, i) { return size(d["size"]);/*getRadius(d["size"]);*/ })

		this.chart.selectAll("g.bar circle").transition()
			.duration(1000)
			.delay(function(d, i) {
				return i * 50;
			})
			.attr("r", function(d:Object, i) { return size(d["size"]);/*getRadius(d["size"]);*/; })
			
			
		// Add bubble text
		this.chart.selectAll(".barlabel").data(config.data).enter()
			.append("text")
			.style("text-anchor", "middle")
			.style("fill", "#FFF")
			.style("pointer-events", "none")
			.attr("class", "barChartValue")
			.attr("x", function(d:Object) { return x(d[key]) + (x.rangeBand()); })
			.attr("y", -10)
			.attr("width", 50)
			.attr("height", 15)
			.text(function(d, i) {
				return Math.round(d[value]);
			})

		// add item label
		this.chart.selectAll("g.bar")
			.append("text")
			.style("text-anchor", "middle")
			.style("pointer-events", "none")
			.attr("class", "barChartValue")
			.attr("x", function(d) { return x(d[key]) + x.rangeBand() ; })
			.attr("y",height - 5 )
			.text(function(d) {
				return d[key];
			})
			.transition()
			.duration(1000)
			.delay(function(d, i) {
				return (i * 50);
			})
			.attr("y", function(d, i) {
				return (i == 0 || i % 2 === 0) ? height : height - 20;
			})
	}

	public update(data: {}[]): void {

		//this.chart.selectAll("g.bar rect").data(data).enter()

	}
}