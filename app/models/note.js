exports.definition = {
	config: {
		columns: {
		    "title": "text",
		    "place": "text",
		    "dateFrom": "text",
		    "hoursFrom": "text",
		    "hoursTill": "text",
		    "dateTill": "text",
		    "guests": "text",
		    "description": "text",
		    "color": "text",
		    "monthNumber": "int",
		    "yearNumber": "int",
		    "parent": "text",
		    "unicId": "text"
		},
		adapter: {
			type: "sql",
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