var args = arguments[0] || {},
	today = new Date(),
	hours = args.hoursFrom ||("0" + today.getHours()).slice(-2),
	hoursTill =("0" + ((+hours)+1)).slice(-2) ,
	parentId = args.parentId || today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear(),
	thisNote,
	usedDates,
	timeArray = [];

Alloy.Collections.note.fetch();
thisNote = Alloy.Collections.note.where({parent: parentId, hoursFrom: hours})[0];

function getUsedDates(parentId) {
	usedDates = Alloy.Collections.note.where({parent: parentId});
	timeArray = [];
	
	for(child in usedDates) {
		if(usedDates[child].attributes.hoursFrom != hours){
		 
			duration = usedDates[child].attributes.hoursTill - usedDates[child].attributes.hoursFrom;
			
			for(var i = 0; i <= duration; i++){
				timeArray[(+usedDates[child].attributes.hoursFrom)+i] = true;
			}
			
				if(duration === 1) {
					timeArray[+usedDates[child].attributes.hoursTill] = undefined;
				}
			
		}	
	}
}


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

function saveBtnTap() {
	thisNote.save();
	Alloy.Collections.note.fetch();
	
	$.editorWin.close();
}

function removeBtnTap() {
	thisNote.destroy();
	Alloy.Collections.note.fetch();
	
	$.editorWin.close();
}

function titleChange(e){
	thisNote.attributes.title = e.value;
}

function placeChange(e){
	thisNote.attributes.place = e.value;
}

function fromDateClick(e){
	var picker = Ti.UI.createPicker({
		type: Ti.UI.PICKER_TYPE_DATE,
	});
	
	var arr = thisNote.attributes.parent.split(".");
    
    picker.showDatePickerDialog({
    	value: new Date(arr[2],arr[1]-1,arr[0]),
    	callback: function(e) {
    		if(!e.cancel){
    			e.value.setHours(0);
    			e.value.setMinutes(0);
    			e.value.setSeconds(0);
    			e.value.setMilliseconds(0);
    		}
     		
        	if (e.cancel) {
            	Ti.API.info('user canceled dialog');
            } 
            
            else if( e.value > moment($.tabView.children[3].children[1].children[0].text, "DD-MM-YYYY")){
            	alert("Дата должна быть меньше максимальной");
            }
            
            else {
            	thisNote.attributes.parent = e.value.getDate() + "." + (e.value.getMonth()+1) + "." + e.value.getFullYear();
            	thisNote.attributes.dateFrom = e.value.getDate();
            	thisNote.attributes.monthNumber = e.value.getMonth();
                $.tabView.children[2].children[1].children[0].text = e.value.getDate() + "." + (e.value.getMonth()+1) + "." + e.value.getFullYear();
            }
        }
    });
}

function fromTimeClick(e){
	var picker = Ti.UI.createPicker({
	});
    
    var arr = thisNote.attributes.parent.split(".");
    
    picker.showTimePickerDialog({
    	value: new Date(arr[2],arr[1]-1,arr[0], thisNote.attributes.hoursFrom),
    	callback: function(e) {
        	if (e.cancel) {
            	Ti.API.info('user canceled dialog');
            } else {
            	
            	getUsedDates(thisNote.attributes.parent);
            	
            	if(timeArray[e.value.getHours()]){
            		alert("Существует запись на это время");
            	}
            	
            	else{
	            	thisNote.attributes.hoursFrom = ("0" + e.value.getHours()).slice(-2);
	            	$.tabView.children[2].children[1].children[1].text = ("0" + e.value.getHours()).slice(-2) + " : " + ("0" + e.value.getMinutes()).slice(-2);
				}            
            }
        }
    });
}

function tillDateClick(e){
	var picker = Ti.UI.createPicker({
	});
    
    var arr = thisNote.attributes.parent.split(".");
    
    picker.showDatePickerDialog({
    	value: new Date(arr[2],arr[1]-1,arr[0]),
    	callback: function(e) {
        	if (e.cancel) {
            	Ti.API.info('user canceled dialog');
            } else {
            	if(e.value < moment(thisNote.attributes.parent, "DD-MM-YYYY")){
            		alert("Дата должна быть больше начальной");
            	}
            	
            	else{
            		thisNote.attributes.dateTill = e.value.getDate();
                	$.tabView.children[3].children[1].children[0].text = e.value.getDate() + "." + (e.value.getMonth()+1) + "." + e.value.getFullYear();
            	}
            }
        }
    });
}

function tillTimeClick(e){
	var picker = Ti.UI.createPicker({
	});
    
    var arr = thisNote.attributes.parent.split(".");
    
    picker.showTimePickerDialog({
    	value: new Date(arr[2],arr[1]-1,arr[0], thisNote.attributes.hoursTill),
    	callback: function(e) {
        	if (e.cancel) {
            	Ti.API.info('user canceled dialog');
            } else {
            	
            	getUsedDates(thisNote.attributes.parent);
            	
            	if(("0" + e.value.getHours()).slice(-2) < thisNote.attributes.hoursFrom){
            		alert("Время должно быть больше начального");
            	}
            	
            	else if(timeArray[e.value.getHours()]){
            		alert("Существует запись на это время");
            	}
            	
            	else{
            	thisNote.attributes.hoursTill = ("0" + e.value.getHours()).slice(-2);
            	$.tabView.children[3].children[1].children[1].text = ("0" + e.value.getHours()).slice(-2) + " : " + ("0" + e.value.getMinutes()).slice(-2);
            	}
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
	data[5]=Ti.UI.createTableViewRow({title:'Розовый', colorBack:"pink"});
	data[6]=Ti.UI.createTableViewRow({title:'Желтый', colorBack:"yellow"}); 
	
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
