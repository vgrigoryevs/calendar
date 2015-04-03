
exports.createModalPicker = function(picker, saveBtnTap, cancelBtnTap) {
	var view = Titanium.UI.createView({
	    		bottom: -600,
	    		opacity: 0,
	  
	    	});
	    	
	    	var buttonsHolder = Titanium.UI.createView({
	    		bottom: 0,
	    		height: 30,
	    		backgroundColor: 'white'
	    	});
	    	
	    	var okBtn = Titanium.UI.createButton({
	    		left: 50,
	    		title: "OK"
	    	});
	    	
	    	okBtn.addEventListener('click', function(){
	    		saveBtnTap();
	    	});
	    	
	    	var cancelBtn = Titanium.UI.createButton({
	    		right: 50,
	    		title: "Отмена"
	    	});
	    	
	    	cancelBtn.addEventListener('click', function(){
	    		backgroundView.animate(closeModal);
	    		view.animate(closePicker);
	    		
	    		cancelBtnTap();
	    	});
	    	
	    	var backgroundView = Titanium.UI.createView({
	    		height: "100%",
	    		bottom: 0,
	    		opacity: 0,
	    		backgroundColor: "gray"
	    	});
	    	
	    	picker.bottom = 30;
	    	
	    	
	    	var showPicker = Ti.UI.createAnimation();
		    showPicker.duration = 300;
		    showPicker.opacity = 1;
		    showPicker.bottom = 0;
		    
		    var showModal = Ti.UI.createAnimation();
		    showModal.duration = 300;
		    showModal.opacity = "0.5";
		    
		    var closePicker = Ti.UI.createAnimation();
		    closePicker.duration = 300;
		    closePicker.opacity = 0;
		    closePicker.bottom = -600;
		    
		    var closeModal = Ti.UI.createAnimation();
		    closeModal.duration = 300;
		    closeModal.opacity = 0;
	
	    	buttonsHolder.add(okBtn);
	    	buttonsHolder.add(cancelBtn);
	    	view.add(backgroundView);
	    	view.add(picker);
	    	view.add(buttonsHolder);
	    		    	
	    	backgroundView.animate(showModal);
	    	view.animate(showPicker);
	 		
	 		return view;
};