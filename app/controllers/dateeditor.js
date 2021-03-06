var args = arguments[0] || {},
	today = new Date(),
	hours = args.hoursFrom ||("0" + today.getHours()).slice(-2),
	hoursTill =("0" + ((+hours)+1)).slice(-2) ,
	parentId = args.parentId || today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear(),
	thisNote,
	usedDates,
	timeArray = [];

var iosModal = require('iosModal');

Alloy.Collections.note.fetch();
var noteCol = Alloy.Collections.note.findByParentHoursFrom(parentId, hours)[0];
if (noteCol) {
    $.thisNote.set(noteCol.toJSON());
    transformFunction();
} else {
     $.thisNote.set( {
            "title": "",
            "place": "",
            "dateFrom": +(parentId.split(".")[0]),
            "hoursFrom": hours,
            "hoursTill": hoursTill,
            "dateTill": +(parentId.split(".")[0]),
            "guests": "",
            "description": "",
            "color": "white",
            "monthNumber": today.getMonth(),
            "yearNumber": today.getFullYear(),
            "parent": parentId,
            "unicId": new Date()
        });

        //$.groupDetail.set(emptyGroup);
}
transformFunction();

if(OS_IOS) {
	$.tabView.top = 0;
}

function getUsedDates(parentId) {
	usedDates = Alloy.Collections.note.findByParent(parentId);
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
	if(!Alloy.Collections.note.findByParentHoursFrom(parentId, hours)[0]){//If it is new
		var note = Alloy.createModel('note', {
			"title": "",
		    "place": "",
		    "dateFrom": +(parentId.split(".")[0]),
		    "hoursFrom": hours,
		    "hoursTill": hoursTill,
		    "dateTill": +(parentId.split(".")[0]),
		    "guests": "",
		    "description": "",
		    "color": "white",
		    "monthNumber": today.getMonth(),
		    "yearNumber": today.getFullYear(),
		    "parent": parentId,
		    "unicId": new Date()
		});

		collection.add(note);
		return Alloy.Collections.note.findByParentHoursFrom(parentId, hours);
	}

	else {
		return Alloy.Collections.note.findByParentHoursFrom(parentId, hours);
	}

}

function transformFunction(model) {
 // Need to convert the model to a JSON object
    var transform = $.thisNote.toJSON();
 // Example of creating a custom attribute, reference in the view using {custom}
    transform.custom = transform.parent + " " + transform.hoursFrom;
    transform.dateTill = parseInt(transform.dateTill, 10);
    transform.customHoursFrom = transform.hoursFrom + " : " + "00";
    transform.customHoursTill = transform.hoursTill + " : " + "00";
    transform.customDateTill = transform.dateTill + "." + (transform.monthNumber + 1) + "." + transform.yearNumber;

    $.thisNote.set(transform);

    return transform;
}

function saveBtnTap() {
	var validation = checkValidation();
	if(validation) {
		var output = "Заполните необходимые поля: ";
		for(var i = 0; i < validation.length; i++){
			output += validation[i] + ", ";

			if(i === validation.length - 1) {
				output = output.slice(0, - 2);
			}
		}
		var dialog = Ti.UI.createAlertDialog({
		    message: output,
		    ok: 'OK',
		    title: 'Ошибка!'
		});

		dialog.show();
	}
	else{
		$.thisNote.save();

		if($.thisNote.attributes.dateTill > $.thisNote.attributes.dateFrom) {
			for(var i = 1; i <= $.thisNote.attributes.dateTill - $.thisNote.attributes.dateFrom; i++){
				var parent = $.thisNote.attributes.parent.split(".");
					parent[0] = (+parent[0]) + i;
					parent = parent.join(".");

				var note = Alloy.createModel('note', {
					"title": $.thisNote.attributes.title,
				    "place": $.thisNote.attributes.place,
				    "dateFrom": $.thisNote.attributes.dateTill,
				    "hoursFrom": "00",
				    "hoursTill": $.thisNote.attributes.hoursTill,
				    "dateTill": $.thisNote.attributes.dateTill,
				    "guests": $.thisNote.attributes.guests,
				    "description": $.thisNote.attributes.description,
				    "color": $.thisNote.attributes.color,
				    "monthNumber": $.thisNote.attributes.monthNumber,
				    "yearNumber": $.thisNote.attributes.yearNumber,
				    "parent": parent,
				    "unicId": $.thisNote.attributes.unicId
				});

				Alloy.Collections.note.add(note);
				note.save();
			}
		}

		Alloy.Collections.note.fetch();
		if (args.callbackFunction) {
		    args.callbackFunction(true);
		}
		$.editorWin.close();

	}
}

function checkValidation() {
	var output = [];
	if($.thisNote.attributes.title === ""){
		output.push("Что");
	}
	if($.thisNote.attributes.place === ""){
		output.push("Где");
	}
	if($.thisNote.attributes.description === ""){
		output.push("Описание");
	}

	if(output.length > 0){
		return output;
	}
	return false;
}

function removeBtnTap() {

	if($.thisNote.attributes.dateTill > $.thisNote.attributes.dateFrom) {
		while(Alloy.Collections.note.findByUnicId($.thisNote.attributes.unicId)[0]){
			Alloy.Collections.note.findByUnicId($.thisNote.attributes.unicId)[0].destroy();
		}
	}

	$.thisNote.destroy();
	Alloy.Collections.note.fetch();
	Alloy.Globals.redrawIndex = true;
	
	if (args.callbackFunction) {
		args.callbackFunction(true);
	}

	$.editorWin.close();
}

function titleChange(e){
	$.thisNote.attributes.title = e.value;
}

function placeChange(e){
	$.thisNote.attributes.place = e.value;
}

function fromDateClick(e){
	var arr = $.thisNote.attributes.parent.split("."),
		tillArr = $.tabView.children[3].children[1].children[0].text.split("."),

		picker = Ti.UI.createPicker({
			type: Ti.UI.PICKER_TYPE_DATE,
			value: new Date(Date.UTC(arr[2],arr[1]-1,arr[0], 0, 0, 0, 0))
		});

    if(OS_IOS) {

    	var modalPicker = iosModal.createModalPicker(
    		picker,
    		function(){
    			var e = picker;

	    		if( e.value > new Date(Date.UTC(tillArr[2],tillArr[1]-1,tillArr[0], 0, 0, 0, 0))){
	            	var dialog = Ti.UI.createAlertDialog({
					    message: 'Дата должна быть меньше максимальной',
					    ok: 'ОК',
					    title: 'Ошибка!'
					});

					dialog.show();
	            }

	            else {
	            	$.thisNote.attributes.dateFrom = e.value.getDate();
	            	$.thisNote.attributes.monthNumber = e.value.getMonth();
	            	$.thisNote.set("parent",e.value.getDate() + "." + (e.value.getMonth()+1) + "." + e.value.getFullYear());
	            	
	            }

    			$.editorWin.remove(modalPicker);
    		},
    		function(){
    			$.editorWin.remove(modalPicker);
    		}
    	 );

    	$.editorWin.add(modalPicker);
    }

    if(OS_ANDROID) {
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
	            	var dialog = Ti.UI.createAlertDialog({
					    message: 'Дата должна быть меньше максимальной',
					    ok: 'ОК',
					    title: 'Ошибка!'
					});

					dialog.show();
	            }

	            else {
	            	$.thisNote.attributes.dateFrom = +(e.value.getDate());
	            	$.thisNote.attributes.monthNumber = e.value.getMonth();
	                $.thisNote.set("parent",e.value.getDate() + "." + (e.value.getMonth()+1) + "." + e.value.getFullYear());
	            }
	        }
	    });
    }
}

function fromTimeClick(e){
		var arr = $.thisNote.attributes.parent.split("."),
		tillArr = $.tabView.children[3].children[1].children[0].text.split("."),

		picker = Ti.UI.createPicker({
			type: Ti.UI.PICKER_TYPE_TIME,
			value: new Date(arr[2],arr[1]-1,arr[0], $.thisNote.attributes.hoursFrom, 0, 0, 0)
		});

    if(OS_IOS) {

    	var modalPicker = iosModal.createModalPicker(
    		picker,
    		function(){
    			var e = picker;

    			var localString = e.value.toLocaleString().split(" "),
	    			hours = localString[3].split(":")[0];

	    		getUsedDates($.thisNote.attributes.parent);

	            if(timeArray[e.value.getHours()]){
	            	var dialog = Ti.UI.createAlertDialog({
					    message: 'Существует запись на это время',
					    ok: 'ОК',
					    title: 'Ошибка!'
					});

					dialog.show();
	            }

	            else{
		            $.thisNote.attributes.hoursFrom = hours;
		            
		            $.thisNote.set("customHoursFrom",hours + " : " + ("0" + e.value.getMinutes()).slice(-2));
				}

    			$.editorWin.remove(modalPicker);
    		},
    		function(){
    			$.editorWin.remove(modalPicker);
    		}
    	 );

    	$.editorWin.add(modalPicker);
    }

    if(OS_ANDROID) {

	    picker.showTimePickerDialog({
	    	value: new Date(arr[2],arr[1]-1,arr[0], $.thisNote.attributes.hoursFrom),
	    	callback: function(e) {
	        	if (e.cancel) {
	            	Ti.API.info('user canceled dialog');
	            } else {

	            	getUsedDates($.thisNote.attributes.parent);

	            	if(timeArray[e.value.getHours()]){
	            		var dialog = Ti.UI.createAlertDialog({
					    message: 'Существует запись на это время',
					    ok: 'ОК',
					    title: 'Ошибка!'
					});

					dialog.show();
	            	}

	            	else{
		            	$.thisNote.attributes.hoursFrom = ("0" + e.value.getHours()).slice(-2);
		            	$.thisNote.set("customHoursFrom",hours + " : " + (("0" + e.value.getHours()).slice(-2)));
					}
	            }
	        }
	    });
	}
}

function tillDateClick(e){
	var arr = $.thisNote.attributes.parent.split("."),
		tillArr = $.tabView.children[3].children[1].children[0].text.split("."),
		picker = Ti.UI.createPicker({
			type: Ti.UI.PICKER_TYPE_DATE,
			value: new Date(Date.UTC(arr[2],arr[1]-1,arr[0], 0, 0, 0, 0))
		});

    if(OS_IOS) {

    	var modalPicker = iosModal.createModalPicker(
    		picker,
    		function(){
    			var e = picker;
	    		if(e.value < moment($.thisNote.attributes.parent, "DD-MM-YYYY")){
	            	var dialog = Ti.UI.createAlertDialog({
				    	message: 'Дата должна быть больше начальной',
				    	ok: 'ОК',
				    	title: 'Ошибка!'
					});

					dialog.show();
	            	}

	            else{
	            	$.thisNote.attributes.dateTill = +(e.value.getDate());
	               	$.tabView.children[3].children[1].children[0].text = e.value.getDate() + "." + (e.value.getMonth()+1) + "." + e.value.getFullYear();
	            }

    			$.editorWin.remove(modalPicker);
    		},
    		function(){
    			$.editorWin.remove(modalPicker);
    		}
    	 );

    	$.editorWin.add(modalPicker);
    }

    if(OS_ANDROID) {

	    picker.showDatePickerDialog({
	    	value: new Date(arr[2],arr[1]-1,arr[0]),
	    	callback: function(e) {
	        	if (e.cancel) {
	            	Ti.API.info('user canceled dialog');
	            } else {
	            	if(e.value < moment($.thisNote.attributes.parent, "DD-MM-YYYY")){
	            		var dialog = Ti.UI.createAlertDialog({
					    message: 'Дата должна быть больше начальной',
					    ok: 'ОК',
					    title: 'Ошибка!'
					});

					dialog.show();
	            	}

	            	else{
	            		$.thisNote.attributes.dateTill = +(e.value.getDate());
	                	$.tabView.children[3].children[1].children[0].text = e.value.getDate() + "." + (e.value.getMonth()+1) + "." + e.value.getFullYear();
	            	}
	            }
	        }
	    });
	}
}

function tillTimeClick(e){
		var arr = $.thisNote.attributes.parent.split("."),
		tillArr = $.tabView.children[3].children[1].children[0].text.split("."),

		picker = Ti.UI.createPicker({
			type: Ti.UI.PICKER_TYPE_TIME,
			value: new Date(arr[2],arr[1]-1,arr[0], $.thisNote.attributes.hoursTill, 0, 0, 0)
		});

    if(OS_IOS) {

    	var modalPicker = iosModal.createModalPicker(
    		picker,
    		function(){
				var e = picker;

	    		var localString = e.value.toLocaleString().split(" "),
	    			hours = localString[3].split(":")[0];


	    		getUsedDates($.thisNote.attributes.parent);

	            if(hours < $.thisNote.attributes.hoursFrom){
	            	var dialog = Ti.UI.createAlertDialog({
					    message: 'Время должно быть больше начального',
					    ok: 'ОК',
					    title: 'Ошибка!'
					});

					dialog.show();
	            	}	else if(timeArray[+hours]){
		            		var dialog = Ti.UI.createAlertDialog({
						    	message: 'Существует запись на это время',
						    	ok: 'ОК',
						    	title: 'Ошибка!'
							});

							dialog.show();
	            	}	else{
	            			$.thisNote.attributes.hoursTill = hours;
	            			$.thisNote.set("customHoursTill",hours + " : " + ("0" + e.value.getMinutes()).slice(-2));
	            	}

    			$.editorWin.remove(modalPicker);
    		},
    		function(){
    			$.editorWin.remove(modalPicker);
    		}
    	 );

    	$.editorWin.add(modalPicker);
    }

    if(OS_ANDROID) {

	    picker.showTimePickerDialog({
	    	value: new Date(arr[2],arr[1]-1,arr[0], $.thisNote.attributes.hoursTill),
	    	callback: function(e) {
	        	if (e.cancel) {
	            	Ti.API.info('user canceled dialog');
	            } else {

	            	getUsedDates($.thisNote.attributes.parent);

	            	if(("0" + e.value.getHours()).slice(-2) < $.thisNote.attributes.hoursFrom){
	            		var dialog = Ti.UI.createAlertDialog({
					    message: 'Время должно быть больше начального',
					    ok: 'ОК',
					    title: 'Ошибка!'
					});

					dialog.show();
	            	}	else if(timeArray[e.value.getHours()]){
	            			var dialog = Ti.UI.createAlertDialog({
					    		message: 'Существует запись на это время',
					    		ok: 'ОК',
					    		title: 'Ошибка!'
							});

							dialog.show();
	            	}	else{
	            			$.thisNote.attributes.hoursTill = ("0" + e.value.getHours()).slice(-2);
	            			$.thisNote.set("customHoursTill", ("0" + e.value.getHours()).slice(-2) + " : " + ("0" + e.value.getMinutes()).slice(-2));

	            	}
	            }
	        }
	    });
	}
}

function guestsChange(e){
	$.thisNote.attributes.guests = e.value;
}

function guestsPlaceholder() {
	var textArea = $.tabView.children[4].children[1];
	textArea._hintText = "Гости";

	if(textArea.value === "") {
		textArea.value = "Гости";
		textArea.color = "gray";
	}

	textArea.addEventListener('focus',function(e){
	    if(e.source.value == e.source._hintText){
	        e.source.value = "";
	        e.source.color = "black";
	    }
	});
	textArea.addEventListener('blur',function(e){
	    if(e.source.value==""){
	        e.source.value = e.source._hintText;
	        e.source.color = "gray";
	    }
	});
}

if(OS_IOS) {
	guestsPlaceholder();
}

function descriptionChange(e){
	$.thisNote.attributes.description = e.value;
}

function descrPlaceholder() {
	var textArea = $.tabView.children[5].children[1];
	textArea._hintText = "Описание";

	if(textArea.value === "") {
		textArea.value = "Описание";
		textArea.color = "gray";
	}

	textArea.addEventListener('focus',function(e){
	    if(e.source.value == e.source._hintText){
	        e.source.value = "";
	        e.source.color = "black";
	    }
	});
	textArea.addEventListener('blur',function(e){
	    if(e.source.value==""){
	        e.source.value = e.source._hintText;
	        e.source.color = "gray";
	    }
	});
}

if(OS_IOS) {
	descrPlaceholder();
}

function colorClick(e) {
    var view = e;
	if (OS_ANDROID) {
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
			$.thisNote.attributes.color = e.source.colorBack;
			$.thisNote.set("color",e.source.colorBack);
		    pickerDialog.hide();
		});

		var pickerDialog = Ti.UI.createAlertDialog({
		    androidView: pickerTable
		});
		pickerDialog.show();
	}
	if (OS_IOS) {
		var myArray = ['Белый','Красный','Зеленый','Синий', 'Оранжевый', 'Розовый', 'Желтый'];

		var opts = {
			options: myArray,
			selectedIndex: 0,
		};

		var dialog = Ti.UI.createOptionDialog(opts);

		dialog.show();
		dialog.addEventListener('click', onSelectDialog);

		function onSelectDialog(e){
			var colors = ['white', 'red', 'green', 'blue', 'orange', 'pink', 'yellow'];
			
			$.thisNote.set("color",colors[e.index]);
		}
	}
}

$.editorWin.addEventListener('close', function() {
    $.destroy();
    console.log('close');
});
