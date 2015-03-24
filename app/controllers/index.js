
function showCalendar(year, month){

var tbl_data = [],
	month = month - 1,
	tableHeader = Ti.UI.createTableViewRow(),
	weekRow = Ti.UI.createTableViewRow(),
	weekDays = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
	firstDay = new Date(year, month, 1).getDay(),
	lastDay = new Date(year, month + 1, 0).getDate(),
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
	        text: " ",
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


$.monthView.data = tbl_data;

}

$.monthSelector.addEventListener('click', function(){
    $.contain.remove($.contain.children[1]);
});

var d = new Date();
var month = [];
month[0] = "Январь";
month[1] = "Февраль";
month[2] = "Март";
month[3] = "Апрель";
month[4] = "Май";
month[5] = "Июнь";
month[6] = "Июль";
month[7] = "Август";
month[8] = "Сентябрь";
month[9] = "Октябрь";
month[10] = "Ноябрь";
month[11] = "Декабрь";
var n = month[d.getMonth()];

$.monthSelector.text = n;
 
$.contain.open();


showCalendar(2015, 2);
