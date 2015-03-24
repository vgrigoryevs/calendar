var tbl_data = [],
	tableHeader = Ti.UI.createTableViewRow(),
	weekRow = Ti.UI.createTableViewRow(),
	weekDays = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
	month = 3,
	firstDay = new Date(2015, month, 1).getDay(),
	lastDay = new Date(2015, month + 1, 0).getDate(),
	lastDayPrMnth = new Date(2015, month, 0).getDate(),
	counter = 1,
	innerCounter = 0,
	nextMonthCntr = 1;

//Заголовок календаря
for(var i = 0; i < 7; i++) {
	var label = Ti.UI.createLabel({
        left: i*40,
        text: weekDays[i],
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width:20,
        height:20
    });
    
    tableHeader.add(label);
}
tbl_data.push(tableHeader);

//Первая неделя

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
	        height:20
    	});
    	firstWeek.add(label);
	}
	
	var label = Ti.UI.createLabel({
		left: 6*40,
	    text: counter++,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width:20,
        height:20
    });
    
    firstWeek.add(label);
	tbl_data.push(firstWeek);	
}

else {
	firstWeek = Ti.UI.createTableViewRow();
	
	for (var i = 0; i < firstDay -1; i++) {
		var label = Ti.UI.createLabel({
	        left: i*40,
	        text: lastDayPrMnth--,
        	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	        width:20,
	        height:20
    	});
    	
    	firstWeek.add(label);
	}
	
	for (; i < 7 ; i++ ) {
		var label = Ti.UI.createLabel({
	        left: i*40,
	        text: counter++,
        	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	        width:20,
	        height:20
    	});
    	
    	firstWeek.add(label);
	}
	
	tbl_data.push(firstWeek);	
}

//Недели календаря

while(counter <= lastDay) {
	
	if(innerCounter === 7) {
		
		innerCounter = 0;
		tbl_data.push(weekRow);
		
		weekRow = Ti.UI.createTableViewRow();
		
		var label = Ti.UI.createLabel({
			left: innerCounter*40,
		    text: counter++,
        	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	        width:20,
	        height:20
	    });
	    innerCounter++;
	    weekRow.add(label);
		
	}
	
	else {
		
		var label = Ti.UI.createLabel({
			left: innerCounter*40,
		    text: counter++,
        	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	        width:20,
	        height:20
	    });
	    innerCounter++;
	    weekRow.add(label);
	}
	
}

for(;innerCounter < 7 ; innerCounter++) {
	var label = Ti.UI.createLabel({
		left: innerCounter*40,
		text: nextMonthCntr++,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width:20,
        height:20
	});
	weekRow.add(label);
}
		
tbl_data.push(weekRow);

var table = $.month;
table.data = tbl_data;
 
$.contain.open();
