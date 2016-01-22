
interface AreaChartConfig {
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
	colour?: string;
}

class AreaChart implements IChart {

	margin: Rectangle;
	width: number;
	height: number;
	interpolation: string;
	invertY: boolean;
	invertX: boolean;
	xaxis: string;
	yaxis: string;
	x: d3.scale.Linear<number, number>;
	x2: d3.scale.Linear<number, number>;
	y: d3.scale.Linear<number, number>;
	dataGroup: any[];
	lineFunc: Function;
	color: string;

	constructor(container: string, config: AreaChartConfig) {
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

		this.color = config.colour || "#FB6C70";

		

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

		var area = d3.svg.area()
			.x((d) => {
				return this.x(d.x);
			})
			.y0(this.height)
			.y1((d) => {
				return this.y(d.y);
			})
			.interpolate(this.interpolation);

		/*if (config.tension) {
			lineFunc.tension(config.tension)
		}*/
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

		var rgb = d3.rgb(this.color);
		var rgba = "rgba(" + [rgb.r, rgb.g, rgb.b, 0].join(",") + ")";

		chart.append("linearGradient")
			.attr("id", "fill-gradient")
			.attr("gradientUnits", "userSpaceOnUse")
			.attr("x1", 0).attr("y1", 0)
			.attr("x2", 0).attr("y2", this.height)
			.selectAll("stop")
			.data([
				{ offset: "0%", color: this.color },
				{ offset: "100%", color: rgba }
			])
			.enter().append("stop")
			.attr("offset", function(d) { return d.offset; })
			.attr("stop-color", function(d) { return d.color; });

		this.dataGroup.forEach((d, i) => {

			var n = i;

			chart.append('path')
				.attr('d', area(d.values))
				.attr('opacity', 0.2)
				.attr('fill', 'url(#fill-gradient)');

			chart.append('path')
				.attr('d', lineFunc(d.values))
				.attr('stroke', this.color)
				.attr('opacity', 1)
				.attr('stroke-width', 1)
				.attr('fill', 'none')

			
		});



	}

	public update = (data: {}[]): void => {

	}
}