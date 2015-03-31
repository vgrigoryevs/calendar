var args = arguments[0] || {},
	today = new Date(),
	hours = args.hoursFrom ||"" + today.getHours(),
	hoursTill = args.hoursFrom ||"" + today.getHours(),
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

function transformFunction(model) {
 // Need to convert the model to a JSON object
    var transform = model.toJSON();
 // Example of creating a custom attribute, reference in the view using {custom}
    transform.custom = transform.parent + " " + transform.hoursFrom;
    transform.customHoursFrom = transform.hoursFrom + " : " + "00";
    transform.customHoursTill = transform.hoursTill + " : " + "00";

 return transform;
}
      













function saveBtnTap(event) {
	thisNote.save();
	Alloy.Collections.note.fetch();
	
	$.editorWin.close();
}

function removeBtnTap(event) {
	thisNote.destroy();
	$.editorWin.close();
}

function titleChange(e){
	thisNote.attributes.title = e.value;
}

function placeChange(e){
	thisNote.attributes.place = e.value;
}

function fromDateClick(e){
	var picker = Ti.UI.createPicker();
    
    picker.showDatePickerDialog({
    	callback: function(e) {
        	if (e.cancel) {
            	Ti.API.info('user canceled dialog');
            } else {
            	thisNote.attributes.parent = e.value.getDate() + "." + (e.value.getMonth()+1) + "." + e.value.getFullYear();
            	thisNote.attributes.dateFrom = e.value.getDate();
            	thisNote.attributes.monthNumber = e.value.getMonth();
                $.tabView.children[2].children[1].children[0].text = e.value.getDate() + "." + (e.value.getMonth()+1) + "." + e.value.getFullYear();
            }
        }
    });
}

function fromTimeClick(e){
	var picker = Ti.UI.createPicker();
    
    picker.showTimePickerDialog({
    	callback: function(e) {
        	if (e.cancel) {
            	Ti.API.info('user canceled dialog');
            } else {
            	thisNote.attributes.hoursFrom = ("0" + e.value.getHours()).slice(-2);
            	$.tabView.children[2].children[1].children[1].text = ("0" + e.value.getHours()).slice(-2) + " : " + ("0" + e.value.getMinutes()).slice(-2);
            }
        }
    });
}

function tillDateClick(e){
	var picker = Ti.UI.createPicker();
    
    picker.showDatePickerDialog({
    	callback: function(e) {
        	if (e.cancel) {
            	Ti.API.info('user canceled dialog');
            } else {
            	thisNote.attributes.dateTill = e.value.getDate();
                $.tabView.children[3].children[1].children[0].text = e.value.getDate() + "." + (e.value.getMonth()+1) + "." + e.value.getFullYear();
            }
        }
    });
}

function tillTimeClick(e){
	var picker = Ti.UI.createPicker();
    
    picker.showTimePickerDialog({
    	callback: function(e) {
        	if (e.cancel) {
            	Ti.API.info('user canceled dialog');
            } else {
            	thisNote.attributes.hoursTill = ("0" + e.value.getHours()).slice(-2);
            	$.tabView.children[3].children[1].children[1].text = ("0" + e.value.getHours()).slice(-2) + " : " + ("0" + e.value.getMinutes()).slice(-2);
            }
        }
    });
}

function guestsChange(e){
	thisNote.attributes.guests = e.value;
}

function descriptionChange(e){
	thisNote.attributes.description = e.value;
}


function colorClick(e) {
	var data = [];
	data[0]=Ti.UI.createTableViewRow({title:'Белый', colorBack:"white"});
	data[1]=Ti.UI.createTableViewRow({title:'Красный', colorBack:"red"});
	data[2]=Ti.UI.createTableViewRow({title:'Зеленый', colorBack:"green"});
	data[3]=Ti.UI.createTableViewRow({title:'Синий', colorBack:"blue"});
	data[4]=Ti.UI.createTableViewRow({title:'Оранжевый', colorBack:"orange"});
	 
	var pickerTable = Ti.UI.createTableView({
	    data: data
	});
	
	pickerTable.addEventListener('click', function(e){
		thisNote.attributes.color = e.source.colorBack;
		$.tabView.children[6].children[1].backgroundColor = e.source.colorBack;
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
