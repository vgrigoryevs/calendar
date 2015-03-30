var args = arguments[0] || {},
	today = new Date(),
	hours = args.hoursFrom ||"" + today.getHours(),
	hoursTill = "" + (today.getHours() + 1),
	parentId = args.parentId || today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear(),
	thisNote;

Alloy.Collections.note.fetch();
thisNote = Alloy.Collections.note.where({parent: parentId, hoursFrom: hours})[0];

function filterFunction(collection) {
	if(!collection.where({parent: parentId, hoursFrom: hours})[0]){//If it is new
		var note = Alloy.createModel('note', {
			"title": "",
		    "place": "",
		    "dateFrom": today.getDate(),
		    "hoursFrom": hours,
		    "hoursTill": hoursTill,
		    "dateTill": today.getDate(),
		    "guests": "",
		    "description": "",
		    "color": "white",
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

	$.editorWin.close();
}

function titleChange(e){
	thisNote.attributes.title = e.value;
}

function placeChange(e){
	thisNote.attributes.place = e.value;
}

function fromClick(e){
	
}

function guestsChange(e){
	thisNote.attributes.guests = e.value;
}

function descriptionChange(e){
	thisNote.attributes.description = e.value;
}


function colorClick(e) {
	var data = [];
	data[0]=Ti.UI.createTableViewRow({title:'Белый', color:"white"});
	data[1]=Ti.UI.createTableViewRow({title:'Красный', color:"red"});
	data[2]=Ti.UI.createTableViewRow({title:'Зеленый', color:"green"});
	data[3]=Ti.UI.createTableViewRow({title:'Синий', color:"blue"});
	data[4]=Ti.UI.createTableViewRow({title:'Оранжевый', color:"orange"});
	 
	var pickerTable = Ti.UI.createTableView({
	    data: data
	});
	
	pickerTable.addEventListener('click', function(e){
		thisNote.attributes.color = e.source.color;
		$.colorLabel.backgroundColor = e.source.color;
	    pickerDialog.hide();
	});
	 
	var pickerDialog = Ti.UI.createAlertDialog({
	    androidView: pickerTable
	});
	pickerDialog.show();
}


$.editorWin.addEventListener('close', function() {
    $.destroy();
    console.log('close');
});
