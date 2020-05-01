  $(document).ready(function() {

    //Funcion fechant
    function compare_dates(fecha, fecha2)  
  {  
    if(fecha2 == null){
      return false
    }
    var xMonth=fecha.substring(3, 5);  
    var xDay=fecha.substring(0, 2);  
    var xYear=fecha.substring(6,10);  
    var yMonth=fecha2.substring(3, 5);  
    var yDay=fecha2.substring(0, 2);  
    var yYear=fecha2.substring(6,10);  
    if (xYear == yYear)  
    {  
        return(true)  
    }  
    else  
    {  
      if (xYear == yYear)  
      {   
        if (xMonth == yMonth)  
        {  
            return(true)  
        }  
        else  
        {   
          if (xMonth == yMonth)  
          {  
            if (xDay == yDay)  
              return(true);  
            else  
              return(false);  
          }  
          else  
            return(false);  
        }  
      }  
      else  
        return(false);  
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
    console.log(ClassFecha[i].innerHTML)
    console.log(fechainput.value)
    if(compare_dates(fecha, fecha3)){
      alert("Las fecha ya fue seleccionada, por favor seleccione otra");
      event.preventDefault();
      break;
    } 
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
    
