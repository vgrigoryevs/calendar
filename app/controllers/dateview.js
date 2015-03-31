var args = arguments[0] || {},
	parentId = args.labelId || "",
	myNotes = Alloy.Collections.note,
	win = $.dateWin;

$.dateLabel.text = parentId;


function createTimeRow(time, i) {
  var row = Ti.UI.createView({
    width: 70, 
    height: 70,
    top: i * 70, 
    left: 0,
    borderColor: "black",
    borderWidth: 1,
    hoursFrom: time
  });
  
  var label = Ti.UI.createLabel({
    text: time,
	width: 70,
	height: 70,
	left:0,
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	color: "black",
	backgroundColor: "#BBBBB3",
	hoursFrom: time
  });
  

  row.add(label);
  return row;
}

function createDescRow(time, labelText, backColor, i, hoursTill) {
	var duration = hoursTill - time;
	
	if(duration === 0){
		duration = 1;
	}
	
	
	var row = Ti.UI.createView({
	    width: "100%", 
	    height: 70 * duration,
	    top: i * 70, 
	    left: 70,
	    borderColor: "black",
	    borderWidth: 1,
	    hoursFrom: time,
	    backgroundColor: backColor,
	});
  
  //Label with description
	var	label2 = Ti.UI.createLabel({
		text: labelText,
	    left: 30,
	    width:"100%",
	    color: "black",
		height: 70 * duration,
		hoursFrom: time,
	    wordWrap: true
		    
	});
	
  if(duration > 1) {
  	row.zIndex = 999;
  }	
  
  row.add(label2);
  return row;
}

var scrollView = Ti.UI.createScrollView({
  top:30,
  contentHeight: 'auto'
});

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
		var hoursTill = note.attributes.hoursTill;
	}
	else{
		var labelText = "";
		var backColor = "white";
		var hoursTill = i + 1;
	}
	//End of grabin
	
	var row = createTimeRow(time, i);
	var descRow = createDescRow(time, labelText, backColor, i, hoursTill);
  	scrollView.add(row);
  	scrollView.add(descRow);
}


win.add(scrollView);



























// var tableView = $.dateTable;
// 
// 
// var tbl_data = [];
// 
// for(var i = 0; i < 24; i++) {
	// var time ="" + i;
// 	
	// if(time.length === 1){
		// time = "0" + time;
	// }
// 	
	// var note = myNotes.where({parent: parentId, hoursFrom: time})[0];
// 	
	// //Grabin note description, if it exist
	// if(note){
		// var labelText = note.attributes.description;
		// var backColor = note.attributes.color;
	// }
	// else{
		// var labelText = "";
		// var backColor = "white";
	// }
	// //End of grabin
// 	
	// //Label with time
	// var label = Ti.UI.createLabel({
			// text: time,//This is a string
		    // textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		    // width: 50,
		    // //height: "100%",
		    // height: 50,
		    // left: 0,
		    // color: "black",
			// backgroundColor: "#BBBBB3",
			// hoursFrom: time
		// }),
		// //Label with description
		// label2 = Ti.UI.createLabel({
			// text: labelText,
// 
		    // left: 50,
		    // width:"100%",
		    // color: "black",
		    // //height: "100%",
		    // height: 50,
		    // hoursFrom: time,
		    // backgroundColor: backColor,
		    // wordWrap: true
// 		    
		// }),
// 		
		// tableRow = Ti.UI.createTableViewRow({
			// separatorColor:"transparent",
			// hoursFrom: time,
			// backgroundColor: 'pink',//backColor, 
			// height: 50
		// });
	// tableRow.add(label);
	// tableRow.add(label2);
// 	
	// tbl_data.push(tableRow);
// }
// 
// tableView.addEventListener('click', function(e){    		
	// var args = {
		// hoursFrom : e.source.hoursFrom,
		// parentId : parentId
	// };
// 	
	// Alloy.Models.note = Alloy.Collections.note.where({parent: parentId, hoursFrom: e.source.hoursFrom})[0];
	// var dateEditor = Alloy.createController("dateeditor", args).getView();
//     			
	// dateEditor.open();
  	// $.destroy();
// });
// 
// tableView.data = tbl_data;

function addBtnTap() {
	var args = {
		parentId : parentId
	};
	
	var dateEditor = Alloy.createController("dateeditor", args).getView();
    			
	dateEditor.open();
  	$.destroy();
}
