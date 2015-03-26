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
	
	//Grabin note description, if it exist
	if(myNotes.where({parent: parentId, dateFrom: time})[0]){
		var labelText = myNotes.where({parent: parentId, dateFrom: time})[0].attributes.description;
	}
	else{
		var labelText = "";
	}
	//End of grabin
	
	//Label with time
	var label = Ti.UI.createLabel({
			text: time,//This is a string
		    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		    width: 50,
		    height: 40,
		    left: 0,
		    color: "black",
			backgroundColor: "#BBBBB3"
		}),
		//Label with description
		label2 = Ti.UI.createLabel({
			text: labelText,
		    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		    height: 40,
		    left: 50,
		    color: "black"
		}),
		
		tableRow = Ti.UI.createTableViewRow({
			height: 40,
			separatorColor:"#BBBBB3"
		});
	tableRow.add(label);
	tableRow.add(label2);
	
	tbl_data.push(tableRow);
}


tableView.data = tbl_data;


