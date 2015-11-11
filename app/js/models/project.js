define([
	'underscore',
	'backbone'
],
function(_, Backbone) {

	var ProjectModel = Backbone.Model.extend({
		initialize: function(obj){
			this.id = obj.id;
			this.sequence = obj.sequence;
			this.label = obj.label.toUpperCase();
			this.desc = obj.desc.toUpperCase();
			this.img = obj.img;
			this.tags = obj.tags;
			this.detail = obj.detail;
		}
	});

	// Return the model for the module
	return ProjectModel;
});



/* SAMPLE DATA
	id: "visa"
	,sequence: 1
	,label: "VISA"
	,desc: "go.visa.com site"
	,img: "img/thumb_visa.jpg"
	,tags: ["flash", "akqa"]
	,detail:{
		desc: "content"
		,links:[{ label: "link1", path: "#"}, { label: "link2", path: "#"}]
		,vid: "Stylelist Redesign"
		,slate: "img/detail_aol_stylelist.jpg"
	}
*/