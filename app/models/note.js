exports.definition = {
	config: {
		columns: {
		    "title": "text",
		    "description": "text",
		    "dateFrom": "text",
		    "dateTill": "text",
		    "parent": "text",
		    "guests": "text",
		    "color": "integer",
		    "monthNumber": "integer"
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