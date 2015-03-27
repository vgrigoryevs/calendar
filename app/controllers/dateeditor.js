var args = arguments[0] || {},
	hours = args.hoursFrom || "",
	parentId = args.parentId || "";
Alloy.Collections.note.fetch();

var note = Alloy.Models.note;

if(!Alloy.Collections.note.where({parent: parentId, hoursFrom: hours})[0]){//If it is new

}

else {

	
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
	note.set("parent", $.fromDateField.value.getDate() + "." + ($.fromDateField.value.getMonth() + 1) + "." + $.fromDateField.value.getFullYear());
	
	console.log(note);
	Alloy.Collections.note.add(note);
	note.save();
	
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



