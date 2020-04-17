'use strict'
$(document).ready(function() {

	
   setTimeout(function() {

	$('#error').fadeOut(2000);

   },3000);


   var hs = document.getElementsByClassName('hs');
   var fecha =  document.getElementsByClassName('fecha');
   var hsExtTh = document.getElementById('hsExtTh');
   var hsExtTd = document.getElementById('hsExtTd');
 
  

 for(var i = 0; i < hs.length; i++){

   if((hs[i].innerHTML > 8.5)){
    
   hsExtTh.style.display = "block";
   }

 }





  










	
});
    
