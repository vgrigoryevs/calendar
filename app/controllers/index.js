var aboutView = $.mainView.getView('contain');

if(OS_IOS) { 
   $.navWindow.open();
   Alloy.Globals.mainWindow = $.navWindow;
} 
if (OS_ANDROID) { 
   $.mainView.contain.open(); 
}
