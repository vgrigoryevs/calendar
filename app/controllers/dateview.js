var args = arguments[0] || {};

var tableView = $.dateTable;


var tbl_data = [];

for(var i = 0; i < 24; i++) {
	var time ="" + i;
	if(time.length === 1){
		time = "0" + time;
	}
	
	var label = Ti.UI.createLabel({
			text: time,//Это строка!
		    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		    width: 50,
		    height: 40,
		    left: 0,
		    color: "black",
			backgroundColor: "#BBBBB3"
		}),
		
		tableRow = Ti.UI.createTableViewRow({
			height: 40,
			separatorColor:"#BBBBB3"
		});
	tableRow.add(label);

	tbl_data.push(tableRow);
}


tableView.data = tbl_data;


