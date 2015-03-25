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
		tableHeader = Ti.UI.createTableViewRow(),
		weekRow = Ti.UI.createTableViewRow(),
		firstDay = new Date(year, month, 1).getDay(),
		lastDay = new Date(year, month + 1, 0).getDate(),
		counter = 1,
		innerCounter = 0,
		nextMonthCntr = 1,
		prMonthCntr = firstDay-2,
		weekDay = moment("12-25-1995", "MM-DD-YYYY");
		weekDay.locale('ru');

	if(new Date().getMonth() != month) {
		var today = 0;		
	}
	
	//Searching dates of existing notes in this month
	var myNotes = Alloy.Collections.notes.where({monthNumber: month}),
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
	        left: i*40,
	        text: weekDay.format('dd').capitalizeFirstLetter(),
	        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	        width:20,
	        height:20,
	        color: "#BBBBB3"
	    });
	    
	    weekDay.add(1, 'days');
	    tableHeader.add(label);
	}
	tbl_data.push(tableHeader);
	
	//First week
	
	if(firstDay === 1) {
		
	}
	
	else if(firstDay === 0) {
		firstWeek = Ti.UI.createTableViewRow();
		
		for (var i = 0; i < 6; i++) {
			var label = Ti.UI.createLabel({
		        left: i*40,
		        text: (lastDayPrMnth - 5) + i,
	        	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		        width:20,
		        height:20,
		        color: "#BBBBB3"
	    	});
	    	firstWeek.add(label);
		}
		
		var label = Ti.UI.createLabel({
			left: 6*40,
		    text: counter,
	        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	        width:20,
	        height:20,
	        color: "black",
		    labelId: counter + "." + (month+1) + "." + year
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
		firstWeek = Ti.UI.createTableViewRow();
		
		for (var i = 0; i < firstDay -1; i++) {
			var label = Ti.UI.createLabel({
		        left: prMonthCntr * 40,
		        text: lastDayPrMnth--,
	        	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		        width:20,
		        height:20,
		        color: "#BBBBB3"
	    	});
	    	prMonthCntr--;
	    	firstWeek.add(label);
		}
		
		for (; i < 7 ; i++ ) {
			var label = Ti.UI.createLabel({
		        left: i*40,
		        text: counter,
	        	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		        width:20,
		        height:20,
		        color: "black",
		        labelId: counter + "." + (month+1) + "." + year
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
			
			weekRow = Ti.UI.createTableViewRow();
			
			var label = Ti.UI.createLabel({
					left: innerCounter*40,
				    text: counter,
		        	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			        width:20,
			        height:20,
			        color: "black",
			        labelId: counter + "." + (month+1) + "." + year
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
				left: innerCounter*40,
			    text: counter,
	        	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		        width:20,
		        height:20,
		        color: "black",
		        labelId: counter + "." + (month+1) + "." + year
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
				left: innerCounter*40,
				text: nextMonthCntr++,
		        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		        width: 20,
		        height: 20,
			    color: "#BBBBB3"
			});
		weekRow.add(label);
	}
			
	tbl_data.push(weekRow);
	
	var table = Titanium.UI.createTableView({
		    data: tbl_data,
		    separatorColor: "transparent",
		    width: 285,
		    height: Ti.UI.SIZE,
		
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
    			
    	}
	});
	
	$.contain.add(table);
}

//Change to previos month

$.before.addEventListener('click', function(){
    $.contain.remove($.contain.children[1]);
    mon--;
    
    if(mon === -1){
    	y--;
    	mon = 11;
    }
    
    d.month(mon);
    n = d.format('MMMM').capitalizeFirstLetter();
    
    $.monthSelector.text = n + " " + y;
    showCalendar(y, mon);
});

//Change to next month

$.after.addEventListener('click', function(){
    $.contain.remove($.contain.children[1]);
    
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
	console.log('tap');
});


//базовая тестовая инфа


var myNotes = Alloy.Collections.notes;

//var note = Alloy.createModel('note', { 
//    title: "Тестовая запись",
//	description: "Описание",
//	parent: "25.3.2015",
//	dateFrom: "00",
//	dateTill: "01",
//	guests: "Фред",
//	color: 1,
//	monthNumber: 2 
//});

//myNotes.add(note);
//note.save();

myNotes.fetch();	

//Calendar initialization with current month
var d = moment();
	d.locale('ru');
var	mon = d.month(),
	n = d.format('MMMM').capitalizeFirstLetter(),
	y = d.year();

$.monthSelector.text = n + " " + y;
 
$.contain.open();

showCalendar(y, mon);





