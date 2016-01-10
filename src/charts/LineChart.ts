
interface LineChartConfig {
	width: number;
	height: number;
	data: {}[];
	interpolation: string;
	invertY: boolean;
	invertX: boolean;
	xlabel: string;
	ylabel: string;
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

	constructor(container:string, config:LineChartConfig) {
		this.margin = {
			top: 20, right: 30, bottom: 30, left: 50
		}

		this.width = (config.width || 760) - this.margin.left - this.margin.right;
		this.height = (config.height || 400) - this.margin.top - this.margin.bottom;

		this.interpolation = config.interpolation || "linear";

		this.invertY = config.invertY || false;
		this.invertX = config.invertX || false;
		this.xaxis = config.xlabel;
		this.yaxis = config.ylabel;
		this.colors = d3.scale.category20c();

		this.dataGroup = d3.nest()
			.key(function(d:{}):string {
				return d.id;
			})
			.entries(config.data);

		this.x = d3.scale.linear()
					.domain([1, d3.max(config.data, function(d: {}) { return d.x })])
					.range(this.invertX ? ([this.width, 0]) : ([0, this.width]));

		this.x2 = d3.scale.linear()
					.domain([1, d3.max(config.data, function(d: {}) { return d.x })])
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


		var xAxis = d3.svg.axis().scale(this.x2).orient("bottom");
		var yAxis = d3.svg.axis().scale(this.y).orient("left").ticks(10, "02d");

		var chart = d3.select(container)
			.attr("viewBox", "0 0 " + (this.width + this.margin.left + this.margin.right) + " " + (this.height + this.margin.top + this.margin.bottom))
			//.attr("width", width + margin.left + margin.right)
			//.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");


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
				.attr('opacity', 0.01)
				.attr('stroke-width', 10)
				.attr('fill', 'none')
				.on('mouseover', (d, i) => {
					console.log(this.dataGroup[n].values[0].name);

					d3.select(d3.event.target).attr("opacity", 1)
				})
				.on('mouseout', (d) => {
					d3.select(d3.event.target).attr("opacity", 0.01)
				});
		});



	}
}