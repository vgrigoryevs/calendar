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
			findByParentHoursFrom: function(parentId, hours){
				return Alloy.Collections.note.where({parent: parentId, hoursFrom: hours});
			},
			findByParent: function(parentId){
				return Alloy.Collections.note.where({parent: parentId});
			},
			findByUnicId: function(unic){
				return Alloy.Collections.note.where({unicId: unic});
			},
			findByMonthYear: function(month, year){
				return Alloy.Collections.note.where({monthNumber: month, yearNumber: year});
			},
		});

		return Collection;
	}
};