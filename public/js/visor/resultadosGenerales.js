

function resultadosGenerales(){
  
  Cantidad_cont_resumen();
  Cantidad_total_de_bultos();
  Peso_total_de_bultos();
  volumen_paquetes();
  cantidadepalletsGlobales();

  Volumendelcontenedordisponible();
  Pesodisponibleenelcontenedor();
  Pesomaximopermitidoalcargarenelcontenedor();
  Volumendelcontenedordisponibleovacio();
  Volumendelcontenedorusableaproximado();
}





function Cantidad_cont_resumen(){
  var Cantidad_de_contenedor_tipo = "";
  var cont20 = 0;
  var cont40 = 0;

  for(var i = 0; i <Boxes.box.length; i++){
    if(/20 pies/.test(Boxes.box[i].name)){
      cont20 +=  1;
    }
    else if(/40 pies/.test(Boxes.box[i].name)){
      cont40 +=  1;
    }

    
  }

  

  // 
  if(cont20 != 0){
    Cantidad_de_contenedor_tipo +=  "<p>" + cont20 + " x Contenedor de 20 pies. </p>";
  }
  if(cont40 != 0){
    Cantidad_de_contenedor_tipo +=  "<p>" + cont40 + " x Contenedor de 40 pies. </p>" ;
  }

  

  // cuantos contenedores son 
  $("#Cantidad_cont_resumen").html(Cantidad_de_contenedor_tipo)
}

function Cantidad_total_de_bultos(){
  var cont = 0;

  for(var i = 0; i <Boxes.box.length; i++){
    cont += Boxes.box[i].total_paquetes;
  }

  $("#cantitad_total_de_paquetesTabla").html(cont)
}

function Peso_total_de_bultos(){
  var cont = 0;

  for(var i = 0; i <Boxes.box.length; i++){
    cont += Boxes.box[i].peso_total_paquetes;
  }

  $("#pesoTotal").html(cont)
}

function volumen_paquetes(){
  var cont = 0;
  var detalle = "";

  for(var i = 0; i <Boxes.box.length; i++){
    cont += parseFloat(Boxes.box[i].volumen_paquetes);
  }

  detalle = `
    <p> ${cont} cm<sup>3</sup>. </p>
    <p> ${conversor.cm3_a_m3(cont)} m<sup>3</sup>.</p>
    <p> ${conversor.cm3_a_pies3(cont)} pies<sup>3</sup>.</p>`;
  $("#volumen_paquetes").html(detalle);


}

function cantidadepalletsGlobales(){
  var cantidadPallets = 0;
  var resultado = "";

  for(var i = 0; i <Boxes.box.length; i++){

    for(var a = 0; a <Boxes.box[i].items.length; a++ ){

      try{
        if(Boxes.box[i].items[a].items.length){
          cantidadPallets += 1;
        }
      }
      catch(w){
        null
      }
    }

  }
  

  if(cantidadPallets == 0){
    resultado = "N/A";
  }
  else{
    resultado = cantidadPallets;
  }

  $("#cantidadPalletsGlobales").html(resultado);
}




function Volumendelcontenedordisponible(){
  var volumenContainer = 0;
  var detalle = "";
  for(var i = 0; i <Boxes.box.length; i++){

    if(/20 pies/.test(Boxes.box[i].name)){ 
      // 30 
      volumenContainer = (30000000 - Boxes.box[i].volumen_paquetes );
    }
    if(/40 pies/.test(Boxes.box[i].name)){

      // 65 
      volumenContainer = ( 65000000 - Boxes.box[i].volumen_paquetes );
    }

    

    detalle += `<p class="pl-3"> <span class="font-weight-bold"> ${Boxes.box[i].name}:</span> ${conversor.cm3_a_m3(volumenContainer)} m<sup>3</sup></p>`
  }



  $("#Volumendelcontenedordisponible").html(detalle);


}

function Pesodisponibleenelcontenedor(){

  var detalle = "";
  for(var i = 0; i <Boxes.box.length; i++){
    var peso = (Boxes.box[i].peso_maximo_container - Boxes.box[i].peso_total_paquetes);

    detalle += `<p class="pl-3"> <span class="font-weight-bold"> ${Boxes.box[i].name}:</span> ${peso} kg</p>`
  }

  $("#Pesodisponibleenelcontenedor").html(detalle);
}

function Pesomaximopermitidoalcargarenelcontenedor(){
  var detalle = "";
  for(var i = 0; i <Boxes.box.length; i++){
    detalle += `<p class="pl-3"> <span class="font-weight-bold"> ${Boxes.box[i].name}:</span> ${Boxes.box[i].peso_maximo_container} kg</p>`
  }

  $("#Pesomaximopermitidoalcargarenelcontenedor").html(detalle);
}

function Volumendelcontenedordisponibleovacio(){
  var detalle = "";
  for(var i = 0; i <Boxes.box.length; i++){

    var vol_cont = (Boxes.box[i].d * Boxes.box[i].h * Boxes.box[i].w);
  
    detalle += `<p class="pl-3"> <span class="font-weight-bold"> ${Boxes.box[i].name}:</span> ${ conversor.cm3_a_m3(vol_cont) } m<sup>3</sup>.</p>`
  }

  $("#Volumendelcontenedordisponibleovacio").html(detalle);
}

function Volumendelcontenedorusableaproximado(){
  var detalle = "";
  for(var i = 0; i <Boxes.box.length; i++){
    //var vol_cont = (Boxes.box[i].d * Boxes.box[i].h * Boxes.box[i].w);

    if(/20 pies/.test(Boxes.box[i].name)){
      detalle += `<p class="pl-3"> <span class="font-weight-bold"> ${Boxes.box[i].name}:</span> 30 m<sup>3</sup>.</p>`
    }
    if(/40 pies/.test(Boxes.box[i].name)){
      detalle += `<p class="pl-3"> <span class="font-weight-bold"> ${Boxes.box[i].name}:</span> 65 m<sup>3</sup>.</p>`
    }
  
  }

  $("#Volumendelcontenedorusableaproximado").html(detalle);
}

