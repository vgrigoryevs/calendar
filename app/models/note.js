exports.definition = {
	config: {
		columns: {
		    "title": "text",
		    "place": "text",
		    "dateFrom": "text",
		    "timeFrom": "text",
		    "dateTill": "text",
		    "timeTill": "text",
		    "guests": "text",
		    "description": "text",
		    "color": "integer",
		    "monthNumber": "integer",
		    "parent": "text",
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