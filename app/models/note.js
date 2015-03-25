exports.definition = {
	config: {
		columns: {
		    "title": "text",
		    "description": "text",
		    "parent": "text",
		    "dateFrom": "text",
		    "dateTill": "text"
		},
		adapter: {
			type: "properties",
			collection_name: "note"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};