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

 //Agrega estilos a pestaña activa (Navbar)
 var url = window.location.pathname;
 var filename = url.substring(url.lastIndexOf('/')+1);8
 $(".menu_activo").removeClass("menu_activo");

 if(url == "/"){
  $('.nav-link[href="/"]').addClass("menu_activo");
 } else{
  $(".menu_activo").removeClass("menu_activo");
  $('.nav-link[href="../users/' + filename + '"]').addClass("menu_activo");
 }


//manejo de restricciones (Fecha) 











	
});
    
