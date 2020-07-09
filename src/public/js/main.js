$(document).ready(function() {

  function compare_dates(fecha, fecha2)  
  {  
    if(fecha2 == null){
      return false
    }
    var xDay=fecha.substring(8, 10);
    var xMonth=fecha.substring(5, 7);
    var xYear=fecha.substring(0,4);
    var yMonth=fecha2.substring(5, 7);  
    var yDay=fecha2.substring(8, 10);  
    var yYear=fecha2.substring(0,4);  

    
    console.log(xDay, xMonth, xYear);
    console.log(yDay, yMonth, yYear);
    
    if(xDay == yDay && xMonth == yMonth && xYear == yYear){
        return true
    } else{
        return false
    }
    
}
   setTimeout(function() {

	$('#error').fadeOut(2000);

   },3000);


   var hs = document.getElementsByClassName('hs');
   var ClassFecha =  document.getElementsByClassName('fecha');
   var hsExtTh = document.getElementById('hsExtTh');
   var hsExtTd = document.getElementById('hsExtTd');
   var fechainput = document.getElementById('fecha')
   var fecha_actual = new Date().toJSON().slice(0,10).replace(/-/g,'-')
  
 
  

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


//variables

$('#form_fecha').submit(function(event) {
  var fecha = fechainput.value;
    var fecha2 = ClassFecha[i];
    

//primero verifico que no haya ninguna fecha en la tabla de fechas
  if(fecha2 < 0){
    console.log("No hay fecha 2")
     $(this).off('submit').submit();
  }
  

//bucle para recorrer la tabla y comparar con la que se envia por el form
  
  for(var i=0; i < ClassFecha.length;i++){
    var fecha3 = ClassFecha[i].innerHTML
    Date.parse(fecha3)
    Date.parse(fecha_actual)
   
     
    if(fecha3 == 0 || fecha_actual < fecha){
      alert("Las fecha es mayor al dia de hoy");
      event.preventDefault();
      break;
    }
    if(compare_dates(fecha, fecha3)){
      alert("La fecha ya fue seleccionada, por favor seleccione otra");
      event.preventDefault();
      break;
    } 
  }
  

  

})


const tareas = [

  {cod:'RC' , descripcion:'Reparaciones en Campo'},
  {cod:'RT' , descripcion:'Reparaciones en Taller (Sede)'},
  {cod:'TG' , descriocion: 'Tareas Generales Taller (Sede'},
  {cod:'IE' , descripcion: 'Instrucciones entregas cliente'},
  {cod:'TT' , descripcion: 'Tiempo Translado'},
  {cod:'VC' , descripcion: 'Visita de Cortesia'}

]



$('#form_part').submit(function(event){

  event.preventDefault();

  var form_interno = $('#form_interno').val();
  var resultado = interno.find(inter => inter.cod === form_interno)
   if(resultado == undefined){
     alert("El interno no existe, por favor ingrese un interno de Sisbuso")
   }
   else{
    alert('Parte cargado con exito, agrega otro parte al mismo dia.')
    $(this).off('submit').submit();
   }



})



//Exportacion a EXCEL
function exportTableToExcel(tableID, filename = ''){
  var downloadLink;
  var dataType = 'application/vnd.ms-excel';
  var tableSelect = document.getElementById(tableID);
  var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
  
  // Specify file name
  filename = filename?filename+'.xls':'excel_data.xls';
  
  // Create download link element
  downloadLink = document.createElement("a");
  
  document.body.appendChild(downloadLink);
  
  if(navigator.msSaveOrOpenBlob){
      var blob = new Blob(['ufeff', tableHTML], {
          type: dataType
      });
      navigator.msSaveOrOpenBlob( blob, filename);
  }else{
      // Create a link to the file
      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
  
      // Setting the file name
      downloadLink.download = filename;
      
      //triggering the function
      downloadLink.click();
  }
}

$('.btn-export').click(function(event) {
  event.preventDefault();
  
exportTableToExcel('tblData','ExportExcel')

})




});
    
