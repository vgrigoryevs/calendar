var args = arguments[0] || {};

var tableView = $.dateTable;


var tbl_data = [];

for(var i = 0; i < 24; i++) {
	var label = Ti.UI.createLabel({
			text: i,
		    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		    width: 50,
		    height: 40,
		    left: 0,
			backgroundColor: "#BBBBB3"
		}),
		
		tableRow = Ti.UI.createTableViewRow({
			height: 40
		});
	tableRow.add(label);

	tbl_data.push(tableRow);
}


tableView.data = tbl_data;


