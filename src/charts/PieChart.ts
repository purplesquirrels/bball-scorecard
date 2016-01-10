interface PieChartConfig {
	data: {}[];
	//outerRadius: number;
	innerRadius: number;
	sortValues?: boolean;
}

class PieChart {

	margin: Rectangle;
	width: number;
	height: number;
	innerRadius: number;
	//outerRadius: number;
	colors: d3.scale.Ordinal<string, string>;

	constructor(container: string, config: PieChartConfig) {

		this.margin = {
			//top: 10, right: 10, bottom: 10, left: 10
		}

		//this.outerRadius = config.outerRadius;
		this.innerRadius = config.innerRadius;

		this.width = 100;//(this.outerRadius * 2) - this.margin.left - this.margin.right;
		this.height = 100;//(this.outerRadius * 2) - this.margin.top - this.margin.bottom;
		

		this.colors = d3.scale.category20c();

		var pie = d3.layout.pie()
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

		var slices = d3.selectAll("g.slice")
			.append('path')
			.attr('fill', (d, i) => {
				return d.data.colour || this.colors(i);//this.colors(i);
			})
			.attr('d', arc);
		}
}
