interface BarSegmentData {
	value: number;
	name: string;
	color: string;
}

interface BarSegmentChartConfig {
	data: any[];
	width: number;
	height: number;
}

class BarSegmentChart implements IChart {

	margin: Rectangle;
	width: number;
	height: number;
	chart: any;
	
	container: string;

	constructor(container: string, config: BarSegmentChartConfig) {

		
		this.margin = {
			top: 0, right: 0, bottom: 0, left: 0
		}
		

		this.container = container;


		this.width = config.width - this.margin.left - this.margin.right;
		this.height = config.height - this.margin.top - this.margin.bottom;
		

		var values = config.data.map((element) => {
			return element.value;
		});

		var total = d3.sum(values);
		var bar_x = 0;
		var perc_so_far = 0;


		this.chart = d3.select(container)
			.attr("viewBox", "0 0 " + (this.width + this.margin.left + this.margin.right) + " " + (this.height + this.margin.top + this.margin.bottom))
			.append("g")
			.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");


		
		var bar = this.chart.selectAll("g")
			.data(config.data)
			.enter().append("g");

		bar.append("rect")
			.attr("width", function(d) { return ((d["value"] / total) * 100) + "%"; })
			.attr("x", function(d) {
				var prev_perc = perc_so_far;
				var this_perc = 100 * (d["value"] / total);
				perc_so_far = perc_so_far + this_perc;
				return prev_perc + "%";
			})
			.attr("height", this.height)
			.attr("fill", function(d) { return (d["color"]) })
			.attr("opacity", "0.2");

		perc_so_far = 0;

		bar.append("rect")
			.attr("width", function(d) {
				return d["value"] > 0 ? 2 : 0;
			})
			.attr("x", function(d) {
				var prev_perc = perc_so_far;
				var this_perc = 100 * (d["value"] / total);
				perc_so_far = perc_so_far + this_perc;
				return prev_perc + "%";
			})
			.attr("height", this.height)
			.attr("fill", function(d) { return (d["color"]) });

		perc_so_far = 0;

		bar.append("text")
			.attr("x", function(d) {
				var prev_perc = perc_so_far;
				var this_perc = 100 * (d["value"] / total);
				perc_so_far = perc_so_far + this_perc;
				return prev_perc + "%";
			})
			.attr("y", this.height - 10)
			.attr("dx", 10)
			.attr("fill", function(d) { return (d["color"]) })
			.text(function(d) { 
				if ( d["value"] > 0) {
					return Math.round(100 * (d["value"] / total)) + "%"; 
				} else {
					return "";
				}
			});
			//.text(function(d) { return d["name"]; });
















		/*var arc = d3.svg.arc()
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
			.data(pie(<number[]>config.data)).enter().append('g').attr('class', 'slice');

		var labelkey, labelval;

		if (config.detailsOnHover) {

			var sorted:PieData[] = <PieData[]>config.data.sort(function(a:PieData, b:PieData) {
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

				d3.select(d3.event['target']).attr("opacity", 0.5)
			})
			.on('mouseout', (d) => {

				if (!config.detailsOnHover) return;

				d3.select(d3.event['target']).attr("opacity", 0)
			})


*/

		
	}

	

	public update = (data:{}[]): void => {
		//var perc = data[0].value / (data[0].value + data[1].value) * 100;

		//console.log(perc);

		//d3.select(this.container).selectAll(".pieCentreLabel").text(Math.round(perc) + "%");

	}

}
