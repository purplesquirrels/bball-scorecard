(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];

// library properties:
lib.properties = {
	width: 480,
	height: 84,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	webfonts: {},
	manifest: [
		{src:"images/Spring_2016_v22_1.jpg", id:"Spring_2016_v22_1"}
	]
};



lib.ssMetadata = [];



lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {	//we have found an element in the list		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != cur) { //insert all it's children just before it		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {	//append element and it's parents in the array		
		cur = textInst;		
		while(cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
// symbols:



(lib.Spring_2016_v22_1 = function() {
	this.initialize(img.Spring_2016_v22_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,480,84);


(lib.butterfly4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C6027E").s().p("AgHADQAAAAgBAAQAAAAAAAAQAAgBAAAAQAAgBABAAIAHgFQADgCADABQAEABgBADQAAACgJAFQgEgEgDABg");
	this.shape.setTransform(10.5,4.5,0.311,0.311);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C6027E").s().p("AAAAJQAAgCgBgCIgDgCIABgEQAAgHACgBQABgCACADQADADgBAFIgCAJIgBACIgBgCg");
	this.shape_1.setTransform(8.2,9.4,0.311,0.311);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C6027E").s().p("AgBAJQgDgDABgGQAAgEACgEQAAgBABAAQAAgBAAAAQAAAAAAAAQAAABAAAAQAAAEAFADQgBALgCABIgCABQAAAAAAAAQAAAAAAgBQAAAAgBAAQAAgBAAAAg");
	this.shape_2.setTransform(7,11.8,0.311,0.311);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAHgeIgFgfIAGAHQAFALgBAOQAAAXgYBEQAWhOgDgOg");
	this.shape_3.setTransform(8.2,10.7,0.311,0.311);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D1027F").s().p("AgCALQgDgEABgHQAAgGADgFQAAgBAAAAQABgBAAAAQAAAAAAABQAAAAAAABQAAAEAGADQgBAOgDADIgCABQAAAAAAAAQAAgBAAAAQgBAAAAgBQgBAAAAgBg");
	this.shape_4.setTransform(7.3,12.5,0.311,0.311);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C6027E").s().p("AgBAKQgBgDACgIIACgIQgCATAAAAIgBAAg");
	this.shape_5.setTransform(7.9,11.9,0.311,0.311);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#C6027E").s().p("AgDAOQAAgGADgNIADgOQACAWgDAIQgCAHgBABIgBABQgBAAAAgGg");
	this.shape_6.setTransform(8,11,0.311,0.311);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#A3017E").s().p("AgNAIQABgDAIgIIAFgLQAOAEgBAGQgBAEgFAGQgFAJgDAAQgOgBABgGg");
	this.shape_7.setTransform(9.4,8,0.311,0.311);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#C6027E").s().p("AgFAPQgDgGACgJQABgFADgHIACgEIACgBIAGAAQADABgLAdQAAAFgCAAQAAAAgBAAQAAAAAAAAQgBgBAAAAQgBgBAAgBg");
	this.shape_8.setTransform(9.9,6.8,0.311,0.311);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#A3017E").s().p("AgLALIAEgLIAIgHQAKgJABAEQACAFgFAJQgFAKgEABIgIABIgBAAQgBAAgBAAQAAAAAAgBQAAAAAAgBQAAAAAAgBg");
	this.shape_9.setTransform(10.3,5.4,0.311,0.311);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#40325E").s().p("AAMAqQAHggAEgJQAFgMAMgYQAKgTAAgCQgBgSguANQgSAFgdAfIgaAcQAjg0AsgUQANgFAWgCQAUgCADADQAHAFgHAKQgdAngGAVQgWBKgTAEQASgVADgPg");
	this.shape_10.setTransform(9.6,6.4,0.311,0.311);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#F55CAC").s().p("AgqALIgBgLIAUgKQAMgGAWgFQAWgFAGAAQAFAAAAAFQAAAFgFAEQgCADgOADQgPAEgIACIgqAbQABgFgBgLg");
	this.shape_11.setTransform(10.3,4.9,0.311,0.311);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#40325E").s().p("AgHAAQAAgKAEgTIAEgYIAABAQABAOAGAdQgNgogCgOg");
	this.shape_12.setTransform(6.4,10.4,0.311,0.311);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#F55CAC").s().p("AgGAtQAEgvgCgNIgFgvIAIANQAHARACAOQADAQgBAUQgBAVgDAGIgGASQgFgHgBgLg");
	this.shape_13.setTransform(6.9,10.7,0.311,0.311);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#F33497").s().p("AAAA0QgCgBgFgHIgFgGQAMgkAAgQIgFgmIAHANQAJAOABAJQABAJgCAZIgCAcQgBADgCACQgDACgCAAIgBgBg");
	this.shape_14.setTransform(7.3,11.4,0.311,0.311);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#F55CAC").s().p("AACAAQgCgIgLgSIgNgYQgEgHABgKIACgHQAaAnAEACQAGABAHAGQAJAHABAFQABAGgHAXIgIAgIgHARQgFAJgCACQAJg8gHgPg");
	this.shape_15.setTransform(7.5,10.6,0.311,0.311);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#F33497").s().p("AAXAkQgEgCgHgLQgHgKgFgDQgDgEgNgOIgLgQQgCgBABgGQACgGABACIAXALQAWAMAEADQAFAFAAAVQAAAUgEAAIgCgBg");
	this.shape_16.setTransform(7.6,9.2,0.311,0.311);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#F55CAC").s().p("AAVAVQgNgCgIgFIgngSQgBgDAGgHIAHgGIAWAIQAFADAYAOIALAHQAIAGgFACQgCABgGAAIgJAAg");
	this.shape_17.setTransform(8.1,8.2,0.311,0.311);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#F55CAC").s().p("AgHALQgLgCgPABIgNABIANgLQATgSAIgEQAFgCAXAAIAZAAIgIASIgIAfQgWgLgQgDg");
	this.shape_18.setTransform(9.1,6.8,0.311,0.311);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#F77ABB").s().p("AgcAeQAGgSAMgNQAKgOAQgRIAOgNIADANQAAAPgJAJIg4A2IAEgQg");
	this.shape_19.setTransform(8,6.3,0.311,0.311);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#F0027F").s().p("AhIBvQgOgkgBgTQgBgNAHgaQAKghAUgpIAbgiQAegiAZgFQAUgEAagJQAPgDgEAOQgDAHgSAXQgRAWgHAeQgPA9gXAAIgWgBIgGA6QgIA9gMAMQgDADgDAAQgKAAgNghg");
	this.shape_20.setTransform(8.9,8.5,0.311,0.311);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgEAdQAEgKABgLQAGgWgIgNIABgBQAJAOgGAWQgCAMgDAJg");
	this.shape_21.setTransform(7.8,4.9,0.311,0.311);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgTAUIAKgUQAMgSARgCIAAACQgQABgLATIgKAUg");
	this.shape_22.setTransform(8.5,5.3,0.311,0.311);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgXAcQALghAMgOQAMgNgBgFQgCgHABgDQAEgJAHgBQAHgCACAJQAEANgRAIQAAAUgKAPIgRAfQgMASgFADIgCABQgEAAAKgfg");
	this.shape_23.setTransform(6.9,7.6,0.311,0.311);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#C6027E").s().p("AAIAKQgCgCgGgBIgEgBIgEgGQgEgHACgCQADgDAHADQAFACADAHQAEAFgBAEQAAABAAAAQAAAAAAABQAAAAAAAAQgBAAAAAAIgCgBg");
	this.shape_24.setTransform(5,1.6,0.311,0.311);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#A3017E").s().p("AgLAGQgEACACgEQABgEAGgDQAGgFAGABQAHABABADQACADgOAIQgIgDgFABg");
	this.shape_25.setTransform(3,7.2,0.311,0.311);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#C6027E").s().p("AgFAIQgHAAgBgEQgBgCAGgEIAHgFIADABQAGABADgBQAEgBgBADQgCAEgGADQgFAFgEAAIgCAAg");
	this.shape_26.setTransform(2.1,10.1,0.311,0.311);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#40325E").s().p("AghAMQAagnAOgKQAOgLAUgCQAJAAAGABIgpAQQgMAFgdAnIgdAog");
	this.shape_27.setTransform(1.8,8.2,0.311,0.311);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#D1027F").s().p("AgQAFQgCgDAIgFIAIgGIAFABQAIACADgCQAFgCgCAFQgCAFgHAEQgGAGgIAAQgJAAgBgFg");
	this.shape_28.setTransform(0.9,10.2,0.311,0.311);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#C6027E").s().p("AAAAAIAJgIQgIAQgHABIgBAAQgDAAAKgJg");
	this.shape_29.setTransform(0.6,9.3,0.311,0.311);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#C6027E").s().p("AgPAQQgCgDADgHQADgGANgIIAPgIQgQAXgHAHQgEADgDAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQgBgBAAAAg");
	this.shape_30.setTransform(1.5,8.5,0.311,0.311);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#A3017E").s().p("AgLAKQgGgEACgKQABgKAEgEQADgDALAEIANAFQAAAagEAFQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAgBAAQgGAAgOgKg");
	this.shape_31.setTransform(2.8,5.1,0.311,0.311);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#C6027E").s().p("AgQALIANgTQAFgLAEACQAGACAGAHQAAAIgJAKQgIAIgKABIgDAAQgIAAAEgIg");
	this.shape_32.setTransform(3.5,3.7,0.311,0.311);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#A3017E").s().p("AAAATIgKgKQgGgFAFgKQAEgNAHgBQAJgDAFAfQgDAEgDAIQgBAAAAAAQAAABAAAAQgBAAAAAAQgBABAAAAQgCAAgDgDg");
	this.shape_33.setTransform(4.3,2.3,0.311,0.311);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#40325E").s().p("ABUAyQgIgygWgVQg0g3gUAMQgDACgHAWQgJAegHAMQgEAIgaAeQgLAOAFAjQgagYAyhGQARgZAAg1QAAgHAFgDQAEgDAIACQAIACAZAVQAdAWAMAQQAuA6gKBHQAAgVgEgZg");
	this.shape_34.setTransform(4.6,3,0.311,0.311);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#F55CAC").s().p("AgKAAQgHgJgSgTQgPgPgBgFQgBgHAEgDQAFgEAHAFQAKAGAZAYQAbAbAKAPQAQAYABAEIgOAGQgOAHgDAFQgVgqgLgTg");
	this.shape_35.setTransform(5.2,2,0.311,0.311);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#40325E").s().p("AgpAaQAZgJAKgGQAOgIA4gkQgEAJgMAOQgPAQgMAFQgMAHgkAJIglAHg");
	this.shape_36.setTransform(4.2,9.5,0.311,0.311);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#F55CAC").s().p("AhNAnIAMgUQADgGAWgNQAWgRATgIQAfgNAuAAIg8AcQgKAFgbATIgaAUQgIAEgNABg");
	this.shape_37.setTransform(3.7,9.5,0.311,0.311);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#F33497").s().p("Ag5AgQgGgCgCgFQgBgEACgDQACgDAZgRQAbgUAKgFQATgIAvABQgbAKgVAMQgNAIgOATIgNAUQgbAAgIgDg");
	this.shape_38.setTransform(2.1,9.6,0.311,0.311);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#F55CAC").s().p("AhjAeQADgLAFgHIAXgcQATgZAHgDQAIgDAUAFQAQADAIAEQAIAEBUAAQgGANgVADQhGADgZAEQgRADghAZIgeAaQgCgFADgLg");
	this.shape_39.setTransform(3.2,8.9,0.311,0.311);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#F33497").s().p("ABFAUQg/ABgRgFQgKgCgWAAQgXAAgIgCQgMgCAZgPQAagQAMACQAJABAuAPIAuANQADAAgEAGQgDAEgEAAIgBAAg");
	this.shape_40.setTransform(4.1,7.3,0.311,0.311);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#F55CAC").s().p("AgIAGQgUgGgTgJQgVgLgEgHQgDgGARAEIAYAGIBAARIAoAOQAGAVgGACQg3gQgXgJg");
	this.shape_41.setTransform(4.3,6.7,0.311,0.311);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#F55CAC").s().p("AAJAVQgQgKgfgLIgagHIAZgfQAFgGAEgOIAiAYQAlAZADAHQAKAKAGAeIAFAVQgbgXgdgPg");
	this.shape_42.setTransform(4.3,4.3,0.311,0.311);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FAA7D2").s().p("AgVgfQgDgQARgJQAHgFAJgBIAGAXQAHAbAAATQABAWgMAUIgLAOg");
	this.shape_43.setTransform(6.6,5.4,0.311,0.311);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#F0027F").s().p("AhzCdQgEgUA4gyQAbgZAdgVIgkgXQgOgIABgQQABgXAaggQAWgcgBggQAAgiAFgHQAHgOASARIA1A2QAeAcAJA3QAEAagCAWQgRAxgYAhQgSAagQAIQgZAMg4ALQgcAFgSAAQgbAAgCgNg");
	this.shape_44.setTransform(3.7,5.4,0.311,0.311);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_44,p:{scaleX:0.311,x:3.7,y:5.4}},{t:this.shape_43,p:{scaleX:0.311,x:6.6,y:5.4}},{t:this.shape_42,p:{scaleX:0.311,x:4.3,y:4.3}},{t:this.shape_41,p:{scaleX:0.311,x:4.3,y:6.7}},{t:this.shape_40,p:{scaleX:0.311,x:4.1,y:7.3}},{t:this.shape_39,p:{scaleX:0.311,x:3.2,y:8.9}},{t:this.shape_38,p:{scaleX:0.311,x:2.1,y:9.6}},{t:this.shape_37,p:{scaleX:0.311,x:3.7,y:9.5}},{t:this.shape_36,p:{scaleX:0.311,x:4.2,y:9.5}},{t:this.shape_35,p:{scaleX:0.311,x:5.2,y:2}},{t:this.shape_34,p:{scaleX:0.311,x:4.6,y:3}},{t:this.shape_33,p:{scaleX:0.311,x:4.3,y:2.3}},{t:this.shape_32,p:{scaleX:0.311,x:3.5,y:3.7}},{t:this.shape_31,p:{scaleX:0.311,x:2.8,y:5.1}},{t:this.shape_30,p:{scaleX:0.311,x:1.5,y:8.5}},{t:this.shape_29,p:{scaleX:0.311,x:0.6,y:9.3}},{t:this.shape_28,p:{scaleX:0.311,x:0.9,y:10.2}},{t:this.shape_27,p:{scaleX:0.311,x:1.8,y:8.2}},{t:this.shape_26,p:{scaleX:0.311,x:2.1,y:10.1}},{t:this.shape_25,p:{scaleX:0.311,x:3,y:7.2}},{t:this.shape_24,p:{scaleX:0.311,x:5,y:1.6}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20,p:{scaleX:0.311,rotation:0,x:8.9,y:8.5}},{t:this.shape_19,p:{scaleX:0.311,rotation:0,x:8,y:6.3}},{t:this.shape_18,p:{scaleX:0.311,rotation:0,x:9.1,y:6.8}},{t:this.shape_17,p:{scaleX:0.311,rotation:0,x:8.1,y:8.2}},{t:this.shape_16,p:{scaleX:0.311,rotation:0,x:7.6}},{t:this.shape_15,p:{scaleX:0.311,rotation:0,x:7.5,y:10.6}},{t:this.shape_14,p:{scaleX:0.311,rotation:0,x:7.3,y:11.4}},{t:this.shape_13,p:{scaleX:0.311,rotation:0,x:6.9,y:10.7}},{t:this.shape_12,p:{scaleX:0.311,rotation:0,x:6.4,y:10.4}},{t:this.shape_11,p:{scaleX:0.311,rotation:0,x:10.3,y:4.9}},{t:this.shape_10,p:{scaleX:0.311,rotation:0,x:9.6,y:6.4}},{t:this.shape_9,p:{scaleX:0.311,rotation:0,x:10.3,y:5.4}},{t:this.shape_8,p:{scaleX:0.311,rotation:0,x:9.9,y:6.8}},{t:this.shape_7,p:{scaleX:0.311,rotation:0,x:9.4,y:8}},{t:this.shape_6,p:{scaleX:0.311,rotation:0,x:8}},{t:this.shape_5,p:{scaleX:0.311,rotation:0,x:7.9}},{t:this.shape_4,p:{scaleX:0.311,rotation:0,x:7.3,y:12.5}},{t:this.shape_3,p:{scaleX:0.311,rotation:0,x:8.2}},{t:this.shape_2,p:{scaleX:0.311,rotation:0,x:7,y:11.8}},{t:this.shape_1,p:{scaleX:0.311,rotation:0,x:8.2,y:9.4}},{t:this.shape,p:{scaleX:0.311,rotation:0,x:10.5,y:4.5}}]}).to({state:[{t:this.shape_44,p:{scaleX:0.191,x:5.1,y:5.7}},{t:this.shape_43,p:{scaleX:0.191,x:6.9,y:5.7}},{t:this.shape_42,p:{scaleX:0.191,x:5.4,y:4.7}},{t:this.shape_41,p:{scaleX:0.191,x:5.5,y:7}},{t:this.shape_40,p:{scaleX:0.191,x:5.3,y:7.6}},{t:this.shape_39,p:{scaleX:0.191,x:4.8,y:9.2}},{t:this.shape_38,p:{scaleX:0.191,x:4.1,y:9.9}},{t:this.shape_37,p:{scaleX:0.191,x:5.1,y:9.8}},{t:this.shape_36,p:{scaleX:0.191,x:5.4,y:9.9}},{t:this.shape_35,p:{scaleX:0.191,x:6,y:2.3}},{t:this.shape_34,p:{scaleX:0.191,x:5.6,y:3.3}},{t:this.shape_33,p:{scaleX:0.191,x:5.4,y:2.7}},{t:this.shape_32,p:{scaleX:0.191,x:5,y:4}},{t:this.shape_31,p:{scaleX:0.191,x:4.5,y:5.4}},{t:this.shape_30,p:{scaleX:0.191,x:3.7,y:8.8}},{t:this.shape_29,p:{scaleX:0.191,x:3.2,y:9.6}},{t:this.shape_28,p:{scaleX:0.191,x:3.4,y:10.6}},{t:this.shape_27,p:{scaleX:0.191,x:3.9,y:8.5}},{t:this.shape_26,p:{scaleX:0.191,x:4.1,y:10.5}},{t:this.shape_25,p:{scaleX:0.191,x:4.7,y:7.5}},{t:this.shape_24,p:{scaleX:0.191,x:5.9,y:1.9}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20,p:{scaleX:0.196,rotation:15,x:8.3,y:8.7}},{t:this.shape_19,p:{scaleX:0.196,rotation:15,x:8.3,y:6.5}},{t:this.shape_18,p:{scaleX:0.196,rotation:15,x:8.9,y:7.1}},{t:this.shape_17,p:{scaleX:0.196,rotation:15,x:7.9,y:8.3}},{t:this.shape_16,p:{scaleX:0.196,rotation:15,x:7.4}},{t:this.shape_15,p:{scaleX:0.196,rotation:15,x:7,y:10.5}},{t:this.shape_14,p:{scaleX:0.196,rotation:15,x:6.6,y:11.3}},{t:this.shape_13,p:{scaleX:0.196,rotation:15,x:6.6,y:10.5}},{t:this.shape_12,p:{scaleX:0.196,rotation:15,x:6.3,y:10.2}},{t:this.shape_11,p:{scaleX:0.196,rotation:15,x:10.1,y:5.5}},{t:this.shape_10,p:{scaleX:0.196,rotation:15,x:9.3,y:6.8}},{t:this.shape_9,p:{scaleX:0.196,rotation:15,x:10,y:6}},{t:this.shape_8,p:{scaleX:0.196,rotation:15,x:9.4,y:7.2}},{t:this.shape_7,p:{scaleX:0.196,rotation:15,x:8.8,y:8.3}},{t:this.shape_6,p:{scaleX:0.196,rotation:15,x:7.2}},{t:this.shape_5,p:{scaleX:0.196,rotation:15,x:6.8}},{t:this.shape_4,p:{scaleX:0.196,rotation:15,x:6.3,y:12.3}},{t:this.shape_3,p:{scaleX:0.196,rotation:15,x:7.4}},{t:this.shape_2,p:{scaleX:0.196,rotation:15,x:6.3,y:11.6}},{t:this.shape_1,p:{scaleX:0.196,rotation:15,x:7.7,y:9.5}},{t:this.shape,p:{scaleX:0.196,rotation:15,x:10.3,y:5.2}}]},5).wait(4));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,11.9,13.1);


(lib.butterfly2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00A0C6").s().p("AADAQQgBgEgEgFIgFgEIgBgIQAAgKACgBQAFgCADAHQAHAGABAHQgBAJgCAFIgCACIgCgCg");
	this.shape.setTransform(10,2.4,0.311,0.311);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0380B7").s().p("AgPAAQgEAAADgCQAEgDAJgCQAGgCAIAEQAIAEgBADQAAAFgSACQgJgIgGgBg");
	this.shape_1.setTransform(4.9,7.5,0.311,0.311);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0380B7").s().p("AgKAGQgIgEABgCQAAgDAKgDIAHgCIAGAEQAGAEAEAAQAEAAgDACQgEAEgIACIgFABQgFAAgFgDg");
	this.shape_2.setTransform(2.4,10.2,0.311,0.311);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#0C429B").s().p("AgqADQAvgdAWgEQAWgEAWAIQAKAEAHAFIg2gEQgPgBg1AaQgcAOgZAPIAtgeg");
	this.shape_3.setTransform(3.1,7.8,0.311,0.311);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#0380B7").s().p("AgNAIQgJgFAAgDQAAgEAMgEIAKgCIAHAFQAIAFAEAAQAHAAgFADQgEAEgLADIgGABQgHAAgGgDg");
	this.shape_4.setTransform(1,9.7,0.311,0.311);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#0380B7").s().p("AgMAFQgGgCARgDIAPgFQgOALgIAAIgEgBg");
	this.shape_5.setTransform(1.2,8.6,0.311,0.311);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#0380B7").s().p("AgaAIQAAgFAHgEQAFgFAUgDIAVgBQgcARgOADIgGABQgEAAgBgDg");
	this.shape_6.setTransform(2.6,8.2,0.311,0.311);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#0380B7").s().p("AgUAEQgEgGAHgMQAHgKAHgCQADgCALALIAMAMQgPAcgGAEIgCAAQgGAAgOgXg");
	this.shape_7.setTransform(5.8,5.1,0.311,0.311);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#0380B7").s().p("AgSAPQgOgFALgHIAXgOQAOgIADAEQAFAGADAJQgFAJgQAGQgGADgFAAQgGAAgHgDg");
	this.shape_8.setTransform(7.2,3.9,0.311,0.311);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#0380B7").s().p("AgIAUIgHgRQgEgHALgLQAKgMAJADQAMACgMAlIgLAJIgCACQgDAAgDgGg");
	this.shape_9.setTransform(8.7,2.9,0.311,0.311);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#0C429B").s().p("ABeBUQARg7gMgiQgdhXgdABQgEABgUAVQgXAagPANQgJAHgrATQgUAIgMAoQgJgWAXgXQASgVAsgZQAegTAbg5QADgGAHgBQAGgBAHAGQAIAGATAkQAUAoAFAYQATBXgwBIQALgXAJgdg");
	this.shape_10.setTransform(7.9,4.2,0.311,0.311);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#71CADF").s().p("AgNAAQgCgNgKgeQgJgZACgFQADgJAGgBQAHgBAGAIQAHALANApQARArADAXQAEAhgBAGIgSgBQgQABgGADQgCg5gEgbg");
	this.shape_11.setTransform(10,2.8,0.311,0.311);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#0C429B").s().p("AgsAEIgrgJIAdADQAgACANAAQAUAABRgNQgJAIgVAHQgZALgRAAIgCABQgOAAgsgKg");
	this.shape_12.setTransform(5,11,0.311,0.311);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#6CB4D4").s().p("AhcAOIgMgFIAXgOQAHgFAfgFQAigGAZACQAYABAjANQARAFANAFQg7gCgUABQgNAAgoAIIgoAJQgLgBgOgGg");
	this.shape_13.setTransform(4.4,10.1,0.311,0.311);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#71CADF").s().p("AhSAHQgFgFABgFQAAgFAEgCQAFgCAkgHQAogIAOAAQAYABAzAaQgjgDgdACQgSABgaAOQgPAHgKAHQgdgOgIgHg");
	this.shape_14.setTransform(2.8,9.5,0.311,0.311);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#95D7E7").s().p("ABdAsIgzgUQgpgRgPgFQgUgEgyAKIguANQAAgGAJgLQAJgIAKgFQBFgmAOABQAKAAASAQQARANAHAIQAHAIBbAqQgDADgHABQgFACgGAAQgIAAgJgDg");
	this.shape_15.setTransform(4.1,8.7,0.311,0.311);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#71CADF").s().p("ABGAxQhFghgRgPQgJgGgYgLQgZgMgHgFQgNgJAkgFQAlgFAMAIQAJAHAqAnIArAoQADACgHAEQgEACgDAAIgEgBg");
	this.shape_16.setTransform(5.8,8.5,0.311,0.311);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#71CADF").s().p("AA4BHQgzgugVgXQgRgPgQgWQgRgXgBgJQAAgIAQAMIAYAUQArAkARAPIAjAmQgEAZgHAAIgBAAg");
	this.shape_17.setTransform(6.7,7.6,0.311,0.311);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#71CADF").s().p("AAGASQgMgSgcgaIgYgYIArgVQAJgEAJgOIAbAtQAbAtABAJQADARgIAkIgGAaQgRgngYggg");
	this.shape_18.setTransform(7.5,5.3,0.311,0.311);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#71CADF").s().p("AgMguQAFgTAWgCQAMAAALADQgBABgFAcQgGAhgLAVQgLAYgUAPQgMAIgJACg");
	this.shape_19.setTransform(9.9,7.4,0.311,0.311);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#99D9E8").s().p("AhiCiQhVgXAHgZQAHgYBWgaQAsgNAngIIgZgrQgLgOAKgTQANgZArgVQAmgTARgjQARglAIgGQASgLALAdIAdBWQATAvgUA+QgKAhgOAXQgrAsgrAYQgiASgVABIgCAAQgeAAhEgSg");
	this.shape_20.setTransform(5.6,5.8,0.311,0.311);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#1A1A1A").s().p("AgLAhQAIgKAEgNQANgYgIgSIACgBQAIATgMAZQgFAOgIAJg");
	this.shape_21.setTransform(11.1,7.4,0.311,0.311);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#1A1A1A").s().p("AgdATQAIgKAKgJQAUgVAVACIgBACQgTgBgUASQgKAKgHAKg");
	this.shape_22.setTransform(11.8,8,0.311,0.311);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#1A1A1A").s().p("AgnAUQAfgeAVgIQAUgIABgGQABgJADgCQAJgIAIACQAJACgCALQgCAKgMAEIgMABIgHANQgKAMgNAIIgjAYQgWAOgHABIgBAAQgJAAAdgfg");
	this.shape_23.setTransform(9,9.9,0.311,0.311);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#00A0C6").s().p("AAAALQAAgCgDgCIgFgCIABgGQABgIAEgCQACgCAFADQAFADgBAHQgCAFgDAFIgDADIgBgCg");
	this.shape_24.setTransform(12.4,2.8,0.311,0.311);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#8C9785").s().p("AgOAGQgFABAEgEQAEgDAKgEQAGgEAHABQAHABgBAEQgCACgRAIQgIgDgFABg");
	this.shape_25.setTransform(6.5,8.6,0.311,0.311);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#99D9E8").s().p("AgLAIQgHAAABgEQAAgDALgDIAIgFIAEABQAGACADgBQAFgCgEAEQgEADgJAEQgGAEgGAAIgCAAg");
	this.shape_26.setTransform(3.6,11.7,0.311,0.311);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#0380B7").s().p("AgoALQA0gnAWgLQAWgKAUgBQAJAAAGACIg0AOQgPAFg5AnIg5ApIAygog");
	this.shape_27.setTransform(4.6,9.6,0.311,0.311);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#6CB4D4").s().p("AgOAKQgJAAACgFQAAgEANgFIALgGIAFACQAHACAEgBQAGgCgFAFQgFAEgLAFQgIAGgIAAIgCgBg");
	this.shape_28.setTransform(2.3,11.7,0.311,0.311);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#99D9E8").s().p("AgBAAIAQgIQgTAQgJABIAAAAQgEAAAQgJg");
	this.shape_29.setTransform(2.7,10.7,0.311,0.311);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#999A86").s().p("AgbAQQAAgEAIgHQAHgFATgIIAVgIQgfAXgOAHQgGADgCAAQgBAAAAAAQAAAAAAAAQgBAAAAgBQAAAAAAAAg");
	this.shape_30.setTransform(4.2,9.9,0.311,0.311);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#8C9785").s().p("AgVAKQgDgFAKgKQAIgLAGgEQAEgDAKAGIAJAFQgTAcgGAFIgEABQgGAAgJgMg");
	this.shape_31.setTransform(7.9,6.4,0.311,0.311);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#999A86").s().p("AgUAKQAngfADADQAEADABAIIgFAGQgIAFgKAHQgLAIgMAAIgCAAQgLAAAMgJg");
	this.shape_32.setTransform(9.4,4.9,0.311,0.311);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#00A0C6").s().p("AgMAUIgFgLQgCgGANgLQALgNAIgBQAMgCgSAhIgMAMQgBAAAAABQgBAAAAABQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAAAQgBgBAAgBg");
	this.shape_33.setTransform(11.1,3.6,0.311,0.311);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#0C429B").s().p("ABQA5QAbg2gFgYQgNg9gdALQgEABgXAYQgdAegPAPQgJAGgvAfQgVAOgSAlQgGgPAbgcQAVgWAwgiQAggZAlg4QAEgHAHgDQAGgDAGADQAHACAMAYQAMAaABASQAEA/g8BMQAPgWANgbg");
	this.shape_34.setTransform(9.9,4.3,0.311,0.311);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#95D7E7").s().p("AgMAAQABgKgGgVQgEgRADgFQAEgIAHgDQAHgEACAFQAFAIAHAbQAJAegBARQgBAbgDAEIgRAGQgQAGgGAFQAIguABgVg");
	this.shape_35.setTransform(12.4,3.2,0.311,0.311);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#0C429B").s().p("Ag6AZIAsgNQATgIBSgjQgKAJgWAOQgbAQgRAGQgOAFgrAHIgoAGg");
	this.shape_36.setTransform(6.1,11.2,0.311,0.311);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#46BAD5").s().p("AhmAjIAZgTQAIgHAegMQAjgQAYgIQAmgLAtADIhOAaQgNAEgoATIgoATQgLADgNAAg");
	this.shape_37.setTransform(5.6,11.1,0.311,0.311);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#99D9E8").s().p("AhSAdQgEgDACgFQABgFAEgCQAGgEAkgPQAngUAPgFQAYgHAtAFQghAJgdALQgSAHgdATIgbAVQgagCgGgEg");
	this.shape_38.setTransform(4.1,11.1,0.311,0.311);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#00A0C6").s().p("AhyAeQALgMAKgHQBOg1AKgDQAIgCARAGQAOAFAGAEQAFAFBSAFQgPAOgXABIgvABQglgBgOACQgSABgzAYIgwAaQABgEALgMg");
	this.shape_39.setTransform(5.4,10.3,0.311,0.311);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#A6A98A").s().p("AA9AZQg9gEgPgGQgIgEgVgBQgXgBgGgDQgLgDAlgOQAkgQALADQAGACAjAUIAjARQADAAgIAGQgGAEgDAAIgBAAg");
	this.shape_40.setTransform(7.2,8.9,0.311,0.311);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#00A0C6").s().p("AgSAGQgOgGgMgNQgMgNABgIQAAgGAOAFIAUAIQAlAPANAIIAcASQgJAXgHABQgpgVgSgLg");
	this.shape_41.setTransform(8.3,8.2,0.311,0.311);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#A6B28D").s().p("AAAAVQgKgLgVgLIgUgMIAugfQAFgEAIgJIAIgIIASAcQASAeAAAGQAAAFgGAQQgEANgFAKIgKAXQgKgagRgTg");
	this.shape_42.setTransform(9.6,5.7,0.311,0.311);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#67B3D3").s().p("AgDgjQAHgRAXgJQAMgEAKgBIgKAZQgNAegOAUQgNAYgZATQgNAKgJAFg");
	this.shape_43.setTransform(11.4,7,0.311,0.311);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#71CADF").s().p("Ai5ChQALgWBZgxIBVgtIgRgaQgIgLANgRQAPgYAwggQAogcAXgiQAXgkAJgHQATgPAGAUQAEANAKAwQAKAggfA7QgPAcgRAXQgyAzgvAhQgjAbgUAHQgeALhDAIQgXACgPAAQgmAAAIgQg");
	this.shape_44.setTransform(7.2,6.7,0.311,0.311);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#95D7E7").s().p("AAAAVQgKgLgVgLIgUgMIAugfQAFgEAIgJIAIgIIASAcQASAeAAAGQAAAFgGAQQgEANgFAKIgKAXQgKgagRgTg");
	this.shape_45.setTransform(9.8,6.5,0.28,0.269,5.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_44,p:{scaleX:0.311,scaleY:0.311,rotation:0,x:7.2,y:6.7}},{t:this.shape_43,p:{scaleX:0.311,scaleY:0.311,rotation:0,y:7}},{t:this.shape_42},{t:this.shape_41,p:{scaleX:0.311,scaleY:0.311,rotation:0,x:8.3,y:8.2}},{t:this.shape_40,p:{scaleX:0.311,scaleY:0.311,rotation:0,x:7.2,y:8.9}},{t:this.shape_39,p:{scaleX:0.311,scaleY:0.311,rotation:0,x:5.4,y:10.3}},{t:this.shape_38,p:{scaleX:0.311,scaleY:0.311,rotation:0,x:4.1,y:11.1}},{t:this.shape_37,p:{scaleX:0.311,scaleY:0.311,rotation:0,x:5.6,y:11.1}},{t:this.shape_36,p:{scaleX:0.311,scaleY:0.311,rotation:0,x:6.1,y:11.2}},{t:this.shape_35,p:{scaleX:0.311,scaleY:0.311,rotation:0,x:12.4,y:3.2}},{t:this.shape_34,p:{scaleX:0.311,scaleY:0.311,rotation:0,x:9.9,y:4.3}},{t:this.shape_33,p:{scaleX:0.311,scaleY:0.311,rotation:0,x:11.1,y:3.6}},{t:this.shape_32,p:{scaleX:0.311,scaleY:0.311,rotation:0,x:9.4,y:4.9}},{t:this.shape_31,p:{scaleX:0.311,scaleY:0.311,rotation:0,x:7.9,y:6.4}},{t:this.shape_30,p:{scaleX:0.311,scaleY:0.311,rotation:0,x:4.2,y:9.9}},{t:this.shape_29,p:{scaleX:0.311,scaleY:0.311,rotation:0,x:2.7,y:10.7}},{t:this.shape_28,p:{scaleX:0.311,scaleY:0.311,rotation:0,x:2.3,y:11.7}},{t:this.shape_27,p:{scaleX:0.311,scaleY:0.311,rotation:0,x:4.6,y:9.6}},{t:this.shape_26,p:{scaleX:0.311,scaleY:0.311,rotation:0,x:3.6,y:11.7}},{t:this.shape_25,p:{scaleX:0.311,scaleY:0.311,rotation:0,x:6.5,y:8.6}},{t:this.shape_24,p:{scaleX:0.311,scaleY:0.311,rotation:0,x:12.4,y:2.8}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20,p:{scaleX:0.311,rotation:0,x:5.6,y:5.8}},{t:this.shape_19,p:{scaleX:0.311,rotation:0,x:9.9,y:7.4}},{t:this.shape_18,p:{scaleX:0.311,rotation:0,x:7.5,y:5.3}},{t:this.shape_17,p:{scaleX:0.311,rotation:0,x:6.7,y:7.6}},{t:this.shape_16,p:{scaleX:0.311,rotation:0,x:5.8,y:8.5}},{t:this.shape_15,p:{scaleX:0.311,rotation:0,x:4.1,y:8.7}},{t:this.shape_14,p:{scaleX:0.311,rotation:0,x:2.8,y:9.5}},{t:this.shape_13,p:{scaleX:0.311,rotation:0,x:4.4,y:10.1}},{t:this.shape_12,p:{scaleX:0.311,rotation:0,x:5,y:11}},{t:this.shape_11,p:{scaleX:0.311,rotation:0,x:10,y:2.8}},{t:this.shape_10,p:{scaleX:0.311,rotation:0,x:7.9,y:4.2}},{t:this.shape_9,p:{scaleX:0.311,rotation:0,x:8.7,y:2.9}},{t:this.shape_8,p:{scaleX:0.311,rotation:0,x:7.2,y:3.9}},{t:this.shape_7,p:{scaleX:0.311,rotation:0,x:5.8,y:5.1}},{t:this.shape_6,p:{scaleX:0.311,rotation:0,x:2.6,y:8.2}},{t:this.shape_5,p:{scaleX:0.311,rotation:0,x:1.2,y:8.6}},{t:this.shape_4,p:{scaleX:0.311,rotation:0,x:1,y:9.7}},{t:this.shape_3,p:{scaleX:0.311,rotation:0,x:3.1,y:7.8}},{t:this.shape_2,p:{scaleX:0.311,rotation:0,x:2.4,y:10.2}},{t:this.shape_1,p:{scaleX:0.311,rotation:0,x:4.9,y:7.5}},{t:this.shape,p:{scaleX:0.311,rotation:0,x:10,y:2.4}}]}).to({state:[{t:this.shape_44,p:{scaleX:0.28,scaleY:0.269,rotation:5.9,x:7.6,y:7.1}},{t:this.shape_43,p:{scaleX:0.28,scaleY:0.269,rotation:5.9,y:7.7}},{t:this.shape_45},{t:this.shape_41,p:{scaleX:0.28,scaleY:0.269,rotation:5.9,x:8.5,y:8.5}},{t:this.shape_40,p:{scaleX:0.28,scaleY:0.269,rotation:5.9,x:7.4,y:9}},{t:this.shape_39,p:{scaleX:0.28,scaleY:0.269,rotation:5.9,x:5.6,y:10}},{t:this.shape_38,p:{scaleX:0.28,scaleY:0.269,rotation:5.9,x:4.4,y:10.6}},{t:this.shape_37,p:{scaleX:0.28,scaleY:0.269,rotation:5.9,x:5.7,y:10.7}},{t:this.shape_36,p:{scaleX:0.28,scaleY:0.269,rotation:5.9,x:6.2,y:10.9}},{t:this.shape_35,p:{scaleX:0.28,scaleY:0.269,rotation:5.9,x:12.5,y:4.6}},{t:this.shape_34,p:{scaleX:0.28,scaleY:0.269,rotation:5.9,x:10.2,y:5.3}},{t:this.shape_33,p:{scaleX:0.28,scaleY:0.269,rotation:5.9,x:11.4,y:4.8}},{t:this.shape_32,p:{scaleX:0.28,scaleY:0.269,rotation:5.9,x:9.7,y:5.8}},{t:this.shape_31,p:{scaleX:0.28,scaleY:0.269,rotation:5.9,x:8.2,y:6.9}},{t:this.shape_30,p:{scaleX:0.28,scaleY:0.269,rotation:5.9,x:4.6,y:9.6}},{t:this.shape_29,p:{scaleX:0.28,scaleY:0.269,rotation:5.9,x:3.3,y:10.1}},{t:this.shape_28,p:{scaleX:0.28,scaleY:0.269,rotation:5.9,x:2.8,y:11}},{t:this.shape_27,p:{scaleX:0.28,scaleY:0.269,rotation:5.9,x:5,y:9.4}},{t:this.shape_26,p:{scaleX:0.28,scaleY:0.269,rotation:5.9,x:3.9,y:11.1}},{t:this.shape_25,p:{scaleX:0.28,scaleY:0.269,rotation:5.9,x:6.8,y:8.7}},{t:this.shape_24,p:{scaleX:0.28,scaleY:0.269,rotation:5.9,x:12.6,y:4.2}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20,p:{scaleX:0.197,rotation:15,x:7.1,y:6}},{t:this.shape_19,p:{scaleX:0.197,rotation:15,x:9.3,y:8.3}},{t:this.shape_18,p:{scaleX:0.197,rotation:15,x:8.4,y:5.8}},{t:this.shape_17,p:{scaleX:0.197,rotation:15,x:7.3,y:7.9}},{t:this.shape_16,p:{scaleX:0.197,rotation:15,x:6.5,y:8.6}},{t:this.shape_15,p:{scaleX:0.197,rotation:15,x:5.4,y:8.6}},{t:this.shape_14,p:{scaleX:0.197,rotation:15,x:4.4,y:9.1}},{t:this.shape_13,p:{scaleX:0.197,rotation:15,x:5.2,y:10}},{t:this.shape_12,p:{scaleX:0.197,rotation:15,x:5.4,y:10.9}},{t:this.shape_11,p:{scaleX:0.197,rotation:15,x:10.5,y:3.8}},{t:this.shape_10,p:{scaleX:0.197,rotation:15,x:8.9,y:4.8}},{t:this.shape_9,p:{scaleX:0.197,rotation:15,x:9.7,y:3.7}},{t:this.shape_8,p:{scaleX:0.197,rotation:15,x:8.5,y:4.4}},{t:this.shape_7,p:{scaleX:0.197,rotation:15,x:7.4,y:5.4}},{t:this.shape_6,p:{scaleX:0.197,rotation:15,x:4.6,y:7.8}},{t:this.shape_5,p:{scaleX:0.197,rotation:15,x:3.7,y:7.9}},{t:this.shape_4,p:{scaleX:0.197,rotation:15,x:3.3,y:9}},{t:this.shape_3,p:{scaleX:0.197,rotation:15,x:5,y:7.5}},{t:this.shape_2,p:{scaleX:0.197,rotation:15,x:4,y:9.7}},{t:this.shape_1,p:{scaleX:0.197,rotation:15,x:6.2,y:7.6}},{t:this.shape,p:{scaleX:0.197,rotation:15,x:10.6,y:3.5}}]},4).wait(4));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,13.3,12.3);


(lib.butterfly1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A65DAB").s().p("AgHACQgBAAAAAAQgBAAAAAAQAAAAAAgBQABAAAAgBIAIgDQADgCAEABQABABAAAAQABABAAAAQABABAAAAQAAABAAAAQgBABgJAEQgEgDgDAAg");
	this.shape.setTransform(8.8,4.2,0.182,0.311,15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A65DAB").s().p("AAAAIIgBgDIgDgCIABgDQAAgGACgBQABgCACADQADACgBAEIgCAHIgBACIgBgBg");
	this.shape_1.setTransform(6.4,7.7,0.182,0.311,15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A65DAB").s().p("AgBAHQgDgCABgFQAAgDACgDQAAgBABgBQAAAAAAAAQAAAAAAAAQAAAAAAABQAAADAFACQgBAJgCACIgCAAQAAAAAAAAQAAAAAAAAQAAgBgBAAQAAAAAAgBg");
	this.shape_2.setTransform(5.2,9.4,0.182,0.311,15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#526064").s().p("AAIgYIgFgaIAFAGQAGAJgBAMQgBATgYA3QAWg/gCgMg");
	this.shape_3.setTransform(6.1,8.7,0.182,0.311,15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#B05FAC").s().p("AgCAJQgEgDABgGQABgFACgDQABgBAAgBQABAAAAAAQAAAAAAAAQAAAAAAABQAAAEAGADQgBALgDACIgCAAQAAAAAAAAQAAAAAAAAQgBgBAAAAQgBAAAAgBg");
	this.shape_4.setTransform(5.2,10,0.182,0.311,15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#A65DAB").s().p("AAAAIQgCgDACgFIACgIQgCARAAAAIAAgBg");
	this.shape_5.setTransform(5.7,9.6,0.182,0.311,15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#A65DAB").s().p("AgDALQAAgFADgKIAEgLIABALQgBAJgCAEQgCAGgBABIgBAAQAAAAgBAAQAAgBAAAAQAAgBgBgBQAAAAABgCg");
	this.shape_6.setTransform(6,8.9,0.182,0.311,15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#915AA9").s().p("AAAAMQgPAAACgFQABgDAIgHIAFgIIAHACQAHADAAACQgBAEgFAFQgGAHgDAAIAAAAg");
	this.shape_7.setTransform(7.4,6.7,0.182,0.311,15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#A65DAB").s().p("AgGANQgDgGACgHQABgEADgFIADgEIACgBIAGAAQACABgDAJIgHAPQAAAEgCAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAgBgBAAg");
	this.shape_8.setTransform(8,5.9,0.182,0.311,15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#915AA9").s().p("AgMAJIAEgJIAJgGQAKgHACADQABAFgFAGQgFAJgEABIgJABIgBAAQgBAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBg");
	this.shape_9.setTransform(8.5,4.8,0.182,0.311,15);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#9E2878").s().p("AANAiQAIgcADgFQAFgKANgUQAKgQAAgCQgBgOgwAKQgSAFgfAZQgPANgMAKQAkgqAvgRQANgEAWgBQAWgCADACQAIAEgIAJQgdAegIATQgLAdgJAOQgMATgLACQATgSAEgMg");
	this.shape_10.setTransform(7.9,5.5,0.182,0.311,15);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#CD8CC3").s().p("AgsAJIgBgJIAVgIQANgFAXgEQAWgEAHAAQAFAAAAAEQAAAEgFADQgDADgNADQgRADgIABIgsAWQABgDgBgKg");
	this.shape_11.setTransform(8.6,4.4,0.182,0.311,15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#9E2878").s().p("AgHAAQgBgJAFgPQADgOACgFIgBA0QABALAGAZQgOgigBgLg");
	this.shape_12.setTransform(5.1,8.2,0.182,0.311,15);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#C491C5").s().p("AgHAmQAEgogBgKIgFgnIAIALQAHAOACAMQADAMgBARQgBARgCAEIgHAQQgFgGgCgIg");
	this.shape_13.setTransform(5.4,8.5,0.182,0.311,15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#C47CBB").s().p("AAAArQgBgBgGgGIgFgFQAMgdAAgNIgEgfIAHAKQAJAMABAHQABAHgCAVIgCAXQgBACgDACIgEABIgCAAg");
	this.shape_14.setTransform(5.5,9.1,0.182,0.311,15);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#F99BCC").s().p("AACAAIgNgVIgPgUQgDgGABgIIACgGQAbAhAFABIANAGQAJAFABAFQABAGgPAsQgDAGgFAIQgFAHgCACQAJgygHgMg");
	this.shape_15.setTransform(5.7,8.5,0.182,0.311,15);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#C47CBB").s().p("AAYAeIgLgLQgHgJgFgCQgEgDgNgMIgMgNQgCgBABgEQABgBAAgBQAAgBABgBQAAAAAAAAQABAAAAAAIAYAJQAXAKAEADQAGAEgBARQAAAQgEAAIgCAAg");
	this.shape_16.setTransform(6.1,7.4,0.182,0.311,15);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#D399CA").s().p("AAWARQgNgCgJgDIgpgPQgBgCAHgGIAHgFIAWAGQAIADAXALIAMAGQAIAEgFACQgCABgGAAIgKAAg");
	this.shape_17.setTransform(6.5,6.7,0.182,0.311,15);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#F99BCC").s().p("AgHAIQgMgBgPAAIgOABIANgIQATgOAKgEQAFgCAYAAIAaABIgIAOIgJAaQgXgKgQgDg");
	this.shape_18.setTransform(7.5,5.8,0.182,0.311,15);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#A58DC3").s().p("AgLgBQALgMAQgNIAPgLIADALQABAMgKAIIg7AsQADgVAUgSg");
	this.shape_19.setTransform(6.9,5.2,0.182,0.311,15);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#C362AE").s().p("AhLBcQgOgdgDgQQgBgLAIgWQAKgbAVgiQAMgNARgOQAfgdAagEQAVgDAcgHQAPgDgEAMQgDAGgSATQgSASgIAYQgJAdgMAMQgKAKgJgBIgXgBIgGAwQgJAygMALQgDACgDAAQgLAAgNgbg");
	this.shape_20.setTransform(7,7.1,0.182,0.311,15);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#526064").s().p("AgDAYQADgIABgKQAFgRgGgLIAAgBQAHALgFATQgCAJgCAIg");
	this.shape_21.setTransform(6.4,4,0.311,0.311);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#526064").s().p("AgPARQADgIAFgJQAJgPAOgCIABACQgOACgJAOQgFAJgDAIg");
	this.shape_22.setTransform(7,4.3,0.311,0.311);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#1A1A1A").s().p("AgTAYQAJgbAKgMQAKgKgBgFQgCgGABgCQADgIAGgBQAGgBACAIQADAKgPAGIgBAKQgBAMgGAHQgXAogEADIgBAAQgEAAAIgYg");
	this.shape_23.setTransform(5.7,6.2,0.311,0.311);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#A65DAB").s().p("AAGAIQgCgCgEgBIgDgBIgDgEQgDgGABgBQACgCAFACQAFACACAFQAEAEAAADQgBAAAAABQAAAAAAABQAAAAAAAAQgBAAAAAAIgCgBg");
	this.shape_24.setTransform(4.8,2.4,0.193,0.253);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#915AA9").s().p("AgBAGQgFgBgCABQgDABABgEQABgDAFgCQAEgEAFABQAFAAACADQABACgLAHIgDgBg");
	this.shape_25.setTransform(3.8,6.2,0.193,0.253);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#A65DAB").s().p("AgLAEQAAgDAFgCIAFgEQAGABAEgBQADgBgBADQgBADgFADQgEADgFAAQgFAAgCgCg");
	this.shape_26.setTransform(3.3,8.1,0.193,0.253);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#57658E").s().p("AgaAKQAVgfAKgKQANgIAPgCQAIAAAFAAIgiAOQgJAEgYAgIgYAhIATggg");
	this.shape_27.setTransform(3.2,6.9,0.193,0.253);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#B05FAC").s().p("AgNAEQgBgCAGgEIAHgFQAIADAFgCQAEgCgCAEQgBAEgGADQgGAFgFAAQgHAAgCgEg");
	this.shape_28.setTransform(2.7,8.2,0.193,0.253);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#A65DAB").s().p("AAAAAIAHgGQgHAMgEABIgBAAQgDAAAIgHg");
	this.shape_29.setTransform(2.6,7.6,0.193,0.253);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#A65DAB").s().p("AgMANQgCgDADgGQACgEALgGIAMgHIgIALQgGAKgFADQgDADgCAAIgCgBg");
	this.shape_30.setTransform(3,7,0.193,0.253);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#915AA9").s().p("AgJAIQgFgDACgIQABgIADgEQACgCAJADIALAEQAAAVgEAEQAAABAAAAQgBAAAAAAQAAAAgBAAQAAABgBAAQgFAAgLgJg");
	this.shape_31.setTransform(3.7,4.8,0.193,0.253);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#A65DAB").s().p("AgNAJQANgZAFACQAFACAFAGIgBAFQgDADgEAGQgGAGgIABIgCAAQgIAAAEgGg");
	this.shape_32.setTransform(4,3.8,0.193,0.253);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#915AA9").s().p("AAAAQIgIgJQgFgDAEgJQAEgKAFgCQAEgBAEANIAEAMQgDADgDAGQAAABAAAAQAAAAgBAAQAAABAAAAQgBAAAAAAIgEgCg");
	this.shape_33.setTransform(4.4,2.9,0.193,0.253);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#9E2878").s().p("ABFApQgHgpgSgRQgrgtgPAKQgDABgGATQgHAYgGAKQgDAGgVAZQgKAMAFAcQgWgTApg6QAOgVAAgrQAAgFAEgDQAEgCAGABQAHACAUARQAYASAKANQAlAwgHA6QAAgRgEgVg");
	this.shape_34.setTransform(4.6,3.4,0.193,0.253);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#CD8CC3").s().p("AgIAAQgGgIgPgPQgMgMgBgEQgBgGAEgDQAEgDAGAEQAIAFAVAUQAVAWAJAMQANATAAAEIgLAFQgLAGgDAEQgRgjgJgPg");
	this.shape_35.setTransform(4.9,2.7,0.193,0.253);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#9E2878").s().p("AgFAKQAMgIAugdQgDAHgLAMQgMAMgKAGQgQAHg1ALQAigMANgGg");
	this.shape_36.setTransform(4.4,7.7,0.193,0.253);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#C491C5").s().p("Ag/AfIAJgPQADgGASgKQATgNAPgIQAZgJAmgBIgxAYQgIADgWAQIgWAQQgHADgKAAg");
	this.shape_37.setTransform(4.1,7.7,0.193,0.253);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#C47CBB").s().p("AgvAaQgEgCgCgEQgBgDABgCIAXgQQAXgRAHgEQAKgEAXgBIAWgBIgNAGIgbAMQgLAHgLAPIgLARQgWAAgHgDg");
	this.shape_38.setTransform(3.3,7.8,0.193,0.253);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#F99BCC").s().p("AhRAZQACgJAFgGQAggqAIgDQAHgDAQAEQAMACAIAEQAGADBFAAQgFALgRACQg6ADgUADQgOACgcAUIgYAWQgCgEADgJg");
	this.shape_39.setTransform(3.9,7.3,0.193,0.253);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#C47CBB").s().p("AA5ARQg0AAgOgEQgJgCgSAAIgZgBQgKgCAVgMQAVgNAKABQAOACBFAXQABAAAAAAQAAAAAAABQAAAAAAABQgBABgBABQgDAEgCAAIgBAAg");
	this.shape_40.setTransform(4.3,6.2,0.193,0.253);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#D399CA").s().p("AgGAFQgQgFgQgHQgRgJgEgGQgDgFAOADIAVAFIA0APIAhALQAFARgFACIhAgVg");
	this.shape_41.setTransform(4.5,5.8,0.193,0.253);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#F99BCC").s().p("AAHARQgNgJgYgIIgWgFIAUgaQADgDACgHIACgHIAcAVQAfAVADAEQAGAHAGAaIAEARQgWgSgYgNg");
	this.shape_42.setTransform(4.4,4.3,0.193,0.253);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#A58DC3").s().p("AgRgZQgDgNAPgIIANgFIAEATQAGAWAAAQQABASgKAQQgFAIgEAEg");
	this.shape_43.setTransform(5.6,5,0.193,0.253);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#C759AA").s().p("AhfCBQgDgRAugpIAugmIgdgTQgMgHABgMQAAgTAWgbQASgWAAgbQgBgcAEgGQAGgLAPAOIArAsQAaAXAGAuQAEAVgCASQgOAogTAcQgQAVgNAGQgTAKgvAJQgXAFgOAAQgXAAgCgLg");
	this.shape_44.setTransform(4.1,5,0.193,0.253);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_44,p:{scaleX:0.193,scaleY:0.253,x:4.1,y:5}},{t:this.shape_43,p:{scaleX:0.193,scaleY:0.253,x:5.6,y:5}},{t:this.shape_42,p:{scaleX:0.193,scaleY:0.253,x:4.4,y:4.3}},{t:this.shape_41,p:{scaleX:0.193,scaleY:0.253,x:4.5,y:5.8}},{t:this.shape_40,p:{scaleX:0.193,scaleY:0.253,x:4.3,y:6.2}},{t:this.shape_39,p:{scaleX:0.193,scaleY:0.253,x:3.9}},{t:this.shape_38,p:{scaleX:0.193,scaleY:0.253,x:3.3,y:7.8}},{t:this.shape_37,p:{scaleX:0.193,scaleY:0.253,x:4.1,y:7.7}},{t:this.shape_36,p:{scaleX:0.193,scaleY:0.253,x:4.4,y:7.7}},{t:this.shape_35,p:{scaleX:0.193,scaleY:0.253,x:4.9,y:2.7}},{t:this.shape_34,p:{scaleX:0.193,scaleY:0.253,x:4.6,y:3.4}},{t:this.shape_33,p:{scaleX:0.193,scaleY:0.253,x:4.4,y:2.9}},{t:this.shape_32,p:{scaleX:0.193,scaleY:0.253,x:4,y:3.8}},{t:this.shape_31,p:{scaleX:0.193,scaleY:0.253,x:3.7,y:4.8}},{t:this.shape_30,p:{scaleX:0.193,scaleY:0.253,x:3}},{t:this.shape_29,p:{scaleX:0.193,scaleY:0.253,x:2.6}},{t:this.shape_28,p:{scaleX:0.193,scaleY:0.253,x:2.7,y:8.2}},{t:this.shape_27,p:{scaleX:0.193,scaleY:0.253,x:3.2,y:6.9}},{t:this.shape_26,p:{scaleX:0.193,scaleY:0.253,x:3.3,y:8.1}},{t:this.shape_25,p:{scaleX:0.193,scaleY:0.253,x:3.8,y:6.2}},{t:this.shape_24,p:{scaleX:0.193,scaleY:0.253,x:4.8,y:2.4}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20,p:{scaleX:0.182,rotation:15,x:7,y:7.1}},{t:this.shape_19,p:{scaleX:0.182,rotation:15,x:6.9,y:5.2}},{t:this.shape_18,p:{scaleX:0.182,rotation:15,x:7.5,y:5.8}},{t:this.shape_17,p:{scaleX:0.182,rotation:15,x:6.5,y:6.7}},{t:this.shape_16,p:{scaleX:0.182,rotation:15,x:6.1,y:7.4}},{t:this.shape_15,p:{scaleX:0.182,rotation:15,x:5.7,y:8.5}},{t:this.shape_14,p:{scaleX:0.182,rotation:15,x:5.5,y:9.1}},{t:this.shape_13,p:{scaleX:0.182,rotation:15,x:5.4,y:8.5}},{t:this.shape_12,p:{scaleX:0.182,rotation:15,y:8.2}},{t:this.shape_11,p:{scaleX:0.182,rotation:15,x:8.6}},{t:this.shape_10,p:{scaleX:0.182,rotation:15,x:7.9,y:5.5}},{t:this.shape_9,p:{scaleX:0.182,rotation:15,x:8.5}},{t:this.shape_8,p:{scaleX:0.182,rotation:15,x:8,y:5.9}},{t:this.shape_7,p:{scaleX:0.182,rotation:15,x:7.4,y:6.7}},{t:this.shape_6,p:{scaleX:0.182,rotation:15,x:6,y:8.9}},{t:this.shape_5,p:{scaleX:0.182,rotation:15,x:5.7,y:9.6}},{t:this.shape_4,p:{scaleX:0.182,rotation:15,x:5.2,y:10}},{t:this.shape_3,p:{scaleX:0.182,rotation:15,x:6.1,y:8.7}},{t:this.shape_2,p:{scaleX:0.182,rotation:15,x:5.2,y:9.4}},{t:this.shape_1,p:{scaleX:0.182,rotation:15,x:6.4,y:7.7}},{t:this.shape,p:{scaleX:0.182,rotation:15,x:8.8,y:4.2}}]}).to({state:[{t:this.shape_44,p:{scaleX:0.311,scaleY:0.311,x:3.1,y:4.4}},{t:this.shape_43,p:{scaleX:0.311,scaleY:0.311,x:5.5,y:4.4}},{t:this.shape_42,p:{scaleX:0.311,scaleY:0.311,x:3.5,y:3.5}},{t:this.shape_41,p:{scaleX:0.311,scaleY:0.311,x:3.6,y:5.5}},{t:this.shape_40,p:{scaleX:0.311,scaleY:0.311,x:3.4,y:6}},{t:this.shape_39,p:{scaleX:0.311,scaleY:0.311,x:2.7}},{t:this.shape_38,p:{scaleX:0.311,scaleY:0.311,x:1.7,y:7.9}},{t:this.shape_37,p:{scaleX:0.311,scaleY:0.311,x:3,y:7.8}},{t:this.shape_36,p:{scaleX:0.311,scaleY:0.311,x:3.5,y:7.8}},{t:this.shape_35,p:{scaleX:0.311,scaleY:0.311,x:4.3,y:1.6}},{t:this.shape_34,p:{scaleX:0.311,scaleY:0.311,x:3.8,y:2.4}},{t:this.shape_33,p:{scaleX:0.311,scaleY:0.311,x:3.5,y:1.9}},{t:this.shape_32,p:{scaleX:0.311,scaleY:0.311,x:2.9,y:3}},{t:this.shape_31,p:{scaleX:0.311,scaleY:0.311,x:2.3,y:4.2}},{t:this.shape_30,p:{scaleX:0.311,scaleY:0.311,x:1.3}},{t:this.shape_29,p:{scaleX:0.311,scaleY:0.311,x:0.6}},{t:this.shape_28,p:{scaleX:0.311,scaleY:0.311,x:0.7,y:8.4}},{t:this.shape_27,p:{scaleX:0.311,scaleY:0.311,x:1.5,y:6.7}},{t:this.shape_26,p:{scaleX:0.311,scaleY:0.311,x:1.8,y:8.3}},{t:this.shape_25,p:{scaleX:0.311,scaleY:0.311,x:2.5,y:5.9}},{t:this.shape_24,p:{scaleX:0.311,scaleY:0.311,x:4.1,y:1.3}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20,p:{scaleX:0.311,rotation:0,x:7.8,y:7.4}},{t:this.shape_19,p:{scaleX:0.311,rotation:0,x:6.8,y:5.6}},{t:this.shape_18,p:{scaleX:0.311,rotation:0,x:8,y:6}},{t:this.shape_17,p:{scaleX:0.311,rotation:0,x:6.9,y:7.2}},{t:this.shape_16,p:{scaleX:0.311,rotation:0,x:6.4,y:7.9}},{t:this.shape_15,p:{scaleX:0.311,rotation:0,x:6.3,y:9.1}},{t:this.shape_14,p:{scaleX:0.311,rotation:0,x:6.1,y:9.8}},{t:this.shape_13,p:{scaleX:0.311,rotation:0,x:5.7,y:9.2}},{t:this.shape_12,p:{scaleX:0.311,rotation:0,y:9}},{t:this.shape_11,p:{scaleX:0.311,rotation:0,x:9.2}},{t:this.shape_10,p:{scaleX:0.311,rotation:0,x:8.5,y:5.7}},{t:this.shape_9,p:{scaleX:0.311,rotation:0,x:9.3}},{t:this.shape_8,p:{scaleX:0.311,rotation:0,x:8.8,y:6}},{t:this.shape_7,p:{scaleX:0.311,rotation:0,x:8.3,y:6.9}},{t:this.shape_6,p:{scaleX:0.311,rotation:0,x:6.8,y:9.4}},{t:this.shape_5,p:{scaleX:0.311,rotation:0,x:6.7,y:10.2}},{t:this.shape_4,p:{scaleX:0.311,rotation:0,x:6.1,y:10.6}},{t:this.shape_3,p:{scaleX:0.311,rotation:0,x:7,y:9.1}},{t:this.shape_2,p:{scaleX:0.311,rotation:0,x:5.7,y:10.1}},{t:this.shape_1,p:{scaleX:0.311,rotation:0,x:7,y:8.1}},{t:this.shape,p:{scaleX:0.311,rotation:0,x:9.4,y:4.1}}]},3).wait(3));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(2.3,1.4,7.4,9.1);


(lib.butterfly_ani = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.instance = new lib.butterfly1();
	this.instance.parent = this;
	this.instance.setTransform(6.2,16.6,1,1,0,0,0,5.5,5.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({guide:{path:[6.3,16.5,7,15.8,7.9,15.3,9,15.3,9.8,15.8,14.5,19.1,20,21,24.9,22.8,28.8,20,31.4,18.1,34,16.2,35.2,15.2,36.5,15.9,39.7,17.5,42.8,19.6,46.9,22.3,51.8,23.4,60.1,25.3,66,20.3,70.2,16.8,76,16.4,78.6,16.3,80.5,17.9,84.8,21.5,90,23.3,91.9,23.9,93.8,24.5,97.5,25.6,101.4,23.8,107.1,21.1,112.8,18.1,114,17.4,114.8,18.2,118.8,21.7,118.2,25]}},200).to({skewY:180,guide:{path:[118.2,25,118.1,25.4,118,25.9]}},1).to({guide:{path:[117.9,25.8,117,28.2,113.8,30.5,109.1,33.9,103.1,32.1,96.9,30.3,91.1,27.1,85.5,24.1,80,26.5,77.9,27.4,75.8,27.5,69.9,27.8,63.6,26.2,61.7,25.7,60,26.3,55.6,27.9,51.4,30.4,49.5,31.4,47.7,30.7,40.9,28,34.1,25.7,30.5,24.6,27,25.6,20.7,27.4,14.5,29.1]}},123).to({skewY:176.5,guide:{path:[14.3,29.1,12,29.7,9.6,30.3,1.2,32.5,0,25.6,0,25.6,0.1,25.5]}},48).to({skewY:0,guide:{path:[0,25.5,0,25.4,0.1,25.3]}},1).to({guide:{path:[0.4,25.3,0.4,25.3,0.5,25.3,3.3,23.5,4,20.2,4.4,18.7,5.2,17.5]}},26).wait(1));

	// Layer 3
	this.instance_1 = new lib.butterfly2();
	this.instance_1.parent = this;
	this.instance_1.setTransform(9.2,56.9,1,1,0,0,0,6.7,6.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({scaleX:1.9,scaleY:1.9,guide:{path:[9.3,56.8,17.5,55.7,25.4,52.4,32.6,49.4,40.6,50.6,46.8,51.5,52.9,53.3,74.9,59.8,96.3,51.6,101.2,49.8,106.2,50.7,134.7,56.3,162.7,52.2,167.4,51.5,172.1,50.4,193,45.5,214.9,49.7,237,53.9,255.1,42.2,274.6,29.5,299.3,31.5,301.9,31.8,304.6,31.5,318.9,30,331.3,23.7,338.6,19.8,347.1,19.3,363,18.3,378.9,17.8,379.7,17.7,380.5,17.6]}},289).to({_off:true},1).wait(1).to({_off:false,scaleX:1,scaleY:1,x:-132.4,y:68.5},0).to({guide:{path:[-132.3,68.4,-121.6,66.6,-109.3,66.4,-102.2,66.2,-95.8,63.2,-90.3,60.5,-84.1,61.4,-61.2,64.5,-39.4,59,-23.8,55.1,-7.7,57,0.2,57.9,7.8,57]}},108).wait(1));

	// Layer 4
	this.instance_2 = new lib.butterfly4();
	this.instance_2.parent = this;
	this.instance_2.setTransform(321.6,5.6,1,1,0,0,180,5.9,6.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({scaleX:1,skewY:166.7,guide:{path:[321.5,5.8,321.4,5.7,321.3,5.7,319.1,5.7,316.8,5.6,316.7,5.7,316.6,5.7,316.5,5.8,316.4,5.9,316.3,6,316.2,6.1,316.1,6.2,316,6.3,315.9,6.3,315.8,6.4,315.7,6.5,315.6,6.6,315.4,6.7,315.2,6.8,315.1,6.9,315,7,314.8,7.1,314.6,7.2,314.4,7.3,314.1,7.3,311.9,7.3,309.6,7.3,309.3,7.3,309.1,7.2,308.9,7.1,308.7,7,308.7,6.9,308.6,6.9,308.6,6.9,308.6,6.8,308.3,6.8,308.1,6.7,307.9,6.6,307.7,6.5,307.7,6.4,307.6,6.4,307.4,6.3,307.1,6.3,306.8,6.3,306.6,6.2,306.3,6.1,306.1,6.1,305.8,6,305.6,5.9,304.4,5.9,303.3,5.9,303.2,6,303.1,6.1,302.9,6.2,302.7,6.3,302.6,6.4,302.5,6.5,302.3,6.6,302.1,6.7,302,6.8,301.8,6.9,301.7,7,301.7,7.1,301.6,7.2,301.5,7.3,301.5,7.3,301.4,7.4,301.4,7.5,301.3,7.6,301.3,7.7,301.2,7.8,301.2,7.9,301.1,8,301.1,8.1,301.1,8.2,301,8.3,300.9,8.4,300.8,8.5,300.7,8.6,300.7,8.7,300.6,8.8,300.6,8.8,300.6,8.9,300.5,9,300.4,9.1,300.3,9.2,300.2,9.3,300.2,9.4,300.1,9.5,300.1,9.6,300.1,9.7,300,9.8,299.9,9.9,299.7,10,299.6,10.1,299.4,10.2,299.2,10.3,299.1,10.3,299.1,10.4,299,10.5,298.9,10.6,298.7,10.7,298.6,10.8,298.5,10.9,298.4,10.9,298.3,11,298.2,11,298.1,11,297.9,11.1,297.6,11.1,297.4,11.2,297.1,11.3,296.9,11.3,295.5,11.3,294.1,11.3,293.8,11.3,293.6,11.2,292.8,11.1,292.1,11.1,291.8,11,291.6,10.9,291.3,10.9,291.1,10.8,290.8,10.8,290.6,10.7,290.2,10.6,289.9,10.6,289.6,10.5,289.3,10.4,289.2,10.4,289.1,10.3,288.8,10.3,288.6,10.2,286.8,10.1,285.1,10.1,284.8,10,284.6,9.9,283.3,9.9,282.1,9.8,281.8,9.8,281.6,9.7,279.2,9.7,276.9,9.7,276.6,9.8,276.3,9.9,276.1,9.9,276,10,275.8,10.1,275.6,10.1,275.4,10.2,275.2,10.3,275.1,10.4,275,10.5,274.9,10.6,274.8,10.7,274.7,10.8,274.6,10.9,274.5,11,274.4,11.1,274.3,11.2,274.2,11.3,274.1,11.3,274.1,11.4,274,11.5,273.9,11.6,273.9,11.7,273.9,11.8,273.8,11.9,273.7,12,273.6,12.1,273.6,12.2,273.5,12.3,273.4,12.4,273.4,12.5,273.4,12.6,273.3,12.7,273.2,12.8,273.1,12.8,273.1,12.9,273.1,13,273.1,13.1,273,13.2,273,13.3,272.9,13.4,272.9,13.5,272.8,13.6,272.8,13.7,272.7,13.8,272.6,13.9,272.6,14,272.5,14.1,272.4,14.2,272.4,14.3,272.3,14.3,272.3,14.4,272.2,14.5,272.2,14.6,272.1,14.7,272.1,14.8,272.1,14.9,272.1,15,272,15.1,272,15.2,272,15.3,271.9,15.4,271.9,15.5,271.9,15.6,271.8,15.7,271.7,15.8,271.7,15.8,271.7,15.9,271.6,16,271.6,16.1,271.6,16.2,271.5,16.3,271.4,16.4,271.4,16.5,271.3,16.6,271.3,16.7,271.3,16.8,271.3,16.9,271.3,17,271.2,17.1,271.2,17.2,271.1,17.3,271.1,17.3,271.1,17.4,271,17.5,270.9,17.6,270.7,17.7,270.6,17.8,270.4,17.9,270.2,18,270.1,18.1,270.1,18.2,270,18.3,269.9,18.4,269.8,18.5,269.7,18.6,269.6,18.7,269.5,18.8,269.4,18.8,269.3,18.9,269.2,19,269.1,19.1,269,19.2,268.9,19.3,268.8,19.4,268.7,19.5,268.6,19.6,268.4,19.7,268.1,19.8,267.9,19.8,267.6,19.9,267.4,19.9,267.2,20,267.1,20.1,266.9,20.2,266.7,20.3,266.6,20.3,266.4,20.3,264,20.3,261.6,20.3,261.3,20.3,261.1,20.2,260.6,20.1,260.1,20.1,259.8,20,259.6,19.9,259.4,19.8,259.2,19.8,259.2,19.7,259.1,19.6,259,19.6,258.9,19.6,258.6,19.5,258.3,19.4,258.1,19.4,257.9,19.3,257.6,19.3,257.3,19.2,257.1,19.1,257,19,256.9,18.9,256.9,18.9,256.5,18.8,256.1,18.8,255.8,18.8,255.6,18.7,255.4,18.6,255.3,18.6,255.1,18.5,254.8,18.4,254.6,18.3,254.5,18.3,254.4,18.2,254.4,18.1,253.7,18.1,253.1,18.1,252.8,18,252.6,17.9,251.8,17.9,251.1,17.8,250.9,17.8,250.7,17.8,250.6,17.7,250.5,17.7,250.4,17.7,250.2,17.6,247.4,17.7,244.6,17.7,244.4,17.8,244.1,17.8,243.8,17.9,243.6,17.9,243.4,18,243.3,18.1,243.1,18.2,242.9,18.3,242.8,18.4,242.7,18.5,242.6,18.6,242.4,18.7,242.2,18.8,242.1,18.9,242.1,19,242.1,19.1,242,19.2,242,19.3,242,19.3,241.9,19.4,241.9,19.5,241.8,19.6,241.8,19.7,241.8,19.8,241.8,19.9,241.7,20,241.7,20.1,241.7,20.2,241.6,20.3,241.6,20.4,241.6,20.5,241.6,20.6,241.6,20.7,241.6,20.8,241.6,20.8,241.6,20.9,241.5,21,241.5,21.1,241.4,21.2,241.4,21.3,241.3,21.4,241.3,21.5,241.3,21.6,241.3,21.7,241.3,21.8,241.2,21.9,241.2,22,241.2,22.1,241.1,22.2,241.1,22.3,241.1,22.3,241.1,22.4,241.1,22.5,241.1,22.6,241.1,22.7,241.1,22.8,241,22.9,241,23,241,23.1,240.9,23.1,240.9,23.1,240.9,23.2,240.8,23.3,240.8,23.4,240.8,23.5,240.8,23.6,240.8,23.6,240.7,23.7,240.7,23.8,240.7,23.9,240.6,24.1,240.6,24.1,240.6,24.2,240.6,24.3,240.5,24.4,240.5,24.5,240.5,24.6,240.4,24.7,240.4,24.8,240.4,24.9,240.3,25,240.3,25.1,240.3,25.1,240.2,25.2,240.2,25.3,240.2,25.4,240.1,25.6,240.1,25.6,240.1,25.7,240,25.8,239.9,25.9,239.8,26,239.7,26.1,239.6,26.2,239.5,26.3,239.4,26.4,239.3,26.5,239.2,26.6,239.1,26.6,239.1,26.7,238.9,26.8,238.8,26.9,238.6,27,238.5,27.1,238.3,27.1,238.1,27.2,238,27.3,237.9,27.4,237.8,27.4,237.7,27.5,237.6,27.6,237.5,27.6,237.3,27.6,237.1,27.7,237,27.8,236.9,27.9,236.8,27.9,236.7,28,236.6,28.1,236.5,28.1,236.3,28.1,236.1,28.2,235.9,28.2,235.7,28.3,235.5,28.4,235.3,28.4,235.1,28.5,235,28.6,234.8,28.6,234.6,28.6,232.2,28.6,229.9,28.6,229.6,28.6,229.3,28.5,229.1,28.4,229,28.3,228.9,28.2,228.8,28.1,228.6,28.1,228.4,27.9,228.3,27.8,228.2,27.7,228.1,27.6,228,27.6,227.9,27.5,227.7,27.4,227.6,27.3,227.4,27.2,227.3,27.1,227.2,27,227.1,26.9,227,26.8,226.9,26.7,226.8,26.6,226.7,26.6,226.6,26.4,226.5,26.3,226.4,26.2,226.2,26.1,226,26.1,225.8,26,225.6,25.9,225.5,25.8,225.4,25.7,225.3,25.6,225.2,25.5,225.1,25.4,225,25.3,224.8,25.2,224.7,25.1,224.4,25.1,224.2,24.9,224.1,24.8,223.9,24.7,223.8,24.6,223.7,24.6,223.6,24.5,223.4,24.4,223.2,24.3,222.9,24.2,222.7,24.1,222.6,24,222.4,23.9,222.2,23.8,222.1,23.7,221.9,23.6,221.8,23.6,221.6,23.4,221.5,23.3,221.4,23.2,221.1,23.2,220.9,23.1,220.6,23.1,220.3,23.1,220.1,23.1,219.9,23,219.7,22.9,219.6,22.8,219.5,22.8,219.4,22.7,219.4,22.7,219.4,22.6,219.1,22.6,218.9,22.6,218.6,22.5,218.3,22.4,218,22.3,217.7,22.3,217.6,22.2,217.4,22.1,217.3,22.1,217.1,22.1,216.8,22,216.6,21.9,213.7,21.9,210.9,21.9,210.6,22,210.4,22.1,210.2,22.2,210.1,22.3,210.1,22.4,210.1,22.5,210.1,22.6,210.1,22.7,210.1,22.8,210.1,22.9,210.1,23,210.1,23.1,210.1,23.1,210.1,23.1,210.1,23.1,210.1,23.2,210.1,23.3,210.1,23.4,210.1,23.6,210.1,23.6,210.1,23.7,210.1,23.8,210.1,23.9,210.1,24,210.1,24.1,210.1,24.2,210.1,24.3,210.1,24.4,210.1,24.5,210.1,24.6,210.1,24.6,210.1,24.7,210.1,24.8,210.1,24.9,210.1,25.1,210.1,25.1,210.1,25.2,210.1,25.3,210.1,25.4,210.1,25.5,210.1,25.6,210.1,25.7,210.1,25.8,210.1,25.9,210.1,26,210.1,26.1,210.1,26.1,210.1,26.2,210.2,26.3,210.2,26.4,210.3,26.6,210.4,26.6,210.4,26.7,210.4,26.8,210.5,26.9,210.5,27,210.5,27.1,210.6,27.2,210.6,27.3,210.6,27.4,210.6,27.5,210.7,27.6,210.7,27.6,210.8,27.7,210.9,27.8,211,27.9,211.1,28.1,211.1,28.1,211.1,28.2,211.2,28.3,211.2,28.4,211.2,28.5,211.3,28.6,211.3,28.7,211.3,28.8,211.3,28.9,211.3,29,211.4,29.1,211.4,29.1,211.4,29.2,211.4,29.3,211.4,29.4,211.4,29.6,211.4,29.6,211.4,29.8,211.4,29.8,211.4,29.9,211.4,30,211.4,30.1,211.4,30.2,211.4,30.3,211.4,30.4,211.4,30.5,211.4,30.6,211.4,30.6,211.4,30.8,211.4,30.8,211.4,30.9,211.4,31.1,211.4,31.1,211.4,31.3,211.4,31.3,211.4,31.4,211.4,31.5,211.3,31.6,211.3,31.7,211.3,31.8,211.3,31.9,211.3,32,211.2,32.1,211.2,32.2,211.2,32.2,211.1,32.3,211.1,32.4,211.1,32.6,211.1,32.7,211.1,32.7,211.1,32.8,211,32.9,211,33,211,33.1,210.9,33.2,210.9,33.3,210.9,33.4,210.8,33.5,210.7,33.6,210.6,33.7,210.6,33.7,210.5,33.8,210.5,33.9,210.4,34.1,210.4,34.2,210.3,34.2,210.3,34.3,210.3,34.4,210.2,34.5,210.2,34.6,210.2,34.7,210.1,34.8,210.1,34.9,210.1,35,210,35.1,209.9,35.2,209.8,35.2,209.8,35.3,209.8,35.4,209.8,35.6,209.7,35.7,209.7,35.7,209.6,35.8,209.6,35.9,209.6,36,209.5,36.1,209.4,36.2,209.3,36.3,209.3,36.4,209.3,36.5,209.2,36.6,209.2,36.7,209.2,36.7,209.1,36.8,209.1,37,209,37.1,208.9,37.2,208.8,37.2,208.7,37.3,208.6,37.4,208.6,37.5,208.4,37.6,208.3,37.7,208.1,37.8,207.9,37.9,207.8,38,207.7,38.1,207.6,38.2,207.4,38.2,207.2,38.3,207.1,38.5,206.9,38.5,206.7,38.6,206.5,38.7,206.3,38.7,206.1,38.7,206,38.8,205.8,38.9,205.6,39,205.4,39,205.2,39.1,205.1,39.1,204.9,39.2,204.2,39.2,203.6,39.2,203.3,39.3,203,39.5,202.8,39.6,202.7,39.7,202.6,39.7,202.4,39.7,202.3,39.8,202.2,39.8,202.1,39.8,201.9,39.9,201.6,40,201.4,40,201.1,40.1,200.8,40.2,200.6,40.3,200.4,40.4,200.3,40.5,200.2,40.6,200.1,40.7,200.1,40.7,200,40.8,199.9,41,199.7,41.1,199.6,41.2,199.5,41.2,199.4,41.2,199.3,41.3,199.2,41.3,199.1,41.3,199,41.4,198.9,41.4,198.7,41.5,198.5,41.5,198.3,41.6,198.2,41.7,198.1,41.7,198,41.8,197.9,42,197.8,42.1,197.7,42.2,197.6,42.2,197.5,42.3,197.3,42.4,197.2,42.5,197.1,42.6,196.9,42.7,196.9,42.8,196.9,42.9,196.8,43,196.7,43.1,196.6,43.2,196.6,43.2,196.4,43.3,196.3,43.5,196.1,43.5,196,43.6,195.8,43.7,195.6,43.7,195.5,43.8,195.4,43.9,195.2,44,195.1,44.1,194.9,44.2,194.7,44.2,194.5,44.3,194.3,44.5,194.1,44.6,193.9,44.7,193.8,44.7,193.7,44.8,193.6,44.9,193.4,45,193.1,45.1,192.9,45.2,192.7,45.3,192.6,45.4,192.5,45.5,192.4,45.5,192.3,45.6,192.2,45.6,192.1,45.6,191.9,45.7,189.5,45.7,187.1,45.7,186.8,45.6,186.6,45.5,186.3,45.4,186.1,45.3,185.8,45.2,185.6,45.2,185.4,45.1,185.2,45,185.1,45,185,45,184.9,44.9,184.7,44.9,184.5,44.8,184.3,44.7,184.1,44.7,183.9,44.6,183.8,44.5,183.6,44.4,183.5,44.3,183.3,44.2,183.1,44.1,183,44,182.7,43.9,182.5,43.8,182.3,43.7,182.1,43.7,181.9,43.6,181.7,43.5,181.5,43.3,181.3,43.2,181.1,43.2,180.9,43.1,180.7,43,180.6,42.9,180.4,42.8,180.2,42.7,180.1,42.6,179.9,42.5,179.8,42.4,179.7,42.3,179.6,42.2,179.4,42.2,179.2,42.1,178.9,42,178.8,41.8,178.6,41.7,178.5,41.7,178.4,41.6,178.2,41.5,178.1,41.4,178,41.3,177.9,41.2,177.7,41.1,177.6,41,177.4,40.9,177.2,40.8,177.1,40.7,177.1,40.7,177,40.6,176.9,40.5,176.8,40.3,176.7,40.2,176.6,40.2,176.4,40.1,176.2,40,175.9,39.9,175.6,39.8,175.4,39.7,175.1,39.6,174.8,39.5,174.6,39.4,174.4,39.3,174.2,39.2,174.1,39.2,173.8,39.1,173.6,39,173.4,38.8,173.2,38.7,172.8,38.7,172.4,38.7,172.1,38.6,171.8,38.5,171.5,38.4,171.2,38.3,171,38.2,170.7,38.2,170.5,38.1,170.2,38,170.1,38,170,38,166.7,38,163.4,38,163.2,38.1,163.1,38.2,163,38.3,162.9,38.4,162.7,38.5,162.6,38.6,162.6,38.7,162.6,38.7,162.5,38.8,162.4,39,162.4,39.1,162.4,39.2,162.4,39.2,162.4,39.3,162.4,39.4,162.4,39.5,162.4,39.6,162.4,39.6]}},185).to({regY:6.6,scaleX:1,skewY:24.3,guide:{path:[162.4,39.6,162.4,39.7,162.4,39.7,162.4,39.8,162.4,39.9,162.4,40,162.4,40.1,162.4,40.2,162.5,40.2,162.5,40.3,162.5,40.5,162.6,40.6,162.6,40.7,162.6,40.7,162.6,40.7]}},1).to({regY:6.5,scaleX:1,skewY:0,guide:{path:[162.6,40.7,162.6,40.8,162.6,40.8,162.6,40.9,162.6,41,162.6,41.1,162.6,41.2,162.6,41.3,162.6,41.4,162.6,41.5,162.6,41.6,162.6,41.6,162.6,41.7,162.6,41.8,162.6,41.9,162.6,42,162.6,42.1,162.6,42.2,162.6,42.3,162.6,42.4,162.6,42.5,162.7,42.6,162.7,42.7,162.8,42.8,162.9,42.9,162.9,43,162.9,43.1,163,43.1,163.1,43.2,163.1,43.3,163.1,43.4,163.2,43.5,163.2,43.6,163.3,43.7,163.3,43.8,163.4,43.9,163.4,44,163.5,44.1,163.5,44.2,163.5,44.3,163.6,44.4,163.6,44.5,163.6,44.6,163.7,44.6,163.8,44.7,163.9,44.8,164,44.9,164.1,45,164.2,45.1,164.3,45.2,164.4,45.3,164.4,45.4,164.4,45.5,164.5,45.6,164.6,45.7,164.6,45.8,164.6,45.9,164.7,46,164.7,46.1,164.8,46.1,164.8,46.2,164.9,46.3,165,46.4,165.1,46.5,165.1,46.6,165.1,46.7,165.2,46.8,165.2,46.9,165.2,47,165.3,47.1,165.3,47.2,165.3,47.3,165.3,47.4,165.3,47.5,165.4,47.6,165.5,47.6,165.6,47.7,165.6,47.8,165.6,47.9,165.7,48,165.7,48.1,165.8,48.2,165.8,48.3,165.9,48.4,165.9,48.5,166,48.6,166,48.7,166.1,48.8,166.1,48.9,166.2,49,166.3,49.1,166.4,49.1,166.6,49.2,166.6,49.3,166.7,49.4,166.8,49.5,166.9,49.6,167,49.7,167.1,49.8,167.2,49.9,167.3,50,167.4,50.1,167.4,50.1,167.6,50.2,167.9,50.2,168.1,50.3,168.4,50.4,168.6,50.4,168.9,50.5,169.1,50.6,169.2,50.7,169.3,50.7,169.4,50.8,169.6,50.8,169.9,50.9,170.1,50.9,170.4,51,170.6,51.1,170.7,51.2,170.8,51.2,170.9,51.3,170.9,51.4,170.9,51.4]}},14).to({guide:{path:[171,51.4,171,51.4,171,51.4,171.2,51.4,171.4,51.5,171.9,51.6,172.4,51.6,172.7,51.7,172.9,51.7,173.1,51.8,173.2,51.9,173.4,51.9,173.7,52,173.9,52.1,174.2,52.1,174.4,52.2,174.7,52.2,174.9,52.3,175.1,52.4,175.2,52.5,175.4,52.6,175.6,52.6,175.9,52.6,176.2,52.7,176.4,52.7,176.6,52.8,176.7,52.9,176.9,52.9,177.2,53,177.4,53.1,177.5,53.2,177.7,53.2,177.9,53.3,177.9,53.3,178,53.4,178.2,53.4,178.4,53.5,181.5,53.5,184.6,53.5,184.9,53.4,185.2,53.4,185.5,53.3,185.9,53.2,186.2,53.1,186.5,53.1,186.6,53,186.8,52.9,187,52.9,187.2,52.9,188.2,52.9,189.2,52.9,189.4,52.9,189.7,53,190.2,53.1,190.7,53.1,190.9,53.2,191.2,53.2,191.4,53.3,191.6,53.4,191.8,53.5,192,53.6,192.2,53.7,192.4,53.8,192.5,53.9,192.7,54,192.9,54.1,193,54.2,193.1,54.3,193.2,54.4,193.3,54.5,193.4,54.6,193.5,54.6,193.6,54.7,193.7,54.8,193.9,54.9,194,55,194.2,55.1,194.3,55.2,194.4,55.3,194.5,55.4,194.7,55.5,194.8,55.6,194.9,55.7,195.1,55.8,195.4,55.9,195.6,56,195.9,56.1,196,56.1,196.2,56.2,196.4,56.3,196.7,56.4,196.9,56.4,197.2,56.5,197.4,56.6,197.5,56.7,197.7,56.8,197.9,56.9,198,57,198.1,57.1,198.3,57.1,198.5,57.2,198.8,57.3,199,57.4,199.2,57.5,199.4,57.6,199.6,57.7,199.9,57.8,200,57.9,200.1,58,207.5,58,214.9,58.1,215.1,58,215.2,58,215.4,58,215.5,57.9,215.7,57.9,215.8,57.9,215.9,57.8,216,57.8,216.2,57.8,216.3,57.7,216.4,57.7,216.5,57.7,216.7,57.6,216.9,57.6,217.5,57.6,218.1,57.5,218.3,57.4,218.4,57.3,218.5,57.2,218.6,57.1,218.7,57,218.8,56.9,218.9,56.8,219,56.7,219.1,56.6,219.2,56.6,219.3,56.5,219.4,56.4,219.4,56.3,219.5,56.2,219.5,56.1,219.5,56,219.6,55.9,219.7,55.8,219.8,55.7,219.9,55.6,219.9,55.5,220,55.4,220,55.3,220,55.2,220.1,55.1,220.2,55.1,220.2,55,220.3,54.9,220.3,54.8,220.4,54.7,220.4,54.6,220.5,54.5,220.5,54.4,220.5,54.3,220.6,54.2,220.6,54.1,220.7,54,220.8,53.9,220.9,53.8,221,53.7,221,53.6,221,53.6,221.1,53.5,221.1,53.4,221.2,53.3,221.3,53.2,221.4,53.1,221.5,53,221.6,52.9,221.7,52.8,221.7,52.7,221.7,52.6,221.7,52.5,221.7,52.4,221.8,52.3,221.8,52.2,221.9,52.1,221.9,52.1,222,52,222.1,51.9,222.2,51.8,222.3,51.7,222.4,51.6,222.6,51.5,222.8,51.4,222.9,51.3,223,51.2,223.1,51.1,223.2,51,223.3,50.9,223.4,50.8,223.6,50.7,223.8,50.6,223.9,50.6,224,50.5,224.1,50.4,224.2,50.3,224.4,50.2,224.4,50.2,224.5,50.2,224.7,50.1,224.9,50.1,225,50,225.1,49.9,225.2,49.8,225.4,49.7,225.4,49.7,225.5,49.7,225.8,49.6,226,49.6,226.1,49.5,226.3,49.4,226.5,49.4,226.7,49.4,226.9,49.3,227.1,49.2,227.4,49.2,227.7,49.1,228.6,49.1,229.6,49,229.9,48.9,230.2,48.9,234.4,48.9,238.7,48.9,238.9,48.9,239.2,49,239.3,49.1,239.5,49.1,239.7,49.2,239.9,49.2,240.1,49.3,240.3,49.4,240.4,49.5,240.5,49.6,240.5,49.7,240.6,49.7,240.6,49.8,240.7,49.8,240.9,49.8,241.2,49.9,241.4,49.9,241.7,50,241.9,50.1,242.1,50.2,242.2,50.2,242.4,50.3,242.5,50.3,242.7,50.4,242.9,50.4,243.2,50.5,245.8,50.5,248.5,50.5,248.6,50.4,248.7,50.3,248.8,50.2,248.9,50.1,248.9,50,249,49.9,249.1,49.8,249.2,49.7,249.4,49.6,249.5,49.6,249.7,49.5,249.9,49.4,249.9,49.3,250,49.2,250.1,49.1,250.2,49,250.3,48.9,250.4,48.8,250.4,48.7,250.4,48.6,250.4,48.5,250.5,48.4,250.5,48.3,250.5,48.2,250.5,48.1,250.5,48.1,250.6,48,250.6,47.9,250.7,47.8,250.8,47.7,250.9,47.6,251,47.5,251,47.4,251,47.3,251.1,47.2,251.1,47.1,251.2,47,251.2,46.9,251.3,46.8,251.3,46.7,251.4,46.6,251.4,46.6,251.5,46.5,251.6,46.4,251.7,46.3,251.8,46.2,251.9,46.1,252.1,46,252.2,45.9,252.3,45.8,252.3,45.7,252.4,45.6,252.4,45.5,252.4,45.4,252.4,45.3,252.4,45.2,252.4,45.1,252.4,45.1,252.4,45,252.4,44.9,252.4,44.8,252.4,44.7,252.4,44.6,252.5,44.5,252.5,44.4,252.5,44.3,252.5,44.2,252.5,44.1,252.6,44,252.6,43.9,252.6,43.8,252.7,43.7,252.7,43.6,252.7,43.6,252.8,43.5,252.8,43.4,252.8,43.3,252.9,43.2,252.9,43.1,252.9,43,253,42.9,253,42.8,253.1,42.7,253.1,42.6,253.2,42.5,253.2,42.4,253.2,42.3,253.2,42.2,253.3,42.1,253.3,42.1,253.3,42,253.4,41.9,253.4,41.8,253.5,41.7,253.5,41.6,253.5,41.5,253.6,41.4,253.7,41.3,253.8,41.2,253.9,41.1,253.9,41,254,40.9,254,40.8,254,40.7,254,40.6,254,40.6,254.1,40.5,254.1,40.4,254.2,40.3,254.2,40.2,254.3,40.1,254.3,40,254.4,39.9,254.4,39.8,254.5,39.7,254.6,39.6,254.7,39.5,254.8,39.4,254.9,39.3,255,39.2,255,39.1,255,39.1,255.1,39,255.1,38.9,255.2,38.8,255.2,38.7,255.3,38.6,255.3,38.5,255.4,38.4,255.4,38.3,255.5,38.2,255.6,38.1,255.7,38,255.7,37.9,255.8,37.8,255.8,37.7,255.9,37.6,255.9,37.6,256,37.5,256.1,37.4,256.2,37.3,256.3,37.2,256.4,37.1,256.5,37,256.6,36.9,256.7,36.8,256.8,36.7,256.9,36.6,257,36.5,257.2,36.4,257.4,36.3,257.5,36.2,257.6,36.1,257.7,36.1,257.8,36,257.9,35.9,258,35.8,258.1,35.7,258.2,35.7,258.3,35.7,258.5,35.6,258.7,35.6,258.9,35.5,259.1,35.4,259.2,35.3,259.4,35.2,259.4,35.2,259.5,35.2,259.8,35.1,260,35.1,260.1,35,260.3,34.9,260.5,34.9,260.7,34.8,260.8,34.7,260.9,34.6,261,34.5,261.2,34.4,261.4,34.3,261.6,34.2,261.9,34.2,262.2,34.1,262.4,34.1,262.6,34,262.9,33.9,263.2,33.9,263.9,33.8,264.6,33.7,264.8,33.6,265,33.6,265.1,33.5,265.3,33.4,265.5,33.4,265.7,33.4,266.5,33.3,267.4,33.2,267.6,33.2,267.9,33.1,270.2,33.1,272.4,33.1,272.7,33.2,273,33.2,278,33.2,283.1,33.2,283.4,33.2,283.7,33.1,283.9,33.1,284.1,33,284.4,32.9,284.7,32.9,285.1,32.8,285.6,32.7,285.9,32.7,286.2,32.6,286.5,32.6,286.9,32.5,286.9,32.5,286.9,32.4]}},89).to({guide:{path:[287,32.5,287.2,32.4,287.4,32.4,287.5,32.3,287.6,32.2,287.8,32.1,288,32,288.3,31.9,288.5,31.8,288.7,31.7,288.8,31.6,288.8,31.5,288.9,31.4,288.9,31.3,289,31.2,289.1,31.1,289.2,31,289.3,30.9,289.4,30.9,289.5,30.8,289.6,30.7,289.7,30.6,289.8,30.5,289.9,30.4,290,30.3,290.1,30.2,290.2,30.1,290.3,30,290.4,29.9,290.4,29.8,290.5,29.7,290.6,29.6,290.7,29.5,290.8,29.4,290.8,29.4,290.8,29.3,290.9,29.2,290.9,29.1,291,29,291.1,28.9,291.2,28.8,291.3,28.7,291.4,28.6,291.5,28.5,291.6,28.4,291.7,28.3,291.7,28.2,291.7,28.1,291.7,28,291.8,27.9,291.8,27.9,291.8,27.8,291.9,27.7,291.9,27.6,292,27.5,292.1,27.4,292.2,27.3,292.3,27.2,292.4,27.1,292.5,27,292.6,26.9,292.7,26.8,292.8,26.7,292.9,26.6,293,26.5,293,26.4,293,26.4,293.1,26.3,293.1,26.2,293.2,26.1,293.3,26,293.4,25.9,293.5,25.8,293.6,25.7,293.7,25.6,293.9,25.5,294.1,25.4,294.2,25.3,294.3,25.2,294.4,25.1,294.5,25,294.6,24.9,294.7,24.9,294.8,24.8,294.9,24.7,295,24.6,295.2,24.5,295.4,24.4,295.6,24.3,295.8,24.2,296,24.1,296.1,24,296.3,23.9,296.4,23.8,296.5,23.7,296.7,23.6,296.9,23.5,297.1,23.5,297.4,23.4,297.8,23.4,298.2,23.3,298.4,23.2,298.5,23.1,298.6,23,298.8,23,299,22.9,299.2,22.9,299.3,22.9,299.5,22.8,299.6,22.7,299.7,22.6,299.9,22.5,300,22.5,300.2,22.4,300.4,22.4,301,22.4,301.6,22.3,301.9,22.2,302.2,22.2,305.3,22.2,308.4,22.2,308.7,22.2,308.9,22.3,309.1,22.4,309.2,22.4,309.4,22.5,309.7,22.5,309.9,22.6,310,22.7,310.2,22.8,310.4,22.9,310.8,22.9,311.2,22.9,311.4,23,311.7,23,311.9,23.1,312,23.2,312.1,23.3,312.2,23.4,312.7,23.4,313.2,23.4,313.4,23.5,313.7,23.5,314,23.6,314.3,23.7,314.4,23.8,314.6,23.9,314.8,23.9,314.9,23.9,315.2,24,315.5,24,316.1,24.1,316.7,24.2,316.9,24.2,317.2,24.3,317.4,24.4,317.5,24.5,317.6,24.5,317.7,24.6,318.8,24.6,319.9,24.7,320.2,24.7,320.5,24.8,322.2,24.8,323.9,24.8,324.1,24.7,324.4,24.7,324.9,24.6,325.5,24.5,325.6,24.4,325.7,24.4,325.9,24.3,326.1,24.2,326.2,24.1,326.4,24,326.4,24,326.5,24,326.7,23.9,326.9,23.9,327.1,23.9,327.4,23.8,327.5,23.7,327.7,23.6,327.9,23.5,328.1,23.4,328.2,23.3,328.3,23.2,328.4,23.1,328.6,23,328.9,23,329.2,22.9,329.3,22.9,329.5,22.8,329.6,22.7,329.7,22.6,329.9,22.5,330.1,22.4,330.2,22.3,330.3,22.2,330.4,22.1,330.5,22,330.6,21.9,330.7,21.9,330.9,21.8,331,21.7,331.2,21.7,331.4,21.6,331.5,21.5,331.6,21.4,331.7,21.4,331.9,21.3,331.9,21.3,332,21.2,332.2,21.2,332.4,21.1,332.5,21,332.6,20.9,332.7,20.9,332.9,20.8,332.9,20.8,333,20.7,333.2,20.7,333.4,20.7,333.6,20.6,333.7,20.5,333.9,20.4,334,20.4,334.2,20.3,334.4,20.2,334.5,20.1,334.6,20,334.7,20,334.8,20,335,19.9,335.2,19.9,335.4,19.9,335.6,19.8,335.8,19.7,336,19.6,336.2,19.5,336.4,19.4,336.5,19.4,336.6,19.3,336.7,19.3,336.8,19.2,337,19.2,337.2,19.2,337.4,19.1,337.6,19,337.8,18.9,338,18.9,338.1,18.8,338.3,18.7,338.5,18.7,338.7,18.7,341.5,18.6,344.4,18.5,344.6,18.4,344.9,18.4,345,18.3,345.1,18.2,345.2,18.1,345.3,18,345.4,17.9,345.6,17.8,345.9,17.7,346.2,17.6,346.3,17.5,346.4,17.4,346.4,17.3,346.5,17.2,346.6,17.1,346.7,17,346.7,16.9,346.7,16.9,346.8,16.8,346.8,16.7,346.8,16.6,346.9,16.5,346.9,16.5,346.9,16.5,346.9,16.4,347,16.3,347,16.2,347,16.1,347.1,16,347.1,15.9,347.1,15.8,347.2,15.7,347.1,15.6,347.1,15.6,347.1,15.5,347,15.4,347,15.3,347,15.2,346.9,15.1,346.9,15,346.9,14.9,346.9,14.8,346.8,14.7,346.8,14.6,346.7,14.6,346.7,14.5]}},77).to({skewY:180,guide:{path:[346.7,14.3,346.7,14.2,346.6,14.2,346.5,14.1,346.4,14,346.3,13.9,346.2,13.8,346.1,13.7,346.1,13.6,346.1,13.6,346.1,13.6]}},1).to({guide:{path:[346.1,13.7,346,13.6,346,13.5,346,13.4,345.9,13.3,345.9,13.2,345.8,13.1,345.8,13,345.7,12.9,345.7,12.8,345.6,12.7,345.5,12.6,345.4,12.5,345.3,12.4,345.2,12.4,345.1,12.3,345.1,12.2,345,12.1,344.9,12,344.8,11.9,344.7,11.8,344.6,11.7,344.6,11.7,344.3,11.6,344.1,11.5,343.9,11.4,343.7,11.4,343.7,11.3,343.6,11.2,343.5,11.2,343.4,11.2,343.1,11.1,342.8,11,342.6,10.9,342.4,10.9,342.3,10.8,342.2,10.7,342,10.7,341.9,10.7,341.6,10.6,341.3,10.5,339,10.5,336.6,10.5,336.4,10.6,336.1,10.7,335.9,10.7,335.6,10.8,335.4,10.9,335.1,10.9,334.4,11,333.6,11,333.4,11.1,333.1,11.2,330.6,11.2,328.1,11.2,327.8,11.1,327.6,11,327.4,10.9,327.2,10.9,327.1,10.8,327.1,10.7,326.9,10.6,326.7,10.5,326.5,10.4,326.3,10.3,326.2,10.2,326.1,10.1,325.8,10.1,325.6,10,325.4,9.9,325.2,9.9,325.1,9.8,325.1,9.6,325,9.6,324.9,9.5,324.8,9.4,324.7,9.3,324.7,9.1,324.7,9.1,324.6,9,324.5,8.9,324.4,8.9,324.4,8.9,324.1,8.9,323.8,8.8,323.6,8.6,323.5,8.6,323.4,8.5,323.3,8.4,323.2,8.3,323.1,8.2,323.1,8.1,323,8,323,7.9,322.9,7.9,322.9,7.8,322.9,7.7,322.9,7.6,322.9,7.5,322.9,7.4,322.9,7.3,322.9,7.2,322.9,7.1,322.9,7.1,322.9,7.1,322.8,7,322.8,6.9,322.7,6.8,322.7,6.7,322.6,6.6,322.5,6.6,322.4,6.5,322.3,6.4,322.3,6.3,322.2,6.3]}},32).wait(1));

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DF6668").s().p("AgBAMQgDgEgBgFQgBgFADgFQADgFABABQAEAAABALIgDAEIgDAHIAAACIgBgBg");
	this.shape.setTransform(60.4,38.4,0.311,0.311);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C66167").s().p("AgLAEQgBgDAFgCQAEgEAEAAQAHAAADABQAAABABAAQAAABAAAAQAAAAAAABQgBAAAAAAQgDABgDACIgDAEIgFAAQgHAAgBgCg");
	this.shape_1.setTransform(64.6,41,0.311,0.311);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#DF6668").s().p("AAAAGQgHgBgDgBQgBgBAAAAQAAAAAAgBQAAAAAAAAQABgBABAAQAEgBAFgFIAFAAQAHAAAAACQABADgFACQgEAEgEAAIAAAAg");
	this.shape_2.setTransform(66.7,42.4,0.311,0.311);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#7E6E5A").s().p("AAXABQgngIgKADIgkAIQAEgEAGgCQANgIAQgBQAXgCA/AZIgogLg");
	this.shape_3.setTransform(65.9,40.8,0.311,0.311);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E76768").s().p("AgBAHQgIAAgDgCQgEgDAEgBQAFgBAGgHIAHAAQAIABABACQABAEgFADQgGAFgFAAIgBgBg");
	this.shape_4.setTransform(67.5,41.8,0.311,0.311);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#DF6668").s().p("AgJgBQAYAAgGACIgEABQgFAAgJgDg");
	this.shape_5.setTransform(67.2,41.1,0.311,0.311);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#DF6668").s().p("AgFABIgNgCIAOgCQANgCAEACQAGADAAACQABADgHAAQgGAAgMgEg");
	this.shape_6.setTransform(66.2,41,0.311,0.311);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#C66167").s().p("AADASQgDgBgGgJIgIgIIAGgJQAGgJACAAQAEABAGAGQAHAHgCAEQgHATgEAAIgBgBg");
	this.shape_7.setTransform(63.6,39.5,0.311,0.311);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#DF6668").s().p("AgBAKQgHgBgGgDIgEgDQABgGACgFQACgDAKADIARAHQAJACgJAFQgHAEgGAAIgCAAg");
	this.shape_8.setTransform(62.5,39,0.311,0.311);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#C66167").s().p("AAFAQQgFgFgDAAIgGgLQgEgMAEgCQAGgDAHAGQAKAGgCAFIgCALQgCAFgCAAIgBAAg");
	this.shape_9.setTransform(61.3,38.5,0.311,0.311);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F8355C").s().p("AhKgIQAAgRAHgdQAHgbAFgGQAIgKAIAJQAbAhAWAIQAhALAPAKQAUANgDAOQgPgXgOgDQgggGgHgDQgKgGgVgOQgQgLgDAAQgUAEgGA9QgCAZAUAlQALASAKANQgqgogCg9g");
	this.shape_10.setTransform(62.1,39.5,0.311,0.311);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FC9D77").s().p("AgPAhQgBgQAEgeQAEgeADgJQACgGADAAQAFAAADAEQACAEgCASQgDAWABAJQACASAIAmQgFgBgLADIgLADQgCgEgCgXg");
	this.shape_11.setTransform(60.5,38.6,0.311,0.311);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F8355C").s().p("AgkAMQgPgCgHgEIAegCIAmgEQAPgCAigMQgxAYgQAEIgKABQgJAAgLgDg");
	this.shape_12.setTransform(65,43.3,0.311,0.311);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FC9D77").s().p("AgzAGQAVgMAQgFQARgFAXgBQAWgBAFACIARAHQgKAJgNACQgyABgNADIg1ANIASgNg");
	this.shape_13.setTransform(65.3,42.7,0.311,0.311);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FB8670").s().p("AgoADQASgLAKgDQALgDAagBQAagBADABQADABABADQACAEgDAFQgEAEgRAOQghgNgSADIgcAGIgPAEIASgNg");
	this.shape_14.setTransform(66.3,41.9,0.311,0.311);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FC9D77").s().p("AhVAoQA2gpAEgHQADgHAJgLQALgNAFgCQAJgDA1APQAGACAIAFQAIAGABAEQgPgBgSAAQgkgBgLAHIgiAWQgZASgHADQgJAGgIAAQgEAAgEgCg");
	this.shape_15.setTransform(65.4,41.9,0.311,0.311);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FB8670").s().p("AgtArQgCAAgBgBQgBAAAAgBQgBAAAAAAQAAgBABAAQApg+AIgKQAHgIAYgCQAZgCgHAIQgEAFgPALQgOAMgFAGQgKALgnAhQgBAAAAABQAAAAgBAAQAAAAgBAAQAAAAgBAAIgDAAg");
	this.shape_16.setTransform(64.1,41.8,0.311,0.311);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FC9D77").s().p("AgjAqIARgfQAGgJAagiIANgRQAJgLAAAGQABAGgHASQgHARgKANIgkA5IgBAAQgFAAgGgPg");
	this.shape_17.setTransform(63.3,41.3,0.311,0.311);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FC9D77").s().p("AgVAvQgLgXgBgMQAAgGALgiIALgiIAFAEQAGAEACABIAgAHIgMATQgOAXgHANQgJAZgFAdg");
	this.shape_18.setTransform(62.4,40,0.311,0.311);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFCF00").s().p("AAVAmQgSgHgJgOQgLgOgKgTQgGgSgCAAIAQgGQAPgDAEANIAjBHQgGAAgIgDg");
	this.shape_19.setTransform(61.2,41.7,0.311,0.311);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FA6A68").s().p("AgSBqQghgJgkgXQgMgNgMgVQgXgoAFggIAHg+QACgUAOAEQAGACASAXQAQAUAcAHQAhAIALAOQAJALgEANIgLAfIA7ABQA+ADAIAPQAJAQg1AcQgrAXgXAFIgJABQgKAAgSgFg");
	this.shape_20.setTransform(64,40.2,0.311,0.311);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#1A1A1A").s().p("AAGAAQgRgFgLAGIgBgBQALgGASAFQALABAHADIgBABQgHgEgKAAg");
	this.shape_21.setTransform(59.7,42.3,0.311,0.311);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#1A1A1A").s().p("AAAAIQgPgJgCgPIACAAQACAOAPAJQAIAGAHACIAAACQgIgDgJgGg");
	this.shape_22.setTransform(59.9,41.8,0.311,0.311);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#1A1A1A").s().p("AAYAUQgbgJgMgLQgLgJgEABQgGACgCgBQgIgDgBgGQgBgGAHgCQALgDAGAOIAKABQAMACAHAFQAoAXADAFQAAABAAAAQABABgBAAQAAAAgBABQAAAAgBAAQgGAAgQgGg");
	this.shape_23.setTransform(61.9,43,0.311,0.311);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#DF6668").s().p("AgHAJQgCgCACgGQACgDAFgDQAEgDADAAQABAAABAAQAAAAAAAAQAAABAAAAQAAAAAAABQgDADgBAHQgHAFgDAAIgCAAg");
	this.shape_24.setTransform(56.9,44.6,0.311,0.311);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#C66167").s().p("AADALQgDgBgCgFQgEgFABgEQAAgGADgBQACgBADAGIAEAFIgBADQgBAFABACQAAABAAAAQAAABAAAAQAAAAgBABQAAAAgBAAIgBgBg");
	this.shape_25.setTransform(61.6,46.3,0.311,0.311);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#DF6668").s().p("AgGACQADgGgCgEQgBgDADABIAFAGQAEAEABAFQgBAFgDACIgBAAQgCAAgGgKg");
	this.shape_26.setTransform(64,47,0.311,0.311);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#7E6E5A").s().p("AgfgEQgIgNgCgPIAAgOIAOAiQAGAOA/AtQg7gigOgRg");
	this.shape_27.setTransform(62.4,47.3,0.311,0.311);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#E76768").s().p("AgHACQACgIgBgFQgCgEAEACQAEABADAGQAFAGAAAGQAAAHgEABIgBABQgDAAgHgNg");
	this.shape_28.setTransform(64.1,48,0.311,0.311);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#DF6668").s().p("AgHgGIAHAEQAHADAAAEQABABgBAAQAAAAAAABQAAAAAAAAQAAAAAAAAQgDAAgLgNg");
	this.shape_29.setTransform(63.3,48.3,0.311,0.311);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#DF6668").s().p("AAEAMQgEgCgGgKIgHgNIALAIQAKAGAEAFQAEAFgDACIgCABIgHgCg");
	this.shape_30.setTransform(62.6,47.5,0.311,0.311);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#C66167").s().p("AgDANQgIgBgEgDQgCgCADgJIAEgLIAKABQANABADACQAEADgMAQQgDAEgFAAIgDgBg");
	this.shape_31.setTransform(59.8,46.5,0.311,0.311);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#DF6668").s().p("AAJAOQgZgOACgEIAFgHIADgDIAFABQADACAGAFQAHAGABAIQAAAHgDAAIgEgBg");
	this.shape_32.setTransform(58.6,45.9,0.311,0.311);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#C66167").s().p("AgFAKQgKgDgCgHQgBgDANgEIAMgDIAJAFQAEACgEADIgIAJQgDACgEAAIgGgBg");
	this.shape_33.setTransform(57.5,45.3,0.311,0.311);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#F8355C").s().p("AAoBIQgSgGgbgTQgUgOgsAAQgFAAgCgEQgDgEABgGQACgHARgUQATgYANgKQAvgmA7AIQgRAAgVADQgpAHgRASQguAsAKAPQABACATAGQAYAIAKAGQAHADAZAVQALAKAdgFQgHAIgLAAQgHAAgIgCg");
	this.shape_34.setTransform(58.1,45,0.311,0.311);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FC9D77").s().p("AgwApQgDgEAEgGQAGgJATgUQAWgWAMgJIAYgNIAFALQAGALADADIgyAbQgHAFgPAPQgNANgEAAIgCAAQgEAAgDgCg");
	this.shape_35.setTransform(57.3,44.4,0.311,0.311);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#F8355C").s().p("AAKAGIgUghIgRgZQAHADAMAKQAMANAGAKQAIAQAKA1QgMgigGgNg");
	this.shape_36.setTransform(63.5,45.3,0.311,0.311);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FC9D77").s().p("AAQA3QgGgDgKgSQgNgTgHgPQgHgPgCgaIgCgWIAXAyQAHAMAdAnQAFALgBAPg");
	this.shape_37.setTransform(63.4,45.7,0.311,0.311);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FB8670").s().p("AAPA2QgDgDgNgUQgRgWgEgJQgEgJgBgXIgBgWIAGANIANAbQAJAPAdASIgBAMQAAANgCAEQgBAFgEABIgDABIgDgBg");
	this.shape_38.setTransform(63.5,47,0.311,0.311);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FC9D77").s().p("AAZBTQgJgCgGgFQgqgegEgLQgCgGADgRQADgMADgHQADgHAAhFIAGAEQAGAHABALIADAnQACAbACANQADAWApAsIgFAAIgIgBg");
	this.shape_39.setTransform(63,46.1,0.311,0.311);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FB8670").s().p("AgEAzQgNgVABgKQABgIANglIALgnQAAAAAAAAQAAAAABAAQAAAAABAAQABABABAAQAFAEgBADIAAAcQgBAcgDAKQgCAIABATQAAASgCAHQAAABAAAAQAAABgBABQAAAAgBAAQAAAAAAAAQgEAAgIgOg");
	this.shape_40.setTransform(61.6,45.4,0.311,0.311);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FC9D77").s().p("AgYAxIAFgVQAMgsADgIIALghIAJgCQAJgBABADIgVBAQgFAQgHARQgJARgGADIgCAAQgCAAACgLg");
	this.shape_41.setTransform(61.1,45.2,0.311,0.311);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FC9D77").s().p("AgfAhQgDgDgHgCIgHgCIAUgcQAVgfAFgDQAJgHAYgFIASgFIgLAPQgNAQgIAQQgNAWgJAlg");
	this.shape_42.setTransform(59.2,45.2,0.311,0.311);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFCF00").s().p("AguAGIgFgNIATgEQAXgGAPAAQASgBAQAKQAIAFAEADIhNASIgFABQgKAAgGgNg");
	this.shape_43.setTransform(60.1,43.3,0.311,0.311);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FA6A68").s().p("ABHA1IgmgvIgSAeQgIALgMAAQgTgBgbgVQgWgSgbAAQgcAAgGgEQgMgFAPgPQAagYASgUQAXgaAugGQAVgDATABQAoAOAbAUQAVAPAHANQAKAVAJAuQALA7gRADIgCAAQgSAAgngrg");
	this.shape_44.setTransform(60.1,45.7,0.311,0.311);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_44,p:{scaleY:0.311,x:60.1,y:45.7}},{t:this.shape_43,p:{scaleY:0.311,x:60.1,y:43.3}},{t:this.shape_42,p:{scaleY:0.311,x:59.2,y:45.2}},{t:this.shape_41,p:{scaleY:0.311,x:61.1,y:45.2}},{t:this.shape_40,p:{scaleY:0.311,x:61.6,y:45.4}},{t:this.shape_39,p:{scaleY:0.311,x:63,y:46.1}},{t:this.shape_38,p:{scaleY:0.311,x:63.5,y:47}},{t:this.shape_37,p:{scaleY:0.311,x:63.4,y:45.7}},{t:this.shape_36,p:{scaleY:0.311,x:63.5,y:45.3}},{t:this.shape_35,p:{scaleY:0.311,x:57.3}},{t:this.shape_34,p:{scaleY:0.311,x:58.1,y:45}},{t:this.shape_33,p:{scaleY:0.311,x:57.5,y:45.3}},{t:this.shape_32,p:{scaleY:0.311,x:58.6,y:45.9}},{t:this.shape_31,p:{scaleY:0.311,x:59.8,y:46.5}},{t:this.shape_30,p:{scaleY:0.311,x:62.6,y:47.5}},{t:this.shape_29,p:{scaleY:0.311,x:63.3,y:48.3}},{t:this.shape_28,p:{scaleY:0.311,x:64.1,y:48}},{t:this.shape_27,p:{scaleY:0.311,x:62.4,y:47.3}},{t:this.shape_26,p:{scaleY:0.311,x:64,y:47}},{t:this.shape_25,p:{scaleY:0.311,y:46.3}},{t:this.shape_24,p:{scaleY:0.311,x:56.9,y:44.6}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20,p:{scaleY:0.311,rotation:0,x:64,y:40.2}},{t:this.shape_19,p:{scaleY:0.311,rotation:0,x:61.2,y:41.7}},{t:this.shape_18,p:{scaleY:0.311,rotation:0,x:62.4,y:40}},{t:this.shape_17,p:{scaleY:0.311,rotation:0,y:41.3}},{t:this.shape_16,p:{scaleY:0.311,rotation:0,x:64.1,y:41.8}},{t:this.shape_15,p:{scaleY:0.311,rotation:0,x:65.4,y:41.9}},{t:this.shape_14,p:{scaleY:0.311,rotation:0,x:66.3,y:41.9}},{t:this.shape_13,p:{scaleY:0.311,rotation:0,x:65.3,y:42.7}},{t:this.shape_12,p:{scaleY:0.311,rotation:0,x:65,y:43.3}},{t:this.shape_11,p:{scaleY:0.311,rotation:0,x:60.5,y:38.6}},{t:this.shape_10,p:{scaleY:0.311,rotation:0,x:62.1,y:39.5}},{t:this.shape_9,p:{scaleY:0.311,rotation:0,x:61.3,y:38.5}},{t:this.shape_8,p:{scaleY:0.311,rotation:0,x:62.5,y:39}},{t:this.shape_7,p:{scaleY:0.311,rotation:0,x:63.6,y:39.5}},{t:this.shape_6,p:{scaleY:0.311,rotation:0,x:66.2,y:41}},{t:this.shape_5,p:{scaleY:0.311,rotation:0,x:67.2,y:41.1}},{t:this.shape_4,p:{scaleY:0.311,rotation:0,x:67.5,y:41.8}},{t:this.shape_3,p:{scaleY:0.311,rotation:0,x:65.9,y:40.8}},{t:this.shape_2,p:{scaleY:0.311,rotation:0,x:66.7,y:42.4}},{t:this.shape_1,p:{scaleY:0.311,rotation:0,x:64.6,y:41}},{t:this.shape,p:{scaleY:0.311,rotation:0,x:60.4,y:38.4}}]}).to({state:[{t:this.shape_44,p:{scaleY:0.25,x:60.2,y:45.4}},{t:this.shape_43,p:{scaleY:0.25,x:60.2,y:43.4}},{t:this.shape_42,p:{scaleY:0.25,x:59.3,y:45}},{t:this.shape_41,p:{scaleY:0.25,x:61.2,y:45}},{t:this.shape_40,p:{scaleY:0.25,x:61.7,y:45.1}},{t:this.shape_39,p:{scaleY:0.25,x:63.1,y:45.7}},{t:this.shape_38,p:{scaleY:0.25,x:63.6,y:46.4}},{t:this.shape_37,p:{scaleY:0.25,x:63.5,y:45.4}},{t:this.shape_36,p:{scaleY:0.25,x:63.6,y:45}},{t:this.shape_35,p:{scaleY:0.25,x:57.4}},{t:this.shape_34,p:{scaleY:0.25,x:58.2,y:44.8}},{t:this.shape_33,p:{scaleY:0.25,x:57.6,y:45}},{t:this.shape_32,p:{scaleY:0.25,x:58.7,y:45.5}},{t:this.shape_31,p:{scaleY:0.25,x:59.9,y:46}},{t:this.shape_30,p:{scaleY:0.25,x:62.7,y:46.8}},{t:this.shape_29,p:{scaleY:0.25,x:63.4,y:47.4}},{t:this.shape_28,p:{scaleY:0.25,x:64.2,y:47.2}},{t:this.shape_27,p:{scaleY:0.25,x:62.5,y:46.6}},{t:this.shape_26,p:{scaleY:0.25,x:64.1,y:46.4}},{t:this.shape_25,p:{scaleY:0.25,y:45.8}},{t:this.shape_24,p:{scaleY:0.25,x:57,y:44.5}},{t:this.shape_20,p:{scaleY:0.236,rotation:6.9,x:64.1,y:41.1}},{t:this.shape_19,p:{scaleY:0.236,rotation:6.9,x:61.1,y:41.8}},{t:this.shape_18,p:{scaleY:0.236,rotation:6.9,x:62.5,y:40.8}},{t:this.shape_17,p:{scaleY:0.236,rotation:6.9,y:41.8}},{t:this.shape_16,p:{scaleY:0.236,rotation:6.9,x:64,y:42.3}},{t:this.shape_15,p:{scaleY:0.236,rotation:6.9,x:65.3,y:42.5}},{t:this.shape_14,p:{scaleY:0.236,rotation:6.9,x:66.2,y:42.6}},{t:this.shape_13,p:{scaleY:0.236,rotation:6.9,x:65.1,y:43.1}},{t:this.shape_12,p:{scaleY:0.236,rotation:6.9,x:64.7,y:43.5}},{t:this.shape_11,p:{scaleY:0.236,rotation:6.9,x:60.7,y:39.5}},{t:this.shape_10,p:{scaleY:0.236,rotation:6.9,x:62.3,y:40.3}},{t:this.shape_9,p:{scaleY:0.236,rotation:6.9,x:61.5,y:39.5}},{t:this.shape_8,p:{scaleY:0.236,rotation:6.9,x:62.7,y:40}},{t:this.shape_7,p:{scaleY:0.236,rotation:6.9,x:63.7,y:40.5}},{t:this.shape_6,p:{scaleY:0.236,rotation:6.9,x:66.1,y:42}},{t:this.shape_5,p:{scaleY:0.236,rotation:6.9,x:67.1,y:42.2}},{t:this.shape_4,p:{scaleY:0.236,rotation:6.9,x:67.4,y:42.7}},{t:this.shape_3,p:{scaleY:0.236,rotation:6.9,x:65.8,y:41.7}},{t:this.shape_2,p:{scaleY:0.236,rotation:6.9,x:66.5,y:43.1}},{t:this.shape_1,p:{scaleY:0.236,rotation:6.9,x:64.5,y:41.8}},{t:this.shape,p:{scaleY:0.236,rotation:6.9,x:60.6,y:39.3}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21}]},67).to({state:[{t:this.shape_44,p:{scaleY:0.311,x:60.1,y:45.7}},{t:this.shape_43,p:{scaleY:0.311,x:60.1,y:43.3}},{t:this.shape_42,p:{scaleY:0.311,x:59.2,y:45.2}},{t:this.shape_41,p:{scaleY:0.311,x:61.1,y:45.2}},{t:this.shape_40,p:{scaleY:0.311,x:61.6,y:45.4}},{t:this.shape_39,p:{scaleY:0.311,x:63,y:46.1}},{t:this.shape_38,p:{scaleY:0.311,x:63.5,y:47}},{t:this.shape_37,p:{scaleY:0.311,x:63.4,y:45.7}},{t:this.shape_36,p:{scaleY:0.311,x:63.5,y:45.3}},{t:this.shape_35,p:{scaleY:0.311,x:57.3}},{t:this.shape_34,p:{scaleY:0.311,x:58.1,y:45}},{t:this.shape_33,p:{scaleY:0.311,x:57.5,y:45.3}},{t:this.shape_32,p:{scaleY:0.311,x:58.6,y:45.9}},{t:this.shape_31,p:{scaleY:0.311,x:59.8,y:46.5}},{t:this.shape_30,p:{scaleY:0.311,x:62.6,y:47.5}},{t:this.shape_29,p:{scaleY:0.311,x:63.3,y:48.3}},{t:this.shape_28,p:{scaleY:0.311,x:64.1,y:48}},{t:this.shape_27,p:{scaleY:0.311,x:62.4,y:47.3}},{t:this.shape_26,p:{scaleY:0.311,x:64,y:47}},{t:this.shape_25,p:{scaleY:0.311,y:46.3}},{t:this.shape_24,p:{scaleY:0.311,x:56.9,y:44.6}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20,p:{scaleY:0.311,rotation:0,x:64,y:40.2}},{t:this.shape_19,p:{scaleY:0.311,rotation:0,x:61.2,y:41.7}},{t:this.shape_18,p:{scaleY:0.311,rotation:0,x:62.4,y:40}},{t:this.shape_17,p:{scaleY:0.311,rotation:0,y:41.3}},{t:this.shape_16,p:{scaleY:0.311,rotation:0,x:64.1,y:41.8}},{t:this.shape_15,p:{scaleY:0.311,rotation:0,x:65.4,y:41.9}},{t:this.shape_14,p:{scaleY:0.311,rotation:0,x:66.3,y:41.9}},{t:this.shape_13,p:{scaleY:0.311,rotation:0,x:65.3,y:42.7}},{t:this.shape_12,p:{scaleY:0.311,rotation:0,x:65,y:43.3}},{t:this.shape_11,p:{scaleY:0.311,rotation:0,x:60.5,y:38.6}},{t:this.shape_10,p:{scaleY:0.311,rotation:0,x:62.1,y:39.5}},{t:this.shape_9,p:{scaleY:0.311,rotation:0,x:61.3,y:38.5}},{t:this.shape_8,p:{scaleY:0.311,rotation:0,x:62.5,y:39}},{t:this.shape_7,p:{scaleY:0.311,rotation:0,x:63.6,y:39.5}},{t:this.shape_6,p:{scaleY:0.311,rotation:0,x:66.2,y:41}},{t:this.shape_5,p:{scaleY:0.311,rotation:0,x:67.2,y:41.1}},{t:this.shape_4,p:{scaleY:0.311,rotation:0,x:67.5,y:41.8}},{t:this.shape_3,p:{scaleY:0.311,rotation:0,x:65.9,y:40.8}},{t:this.shape_2,p:{scaleY:0.311,rotation:0,x:66.7,y:42.4}},{t:this.shape_1,p:{scaleY:0.311,rotation:0,x:64.6,y:41}},{t:this.shape,p:{scaleY:0.311,rotation:0,x:60.4,y:38.4}}]},81).to({state:[{t:this.shape_44,p:{scaleY:0.25,x:60.2,y:45.4}},{t:this.shape_43,p:{scaleY:0.25,x:60.2,y:43.4}},{t:this.shape_42,p:{scaleY:0.25,x:59.3,y:45}},{t:this.shape_41,p:{scaleY:0.25,x:61.2,y:45}},{t:this.shape_40,p:{scaleY:0.25,x:61.7,y:45.1}},{t:this.shape_39,p:{scaleY:0.25,x:63.1,y:45.7}},{t:this.shape_38,p:{scaleY:0.25,x:63.6,y:46.4}},{t:this.shape_37,p:{scaleY:0.25,x:63.5,y:45.4}},{t:this.shape_36,p:{scaleY:0.25,x:63.6,y:45}},{t:this.shape_35,p:{scaleY:0.25,x:57.4}},{t:this.shape_34,p:{scaleY:0.25,x:58.2,y:44.8}},{t:this.shape_33,p:{scaleY:0.25,x:57.6,y:45}},{t:this.shape_32,p:{scaleY:0.25,x:58.7,y:45.5}},{t:this.shape_31,p:{scaleY:0.25,x:59.9,y:46}},{t:this.shape_30,p:{scaleY:0.25,x:62.7,y:46.8}},{t:this.shape_29,p:{scaleY:0.25,x:63.4,y:47.4}},{t:this.shape_28,p:{scaleY:0.25,x:64.2,y:47.2}},{t:this.shape_27,p:{scaleY:0.25,x:62.5,y:46.6}},{t:this.shape_26,p:{scaleY:0.25,x:64.1,y:46.4}},{t:this.shape_25,p:{scaleY:0.25,y:45.8}},{t:this.shape_24,p:{scaleY:0.25,x:57,y:44.5}},{t:this.shape_20,p:{scaleY:0.236,rotation:6.9,x:64.1,y:41.1}},{t:this.shape_19,p:{scaleY:0.236,rotation:6.9,x:61.1,y:41.8}},{t:this.shape_18,p:{scaleY:0.236,rotation:6.9,x:62.5,y:40.8}},{t:this.shape_17,p:{scaleY:0.236,rotation:6.9,y:41.8}},{t:this.shape_16,p:{scaleY:0.236,rotation:6.9,x:64,y:42.3}},{t:this.shape_15,p:{scaleY:0.236,rotation:6.9,x:65.3,y:42.5}},{t:this.shape_14,p:{scaleY:0.236,rotation:6.9,x:66.2,y:42.6}},{t:this.shape_13,p:{scaleY:0.236,rotation:6.9,x:65.1,y:43.1}},{t:this.shape_12,p:{scaleY:0.236,rotation:6.9,x:64.7,y:43.5}},{t:this.shape_11,p:{scaleY:0.236,rotation:6.9,x:60.7,y:39.5}},{t:this.shape_10,p:{scaleY:0.236,rotation:6.9,x:62.3,y:40.3}},{t:this.shape_9,p:{scaleY:0.236,rotation:6.9,x:61.5,y:39.5}},{t:this.shape_8,p:{scaleY:0.236,rotation:6.9,x:62.7,y:40}},{t:this.shape_7,p:{scaleY:0.236,rotation:6.9,x:63.7,y:40.5}},{t:this.shape_6,p:{scaleY:0.236,rotation:6.9,x:66.1,y:42}},{t:this.shape_5,p:{scaleY:0.236,rotation:6.9,x:67.1,y:42.2}},{t:this.shape_4,p:{scaleY:0.236,rotation:6.9,x:67.4,y:42.7}},{t:this.shape_3,p:{scaleY:0.236,rotation:6.9,x:65.8,y:41.7}},{t:this.shape_2,p:{scaleY:0.236,rotation:6.9,x:66.5,y:43.1}},{t:this.shape_1,p:{scaleY:0.236,rotation:6.9,x:64.5,y:41.8}},{t:this.shape,p:{scaleY:0.236,rotation:6.9,x:60.6,y:39.3}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21}]},82).to({state:[{t:this.shape_44,p:{scaleY:0.311,x:60.1,y:45.7}},{t:this.shape_43,p:{scaleY:0.311,x:60.1,y:43.3}},{t:this.shape_42,p:{scaleY:0.311,x:59.2,y:45.2}},{t:this.shape_41,p:{scaleY:0.311,x:61.1,y:45.2}},{t:this.shape_40,p:{scaleY:0.311,x:61.6,y:45.4}},{t:this.shape_39,p:{scaleY:0.311,x:63,y:46.1}},{t:this.shape_38,p:{scaleY:0.311,x:63.5,y:47}},{t:this.shape_37,p:{scaleY:0.311,x:63.4,y:45.7}},{t:this.shape_36,p:{scaleY:0.311,x:63.5,y:45.3}},{t:this.shape_35,p:{scaleY:0.311,x:57.3}},{t:this.shape_34,p:{scaleY:0.311,x:58.1,y:45}},{t:this.shape_33,p:{scaleY:0.311,x:57.5,y:45.3}},{t:this.shape_32,p:{scaleY:0.311,x:58.6,y:45.9}},{t:this.shape_31,p:{scaleY:0.311,x:59.8,y:46.5}},{t:this.shape_30,p:{scaleY:0.311,x:62.6,y:47.5}},{t:this.shape_29,p:{scaleY:0.311,x:63.3,y:48.3}},{t:this.shape_28,p:{scaleY:0.311,x:64.1,y:48}},{t:this.shape_27,p:{scaleY:0.311,x:62.4,y:47.3}},{t:this.shape_26,p:{scaleY:0.311,x:64,y:47}},{t:this.shape_25,p:{scaleY:0.311,y:46.3}},{t:this.shape_24,p:{scaleY:0.311,x:56.9,y:44.6}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20,p:{scaleY:0.311,rotation:0,x:64,y:40.2}},{t:this.shape_19,p:{scaleY:0.311,rotation:0,x:61.2,y:41.7}},{t:this.shape_18,p:{scaleY:0.311,rotation:0,x:62.4,y:40}},{t:this.shape_17,p:{scaleY:0.311,rotation:0,y:41.3}},{t:this.shape_16,p:{scaleY:0.311,rotation:0,x:64.1,y:41.8}},{t:this.shape_15,p:{scaleY:0.311,rotation:0,x:65.4,y:41.9}},{t:this.shape_14,p:{scaleY:0.311,rotation:0,x:66.3,y:41.9}},{t:this.shape_13,p:{scaleY:0.311,rotation:0,x:65.3,y:42.7}},{t:this.shape_12,p:{scaleY:0.311,rotation:0,x:65,y:43.3}},{t:this.shape_11,p:{scaleY:0.311,rotation:0,x:60.5,y:38.6}},{t:this.shape_10,p:{scaleY:0.311,rotation:0,x:62.1,y:39.5}},{t:this.shape_9,p:{scaleY:0.311,rotation:0,x:61.3,y:38.5}},{t:this.shape_8,p:{scaleY:0.311,rotation:0,x:62.5,y:39}},{t:this.shape_7,p:{scaleY:0.311,rotation:0,x:63.6,y:39.5}},{t:this.shape_6,p:{scaleY:0.311,rotation:0,x:66.2,y:41}},{t:this.shape_5,p:{scaleY:0.311,rotation:0,x:67.2,y:41.1}},{t:this.shape_4,p:{scaleY:0.311,rotation:0,x:67.5,y:41.8}},{t:this.shape_3,p:{scaleY:0.311,rotation:0,x:65.9,y:40.8}},{t:this.shape_2,p:{scaleY:0.311,rotation:0,x:66.7,y:42.4}},{t:this.shape_1,p:{scaleY:0.311,rotation:0,x:64.6,y:41}},{t:this.shape,p:{scaleY:0.311,rotation:0,x:60.4,y:38.4}}]},64).to({state:[{t:this.shape_44,p:{scaleY:0.25,x:60.2,y:45.4}},{t:this.shape_43,p:{scaleY:0.25,x:60.2,y:43.4}},{t:this.shape_42,p:{scaleY:0.25,x:59.3,y:45}},{t:this.shape_41,p:{scaleY:0.25,x:61.2,y:45}},{t:this.shape_40,p:{scaleY:0.25,x:61.7,y:45.1}},{t:this.shape_39,p:{scaleY:0.25,x:63.1,y:45.7}},{t:this.shape_38,p:{scaleY:0.25,x:63.6,y:46.4}},{t:this.shape_37,p:{scaleY:0.25,x:63.5,y:45.4}},{t:this.shape_36,p:{scaleY:0.25,x:63.6,y:45}},{t:this.shape_35,p:{scaleY:0.25,x:57.4}},{t:this.shape_34,p:{scaleY:0.25,x:58.2,y:44.8}},{t:this.shape_33,p:{scaleY:0.25,x:57.6,y:45}},{t:this.shape_32,p:{scaleY:0.25,x:58.7,y:45.5}},{t:this.shape_31,p:{scaleY:0.25,x:59.9,y:46}},{t:this.shape_30,p:{scaleY:0.25,x:62.7,y:46.8}},{t:this.shape_29,p:{scaleY:0.25,x:63.4,y:47.4}},{t:this.shape_28,p:{scaleY:0.25,x:64.2,y:47.2}},{t:this.shape_27,p:{scaleY:0.25,x:62.5,y:46.6}},{t:this.shape_26,p:{scaleY:0.25,x:64.1,y:46.4}},{t:this.shape_25,p:{scaleY:0.25,y:45.8}},{t:this.shape_24,p:{scaleY:0.25,x:57,y:44.5}},{t:this.shape_20,p:{scaleY:0.236,rotation:6.9,x:64.1,y:41.1}},{t:this.shape_19,p:{scaleY:0.236,rotation:6.9,x:61.1,y:41.8}},{t:this.shape_18,p:{scaleY:0.236,rotation:6.9,x:62.5,y:40.8}},{t:this.shape_17,p:{scaleY:0.236,rotation:6.9,y:41.8}},{t:this.shape_16,p:{scaleY:0.236,rotation:6.9,x:64,y:42.3}},{t:this.shape_15,p:{scaleY:0.236,rotation:6.9,x:65.3,y:42.5}},{t:this.shape_14,p:{scaleY:0.236,rotation:6.9,x:66.2,y:42.6}},{t:this.shape_13,p:{scaleY:0.236,rotation:6.9,x:65.1,y:43.1}},{t:this.shape_12,p:{scaleY:0.236,rotation:6.9,x:64.7,y:43.5}},{t:this.shape_11,p:{scaleY:0.236,rotation:6.9,x:60.7,y:39.5}},{t:this.shape_10,p:{scaleY:0.236,rotation:6.9,x:62.3,y:40.3}},{t:this.shape_9,p:{scaleY:0.236,rotation:6.9,x:61.5,y:39.5}},{t:this.shape_8,p:{scaleY:0.236,rotation:6.9,x:62.7,y:40}},{t:this.shape_7,p:{scaleY:0.236,rotation:6.9,x:63.7,y:40.5}},{t:this.shape_6,p:{scaleY:0.236,rotation:6.9,x:66.1,y:42}},{t:this.shape_5,p:{scaleY:0.236,rotation:6.9,x:67.1,y:42.2}},{t:this.shape_4,p:{scaleY:0.236,rotation:6.9,x:67.4,y:42.7}},{t:this.shape_3,p:{scaleY:0.236,rotation:6.9,x:65.8,y:41.7}},{t:this.shape_2,p:{scaleY:0.236,rotation:6.9,x:66.5,y:43.1}},{t:this.shape_1,p:{scaleY:0.236,rotation:6.9,x:64.5,y:41.8}},{t:this.shape,p:{scaleY:0.236,rotation:6.9,x:60.6,y:39.3}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21}]},54).wait(52));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(2.5,-0.9,325,63.9);


// stage content:



(lib.Spring_2016_v22 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// text2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(0.5,1,1).p("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");
	this.shape.setTransform(241.2,73.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("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");
	this.shape_1.setTransform(241.2,73.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(400));

	// butterflies
	this.instance = new lib.butterfly_ani();
	this.instance.parent = this;
	this.instance.setTransform(285.1,34.2,1,1,0,0,0,163.6,28.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(400));

	// text
	this.text = new cjs.Text("SPRING SEASON", "30px 'Sports World'", "#FFF5D1");
	this.text.textAlign = "center";
	this.text.lineHeight = 36;
	this.text.lineWidth = 476;
	this.text.parent = this;
	this.text.setTransform(239.4,23.9);

	this.text_1 = new cjs.Text("SPRING SEASON", "30px 'Sports World'", "#998E7A");
	this.text_1.textAlign = "center";
	this.text_1.lineHeight = 36;
	this.text_1.lineWidth = 476;
	this.text_1.parent = this;
	this.text_1.setTransform(241,25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.text_1},{t:this.text}]}).wait(400));

	// Layer 3
	this.instance_1 = new lib.Spring_2016_v22_1();
	this.instance_1.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(400));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(239.4,42,481.7,84);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;