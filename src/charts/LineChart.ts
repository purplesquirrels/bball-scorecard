
interface LineChartConfig {
	width: number;
	height: number;
	data: {}[];
	interpolation: string;
	tension?: number;
	invertY: boolean;
	invertX: boolean;
	xlabel: string;
	ylabel: string;
	scales: boolean;
}

class LineChart {

	margin: Rectangle;
	width: number;
	height: number;
	interpolation: string;
	invertY: boolean;
	invertX: boolean;
	xaxis: string;
	yaxis: string;
	colors: d3.scale.Ordinal<string, string>;
	x: d3.scale.Linear<number, number>;
	x2: d3.scale.Linear<number, number>;
	y: d3.scale.Linear<number, number>;
	dataGroup: any[];
	lineFunc: Function;

	constructor(container: string, config: LineChartConfig) {
		this.margin = {
			top: 10, right: 10, bottom: 10, left: 10
		}

		this.width = (config.width) - this.margin.left - this.margin.right;
		this.height = (config.height) - this.margin.top - this.margin.bottom;

		this.interpolation = config.interpolation || "linear";

		this.invertY = config.invertY || false;
		this.invertX = config.invertX || false;
		this.xaxis = config.xlabel;
		this.yaxis = config.ylabel;
		//this.colors = d3.scale.category20c();

		this.dataGroup = d3.nest()
			.key(function(d: {}): string {
				return d.id;
			})
			.entries(config.data);

		this.colors = d3.scale.linear().domain([0, (this.dataGroup.length * 0.25), (this.dataGroup.length * 0.5), (this.dataGroup.length * 0.75), this.dataGroup.length])
			.range(["#FB6C70", '#F9B450', '#29DDC0', '#5DDCF9', '#7463E7']);

		this.x = d3.scale.linear()
			.domain([0, d3.max(config.data, function(d: {}) { return d.x })])
			.range(this.invertX ? ([this.width, 0]) : ([0, this.width]));

		this.x2 = d3.scale.linear()
			.domain([0, d3.max(config.data, function(d: {}) { return d.x })])
			.range([0, this.width]);

		this.y = d3.scale.linear()
			.domain([1, d3.max(config.data, function(d: {}) { return d.y })])
			.range(this.invertY ? ([0, this.height]) : ([this.height, 0]));

		var lineFunc = d3.svg.line()
			.x((d: {}) => {
				return this.x(d.x);
			})
			.y((d: {}) => {
				return this.y(d.y);
			})
			.interpolate(this.interpolation);

		if (config.tension) {
			lineFunc.tension(config.tension)
		}

		if (config.scales) {
			var xAxis = d3.svg.axis().scale(this.x2).orient("bottom");
			var yAxis = d3.svg.axis().scale(this.y).orient("left").ticks(10, "02d");
		}

		//$("body").append("<div class='lineChartTip'></div>");

		var tooltip = d3.select("body").append("div")
			.attr("class", "chartTip lineChartTip");

		var chart = d3.select(container)
			.attr("viewBox", "0 0 " + (this.width + this.margin.left + this.margin.right) + " " + (this.height + this.margin.top + this.margin.bottom))
			//.attr("width", width + margin.left + margin.right)
			//.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

		if (config.scales) {
			chart.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + this.height + ")")
				.call(xAxis);

			chart.append("g")
				.attr("class", "y axis")
				.call(yAxis)
				.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("x", this.height / -2)
				.attr("dy", "-3.5em")
				.style("text-anchor", "middle")
				.text(this.yaxis);
		}



		//chart.selectAll('path').data(function(d){return d.values}).enter()

		this.dataGroup.forEach((d, i) => {

			var n = i;

			chart.append('path')
				.attr('d', lineFunc(d.values))
				.attr('stroke', (d, i) => {
					return this.colors(n);
				})
				.attr('opacity', 1)
				.attr('stroke-width', 1)
				.attr('fill', 'none')

			chart.append('path')
				.attr('d', lineFunc(d.values))
				.attr('stroke', (d, i) => {
					return this.colors(n);
				})
				.attr('opacity', 0)
				.attr('stroke-width', 10)
				.attr('stroke-linecap', "round")
				.attr('fill', 'none')
				.on('mouseover', (d, i) => {
					//console.log(this.dataGroup[n].values[0].name);

					tooltip.transition()
						.style("opacity", 0.9)
						.style("visibility", "visible");
						
					tooltip.html(this.dataGroup[n].values[0].name)
						.style("left", d3.event.pageX  + "px")
						.style("top", d3.event.pageY + "px")

					d3.select(d3.event.target).attr("opacity", 1)
				})
				.on('mouseout', (d) => {


					tooltip.transition()
						.style("opacity", 0)
						.style("visibility", "hidden");

					d3.select(d3.event.target).attr("opacity", 0.01)
				});
		});



	}
}