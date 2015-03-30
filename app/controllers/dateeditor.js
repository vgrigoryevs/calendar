var args = arguments[0] || {},
	today = new Date(),
	hours = args.hoursFrom || today.getHours(),
	parentId = args.parentId || today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();
Alloy.Collections.note.fetch();

function filterFunction(collection) {

 
	if(!collection.where({parent: parentId, hoursFrom: hours})[0]){//If it is new
		var note = Alloy.createModel('note', {
			"title": "",
		    "place": "",
		    "dateFrom": today.getDate(),
		    "hoursFrom": hours,
		    "hoursTill": today.getHours()+1,
		    "dateTill": today.getDate(),
		    "guests": "",
		    "description": "",
		    "color": "red",
		    "monthNumber": today.getMonth(),
		    "yearNumber": today.getFullYear(),
		    "parent": parentId
		});
		
		collection.add(note);
		return collection.where({parent: parentId, hoursFrom: hours});
	}
	
	else {
		return collection.where({parent: parentId, hoursFrom: hours});
	}

}





function saveBtnTap(event) {
	//If it is new note
	var date = $.fromTimeField.value,
		hoursFrom = date.getHours();
	hoursFrom = ("0" + hoursFrom).slice(-2);
	
	var date2 = $.tillTimeField.value,
		hoursTill = date2.getHours();
	hoursTill = ("0" + hoursTill).slice(-2);


	note.set("dateFrom", new Date(
		$.fromDateField.value.setHours($.fromTimeField.value.getHours())
	));
	note.set("hoursFrom", hoursFrom);
	note.set("dateTill", new Date(
		$.tillDateField.value.setHours($.tillTimeField.value.getHours())
	));
	note.set("hoursTill", hoursTill);

	note.set("monthNumber", $.fromDateField.value.getMonth());
	note.set("yearNumber", $.fromDateField.value.getFullYear());
	note.set("parent", $.fromDateField.value.getDate() + "." + ($.fromDateField.value.getMonth() + 1) + "." + $.fromDateField.value.getFullYear());
	
	console.log(note);
	Alloy.Collections.note.add(note);
	note.save();
	
	Alloy.Collections.note.fetch();
	$.dateeditor.close();
}

function titleChange(e){
	note.set("title", e.value);
}

function placeChange(e){
	note.set("place", e.value);
}

function guestsChange(e){
	note.set("guests", e.value);
}

function descriptionChange(e){
	note.set("description", e.value);
}

function colorChange(e){	
	switch (e.rowIndex) {
	  case 0:
	    $.colorField.backgroundColor="red";
	    note.set("color", "red");
	    break;
	  case 1:
	    $.colorField.backgroundColor="green";
	    note.set("color", "green");
	    break;
	  case 2:
	    $.colorField.backgroundColor="blue";
	    note.set("color", "blue");
	    break;
	  case 3:
	    $.colorField.backgroundColor="orange";
	    note.set("color", "orange");
	    break;
	  default:
	    
	}
}

