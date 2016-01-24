interface PieChartConfig {
	data: {}[];
	//outerRadius: number;
	innerRadius: number;
	padAngle: number;
	sortValues?: boolean;
	progressMode?: boolean;
	detailsOnHover?: boolean;
}

class PieChart implements IChart {

	margin: Rectangle;
	width: number;
	height: number;
	innerRadius: number;
	container: string;
	//outerRadius: number;
	//colors: d3.scale.Ordinal<string, string>;

	constructor(container: string, config: PieChartConfig) {

		if (config.detailsOnHover) {
			this.margin = {
				top: 2, right: 2, bottom: 2, left: 2
			}
		} else {
			this.margin = {
				top: 0, right: 0, bottom: 0, left: 0
			}
		}

		this.container = container;

		//this.outerRadius = config.outerRadius;
		this.innerRadius = config.innerRadius;

		this.width = 100 - this.margin.left - this.margin.right;
		this.height = 100 - this.margin.top - this.margin.bottom;
		

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
			.outerRadius(this.width / 2)
			.innerRadius(this.innerRadius)


		var arc2 = d3.svg.arc()
			.outerRadius((this.width + 4) / 2)
			.innerRadius(this.innerRadius - 2)

		var chart = d3.select(container)
			.attr("viewBox", "0 0 " + (this.width + this.margin.left + this.margin.right) + " " + (this.height + this.margin.top + this.margin.bottom))
			//.attr("width", width + margin.left + margin.right)
			//.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + ((this.width + this.margin.left + this.margin.right) / 2) + ", " + ((this.height + this.margin.top + this.margin.bottom) / 2) + ")")
			.selectAll('path')
			.data(pie(config.data)).enter().append('g').attr('class', 'slice');

		var labelkey, labelval;

		if (config.detailsOnHover) {

			var sorted = config.data.sort(function(a, b) {
				if (a.value < b.value) return 1;
				if (a.value > b.value) return -1;
				return 0;
			});

			labelval = d3.select(container)
				.append('text')
				.attr("y", (this.height + this.margin.top + this.margin.bottom) * 0.55)
				.attr("x", (this.width + this.margin.left + this.margin.right) * 0.5)
				.attr("class", "pieCentreLabelValue")
				.style("text-anchor", "middle")
				.text((d, i) => {
					return sorted[0].value;
				});

			labelkey= d3.select(container)
				.append('text')
				.attr("y", (this.height + this.margin.top + this.margin.bottom) * 0.67)
				.attr("x", (this.width + this.margin.left + this.margin.right) * 0.5)
				.attr("class", "pieCentreLabelKey")
				.style("text-anchor", "middle")
				.text((d, i) => {
					return sorted[0].name;
				});
			

		}

		var slices = d3.select(container).selectAll("g.slice")
			.append('path')
			.attr('fill', (d, i) => {
				//console.log(i)
				return (typeof d.data.colour != 'undefined' ? d.data.colour : colors(i));
			})
			//.attr('d', (d) => { return arc(0); })
			//.transition()
			.attr('d', arc)

		d3.select(container).selectAll("g.slice")
			.append('path')
			.attr('fill', (d, i) => {
				return (typeof d.data.colour != 'undefined' ? d.data.colour : colors(i));
			})
			.attr('opacity', 0)
			.attr('d', arc2)

			.on('mouseover', (d, i) => {

				if (!config.detailsOnHover) return;

				labelkey.text(d.data.name);
				labelval.text(d.data.value);

				d3.select(d3.event.target).attr("opacity", 0.5)
			})
			.on('mouseout', (d) => {

				if (!config.detailsOnHover) return;

				d3.select(d3.event.target).attr("opacity", 0)
			})



		if (config.progressMode) {

			var perc = config.data[0].value / (config.data[0].value + config.data[1].value) * 100;
			d3.select(container)
				.append('text')
				.attr("y", (this.height + this.margin.top + this.margin.bottom) * 0.57)
				.attr("x", (this.width + this.margin.left + this.margin.right) * 0.5)
				.attr("class", "pieCentreLabel")
				.style("text-anchor", "middle")
				.text(Math.round(perc) + "%");
			
		}

		
	}

	

	public update = (data:{}[]): void => {
		//var perc = data[0].value / (data[0].value + data[1].value) * 100;

		//console.log(perc);

		//d3.select(this.container).selectAll(".pieCentreLabel").text(Math.round(perc) + "%");

	}

}
