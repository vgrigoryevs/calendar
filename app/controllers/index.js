Ti.include('/moment-with-locales.js');



String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function showCalendar(year, month){
	
	if(month === 0){
		var	lastDayPrMnth = new Date(year - 1, 12 , 0).getDate();
	}
	
	else{
		var lastDayPrMnth = new Date(year, month, 0).getDate();
	}
	
	var tbl_data = [],
		today = new Date().getDate();
		tableHeader = Ti.UI.createTableViewRow({height: "14%"}),
		weekRow = Ti.UI.createTableViewRow({height: "14%"}),
		firstDay = new Date(year, month, 1).getDay(),
		lastDay = new Date(year, month + 1, 0).getDate(),
		counter = 1,
		innerCounter = 0,
		nextMonthCntr = 1,
		prMonthCntr = firstDay-2,
		weekDay = moment("12-25-1995", "MM-DD-YYYY");
		weekDay.locale('ru');

	if(new Date().getMonth() != month || new Date().getFullYear() != year) {
		var today = 0;		
	}
	
	//Searching dates of existing notes in this month
	var myNotes = Alloy.Collections.note.where({monthNumber: month, yearNumber: year}),
		datesWithNotes = [];
	
	if(myNotes[0]){
		var maxLength = myNotes.length;
		
		for(var ii = 0; ii < maxLength; ii++) {
			var i =	(+ myNotes[ii].attributes.parent.split(".")[0]);//geting day number
			datesWithNotes[i] = true;
		}
	}


	//Calendar header
	for(var i = 0; i < 7; i++) {
		var label = Ti.UI.createLabel({
	        left: (i*14)+"%",
	        text: weekDay.format('dd').capitalizeFirstLetter(),
	        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	        width:30,
	        height:30,
	        color: "#BBBBB3",
	        font:{fontSize: '24sp'}
	    });
	    
	    weekDay.add(1, 'days');
	    tableHeader.add(label);
	}
	tbl_data.push(tableHeader);
	
	//First week
	
	if(firstDay === 1) {
		
	}
	
	else if(firstDay === 0) {
		firstWeek = Ti.UI.createTableViewRow({height: "14%"});
		
		for (var i = 0; i < 6; i++) {
			var label = Ti.UI.createLabel({
		        left: (i*14)+"%",
		        text: (lastDayPrMnth - 5) + i,
	        	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		        width:30,
		        height:30,
		        color: "#BBBBB3",
	        	font:{fontSize: '24sp'}
	    	});
	    	firstWeek.add(label);
		}
		
		var label = Ti.UI.createLabel({
			left: (6*14)+"%",
		    text: counter,
	        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	        width:30,
	        height:30,
	        color: "black",
		    labelId: counter + "." + (month+1) + "." + year,
	        font:{fontSize: '24sp'}
	    });
	    
	    if(today === counter) {
	    	label.color = "#CC0000";
	    }
	    
	    if(datesWithNotes[counter]){
	    	label.backgroundImage = '/img/test.png'; 
	    }
	    
	    counter++;
	    firstWeek.add(label);
		tbl_data.push(firstWeek);	
	}
	
	else {
		firstWeek = Ti.UI.createTableViewRow({height: "14%"});
		
		for (var i = 0; i < firstDay -1; i++) {
			var label = Ti.UI.createLabel({
		        left: (prMonthCntr*14)+"%",
		        text: lastDayPrMnth--,
	        	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		        width:30,
		        height:30,
		        color: "#BBBBB3",
	        	font:{fontSize: '24sp'}
	    	});
	    	prMonthCntr--;
	    	firstWeek.add(label);
		}
		
		for (; i < 7 ; i++ ) {
			var label = Ti.UI.createLabel({
		        left: (i*14)+"%",
		        text: counter,
	        	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		        width:30,
		        height:30,
		        color: "black",
		        labelId: counter + "." + (month+1) + "." + year,
	        	font:{fontSize: '24sp'}
	    	});
	    	
	    	if(today === counter) {
	    		label.color = "#CC0000";
	    	}
	    	
	    	if(datesWithNotes[counter]){
	    		label.backgroundImage = '/img/test.png'; 
	    	}
	    
	    	counter++;
	    	firstWeek.add(label);
		}
		
		tbl_data.push(firstWeek);	
	}
	
	//Adding weeks
	
	while(counter <= lastDay) {
		
		if(innerCounter === 7) {
			
			innerCounter = 0;
			tbl_data.push(weekRow);
			
			weekRow = Ti.UI.createTableViewRow({height: "14%"});
			
			var label = Ti.UI.createLabel({
					left: (innerCounter*14)+"%",
				    text: counter,
		        	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			        width:30,
			        height:30,
			        color: "black",
			        labelId: counter + "." + (month+1) + "." + year,
	        		font:{fontSize: '24sp'}
			    });
		    
		    if(today === counter) {
		    	label.color = "#CC0000";
		    }
		    
		    if(datesWithNotes[counter]){
		    	label.backgroundImage = '/img/test.png'; 
		    }
		    
		    counter++;
		    innerCounter++;
		    weekRow.add(label);
			
		}
		
		else {
			
			var label = Ti.UI.createLabel({
				left: (innerCounter*14)+"%",
			    text: counter,
	        	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		        width:30,
		        height:30,
		        color: "black",
		        labelId: counter + "." + (month+1) + "." + year,
	        	font:{fontSize: '24sp'}
		    });
		    
		    if(today === counter) {
		    	label.color = "#CC0000";
		    }
		    
		    if(datesWithNotes[counter]){
		    	label.backgroundImage = '/img/test.png'; 
		    }
		    
		    counter++;
		    innerCounter++;
		    weekRow.add(label);
		}
		
	}
	
	for(;innerCounter < 7 ; innerCounter++) {
		var label = Ti.UI.createLabel({
				left: (innerCounter*14)+"%",
				text: nextMonthCntr++,
		        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		        width: 30,
		        height: 30,
			    color: "#BBBBB3",
	        	font:{fontSize: '24sp'}
			});
		weekRow.add(label);
	}
			
	tbl_data.push(weekRow);
	
	var table = Titanium.UI.createTableView({
		    data: tbl_data,
		    separatorColor: "transparent",
		    top: 90,
		    left: "4%"
		
		});
	
	//Handler for date picking
	
	table.addEventListener('click', function(e){
    	if(e.source.labelId){
    		var selectedDate = e.source,
    			args = {
    				labelId: selectedDate.labelId
    			},
    			dateView = Alloy.createController("dateview", args).getView();
    			
			dateView.open();
			console.log(e.source.labelId);
    		$.destroy();	
    	}
	});
	
	$.contain.add(table);
}

//Change to previos month

$.before.addEventListener('click', function(){
    if($.contain.menuOn){
		$.contain.menuOn = false;
		$.contain.remove($.contain.children[3]);
	}
    
    $.contain.remove($.contain.children[2]);
    mon--;
    
    if(mon === -1){
    	y--;
    	mon = 11;
    }
    
    d.month(mon);
    n = d.format('MMMM').capitalizeFirstLetter();
    
    $.monthSelector.text = n + " " + y;
    showCalendar(y, mon);
	console.log("prev");
});

//Change to next month

$.after.addEventListener('click', function(){
    if($.contain.menuOn){
		$.contain.menuOn = false;
		$.contain.remove($.contain.children[3]);
	}
    
    $.contain.remove($.contain.children[2]);
    
    mon++;
    
    if(mon === 12){
    	y++;
    	mon = 0;
    }
    d.month(mon);
    n = d.format('MMMM').capitalizeFirstLetter();
    
    $.monthSelector.text = n + " " + y;
    showCalendar(y, mon);
});

//Menu btns

$.indexMenuBtn.addEventListener('click', function(){

	if($.contain.menuOn){
		$.contain.menuOn = false;
		$.contain.remove($.contain.children[3]);
	}
	else{
		$.contain.menuOn = true;
		
		var win = Ti.UI.createView({
			right: 0,
			top: 30,
			width: 200,
			height: 50,
			backgroundColor:  "#BBBBB3",
			zIndex: 100,
			opacity: 0
		});
		
		var newBtn = Ti.UI.createLabel({
			text: "Добавить запись",
			height: 25,
			top: 0,
			color: "black"
		});
		
		var changeBack = Ti.UI.createLabel({
			text: "Изменить фон",
			height: 25,
			top: 25,
			color: "black"
		});
		
		var showMenu = Ti.UI.createAnimation();
	    showMenu.duration = 300;
	    showMenu.width = 200;
	    showMenu.height = 50;
	    showMenu.right = 0;
	    showMenu.opacity = 1;
			
		newBtn.addEventListener('click', function(e){		
			var dateEditor = Alloy.createController("dateeditor").getView();
	    	
	    	$.contain.menuOn = false;
			$.contain.remove($.contain.children[3]);
			
			dateEditor.open();
	  		$.destroy();
		});
		
		changeBack.addEventListener('click', function(e){
			console.log("change back");

		});
		
		win.add(newBtn);
		win.add(changeBack);
		
		$.contain.add(win);
		
		win.animate(showMenu);
	}		
});


$.contain.open();	

//Calendar initialization with current month
var d = moment();
	d.locale('ru');
var	mon = d.month(),
	n = d.format('MMMM').capitalizeFirstLetter(),
	y = d.year();

$.monthSelector.text = n + " " + y;
Alloy.Collections.note.fetch();
 
showCalendar(y, mon);

