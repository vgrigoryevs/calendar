var args = arguments[0] || {},
	parentId = args.labelId || "",
	myNotes = Alloy.Collections.note;

var tableView = $.dateTable;


var tbl_data = [];

for(var i = 0; i < 24; i++) {
	var time ="" + i;
	
	if(time.length === 1){
		time = "0" + time;
	}
	
	var note = myNotes.where({parent: parentId, hoursFrom: time})[0];
	
	//Grabin note description, if it exist
	if(note){
		var labelText = note.attributes.description;
		var backColor = note.attributes.color;
	}
	else{
		var labelText = "";
		var backColor = "white";
	}
	//End of grabin
	
	//Label with time
	var label = Ti.UI.createLabel({
			text: time,//This is a string
		    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		    width: 50,
		    height: "100%",
		    left: 0,
		    color: "black",
			backgroundColor: "#BBBBB3",
			hoursFrom: time
		}),
		//Label with description
		label2 = Ti.UI.createLabel({
			text: labelText,

		    left: 50,
		    width:"100%",
		    color: "black",
		    height: "100%",
		    hoursFrom: time,
		    backgroundColor: backColor,
		    wordWrap: true
		    
		}),
		
		tableRow = Ti.UI.createTableViewRow({
			separatorColor:"transparent",
			hoursFrom: time,
			backgroundColor: backColor
		});
	tableRow.add(label);
	tableRow.add(label2);
	
	tbl_data.push(tableRow);
}

tableView.addEventListener('click', function(e){    		
	var args = {
		hoursFrom : e.source.hoursFrom,
		parentId : parentId
	};
	
	var dateEditor = Alloy.createController("dateeditor", args).getView();
    			
	dateEditor.open();
  	$.destroy();
});

tableView.data = tbl_data;


