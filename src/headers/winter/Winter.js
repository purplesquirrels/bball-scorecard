(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes
lib.webFontTxtFilters = {}; 

// library properties:
lib.properties = {
	width: 480,
	height: 84,
	fps: 24,
	color: "#FFFFFF",
	webfonts: {},
	manifest: []
};



lib.webfontAvailable = function(family) { 
	lib.properties.webfonts[family] = true;
	var txtFilters = lib.webFontTxtFilters && lib.webFontTxtFilters[family] || [];
	for(var f = 0; f < txtFilters.length; ++f) {
		txtFilters[f].updateCache();
	}
};
// symbols:



(lib.Mesh = function() {
	this.spriteSheet = ss["Winter_atlas_"];
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Mesh_0 = function() {
	this.spriteSheet = ss["Winter_atlas_"];
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.raindrop_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#10B9D4").s().p("AgDCPQgCgCAEiOIABiPQAGEcgDADQAAABAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQAAAAAAAAQAAAAAAAAQgBAAAAgBQgBAAgBgBg");
	this.shape.setTransform(0.5,14.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1,29.2);


(lib.raindrop = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#095764").s().p("AgDCPQgCgCAEiOIABiPQAGEcgDADQAAABAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQAAAAAAAAQAAAAAAAAQgBAAAAgBQgBAAgBgBg");
	this.shape.setTransform(0.5,14.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1,29.2);


(lib.rain_drop2_ani = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#095764").s().p("AAAAKQgEgKgKgGIABgBIABgBQAKADACAFIABAAIADABQADgGAHgFQAEAGgIAHIgFAFIgCACIgBAAQgBAAAAAAQAAAAAAAAQAAAAAAAAQAAAAAAgBIAAAAIgBABIAAABIAAgBg");
	this.shape.setTransform(0.1,110.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#095764").s().p("AgXAIIAAAAQALAEgJABIgBAAQgFAAAEgFgAAQAMQAAgDADgCIADgBQAJAEgMADIgBAAIgCgBgAgFALQAAgBAAAAQABgBAAAAQAAAAABAAQAAAAAAAAQABABABAAQAAABAAABQAAAAAAAAQAAABAAAAIgEgCgAAGgKQABgBAAAAQAAgBAAAAQABAAAAAAQAAAAABAAQABABAAAAQAAABABABQAAAAAAAAQAAABgBAAIgEgCg");
	this.shape_1.setTransform(0.1,107.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#095764").s().p("AAhABIAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABIAAABIgBAAQgBAAgBAAQAAgBAAAAQgBAAAAgBQAAgBABAAgAghgDQAAABABAAQAAAAAAABQAAAAAAABQAAAAgBAAIAAAAQgBAAgBAAQAAAAAAgBQAAAAAAgBQABAAABgBg");
	this.shape_2.setTransform(-0.1,108.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},6).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[]},1).wait(1));

	// Layer 1
	this.instance = new lib.raindrop();
	this.instance.setTransform(0,26.1,1,1,0,0,0,0.3,29.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:0.3,y:111.2},5).to({scaleY:0.02},3).to({_off:true},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.3,-3.1,1,29.2);


(lib.rain_drop_ani = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0C889C").s().p("AAAAKQgEgKgKgGIABgBIABgBQAKADACAFIABAAIADABQADgGAHgFQAEAGgIAHIgFAFIgCACIgBAAQgBAAAAAAQAAAAAAAAQAAAAAAAAQAAAAAAgBIAAAAIgBABIAAABIAAgBg");
	this.shape.setTransform(0.1,110.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0C889C").s().p("AgXAIIAAAAQALAEgJABIgBAAQgFAAAEgFgAAQAMQAAgDADgCIADgBQAJAEgMADIgBAAIgCgBgAgFALQAAgBAAAAQABgBAAAAQAAAAABAAQAAAAAAAAQABABABAAQAAABAAABQAAAAAAAAQAAABAAAAIgEgCgAAGgKQABgBAAAAQAAgBAAAAQABAAAAAAQAAAAABAAQABABAAAAQAAABABABQAAAAAAAAQAAABgBAAIgEgCg");
	this.shape_1.setTransform(0.1,107.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0C889C").s().p("AAhABIAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABIAAABIgBAAQgBAAgBAAQAAgBAAAAQgBAAAAgBQAAgBABAAgAghgDQAAABABAAQAAAAAAABQAAAAAAABQAAAAgBAAIAAAAQgBAAgBAAQAAAAAAgBQAAAAAAgBQABAAABgBg");
	this.shape_2.setTransform(-0.1,108.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},6).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[]},1).wait(1));

	// Layer 1
	this.instance = new lib.raindrop_2();
	this.instance.setTransform(0,26.1,1,1,0,0,0,0.3,29.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:0.3,y:111.2},5).to({scaleY:0.02},3).to({_off:true},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.3,-3.1,1,29.2);


(lib.rain_ani_front = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// rain_drop_ani
	this.instance = new lib.rain_drop_ani("synched",2);
	this.instance.setTransform(462.4,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20));

	// rain_drop_ani
	this.instance_1 = new lib.rain_drop_ani("synched",9);
	this.instance_1.setTransform(458.3,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(20));

	// rain_drop_ani
	this.instance_2 = new lib.rain_drop_ani("synched",4);
	this.instance_2.setTransform(454.2,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(20));

	// rain_drop_ani
	this.instance_3 = new lib.rain_drop_ani("synched",6);
	this.instance_3.setTransform(450.1,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(20));

	// rain_drop2_ani
	this.instance_4 = new lib.rain_drop2_ani("synched",0);
	this.instance_4.setTransform(446,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(20));

	// rain_drop_ani
	this.instance_5 = new lib.rain_drop_ani("synched",3);
	this.instance_5.setTransform(437.8,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(20));

	// rain_drop_ani
	this.instance_6 = new lib.rain_drop_ani("synched",7);
	this.instance_6.setTransform(433.7,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(20));

	// rain_drop_ani
	this.instance_7 = new lib.rain_drop_ani("synched",0);
	this.instance_7.setTransform(429.6,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(20));

	// rain_drop2_ani
	this.instance_8 = new lib.rain_drop2_ani("synched",8);
	this.instance_8.setTransform(425.5,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(20));

	// rain_drop_ani
	this.instance_9 = new lib.rain_drop_ani("synched",9);
	this.instance_9.setTransform(421.4,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(20));

	// rain_drop_ani
	this.instance_10 = new lib.rain_drop_ani("synched",5);
	this.instance_10.setTransform(417.3,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(20));

	// rain_drop_ani
	this.instance_11 = new lib.rain_drop_ani("synched",8);
	this.instance_11.setTransform(413.2,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(20));

	// rain_drop_ani
	this.instance_12 = new lib.rain_drop_ani("synched",0);
	this.instance_12.setTransform(409.1,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(20));

	// rain_drop_ani
	this.instance_13 = new lib.rain_drop_ani("synched",9);
	this.instance_13.setTransform(405,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(20));

	// rain_drop_ani
	this.instance_14 = new lib.rain_drop_ani("synched",0);
	this.instance_14.setTransform(400.9,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(20));

	// rain_drop_ani
	this.instance_15 = new lib.rain_drop_ani("synched",9);
	this.instance_15.setTransform(396.8,30.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(20));

	// rain_drop_ani
	this.instance_16 = new lib.rain_drop_ani("synched",4);
	this.instance_16.setTransform(392.7,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(20));

	// rain_drop_ani
	this.instance_17 = new lib.rain_drop_ani("synched",2);
	this.instance_17.setTransform(388.6,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(20));

	// rain_drop_ani
	this.instance_18 = new lib.rain_drop_ani("synched",6);
	this.instance_18.setTransform(384.5,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(20));

	// rain_drop_ani
	this.instance_19 = new lib.rain_drop_ani("synched",2);
	this.instance_19.setTransform(380.4,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(20));

	// rain_drop2_ani
	this.instance_20 = new lib.rain_drop2_ani("synched",0);
	this.instance_20.setTransform(376.3,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(20));

	// rain_drop_ani
	this.instance_21 = new lib.rain_drop_ani("synched",8);
	this.instance_21.setTransform(372.2,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(20));

	// rain_drop_ani
	this.instance_22 = new lib.rain_drop_ani("synched",9);
	this.instance_22.setTransform(368.1,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(20));

	// rain_drop_ani
	this.instance_23 = new lib.rain_drop_ani("synched",0);
	this.instance_23.setTransform(364,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(20));

	// rain_drop_ani
	this.instance_24 = new lib.rain_drop_ani("synched",7);
	this.instance_24.setTransform(359.9,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(20));

	// rain_drop_ani
	this.instance_25 = new lib.rain_drop_ani("synched",9);
	this.instance_25.setTransform(355.8,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(20));

	// rain_drop2_ani
	this.instance_26 = new lib.rain_drop2_ani("synched",3);
	this.instance_26.setTransform(351.7,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(20));

	// rain_drop_ani
	this.instance_27 = new lib.rain_drop_ani("synched",9);
	this.instance_27.setTransform(347.6,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(20));

	// rain_drop_ani
	this.instance_28 = new lib.rain_drop_ani("synched",8);
	this.instance_28.setTransform(343.5,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(20));

	// rain_drop_ani
	this.instance_29 = new lib.rain_drop_ani("synched",2);
	this.instance_29.setTransform(339.4,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(20));

	// rain_drop2_ani
	this.instance_30 = new lib.rain_drop2_ani("synched",7);
	this.instance_30.setTransform(335.3,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(20));

	// rain_drop_ani
	this.instance_31 = new lib.rain_drop_ani("synched",0);
	this.instance_31.setTransform(331.2,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(20));

	// rain_drop_ani
	this.instance_32 = new lib.rain_drop_ani("synched",9);
	this.instance_32.setTransform(327.1,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(20));

	// rain_drop_ani
	this.instance_33 = new lib.rain_drop_ani("synched",3);
	this.instance_33.setTransform(323,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(20));

	// rain_drop2_ani
	this.instance_34 = new lib.rain_drop2_ani("synched",7);
	this.instance_34.setTransform(318.9,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(20));

	// rain_drop_ani
	this.instance_35 = new lib.rain_drop_ani("synched",0);
	this.instance_35.setTransform(314.8,28.5,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(20));

	// rain_drop_ani
	this.instance_36 = new lib.rain_drop_ani("synched",7);
	this.instance_36.setTransform(310.7,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(20));

	// rain_drop_ani
	this.instance_37 = new lib.rain_drop_ani("synched",3);
	this.instance_37.setTransform(306.6,28.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(20));

	// rain_drop_ani
	this.instance_38 = new lib.rain_drop_ani("synched",8);
	this.instance_38.setTransform(302.5,28.1,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(20));

	// rain_drop_ani
	this.instance_39 = new lib.rain_drop_ani("synched",4);
	this.instance_39.setTransform(298.4,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(20));

	// rain_drop_ani
	this.instance_40 = new lib.rain_drop_ani("synched",0);
	this.instance_40.setTransform(294.3,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(20));

	// rain_drop_ani
	this.instance_41 = new lib.rain_drop_ani("synched",2);
	this.instance_41.setTransform(290.2,28.5,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(20));

	// rain_drop_ani
	this.instance_42 = new lib.rain_drop_ani("synched",0);
	this.instance_42.setTransform(286.1,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_42).wait(20));

	// rain_drop_ani
	this.instance_43 = new lib.rain_drop_ani("synched",5);
	this.instance_43.setTransform(282,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(20));

	// rain_drop_ani
	this.instance_44 = new lib.rain_drop_ani("synched",1);
	this.instance_44.setTransform(277.9,28.1,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(20));

	// rain_drop2_ani
	this.instance_45 = new lib.rain_drop2_ani("synched",0);
	this.instance_45.setTransform(270.2,28.5,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(20));

	// rain_drop_ani
	this.instance_46 = new lib.rain_drop_ani("synched",4);
	this.instance_46.setTransform(269.7,28.5,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_46).wait(20));

	// rain_drop_ani
	this.instance_47 = new lib.rain_drop_ani("synched",0);
	this.instance_47.setTransform(265.6,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(20));

	// rain_drop_ani
	this.instance_48 = new lib.rain_drop_ani("synched",8);
	this.instance_48.setTransform(261.5,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(20));

	// rain_drop_ani
	this.instance_49 = new lib.rain_drop_ani("synched",1);
	this.instance_49.setTransform(257.4,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_49).wait(20));

	// rain_drop_ani
	this.instance_50 = new lib.rain_drop_ani("synched",0);
	this.instance_50.setTransform(253.3,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_50).wait(20));

	// rain_drop2_ani
	this.instance_51 = new lib.rain_drop2_ani("synched",7);
	this.instance_51.setTransform(249.2,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_51).wait(20));

	// rain_drop_ani
	this.instance_52 = new lib.rain_drop_ani("synched",3);
	this.instance_52.setTransform(245.1,29.7,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_52).wait(20));

	// rain_drop_ani
	this.instance_53 = new lib.rain_drop_ani("synched",3);
	this.instance_53.setTransform(241,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_53).wait(20));

	// rain_drop_ani
	this.instance_54 = new lib.rain_drop_ani("synched",8);
	this.instance_54.setTransform(236.9,43.3,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_54).wait(20));

	// rain_drop_ani
	this.instance_55 = new lib.rain_drop_ani("synched",6);
	this.instance_55.setTransform(232.8,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_55).wait(20));

	// rain_drop_ani
	this.instance_56 = new lib.rain_drop_ani("synched",3);
	this.instance_56.setTransform(229.5,30.5,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_56).wait(20));

	// rain_drop_ani
	this.instance_57 = new lib.rain_drop_ani("synched",9);
	this.instance_57.setTransform(224.6,28.1,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_57).wait(20));

	// rain_drop_ani
	this.instance_58 = new lib.rain_drop_ani("synched",7);
	this.instance_58.setTransform(220.5,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_58).wait(20));

	// rain_drop2_ani
	this.instance_59 = new lib.rain_drop2_ani("synched",0);
	this.instance_59.setTransform(216.4,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_59).wait(20));

	// rain_drop_ani
	this.instance_60 = new lib.rain_drop_ani("synched",9);
	this.instance_60.setTransform(212.3,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_60).wait(20));

	// rain_drop_ani
	this.instance_61 = new lib.rain_drop_ani("synched",4);
	this.instance_61.setTransform(208.2,32.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_61).wait(20));

	// rain_drop_ani
	this.instance_62 = new lib.rain_drop_ani("synched",0);
	this.instance_62.setTransform(204.1,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_62).wait(20));

	// rain_drop_ani
	this.instance_63 = new lib.rain_drop_ani("synched",7);
	this.instance_63.setTransform(200,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_63).wait(20));

	// rain_drop_ani
	this.instance_64 = new lib.rain_drop_ani("synched",1);
	this.instance_64.setTransform(195.9,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_64).wait(20));

	// rain_drop_ani
	this.instance_65 = new lib.rain_drop_ani("synched",5);
	this.instance_65.setTransform(191.8,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_65).wait(20));

	// rain_drop2_ani
	this.instance_66 = new lib.rain_drop2_ani("synched",8);
	this.instance_66.setTransform(187.7,28.1,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_66).wait(20));

	// rain_drop_ani
	this.instance_67 = new lib.rain_drop_ani("synched",2);
	this.instance_67.setTransform(183.6,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_67).wait(20));

	// rain_drop_ani
	this.instance_68 = new lib.rain_drop_ani("synched",7);
	this.instance_68.setTransform(179.5,45.3,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_68).wait(20));

	// rain_drop_ani
	this.instance_69 = new lib.rain_drop_ani("synched",8);
	this.instance_69.setTransform(175.4,27.7,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_69).wait(20));

	// rain_drop_ani
	this.instance_70 = new lib.rain_drop_ani("synched",3);
	this.instance_70.setTransform(171.3,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_70).wait(20));

	// rain_drop_ani
	this.instance_71 = new lib.rain_drop_ani("synched",0);
	this.instance_71.setTransform(167.2,28.1,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_71).wait(20));

	// rain_drop2_ani
	this.instance_72 = new lib.rain_drop2_ani("synched",7);
	this.instance_72.setTransform(163.1,28.1,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_72).wait(20));

	// rain_drop_ani
	this.instance_73 = new lib.rain_drop_ani("synched",5);
	this.instance_73.setTransform(159,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_73).wait(20));

	// rain_drop_ani
	this.instance_74 = new lib.rain_drop_ani("synched",0);
	this.instance_74.setTransform(154.9,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_74).wait(20));

	// rain_drop_ani
	this.instance_75 = new lib.rain_drop_ani("synched",7);
	this.instance_75.setTransform(149.2,27.7,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_75).wait(20));

	// rain_drop_ani
	this.instance_76 = new lib.rain_drop_ani("synched",1);
	this.instance_76.setTransform(146.7,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_76).wait(20));

	// rain_drop2_ani
	this.instance_77 = new lib.rain_drop2_ani("synched",8);
	this.instance_77.setTransform(142.6,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_77).wait(20));

	// rain_drop_ani
	this.instance_78 = new lib.rain_drop_ani("synched",6);
	this.instance_78.setTransform(140.1,28.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_78).wait(20));

	// rain_drop_ani
	this.instance_79 = new lib.rain_drop_ani("synched",1);
	this.instance_79.setTransform(134.4,28.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_79).wait(20));

	// rain_drop_ani
	this.instance_80 = new lib.rain_drop_ani("synched",3);
	this.instance_80.setTransform(130.3,28.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_80).wait(20));

	// rain_drop_ani
	this.instance_81 = new lib.rain_drop_ani("synched",8);
	this.instance_81.setTransform(127.8,29.7,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_81).wait(20));

	// rain_drop_ani
	this.instance_82 = new lib.rain_drop_ani("synched",6);
	this.instance_82.setTransform(122.1,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_82).wait(20));

	// rain_drop_ani
	this.instance_83 = new lib.rain_drop_ani("synched",0);
	this.instance_83.setTransform(118,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_83).wait(20));

	// rain_drop_ani
	this.instance_84 = new lib.rain_drop_ani("synched",8);
	this.instance_84.setTransform(113.9,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_84).wait(20));

	// rain_drop2_ani
	this.instance_85 = new lib.rain_drop2_ani("synched",1);
	this.instance_85.setTransform(109.8,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_85).wait(20));

	// rain_drop_ani
	this.instance_86 = new lib.rain_drop_ani("synched",9);
	this.instance_86.setTransform(105.7,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_86).wait(20));

	// rain_drop_ani
	this.instance_87 = new lib.rain_drop_ani("synched",0);
	this.instance_87.setTransform(101.6,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_87).wait(20));

	// rain_drop_ani
	this.instance_88 = new lib.rain_drop_ani("synched",6);
	this.instance_88.setTransform(97.5,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_88).wait(20));

	// rain_drop2_ani
	this.instance_89 = new lib.rain_drop2_ani("synched",4);
	this.instance_89.setTransform(93.4,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_89).wait(20));

	// rain_drop_ani
	this.instance_90 = new lib.rain_drop_ani("synched",0);
	this.instance_90.setTransform(89.3,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_90).wait(20));

	// rain_drop_ani
	this.instance_91 = new lib.rain_drop_ani("synched",8);
	this.instance_91.setTransform(85.2,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_91).wait(20));

	// rain_drop_ani
	this.instance_92 = new lib.rain_drop_ani("synched",9);
	this.instance_92.setTransform(81.1,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_92).wait(20));

	// rain_drop_ani
	this.instance_93 = new lib.rain_drop_ani("synched",6);
	this.instance_93.setTransform(77,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_93).wait(20));

	// rain_drop_ani
	this.instance_94 = new lib.rain_drop_ani("synched",1);
	this.instance_94.setTransform(72.9,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_94).wait(20));

	// rain_drop_ani
	this.instance_95 = new lib.rain_drop_ani("synched",5);
	this.instance_95.setTransform(68.8,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_95).wait(20));

	// rain_drop2_ani
	this.instance_96 = new lib.rain_drop2_ani("synched",3);
	this.instance_96.setTransform(64.7,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_96).wait(20));

	// rain_drop_ani
	this.instance_97 = new lib.rain_drop_ani("synched",8);
	this.instance_97.setTransform(60.6,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_97).wait(20));

	// rain_drop_ani
	this.instance_98 = new lib.rain_drop_ani("synched",6);
	this.instance_98.setTransform(56.5,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_98).wait(20));

	// rain_drop_ani
	this.instance_99 = new lib.rain_drop_ani("synched",0);
	this.instance_99.setTransform(52.4,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_99).wait(20));

	// rain_drop_ani
	this.instance_100 = new lib.rain_drop_ani("synched",6);
	this.instance_100.setTransform(48.3,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_100).wait(20));

	// rain_drop_ani
	this.instance_101 = new lib.rain_drop_ani("synched",1);
	this.instance_101.setTransform(44.2,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_101).wait(20));

	// rain_drop2_ani
	this.instance_102 = new lib.rain_drop2_ani("synched",9);
	this.instance_102.setTransform(40.1,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_102).wait(20));

	// rain_drop_ani
	this.instance_103 = new lib.rain_drop_ani("synched",8);
	this.instance_103.setTransform(36,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_103).wait(20));

	// rain_drop_ani
	this.instance_104 = new lib.rain_drop_ani("synched",7);
	this.instance_104.setTransform(31.9,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_104).wait(20));

	// rain_drop_ani
	this.instance_105 = new lib.rain_drop_ani("synched",1);
	this.instance_105.setTransform(27.8,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_105).wait(20));

	// rain_drop_ani
	this.instance_106 = new lib.rain_drop_ani("synched",3);
	this.instance_106.setTransform(23.7,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_106).wait(20));

	// rain_drop_ani
	this.instance_107 = new lib.rain_drop_ani("synched",0);
	this.instance_107.setTransform(19.6,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_107).wait(20));

	// rain_drop_ani
	this.instance_108 = new lib.rain_drop_ani("synched",9);
	this.instance_108.setTransform(15.5,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_108).wait(20));

	// rain_drop2_ani
	this.instance_109 = new lib.rain_drop2_ani("synched",5);
	this.instance_109.setTransform(11.4,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_109).wait(20));

	// rain_drop_ani
	this.instance_110 = new lib.rain_drop_ani("synched",2);
	this.instance_110.setTransform(7.3,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_110).wait(20));

	// rain_drop_ani
	this.instance_111 = new lib.rain_drop_ani("synched",1);
	this.instance_111.setTransform(3.2,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_111).wait(20));

	// rain_drop_ani
	this.instance_112 = new lib.rain_drop_ani("synched",7);
	this.instance_112.setTransform(-0.9,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_112).wait(20));

	// rain_drop_ani
	this.instance_113 = new lib.rain_drop_ani("synched",8);
	this.instance_113.setTransform(-5,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_113).wait(20));

	// rain_drop2_ani
	this.instance_114 = new lib.rain_drop2_ani("synched",4);
	this.instance_114.setTransform(-9.1,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_114).wait(20));

	// rain_drop_ani
	this.instance_115 = new lib.rain_drop_ani("synched",9);
	this.instance_115.setTransform(-13.2,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_115).wait(20));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,10.4,472.4,131.5);


(lib.rain_ani = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// rain_drop_ani
	this.instance = new lib.rain_drop_ani("synched",2);
	this.instance.setTransform(462.4,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20));

	// rain_drop_ani
	this.instance_1 = new lib.rain_drop_ani("synched",9);
	this.instance_1.setTransform(458.3,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(20));

	// rain_drop_ani
	this.instance_2 = new lib.rain_drop_ani("synched",4);
	this.instance_2.setTransform(454.2,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(20));

	// rain_drop_ani
	this.instance_3 = new lib.rain_drop_ani("synched",6);
	this.instance_3.setTransform(450.1,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(20));

	// rain_drop2_ani
	this.instance_4 = new lib.rain_drop2_ani("synched",0);
	this.instance_4.setTransform(446,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(20));

	// rain_drop_ani
	this.instance_5 = new lib.rain_drop_ani("synched",3);
	this.instance_5.setTransform(437.8,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(20));

	// rain_drop_ani
	this.instance_6 = new lib.rain_drop_ani("synched",7);
	this.instance_6.setTransform(433.7,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(20));

	// rain_drop_ani
	this.instance_7 = new lib.rain_drop_ani("synched",0);
	this.instance_7.setTransform(429.6,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(20));

	// rain_drop2_ani
	this.instance_8 = new lib.rain_drop2_ani("synched",8);
	this.instance_8.setTransform(425.5,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(20));

	// rain_drop_ani
	this.instance_9 = new lib.rain_drop_ani("synched",9);
	this.instance_9.setTransform(421.4,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(20));

	// rain_drop_ani
	this.instance_10 = new lib.rain_drop_ani("synched",5);
	this.instance_10.setTransform(417.3,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(20));

	// rain_drop_ani
	this.instance_11 = new lib.rain_drop_ani("synched",8);
	this.instance_11.setTransform(413.2,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(20));

	// rain_drop_ani
	this.instance_12 = new lib.rain_drop_ani("synched",0);
	this.instance_12.setTransform(409.1,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(20));

	// rain_drop_ani
	this.instance_13 = new lib.rain_drop_ani("synched",9);
	this.instance_13.setTransform(405,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(20));

	// rain_drop_ani
	this.instance_14 = new lib.rain_drop_ani("synched",0);
	this.instance_14.setTransform(400.9,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(20));

	// rain_drop_ani
	this.instance_15 = new lib.rain_drop_ani("synched",9);
	this.instance_15.setTransform(396.8,30.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(20));

	// rain_drop_ani
	this.instance_16 = new lib.rain_drop_ani("synched",4);
	this.instance_16.setTransform(392.7,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(20));

	// rain_drop_ani
	this.instance_17 = new lib.rain_drop_ani("synched",2);
	this.instance_17.setTransform(388.6,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(20));

	// rain_drop_ani
	this.instance_18 = new lib.rain_drop_ani("synched",6);
	this.instance_18.setTransform(384.5,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(20));

	// rain_drop_ani
	this.instance_19 = new lib.rain_drop_ani("synched",2);
	this.instance_19.setTransform(380.4,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(20));

	// rain_drop2_ani
	this.instance_20 = new lib.rain_drop2_ani("synched",0);
	this.instance_20.setTransform(376.3,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(20));

	// rain_drop_ani
	this.instance_21 = new lib.rain_drop_ani("synched",8);
	this.instance_21.setTransform(372.2,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(20));

	// rain_drop_ani
	this.instance_22 = new lib.rain_drop_ani("synched",9);
	this.instance_22.setTransform(368.1,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(20));

	// rain_drop_ani
	this.instance_23 = new lib.rain_drop_ani("synched",0);
	this.instance_23.setTransform(364,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(20));

	// rain_drop_ani
	this.instance_24 = new lib.rain_drop_ani("synched",7);
	this.instance_24.setTransform(359.9,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(20));

	// rain_drop_ani
	this.instance_25 = new lib.rain_drop_ani("synched",9);
	this.instance_25.setTransform(355.8,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(20));

	// rain_drop2_ani
	this.instance_26 = new lib.rain_drop2_ani("synched",3);
	this.instance_26.setTransform(351.7,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(20));

	// rain_drop_ani
	this.instance_27 = new lib.rain_drop_ani("synched",9);
	this.instance_27.setTransform(347.6,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(20));

	// rain_drop_ani
	this.instance_28 = new lib.rain_drop_ani("synched",8);
	this.instance_28.setTransform(343.5,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(20));

	// rain_drop_ani
	this.instance_29 = new lib.rain_drop_ani("synched",2);
	this.instance_29.setTransform(339.4,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(20));

	// rain_drop2_ani
	this.instance_30 = new lib.rain_drop2_ani("synched",7);
	this.instance_30.setTransform(335.3,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(20));

	// rain_drop_ani
	this.instance_31 = new lib.rain_drop_ani("synched",0);
	this.instance_31.setTransform(331.2,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(20));

	// rain_drop_ani
	this.instance_32 = new lib.rain_drop_ani("synched",9);
	this.instance_32.setTransform(327.1,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(20));

	// rain_drop_ani
	this.instance_33 = new lib.rain_drop_ani("synched",3);
	this.instance_33.setTransform(323,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(20));

	// rain_drop2_ani
	this.instance_34 = new lib.rain_drop2_ani("synched",7);
	this.instance_34.setTransform(318.9,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(20));

	// rain_drop_ani
	this.instance_35 = new lib.rain_drop_ani("synched",0);
	this.instance_35.setTransform(314.8,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(20));

	// rain_drop_ani
	this.instance_36 = new lib.rain_drop_ani("synched",7);
	this.instance_36.setTransform(310.7,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(20));

	// rain_drop_ani
	this.instance_37 = new lib.rain_drop_ani("synched",3);
	this.instance_37.setTransform(306.6,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(20));

	// rain_drop_ani
	this.instance_38 = new lib.rain_drop_ani("synched",8);
	this.instance_38.setTransform(302.5,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(20));

	// rain_drop_ani
	this.instance_39 = new lib.rain_drop_ani("synched",4);
	this.instance_39.setTransform(298.4,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(20));

	// rain_drop_ani
	this.instance_40 = new lib.rain_drop_ani("synched",0);
	this.instance_40.setTransform(294.3,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(20));

	// rain_drop_ani
	this.instance_41 = new lib.rain_drop_ani("synched",2);
	this.instance_41.setTransform(290.2,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(20));

	// rain_drop_ani
	this.instance_42 = new lib.rain_drop_ani("synched",0);
	this.instance_42.setTransform(286.1,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_42).wait(20));

	// rain_drop_ani
	this.instance_43 = new lib.rain_drop_ani("synched",5);
	this.instance_43.setTransform(282,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(20));

	// rain_drop_ani
	this.instance_44 = new lib.rain_drop_ani("synched",1);
	this.instance_44.setTransform(277.9,30.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(20));

	// rain_drop2_ani
	this.instance_45 = new lib.rain_drop2_ani("synched",0);
	this.instance_45.setTransform(273.8,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(20));

	// rain_drop_ani
	this.instance_46 = new lib.rain_drop_ani("synched",4);
	this.instance_46.setTransform(269.7,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_46).wait(20));

	// rain_drop_ani
	this.instance_47 = new lib.rain_drop_ani("synched",0);
	this.instance_47.setTransform(265.6,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(20));

	// rain_drop_ani
	this.instance_48 = new lib.rain_drop_ani("synched",8);
	this.instance_48.setTransform(261.5,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(20));

	// rain_drop_ani
	this.instance_49 = new lib.rain_drop_ani("synched",1);
	this.instance_49.setTransform(257.4,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_49).wait(20));

	// rain_drop_ani
	this.instance_50 = new lib.rain_drop_ani("synched",0);
	this.instance_50.setTransform(253.3,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_50).wait(20));

	// rain_drop2_ani
	this.instance_51 = new lib.rain_drop2_ani("synched",7);
	this.instance_51.setTransform(249.2,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_51).wait(20));

	// rain_drop_ani
	this.instance_52 = new lib.rain_drop_ani("synched",3);
	this.instance_52.setTransform(245.1,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_52).wait(20));

	// rain_drop_ani
	this.instance_53 = new lib.rain_drop_ani("synched",3);
	this.instance_53.setTransform(241,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_53).wait(20));

	// rain_drop_ani
	this.instance_54 = new lib.rain_drop_ani("synched",8);
	this.instance_54.setTransform(236.9,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_54).wait(20));

	// rain_drop_ani
	this.instance_55 = new lib.rain_drop_ani("synched",6);
	this.instance_55.setTransform(232.8,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_55).wait(20));

	// rain_drop_ani
	this.instance_56 = new lib.rain_drop_ani("synched",3);
	this.instance_56.setTransform(228.7,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_56).wait(20));

	// rain_drop_ani
	this.instance_57 = new lib.rain_drop_ani("synched",9);
	this.instance_57.setTransform(224.6,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_57).wait(20));

	// rain_drop_ani
	this.instance_58 = new lib.rain_drop_ani("synched",7);
	this.instance_58.setTransform(220.5,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_58).wait(20));

	// rain_drop2_ani
	this.instance_59 = new lib.rain_drop2_ani("synched",0);
	this.instance_59.setTransform(216.4,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_59).wait(20));

	// rain_drop_ani
	this.instance_60 = new lib.rain_drop_ani("synched",9);
	this.instance_60.setTransform(212.3,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_60).wait(20));

	// rain_drop_ani
	this.instance_61 = new lib.rain_drop_ani("synched",4);
	this.instance_61.setTransform(208.2,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_61).wait(20));

	// rain_drop_ani
	this.instance_62 = new lib.rain_drop_ani("synched",0);
	this.instance_62.setTransform(204.1,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_62).wait(20));

	// rain_drop_ani
	this.instance_63 = new lib.rain_drop_ani("synched",7);
	this.instance_63.setTransform(200,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_63).wait(20));

	// rain_drop_ani
	this.instance_64 = new lib.rain_drop_ani("synched",1);
	this.instance_64.setTransform(195.9,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_64).wait(20));

	// rain_drop_ani
	this.instance_65 = new lib.rain_drop_ani("synched",5);
	this.instance_65.setTransform(191.8,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_65).wait(20));

	// rain_drop2_ani
	this.instance_66 = new lib.rain_drop2_ani("synched",8);
	this.instance_66.setTransform(187.7,30.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_66).wait(20));

	// rain_drop_ani
	this.instance_67 = new lib.rain_drop_ani("synched",2);
	this.instance_67.setTransform(183.6,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_67).wait(20));

	// rain_drop_ani
	this.instance_68 = new lib.rain_drop_ani("synched",7);
	this.instance_68.setTransform(179.5,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_68).wait(20));

	// rain_drop_ani
	this.instance_69 = new lib.rain_drop_ani("synched",8);
	this.instance_69.setTransform(175.4,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_69).wait(20));

	// rain_drop_ani
	this.instance_70 = new lib.rain_drop_ani("synched",3);
	this.instance_70.setTransform(171.3,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_70).wait(20));

	// rain_drop_ani
	this.instance_71 = new lib.rain_drop_ani("synched",0);
	this.instance_71.setTransform(167.2,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_71).wait(20));

	// rain_drop2_ani
	this.instance_72 = new lib.rain_drop2_ani("synched",7);
	this.instance_72.setTransform(163.1,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_72).wait(20));

	// rain_drop_ani
	this.instance_73 = new lib.rain_drop_ani("synched",5);
	this.instance_73.setTransform(159,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_73).wait(20));

	// rain_drop_ani
	this.instance_74 = new lib.rain_drop_ani("synched",0);
	this.instance_74.setTransform(154.9,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_74).wait(20));

	// rain_drop_ani
	this.instance_75 = new lib.rain_drop_ani("synched",7);
	this.instance_75.setTransform(150.8,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_75).wait(20));

	// rain_drop_ani
	this.instance_76 = new lib.rain_drop_ani("synched",1);
	this.instance_76.setTransform(146.7,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_76).wait(20));

	// rain_drop2_ani
	this.instance_77 = new lib.rain_drop2_ani("synched",8);
	this.instance_77.setTransform(142.6,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_77).wait(20));

	// rain_drop_ani
	this.instance_78 = new lib.rain_drop_ani("synched",6);
	this.instance_78.setTransform(138.5,30.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_78).wait(20));

	// rain_drop_ani
	this.instance_79 = new lib.rain_drop_ani("synched",1);
	this.instance_79.setTransform(134.4,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_79).wait(20));

	// rain_drop_ani
	this.instance_80 = new lib.rain_drop_ani("synched",3);
	this.instance_80.setTransform(130.3,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_80).wait(20));

	// rain_drop_ani
	this.instance_81 = new lib.rain_drop_ani("synched",8);
	this.instance_81.setTransform(126.2,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_81).wait(20));

	// rain_drop_ani
	this.instance_82 = new lib.rain_drop_ani("synched",6);
	this.instance_82.setTransform(122.1,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_82).wait(20));

	// rain_drop_ani
	this.instance_83 = new lib.rain_drop_ani("synched",0);
	this.instance_83.setTransform(118,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_83).wait(20));

	// rain_drop_ani
	this.instance_84 = new lib.rain_drop_ani("synched",8);
	this.instance_84.setTransform(113.9,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_84).wait(20));

	// rain_drop2_ani
	this.instance_85 = new lib.rain_drop2_ani("synched",1);
	this.instance_85.setTransform(109.8,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_85).wait(20));

	// rain_drop_ani
	this.instance_86 = new lib.rain_drop_ani("synched",9);
	this.instance_86.setTransform(105.7,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_86).wait(20));

	// rain_drop_ani
	this.instance_87 = new lib.rain_drop_ani("synched",0);
	this.instance_87.setTransform(101.6,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_87).wait(20));

	// rain_drop_ani
	this.instance_88 = new lib.rain_drop_ani("synched",6);
	this.instance_88.setTransform(97.5,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_88).wait(20));

	// rain_drop2_ani
	this.instance_89 = new lib.rain_drop2_ani("synched",4);
	this.instance_89.setTransform(93.4,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_89).wait(20));

	// rain_drop_ani
	this.instance_90 = new lib.rain_drop_ani("synched",0);
	this.instance_90.setTransform(89.3,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_90).wait(20));

	// rain_drop_ani
	this.instance_91 = new lib.rain_drop_ani("synched",8);
	this.instance_91.setTransform(85.2,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_91).wait(20));

	// rain_drop_ani
	this.instance_92 = new lib.rain_drop_ani("synched",9);
	this.instance_92.setTransform(81.1,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_92).wait(20));

	// rain_drop_ani
	this.instance_93 = new lib.rain_drop_ani("synched",6);
	this.instance_93.setTransform(77,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_93).wait(20));

	// rain_drop_ani
	this.instance_94 = new lib.rain_drop_ani("synched",1);
	this.instance_94.setTransform(72.9,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_94).wait(20));

	// rain_drop_ani
	this.instance_95 = new lib.rain_drop_ani("synched",5);
	this.instance_95.setTransform(68.8,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_95).wait(20));

	// rain_drop2_ani
	this.instance_96 = new lib.rain_drop2_ani("synched",3);
	this.instance_96.setTransform(64.7,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_96).wait(20));

	// rain_drop_ani
	this.instance_97 = new lib.rain_drop_ani("synched",8);
	this.instance_97.setTransform(60.6,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_97).wait(20));

	// rain_drop_ani
	this.instance_98 = new lib.rain_drop_ani("synched",6);
	this.instance_98.setTransform(56.5,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_98).wait(20));

	// rain_drop_ani
	this.instance_99 = new lib.rain_drop_ani("synched",0);
	this.instance_99.setTransform(52.4,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_99).wait(20));

	// rain_drop_ani
	this.instance_100 = new lib.rain_drop_ani("synched",6);
	this.instance_100.setTransform(48.3,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_100).wait(20));

	// rain_drop_ani
	this.instance_101 = new lib.rain_drop_ani("synched",1);
	this.instance_101.setTransform(44.2,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_101).wait(20));

	// rain_drop2_ani
	this.instance_102 = new lib.rain_drop2_ani("synched",9);
	this.instance_102.setTransform(40.1,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_102).wait(20));

	// rain_drop_ani
	this.instance_103 = new lib.rain_drop_ani("synched",8);
	this.instance_103.setTransform(36,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_103).wait(20));

	// rain_drop_ani
	this.instance_104 = new lib.rain_drop_ani("synched",7);
	this.instance_104.setTransform(31.9,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_104).wait(20));

	// rain_drop_ani
	this.instance_105 = new lib.rain_drop_ani("synched",1);
	this.instance_105.setTransform(27.8,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_105).wait(20));

	// rain_drop_ani
	this.instance_106 = new lib.rain_drop_ani("synched",3);
	this.instance_106.setTransform(23.7,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_106).wait(20));

	// rain_drop_ani
	this.instance_107 = new lib.rain_drop_ani("synched",0);
	this.instance_107.setTransform(19.6,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_107).wait(20));

	// rain_drop_ani
	this.instance_108 = new lib.rain_drop_ani("synched",9);
	this.instance_108.setTransform(15.5,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_108).wait(20));

	// rain_drop2_ani
	this.instance_109 = new lib.rain_drop2_ani("synched",5);
	this.instance_109.setTransform(11.4,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_109).wait(20));

	// rain_drop_ani
	this.instance_110 = new lib.rain_drop_ani("synched",2);
	this.instance_110.setTransform(7.3,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_110).wait(20));

	// rain_drop_ani
	this.instance_111 = new lib.rain_drop_ani("synched",1);
	this.instance_111.setTransform(3.2,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_111).wait(20));

	// rain_drop_ani
	this.instance_112 = new lib.rain_drop_ani("synched",7);
	this.instance_112.setTransform(-0.9,34.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_112).wait(20));

	// rain_drop_ani
	this.instance_113 = new lib.rain_drop_ani("synched",8);
	this.instance_113.setTransform(-5,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_113).wait(20));

	// rain_drop2_ani
	this.instance_114 = new lib.rain_drop2_ani("synched",4);
	this.instance_114.setTransform(-9.1,38.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_114).wait(20));

	// rain_drop_ani
	this.instance_115 = new lib.rain_drop_ani("synched",9);
	this.instance_115.setTransform(-13.2,42.9,1,1,0,0,0,0.3,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_115).wait(20));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,17.2,472.4,122.5);


// stage content:
(lib.Winter = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// clouds
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EgnDAImIAAxKMBOHAAAIAARKg");
	this.shape.setTransform(244,50.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.569)").s().p("EgnDAImIAAxKMBOHAAAIAARKg");
	this.shape_1.setTransform(244,50.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(255,255,255,0.498)").s().p("EgnDAImIAAxKMBOHAAAIAARKg");
	this.shape_2.setTransform(244,50.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(255,255,255,0.247)").s().p("EgnDAImIAAxKMBOHAAAIAARKg");
	this.shape_3.setTransform(244,50.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},33).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[]},1).to({state:[{t:this.shape}]},131).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[]},1).to({state:[{t:this.shape}]},137).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[]},1).wait(87));

	// rain front
	this.instance = new lib.rain_ani_front("synched",0);
	this.instance.setTransform(15.5,-36.4,1,1,0,0,0,0.3,21.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(400));

	// text
	this.text = new cjs.Text("1st JUNE - 31st AUGUST", "15px 'Sports World'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 19;
	this.text.setTransform(238,55);

	this.text_1 = new cjs.Text("WINTER SEASON", "30px 'Sports World'", "#3366FF");
	this.text_1.textAlign = "center";
	this.text_1.lineHeight = 36;
	this.text_1.lineWidth = 476;
	this.text_1.setTransform(236.4,21.9);

	this.text_2 = new cjs.Text("WINTER SEASON", "30px 'Sports World'", "#254ABB");
	this.text_2.textAlign = "center";
	this.text_2.lineHeight = 36;
	this.text_2.lineWidth = 476;
	this.text_2.setTransform(238,23);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.text_2},{t:this.text_1},{t:this.text}]}).wait(400));

	// Layer 7
	this.instance_1 = new lib.rain_ani("synched",0);
	this.instance_1.setTransform(463.9,-48,1,1,0,0,180,0.3,21.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(400));

	// Layer 3
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(12,136,156,0.898)").s().p("AW2BJQhAgHAUgXQAMgMAdgMIhjgGQhSgGgiAAQgiABhBgIQhPgIgBgOQAAgIEhgBQDQAAC0ACQC7AIg7AQQhjAPAHAFQAWAPAxADQAoAEB2gBQAzAAB0AFQBtAEBBASIjUAHQjRANjRgHQgbgBhhADIggAAQg2AAgugFgA67AnQjvgHjrggQhEgFgigGQg/gLAUgPQAFgDBGgGIBMgGQDqghDtAKQDoAeDuAUQAvAEAiAKQAwALgTAPQgFAFg2AEIg/ADQiqAOirAAQg8AAg8gCg");
	this.shape_4.setTransform(242.7,70.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(400));

	// Layer 1
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.lf(["#A02025","#A42526","#AF3429","#C24C2E","#DC6D36","#DD6E36","#C85330","#AE3229","#9F1E25","#991723"],[0,0.153,0.333,0.533,0.737,0.745,0.804,0.886,0.953,1],0,0.6,0,-0.6).s().p("AiDAGQgFAAAAgGQAAgFAFAAIEHAAQAFAAAAAFQAAAGgFAAg");
	this.shape_5.setTransform(244.7,23.9,0.367,0.367);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.lf(["#DD6E36","#D76734","#C85330","#AF3329","#991723"],[0,0.18,0.451,0.769,1],0,-0.5,0,0.6).s().p("AgGAFQgGAAAAgFQAAgEAGAAIAOAAQAFAAAAAEQAAAFgFAAg");
	this.shape_6.setTransform(248.9,24.2,0.367,0.367);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.lf(["#DD6E36","#D76734","#C85330","#AF3329","#991723"],[0,0.18,0.451,0.769,1],0,-0.5,0,0.6).s().p("AgGAFQgGAAAAgFQAAgEAGAAIAOAAQAFAAAAAEQAAAFgFAAg");
	this.shape_7.setTransform(247.5,24.2,0.367,0.367);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.lf(["#DD6E36","#D76734","#C85330","#AF3329","#991723"],[0,0.18,0.451,0.769,1],0,-0.5,0,0.6).s().p("AgHAFQgFAAAAgFQAAgEAFAAIAPAAQAFAAAAAEQAAAFgFAAg");
	this.shape_8.setTransform(246.2,24.2,0.367,0.367);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.lf(["#DD6E36","#D76734","#C85330","#AF3329","#991723"],[0,0.18,0.451,0.769,1],0,-0.5,0,0.6).s().p("AgHAFQgFAAAAgFQAAgEAFAAIAOAAQAGAAAAAEQAAAFgGAAg");
	this.shape_9.setTransform(244.8,24.2,0.367,0.367);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.lf(["#DD6E36","#D76734","#C85330","#AF3329","#991723"],[0,0.18,0.451,0.769,1],0,-0.5,0,0.6).s().p("AgHAFQgFAAAAgFQAAgEAFAAIAOAAQAGAAAAAEQAAAFgGAAg");
	this.shape_10.setTransform(243.2,24.2,0.367,0.367);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.lf(["#DD6E36","#D76734","#C85330","#AF3329","#991723"],[0,0.18,0.451,0.769,1],0,-0.5,0,0.6).s().p("AgHAFQgFAAAAgFQAAgEAFAAIAOAAQAGAAAAAEQAAAFgGAAg");
	this.shape_11.setTransform(241.9,24.2,0.367,0.367);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.lf(["#DD6E36","#D76734","#C85330","#AF3329","#991723"],[0,0.18,0.451,0.769,1],0,-0.5,0,0.6).s().p("AgHAFQgFAAAAgFQAAgEAFAAIAOAAQAGAAAAAEQAAAFgGAAg");
	this.shape_12.setTransform(240.5,24.2,0.367,0.367);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAiBdQgDAAgOgRIgBAAIgCgEQgNASgDABQgHgCgMgQIgBAAIgBgBQgNATgEABQgEgBgSgWIACgWIgBAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAIACgCIAAgSQAAg5gbgiIgcgYIAAgCIB5AAIABAAIABAAIBqABIgCACQgmAfgOA4IAAAAIgBAAQgHAdAAApIAAAGIgDADQgNAQgCAAgAAPBFQAQAVAEABQACAAAMgPIACgEIAAgEIAAgFQgIgEgMgJQgJAJgHAKgAg6AtIgCAXQARAVADAAQADAAALgQIAAAAIACgDIgZgggAgVBFQAOATAFAAQACAAAIgMIAEgGIAAAAIgQgVQgLAKgGAKgAgDAwIAQAUIABgBIAPgSIgHgHIgJgLgAgwAlIAZAfQAHgLAKgJIgWgagAAhAwIASAMQAAgPACgOQgMAJgIAIgAAOAfIAJAJIAIAHQAKgKAKgIIgPgPgAgaAVIAWAZIAPgQIgSgXgAg5AqIAGgFIgGgIgAg5AMIAAANIAIAKIAUgOIgPgSIgNAJgAgGAGIATAXIAVgRIgUgUgAAlAMIAQAQQABgMAEgQgAgqACIAPASIASgOIgNgQgAAQgJIAUAUIAVgNQgLgIgMgMgAg8gLIAAAAIADAVIALgIIgNgOgAgVgLIAOAPIAUgNIgNgQgAg5gMIANANIAUgMIgMgQQgNAMgIADgAAtggIgKAIQAHAHARAOQACgLAFgLIgBgBQgHgEgGgKIgHAIgAAFgdIgFADIAOAPIASgNIgIgKIgFgKQgFAJgJAGgAgigcIAMAQIAVgPIgPgRgAg8gRIACADQAHgDAOgMIgNgRQgHAKgIAHIAEAMIAAAAIABAAgAAVguIAFAKIAIAKIAKgIQAFgEACgEQgKgSAAgdIgMAAQADAZgLASgAA2gqQAGAKAGAFQAPgmAcgYIgtAAQAGAbgQAUgAgGhZIABAPQAAAPgBAEQgBADgHAGIAOASIAEgDQAIgFAGgKQgGgRgFgaIgNgBgAgxgwIAOASIASgQIgEgFQgFgJgBgPIAAgOIAAgBIgNAAQADAVgMAVgAhBgfQAJgJAEgIIgDgFQgEgHgDgeIgHAAIgBAKQgCALgHAJIAAAAQAIAMAGARgAA1gsQAPgVgGgYIgTAAQAAAbAKASgAgZhZIAAAOQABAOAFAJIADAFQAGgFACgEQADgGgEgbIABgBIgRAAgAAUgwQAKgSgDgXIgSAAQAEAVAHAUgAg1g2IADAEQAGgMACgNIAAgPIgSAAQACAbAFAJgAhQg+QAGgIACgLIABgJIgmAAQAQAJANATg");
	this.shape_13.setTransform(244.7,27.6,0.367,0.367);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.lf(["#DD6E36","#D76734","#C85330","#AF3329","#991723"],[0,0.18,0.451,0.769,1],0,2.1,0,-2).s().p("AgJAUQgEAAgDgDQgEgDABgFIAAgRQgBgEAEgEQADgDAEAAIASAAQAEAAAEADQADAEAAAEIAAARQAAAFgDADQgEADgEAAg");
	this.shape_14.setTransform(244.7,24.2,0.367,0.367);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#413F3D").ss(1.9,0,0,4).p("AB2BWIjrAAIAAirIDrAAg");
	this.shape_15.setTransform(244.7,20.9,0.367,0.367);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FBF4F3").s().p("AlfDDIAAmFIK/AAIAAGFg");
	this.shape_16.setTransform(244.7,18,0.367,0.367);

	this.instance_2 = new lib.Mesh_0();
	this.instance_2.setTransform(230.6,9.7,0.367,0.367);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#572E2E").s().p("AgTA/IAAh9IAnAAIAAB9g");
	this.shape_17.setTransform(244.7,28.3,0.367,0.367);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.lf(["#E4D7D3","#E2D5D1","#DBCFCB","#D0C5C0","#BFB6B1","#A9A29D","#A19B96"],[0,0.38,0.518,0.616,0.694,0.761,0.78],0,55.8,0,-55.7).s().p("AgTItIAAxZIAnAAIAARZg");
	this.shape_18.setTransform(244.7,46.5,0.367,0.367);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#160708").s().p("AkrAwIHph7IBuABIpQCWg");
	this.shape_19.setTransform(255.6,64.2,0.367,0.367);

	this.instance_3 = new lib.Mesh();
	this.instance_3.setTransform(-17.2,61.4,0.899,0.367);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.instance_2},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]}).wait(400));

	// Layer 9
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#FFFFFF").ss(3,1,1).p("AABgBIB0BAIA2hCICbAjIBVBHIAwhVIDXBmAC5hgIiLAiIhQApIAjAUAlbhoIApAnIAlhsIBYB0IAqBwIBEhhIAlAVACJGYIiXiCIBhgDIhkieIASh2AiCCwIg8hxIhZgiIgmgOIgeh3AjUCfIgwhrIgTgXAm0BnIg7g5IBEg8IhShgIBMhKIBWBQAl4D0IhHg4IALhVAl4CfIg8g4AqhmXIDwDf");
	this.shape_20.setTransform(62.3,16.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#FFFFFF").ss(2,1,1).p("AABgBIB0BAIA2hCICbAjIBVBHIAwhVIDXBmAC5hgIiLAiIhQApIAjAUAlbhoIApAnIAlhsIBYB0IAqBwIBEhhIAlAVACJGYIiXiCIBhgDIhkieIASh2AiCCwIg8hxIhZgiIgmgOIgeh3AjUCfIgwhrIgTgXAm0BnIg7g5IBEg8IhShgIBMhKIBWBQAl4D0IhHg4IALhVAl4CfIg8g4AqhmXIDwDf");
	this.shape_21.setTransform(62.3,16.3);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#FFFFFF").ss(1,1,1).p("AABgBIB0BAIA2hCICbAjIBVBHIAwhVIDXBmAC5hgIiLAiIhQApIAjAUAlbhoIApAnIAlhsIBYB0IAqBwIBEhhIAlAVACJGYIiXiCIBhgDIhkieIASh2AiCCwIg8hxIhZgiIgmgOIgeh3AjUCfIgwhrIgTgXAm0BnIg7g5IBEg8IhShgIBMhKIBWBQAl4D0IhHg4IALhVAl4CfIg8g4AqhmXIDwDf");
	this.shape_22.setTransform(62.3,16.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("rgba(255,255,255,0.498)").ss(1,1,1).p("AABgBIB0BAIA2hCICbAjIBVBHIAwhVIDXBmAC5hgIiLAiIhQApIAjAUAlbhoIApAnIAlhsIBYB0IAqBwIBEhhIAlAVACJGYIiXiCIBhgDIhkieIASh2AiCCwIg8hxIhZgiIgmgOIgeh3AjUCfIgwhrIgTgXAm0BnIg7g5IBEg8IhShgIBMhKIBWBQAl4D0IhHg4IALhVAl4CfIg8g4AqhmXIDwDf");
	this.shape_23.setTransform(62.3,16.3);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#FFFFFF").ss(2,1,1).p("AkYm9QAhAGA5AkIB0BTIggAZQgwAag+AKQjeAZgrArAHjASQidhNhhACQgyACgPAQQAJATBXB4QBWCAAWBPACkgnIiaCTQiEC9BnDRAAwiwQAcAkBYBlAAwiwQnXF1gFBPAhKlAQAvAvBLBhAgIn5QgRBbgxBeAE/l3IkPDH");
	this.shape_24.setTransform(287.4,34.2);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#FFFFFF").ss(1,1,1).p("AkYm9QAhAGA5AkIB0BTIggAZQgwAag+AKQjeAZgrArACkgnQAJATBXB4QBWCAAWBPAHjASQidhNhhACQgyACgPAQAAwiwQAcAkBYBlIiaCTQiEC9BnDRAAwiwQnXF1gFBPAhKlAQAvAvBLBhAgHn5QgSBbgxBeAE/l3IkPDH");
	this.shape_25.setTransform(287.4,34.2);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("rgba(255,255,255,0.498)").ss(1,1,1).p("AkYm9QAhAGA5AkIB0BTIggAZQgwAag+AKQjeAZgrArACkgnQAJATBXB4QBWCAAWBPAHjASQidhNhhACQgyACgPAQAAwiwQAcAkBYBlIiaCTQiEC9BnDRAAwiwQnXF1gFBPAhKlAQAvAvBLBhAgHn5QgSBbgxBeAE/l3IkPDH");
	this.shape_26.setTransform(287.4,34.2);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#FFFFFF").ss(3,1,1).p("ABaCFIgRAZIiBDHIiMArIhoCPAg6DLIAgglIBjgIAgVHoIAKg6IgchaACCGNIA8i9IhkhLAEWHdIgYjcIhAgxAEuoeIjwIdIBsAuIhQBYAjcFKIA4hcIBqgjAhuEJIA0g+");
	this.shape_27.setTransform(373.4,4.7);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#FFFFFF").ss(2,1,1).p("ABaCFIgRAZIiBDHIiMArIhoCPAg6DLIAgglIBjgIAgVHoIAKg6IgchaACCGNIA8i9IhkhLAEWHdIgYjcIhAgxAEuoeIjwIdIBsAuIhQBYAjcFKIA4hcIBqgjAhuEJIA0g+");
	this.shape_28.setTransform(373.4,4.7);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#FFFFFF").ss(1,1,1).p("ABaCFIgRAZIiBDHIiMArIhoCPAg6DLIAgglIBjgIAgVHoIAKg6IgchaACCGNIA8i9IhkhLAEWHdIgYjcIhAgxAEuoeIjwIdIBsAuIhQBYAjcFKIA4hcIBqgjAhuEJIA0g+");
	this.shape_29.setTransform(373.4,4.7);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("rgba(255,255,255,0.498)").ss(1,1,1).p("ABaCFIgRAZIiBDHIiMArIhoCPAg6DLIAgglIBjgIAgVHoIAKg6IgchaACCGNIA8i9IhkhLAEWHdIgYjcIhAgxAEuoeIjwIdIBsAuIhQBYAjcFKIA4hcIBqgjAhuEJIA0g+");
	this.shape_30.setTransform(373.4,4.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_20}]},33).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[]},1).to({state:[{t:this.shape_24}]},132).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[]},1).to({state:[{t:this.shape_27}]},137).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[]},1).wait(87));

	// bg
	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.lf(["#747474","#333333"],[0,1],0,15,0,-32).s().p("EglfAGjIAAtGMBK+AAAIAANGg");
	this.shape_31.setTransform(240,42);

	this.timeline.addTween(cjs.Tween.get(this.shape_31).wait(400));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(222.8,-10.7,524.8,194.6);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;