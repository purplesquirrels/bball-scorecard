var PieChart = function(container, config){

	var options = {
		data: config.data || [],
		size: config.size || 300,
		title: config.title || "Chart",
		margin: config.margin || {top: 30, right: 30, bottom: 30, left: 30}
	}

	var margin = options.margin
	var width = options.size - margin.left - margin.right,
		height = options.size - margin.top - margin.bottom,
		radius = width / 2,
		colors = d3.scale.category20c();


	var pie = d3.layout.pie()
		.value(function(d){
			return d.value;
		});

	var arc = d3.svg.arc()
		.outerRadius(radius)
		.innerRadius(radius * 0.5)

	var chart = d3.select(container)
		.attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom) )
		//.attr("width", width + margin.left + margin.right)
		//.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + (margin.left + width / 2) + "," + (margin.top + height / 2) + ")")
		.selectAll('path')
		.data(pie(options.data)).enter().append('g').attr('class', 'slice');
		

	var slices = d3.selectAll("g.slice")
		.append('path')
		.attr('fill', function(d, i) {
			return colors(i);
		})
		.attr('d', arc);

	var text =  d3.selectAll("g.slice")
		.append('text')
		.text(function(d, i){
			return d.data.name;
		})
		.attr('text-anchor', 'middle')
		.attr('fill', 'white')
		.attr('transform', function(d){
			d.innerRadius = 0;
			d.outerRadius = radius;
			return 'translate(' + arc.centroid(d) + ")";
		});

	chart.append("text")
		.text(options.title)
		.attr('text-anchor', 'middle')
		//.attr('transform', "translate(" + (margin.left + width / 2) + "," + (margin.top + height / 2) + ")")
};