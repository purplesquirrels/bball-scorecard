interface PieChartConfig {
	data: {}[];
	//outerRadius: number;
	innerRadius: number;
	padAngle: number;
	sortValues?: boolean;
	progressMode?: boolean;
}

class PieChart {

	margin: Rectangle;
	width: number;
	height: number;
	innerRadius: number;
	//outerRadius: number;
	//colors: d3.scale.Ordinal<string, string>;

	constructor(container: string, config: PieChartConfig) {

		this.margin = {
			top: 0, right: 0, bottom: 0, left: 0
		}

		//this.outerRadius = config.outerRadius;
		this.innerRadius = config.innerRadius;

		this.width = 100;//(this.outerRadius * 2) - this.margin.left - this.margin.right;
		this.height = 100;//(this.outerRadius * 2) - this.margin.top - this.margin.bottom;
		

		//this.colors = d3.scale.category20c();

		var colors = d3.scale.linear().domain([0,  config.data.length - 1])
			.range(['#F05B6F', '#FCAB5A']);

		var pie = d3.layout.pie().padAngle(config.padAngle)
		.value(function(d){
			return d.value;
		})

		if (!config.sortValues) {
			pie.sort(null);
		}

		var arc = d3.svg.arc()
			.outerRadius(50)
			.innerRadius(this.innerRadius)

		var chart = d3.select(container)
			.attr("viewBox", "0 0 100 100")
			//.attr("width", width + margin.left + margin.right)
			//.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(50, 50)")
			.selectAll('path')
			.data(pie(config.data)).enter().append('g').attr('class', 'slice');

		var slices = d3.select(container).selectAll("g.slice")
			.append('path')
			.attr('fill', (d, i) => {
				//console.log(i)
				return (typeof d.data.colour != 'undefined' ? d.data.colour : colors(i));
			})
			.attr('d', arc);


		if (config.progressMode) {

			var perc = config.data[0].value / (config.data[0].value + config.data[1].value) * 100;
			d3.select(container)
				.append('text')
				.attr("y", this.height * 0.56)
				.attr("x", this.width * 0.5)
				.attr("class", "pieCentreLabel")
				.style("text-anchor", "middle")
				.text(Math.round(perc) + "%");
			
		}
	}

}
