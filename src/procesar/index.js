import convertirClass from '../empaquetado/convertir';
import ajustesObj from '../ajustes';
import binpacking from '../empaquetado';


export default class mercancia {

  constructor() {
    this.convertir = new convertirClass();


    this.items = [];

  }



  obtner_valores() {
    let valor = 0;
    let ancho = 0;

    ancho = parseFloat($("#ancho-radio-mercancia").val())
    
    // si el tipo de embalaje es barril, copiar el ancho-radio para el largo 
    if(parseInt($("#tipo-embalaje").val()) == 1){
      valor = ancho;
    }
    else{
      valor = parseFloat($("#largo-mercancia").val());
    }


    return {
      unidad_medida: parseInt($("#unidad-medida").val()),
      unidad_peso: parseInt($("#unidad-peso").val()),
      tipo_embalaje: parseInt($("#tipo-embalaje").val()),
      color_mercancia: $("#color-mercancia").val(),
      nombre_mercancia: $("#nombre-mercancia").val(),
      largo_mercancia: valor,
      ancho_radio_mercancia: ancho,
      alto_mercancia: parseFloat($("#alto-mercancia").val()),
      peso_mercancia: parseFloat($("#peso-mercancia").val()),
      cantidad_mercancia: parseInt($("#cantidad-mercancia").val())
    }
  }




  validar(objeto) {
    let error = {
      largo_mercancia: { error: false, detalle: [] },
      ancho_radio_mercancia: { error: false, detalle: [] },
      alto_mercancia: { error: false, detalle: [] },
      peso_mercancia: { error: false, detalle: [] },
      cantidad_mercancia: { error: false, detalle: [] },
      nombre_mercancia: { error: false, detalle: [] },
      peso_mercancia: { error: false, detalle: [] },
      cantidad_mercancia: { error: false, detalle: [] },
    }
    let mensaje = "";
    let warning_style = "background-color: yellow";




    if (parseInt($("[name='pallets']:checked").val()) == 0) {

      if(objeto.tipo_embalaje == 0 || objeto.tipo_embalaje == 2){
        // validar dimensiones en todas las posiciones (contenedores)
        if (ajustesObj.containers[1].d <= objeto.largo_mercancia) {
          error.largo_mercancia.error = true;
          error.largo_mercancia.detalle.push(`El valor excede los limites permitidos del contenedor.`);
        }
      }

      if (ajustesObj.containers[1].w <= objeto.ancho_radio_mercancia) {
        error.ancho_radio_mercancia.error = true;
        error.ancho_radio_mercancia.detalle.push(`El valor excede los limites permitidos del contenedor.`);
      }

      if (ajustesObj.containers[1].h <= objeto.alto_mercancia) {
        error.alto_mercancia.error = true;
        error.alto_mercancia.detalle.push(`El valor excede los limites permitidos del contenedor.`);
      }
    }

    else if (parseInt($("[name='pallets']:checked").val()) == 1) {

      if(objeto.tipo_embalaje == 0 || objeto.tipo_embalaje == 2){
        // validar dimensiones en todas las posiciones (pallets)
        if (ajustesObj.pallets.largo <= objeto.largo_mercancia) {
          error.largo_mercancia.error = true;
          error.largo_mercancia.detalle.push(`El valor excede los limites permitidos del pallet.`);
        }
      }

      if (ajustesObj.pallets.ancho <= objeto.ancho_radio_mercancia) {
        error.ancho_radio_mercancia.error = true;
        error.ancho_radio_mercancia.detalle.push(`El valor excede los limites permitidos del pallet.`);
      }

      if ((ajustesObj.containers[1].h - ajustesObj.pallets.alto) <= objeto.alto_mercancia) {
        error.alto_mercancia.error = true;
        error.alto_mercancia.detalle.push(`El valor excede los limites permitidos del pallet.`);
      }
    }


    // validar si los campos estan vacios 
    if (objeto.nombre_mercancia === "") {
      error.nombre_mercancia.error = true;
      error.nombre_mercancia.detalle.push(`No puede dejar el campo vacio.`);
    }
    if (isNaN(objeto.largo_mercancia)) {
      error.largo_mercancia.error = true;
      error.largo_mercancia.detalle.push(`No puede dejar el campo vacio.`);
    }
    if (isNaN(objeto.ancho_radio_mercancia)) {
      error.ancho_radio_mercancia.error = true;
      error.ancho_radio_mercancia.detalle.push(`No puede dejar el campo vacio.`);
    }
    if (isNaN(objeto.alto_mercancia)) {
      error.alto_mercancia.error = true;
      error.alto_mercancia.detalle.push(`No puede dejar el campo vacio.`);
    }
    if (isNaN(objeto.peso_mercancia)) {
      error.peso_mercancia.error = true;
      error.peso_mercancia.detalle.push(`No puede dejar el campo vacio.`);
    }
    if (isNaN(objeto.cantidad_mercancia)) {
      error.cantidad_mercancia.error = true;
      error.cantidad_mercancia.detalle.push(`No puede dejar el campo vacio.`);
    }

    // validar si los campos contiene valores no permitidos  
    let regex = /^[0-9.]+$/;
    if (objeto.largo_mercancia == 0 || !regex.test(objeto.largo_mercancia)) {
      error.largo_mercancia.error = true;
      error.largo_mercancia.detalle.push(`Solo se permiten números y deben ser mayores a cero (0).`);
    }
    if (objeto.ancho_radio_mercancia == 0 || !regex.test(objeto.ancho_radio_mercancia)) {
      error.ancho_radio_mercancia.error = true;
      error.ancho_radio_mercancia.detalle.push(`Solo se permiten números y deben ser mayores a cero (0).`);
    }
    if (objeto.alto_mercancia == 0 || !regex.test(objeto.alto_mercancia)) {
      error.alto_mercancia.error = true;
      error.alto_mercancia.detalle.push(`Solo se permiten números y deben ser mayores a cero (0).`);
    }
    if (objeto.peso_mercancia == 0 || !regex.test(objeto.peso_mercancia)) {
      error.peso_mercancia.error = true;
      error.peso_mercancia.detalle.push(`Solo se permiten números y deben ser mayores a cero (0).`);
    }
    if (objeto.cantidad_mercancia == 0 || !regex.test(objeto.cantidad_mercancia)) {
      error.cantidad_mercancia.error = true;
      error.cantidad_mercancia.detalle.push(`Solo se permiten números y deben ser mayores a cero (0).`);
    }







    // formar el mensaje de error 
    if (error.nombre_mercancia.error) {
      let ax = "";
      error.nombre_mercancia.detalle.map((v, k) => { ax += v; });
      mensaje += `<li> <p><span class="font-weight-bold">Nombre mercancia:</span> ${ax} </p></li>`;
      $("#nombre-mercancia").attr("style", warning_style);
    }
    else {
      $("#nombre-mercancia").attr("style", null);
    }
    if (error.largo_mercancia.error) {
      let ax = "";
      error.largo_mercancia.detalle.map((v, k) => { ax += v; });
      mensaje += `<li> <p><span class="font-weight-bold">Largo mercancia:</span> ${ax} </p></li>`;
      $("#largo-mercancia").attr("style", warning_style);
    }
    else {
      $("#largo-mercancia").attr("style", null);
    }
    if (error.ancho_radio_mercancia.error) {
      let ax = "";
      error.ancho_radio_mercancia.detalle.map((v, k) => { ax += v; });
      mensaje += `<li> <p><span class="font-weight-bold">Ancho o radio de la mercancia:</span> ${ax} </p></li>`;
      $("#ancho-radio-mercancia").attr("style", warning_style);
    }
    else {
      $("#ancho-radio-mercancia").attr("style", null);
    }
    if (error.alto_mercancia.error) {
      let ax = "";
      error.alto_mercancia.detalle.map((v, k) => { ax += v; });
      mensaje += `<li> <p><span class="font-weight-bold">Alto de la mercancia:</span> ${ax} </p></li>`;
      $("#alto-mercancia").attr("style", warning_style);
    }
    else {
      $("#alto-mercancia").attr("style", null);
    }
    if (error.peso_mercancia.error) {
      let ax = "";
      error.peso_mercancia.detalle.map((v, k) => { ax += v; });
      mensaje += `<li> <p><span class="font-weight-bold">Peso de la mercancia:</span> ${ax} </p></li>`;
      $("#peso-mercancia").attr("style", warning_style);
    }
    else {
      $("#peso-mercancia").attr("style", null);
    }
    if (error.cantidad_mercancia.error) {
      let ax = "";
      error.cantidad_mercancia.detalle.map((v, k) => { ax += v; });
      mensaje += `<li> <p><span class="font-weight-bold">Peso de la mercancia:</span> ${ax} </p></li>`;
      $("#cantidad-mercancia").attr("style", warning_style);
    }
    else {
      $("#cantidad-mercancia").attr("style", null);
    }







    if (
      error.nombre_mercancia.error ||
      error.largo_mercancia.error ||
      error.ancho_radio_mercancia.error ||
      error.alto_mercancia.error ||
      error.peso_mercancia.error ||
      error.cantidad_mercancia.error
    ) {
      // se encontraron errores
      Swal.fire({
        type: 'error',
        title: 'Error',
        confirmButtonText: 'Aceptar',
        html: `
        <p>Se encontraron errores al procesar sus datos. Se resaltarán los campos que necesiten su revisión</p>
        <ul class="text-left mt-3">
        ${mensaje}
        </ul>
        `
      })

      return false;
    }
    else {
      // sin errores
      return true;
    }




  }

  estandarizar(o) {

    // ===========================================
    // Unidades de peso 
    // ===========================================

    // libras a kilogramos 
    if (o.unidad_peso == 1) {

      // convertir...
      o.peso_mercancia = this.convertir.libras_a_kg(o.peso_mercancia);

      // indicar que la actual unidad es kilogramos
      o.unidad_peso = 0;
    }


    // ===========================================
    // Unidades de medida 
    // ===========================================

    // pulgadas a centimetros
    if (o.unidad_medida == 1) {

      // convertir...
      o.ancho_radio_mercancia = this.convertir.pulgadas_a_cm(o.ancho_radio_mercancia);
      o.alto_mercancia = this.convertir.pulgadas_a_cm(o.alto_mercancia);
      o.largo_mercancia = this.convertir.pulgadas_a_cm(o.largo_mercancia);

      // indicar la actual unidad de medida es centimetros 
      o.unidad_medida = 0
    }

    // pies a centimetros
    else if (o.unidad_medida == 2) {

      // convertir...
      o.ancho_radio_mercancia = this.convertir.pies_a_cm(o.ancho_radio_mercancia);
      o.alto_mercancia = this.convertir.pies_a_cm(o.alto_mercancia);
      o.largo_mercancia = this.convertir.pies_a_cm(o.largo_mercancia);

      // indicar la actual unidad de medida es centimetros 
      o.unidad_medida = 0
    }

    // milimetros a centimetros
    else if (o.unidad_medida == 3) {

      // convertir...
      o.ancho_radio_mercancia = this.convertir.milimetros_a_cm(o.ancho_radio_mercancia);
      o.alto_mercancia = this.convertir.milimetros_a_cm(o.alto_mercancia);
      o.largo_mercancia = this.convertir.milimetros_a_cm(o.largo_mercancia);

      // indicar la actual unidad de medida es centimetros 
      o.unidad_medida = 0
    }

    // metros a centimetros
    else if (o.unidad_medida == 4) {

      // convertir...
      o.ancho_radio_mercancia = this.convertir.metros_a_cm(o.ancho_radio_mercancia);
      o.alto_mercancia = this.convertir.metros_a_cm(o.alto_mercancia);
      o.largo_mercancia = this.convertir.metros_a_cm(o.largo_mercancia);

      // indicar la actual unidad de medida es centimetros 
      o.unidad_medida = 0
    }


    return o;
  }

  agregar_item_acordion() {
    let objeto = this.estandarizar(this.obtner_valores());

    if (this.validar(objeto)) {

      objeto.id = this.makeid(4);
      this.items.push(objeto)
      this.item_acordion(objeto);

      $("#nombre-mercancia").val(null)
      $("#largo-mercancia").val(null)
      $("#ancho-radio-mercancia").val(null)
      $("#alto-mercancia").val(null)
      $("#peso-mercancia").val(null)
      $("#cantidad-mercancia").val(null)

      this.randomcolor();

      Swal.fire({
        type: 'success',
        title: 'Ok',
        text: 'Item / bulto agregado',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      })

    }

  }


  item_acordion(objeto) {
    let acordion = `
        <div class="ac" data-id="${objeto.id}"   >
          <h2 class="ac-q" tabindex="1">
            ${objeto.nombre_mercancia} | ${this.convertir.tipo_embalaje(objeto.tipo_embalaje)} | ${objeto.cantidad_mercancia}
            <span style="height: 20px;
              width: 50px;
              background-color: #${objeto.color_mercancia};
              position: absolute;
              margin-left: 15px;
              border-radius: 40px;"></span>
          </h2>
          <div class="ac-a">

            <ul class="pl-3 pt-3">
              <li><span class="font-weight-bold">Unidad de medida:</span> ${this.convertir.unidad_medida(objeto.unidad_medida)}</li>
              <li><span class="font-weight-bold">Unidad de peso:</span> ${this.convertir.unidad_peso(objeto.unidad_peso)}</li>
              <li><span class="font-weight-bold">Tipo de embalaje:</span> ${this.convertir.tipo_embalaje(objeto.tipo_embalaje)}</li>
              <li><span class="font-weight-bold">Largo:</span> ${(objeto.tipo_embalaje != 1) ? objeto.largo_mercancia : "N/A" }</li>
              <li><span class="font-weight-bold">Ancho o radio:</span> ${objeto.ancho_radio_mercancia}</li>
              <li><span class="font-weight-bold">Alto:</span>  ${objeto.alto_mercancia}</li>
              <li><span class="font-weight-bold">Peso:</span> ${objeto.peso_mercancia}</li>
              <li><span class="font-weight-bold">Cantidad:</span> ${objeto.cantidad_mercancia}</li>
            </ul>
  
            <div class="float-right p-3">
              <button type="button" class="btn btn-outline-info btn" onclick = "procesar.copiar('${objeto.id}')" >Copiar</button>
              <button type="button" class="btn btn-outline-primary btn" onclick ="procesar.editar('${objeto.id}')" >Editar</button>
              <button type="button" class="btn btn-outline-secondary btn" onclick = "procesar.preEliminar('${objeto.id}')">Eliminar</button>
            </div>
          </div>
        </div>  
    `;


    $("#acordion-container").append(acordion);
    new Accordion('.accordion-container');


    var elmnt = document.getElementById("acordion-container");
    elmnt.scrollIntoView(true);

  }



  makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }






  preEliminar(id){
    Swal.fire({
      title: '¿Está seguro?',
      text: "Se eliminarán estos datos",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.value) {

        this.eliminar(id);
        
      }
    })
  }


  eliminar(id) {
    this.items.map((v, k) => {
      if (v.id == id) {
        this.items.splice(k, 1);
        $("[data-id='" + id + "']").remove();
      }
    });

    new Accordion('.accordion-container');
  }


  editar(id) {

    Swal.fire({
      type: 'info',
      title: 'Editar datos',
      text: 'Los valores para su edición fueron agregados en el panel lateral.',
      
    })





    this.items.map((v, k) => {
      if (v.id == id) {

        this.asignar_valores(v);

      }
    });


    this.eliminar(id);
  }

  asignar_valores(v) {
    $("#unidad-medida").val(v.unidad_medida);
    $("#unidad-peso").val(v.unidad_peso);
    $("#tipo-embalaje").val(v.tipo_embalaje);
    $("#color-mercancia").val(v.color_mercancia);
    $("#color-mercancia").attr("style", `background-color: #${v.color_mercancia}`);
    $("#nombre-mercancia").val(v.nombre_mercancia);
    $("#largo-mercancia").val(v.largo_mercancia);
    $("#ancho-radio-mercancia").val(v.ancho_radio_mercancia);
    $("#alto-mercancia").val(v.alto_mercancia);
    $("#peso-mercancia").val(v.peso_mercancia);
    $("#cantidad-mercancia").val(v.cantidad_mercancia);
    jscolor.installByClassName("jscolor")
  }

  copiar(id) {

    Swal.fire({
      type: 'info',
      title: 'Copiar datos',
      text: 'Los valores para su edición fueron agregados en el panel lateral.',
      
    })

    this.items.map((v, k) => {
      if (v.id == id) {
        this.asignar_valores(v);
      }
    })
  }




  randomcolor() {
    var text = "";
    var possible = "0123456789";

    for (var i = 0; i < 6; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    $("#color-mercancia").val(text).attr("style", "background-color: #" + text);
    jscolor.installByClassName("jscolor")
  }




  calcular() {

    // validar los items 
    if(this.items.length == 0){ 
      Swal.fire({
        type: 'error',
        title: 'Error',
        confirmButtonText: 'Aceptar',
        html: `
        <p>Se encontraron errores al procesar sus datos. 
        Debe agregar al menos un item o mercancia</p>
        `
      })

      return false
    }
    for (let i = 0; i < this.items.length; i++) {
      if (!this.validar(this.items[i])) {
        this.asignar_valores(this.items[i])
        this.eliminar(this.items[i].id);
        return false;
      }
    }


    // mostrar modal cargando 
    Swal.fire({
      type: "warning",
      title: "Advertencia",
      text: "El tiempo de procesado dependerá de los recursos de su computador.",
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
      allowEscapeKey: false,
      allowOutsideClick: false,
    }).then(() => {

      this.initProceso()
      
      
    });




      


  }

  initProceso(){



    //formar json para los items 
    let itemsArray = [];
    this.items.map((v, k) => {
      itemsArray.push({
        "name": v.nombre_mercancia,
        "t": v.tipo_embalaje,
        "ul": v.unidad_medida,
        "uw": v.unidad_peso,
        "d": v.largo_mercancia,
        "w": v.ancho_radio_mercancia,
        "h": v.alto_mercancia,
        "wg": v.peso_mercancia,
        "q": v.cantidad_mercancia,
        "color": v.color_mercancia,
      });
    });


    // rotacion 
    var rotacion = document.getElementsByName("rotacion");
    var rotacion_array = [];
    for (var i = 0; i < rotacion.length; i++) {
      if (rotacion[i].checked) {
        rotacion_array.push(parseInt(rotacion[i].value));
      }
      else {
        rotacion_array.push(1);
      }
    }

    // container tipo 
    var containers_tipo = document.getElementsByName("containers_tipo");
    var containers_tipo_arr = [];
    for (var i = 0; i < containers_tipo[0].options.length; i++) {
      if (containers_tipo[0].options[i].selected) {
        containers_tipo_arr.push(parseInt(containers_tipo[0].options[i].value));
      }
    }


    let ajustes = {
      "containers": parseInt($("[name='container']:checked").val()),
      "containers_tipo": containers_tipo_arr,
      "pallets": parseInt($("[name='pallets']:checked").val()),
      "apilable": parseInt($("[name='apilables']:checked").val()),
      "rotacion": rotacion_array,
    }






    // -------------------------------------------

    let a = JSON.parse(new binpacking(itemsArray, ajustes).main(true));
    let p = JSON.parse(new binpacking(itemsArray, ajustes).main(false));



    let arrayCont = [this.validar_conteiner(a), this.validar_conteiner(p)];
    let min = arrayCont.indexOf(Math.min( ...arrayCont ));




    let probA = 0;
    let probP = 0;

    if (this.validar_contenido(a) ) {
      if(min == 0){
        probA = 1;
      }
      else{
        probA += 0.5;
      }
    }
    
    if(this.validar_contenido(p)) {
      if(min == 1){
        probP = 1;
      }
      else{
        probP += 0.5;
      }      
    }



    console.log("probA", probA)
    console.log("probP", probP)
    
    if( probA > probP ){
      InitNewProblem(a);    
    }
    else if( probA < probP){
      InitNewProblem(p);    
    }
    else if( probA == 0 && probP == 0){
      Swal.fire({
        type: 'question',
        title: 'probabilidad 0 ',
        text: 'Resultados dieron una probabilidad 0.',
      })
    }
    else{
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: 'Ocurrió un error al procesar los datos.',
      })
    }

    
    
  }


  validar_contenido(box){
    let TotalReal = 0;
    let totalEnElContenedor = 0;
    
    // determinar el total de mercancia que deberia tener el 
    // contenedor 
    this.items.map((v, k) => {
      TotalReal += parseInt(v.cantidad_mercancia);
    });


    // recorrer el contenedor 
    box.box.map((v, k) => {

      try {
        // comprobar si el item tiene items dentro. 
        // si no genera un exception es un pallet 
        if(v.items[0].items.length > 0){
          v.items.map((v2,k2) => {
            totalEnElContenedor += v2.items.length;
          });
        }
      }
      catch(e) {

        // empaquetado sin pallets 
        totalEnElContenedor += v.items.length;
      }

      
      


    });

    if(TotalReal == totalEnElContenedor){
      return true;
    }
    else{
      return false;
    }
  }


validar_conteiner(box){
  const val40 = 1;
  const val20 = 0.5;
  let total = 0;

  box.box.map((v,k) =>{
    if(/40 pies/.test(v.name)){
      total += val40;
    }
    else if(/20 pies/.test(v.name)){
      total += val20;
    }
  })

  return total;
}





  debugvar(){

  // rotacion 
  var rotacion = document.getElementsByName("rotacion");
  var rotacion_array = [];
  for (var i = 0; i < rotacion.length; i++) {
    if (rotacion[i].checked) {
      rotacion_array.push(parseInt(rotacion[i].value));
    }
    else {
      rotacion_array.push(1);
    }
  }

  // container tipo 
  var containers_tipo = document.getElementsByName("containers_tipo");
  var containers_tipo_arr = [];
  for (var i = 0; i < containers_tipo[0].options.length; i++) {
    if (containers_tipo[0].options[i].selected) {
      containers_tipo_arr.push(parseInt(containers_tipo[0].options[i].value));
    }
  }


  let ajustes = {
    "containers": parseInt($("[name='container']:checked").val()),
    "containers_tipo": containers_tipo_arr,
    "pallets": parseInt($("[name='pallets']:checked").val()),
    "apilable": parseInt($("[name='apilables']:checked").val()),
    "rotacion": rotacion_array,
  }



    let final = {
      "ajustes": ajustes,
      "items": this.items
    }

    console.log(final);
    navigator.clipboard.writeText(JSON.stringify(this.items));
  }











  test(){
    let valor = [
      ["1 plts", 1200, 1000, 1100, 10, 1, 3],
      ["2 plts", 1200, 1000, 1100, 10, 2, 3],
      ["4 plts", 1200, 1000, 1250, 10, 4, 3],
      ["9 plts", 1200, 1000, 1250, 10, 9, 3],
      ["16 plts", 400, 300, 300, 10, 16, 3],
    ]

    valor.map((v, k) => {
      $("#unidad-medida").val(v[6]);
      
      $("#nombre-mercancia").val(v[0]);
      $("#largo-mercancia").val(v[1]);
      $("#ancho-radio-mercancia").val(v[2]);
      $("#alto-mercancia").val(v[3]);
      $("#peso-mercancia").val(v[4]);
      $("#cantidad-mercancia").val(v[5]);

      this.agregar_item_acordion();

    })



  }





}