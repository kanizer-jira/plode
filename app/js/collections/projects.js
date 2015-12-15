define([
	'underscore',
	'backbone',
	'applogic',
	'models/project'
],
function(_, Backbone, APP, ProjectModel) {

	var ProjectCollection = Backbone.Collection.extend({
		model: ProjectModel
	    // ,sort_key: "sequence"
		,initialize: function(){
			var that = this;
			_.each(APP.data.projects, function(item, ind){
				var model = new ProjectModel(item, ind);
				that.add(model);
			})
		}

		// ,comparator: function(item){
		// 	return item.get(this.sort_key);
		// }

		// ,sortByField: function(fieldName) {
		// 	this.sort_key = fieldName;
		// 	this.sort();
		// }

	});

	// You don't usually return a collection instantiated
	return ProjectCollection;
});
