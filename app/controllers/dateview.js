var args = arguments[0] || {},
	parentId = args.labelId || "",
	myNotes = Alloy.Collections.note,
	win = $.dateWin;
	
if(OS_IOS) { 
	win.title = parentId;
	
	win.addEventListener('focus', function() {
	if(Alloy.Globals.redrawEditor){
		Alloy.Collections.note.fetch();
		win.remove(win.children[0]);
		
		showEvents();
		Alloy.Globals.redrawEditor = false;
	}
});

} 
if (OS_ANDROID) { 
	$.dateLabel.text = parentId; 
}

function showEvents() {
	function createTimeRow(time, i) {
	  var row = Ti.UI.createView({
	    width: "20%", 
	    height: 70,
	    top: i * 70, 
	    left: 0,
	    borderColor: "black",
	    borderWidth: 1,
	    hoursFrom: time
	  });
	  
	  var label = Ti.UI.createLabel({
	    text: time,
		height: 70,
		left:0,
		width:"100%",
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
		    width: "80%", 
		    height: 70 * duration,
		    top: i * 70, 
		    right: 0,
		    borderColor: "black",
		    borderWidth: 1,
		    hoursFrom: time,
		    backgroundColor: backColor,
		});
	  
	  //Label with description
		var	label2 = Ti.UI.createLabel({
			text: labelText,
		    left: 30,
		    color: "black",
		    width: "80%",
		    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			height: 70 * duration,
			hoursFrom: time,
		    wordWrap: true
			    
		});
		
	  if(duration > 1) {
	  	row.zIndex = 999;
	  }
	  
	  label2.addEventListener('click', function(e){    		
		var args = {
			hoursFrom : e.source.hoursFrom,
			parentId : parentId
		};
		
		Alloy.Models.note = Alloy.Collections.note.where({parent: parentId, hoursFrom: e.source.hoursFrom})[0];
		var dateEditor = Alloy.createController("dateeditor", args).getView();
	    			
		if(OS_IOS) { 
			Alloy.Globals.mainWindow.openWindow(dateEditor);
		} 
		if (OS_ANDROID) { 
			dateEditor.open(); 
		}
	
		
	  	$.destroy();
	  });	
	  
	  row.add(label2);
	  return row;
	}
	
	var scrollView = Ti.UI.createScrollView({
	  top:60,
	  contentHeight: 'auto'
	});
	
	if(OS_IOS) { 
		scrollView.top = 0;
	} 
	
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
}

function addBtnTap() {
	var args = {
		parentId : parentId
	};
	
	var dateEditor = Alloy.createController("dateeditor", args).getView();
    			
	if(OS_IOS) { 
		Alloy.Globals.mainWindow.openWindow(dateEditor);
	} 
	if (OS_ANDROID) { 
		dateEditor.open(); 
	}

	
  	$.destroy();
}

showEvents();
Alloy.Globals.redrawEditor = false;
