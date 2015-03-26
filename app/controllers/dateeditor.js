var args = arguments[0] || {};


Alloy.Collections.note.fetch();

function saveBtnTap(event) {
	//If it is new note
	var date = $.fromTimeField.value,
		hoursFrom = date.getHours();
	hoursFrom = ("0" + hoursFrom).slice(-2);
	
	var date2 = $.tillTimeField.value,
		hoursTill = date2.getHours();
	hoursTill = ("0" + hoursTill).slice(-2);

	note.set("title", $.titleField.value);
	note.set("place", $.placeField.value);
	note.set("dateFrom", new Date(
		$.fromDateField.value.setHours($.fromTimeField.value.getHours())
	));
	note.set("hoursFrom", hoursFrom);
	note.set("dateTill", new Date(
		$.tillDateField.value.setHours($.tillTimeField.value.getHours())
	));
	note.set("hoursTill", hoursTill);
	note.set("guests", $.guestsField.value);
	note.set("description", $.descriptionField.value);
	note.set("color", 1);
	note.set("monthNumber", $.fromDateField.value.getMonth());
	note.set("parent", $.fromDateField.value.getDate() + "." + ($.fromDateField.value.getMonth() + 1) + "." + $.fromDateField.value.getFullYear());
	
	console.log(note);
	Alloy.Collections.note.add(note);
	note.save();
	
}

var note = Alloy.Models.note;

