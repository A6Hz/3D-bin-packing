import convertirClass from '../empaquetado/convertir';
import ajustesObj from '../ajustes';
import binpacking from '../empaquetado';


export default class mercancia {

  constructor() {
    this.convertir = new convertirClass();


    this.items = [];

  }



  obtner_valores() {
    return {
      unidad_medida: parseInt($("#unidad-medida").val()),
      unidad_peso: parseInt($("#unidad-peso").val()),
      tipo_embalaje: parseInt($("#tipo-embalaje").val()),
      color_mercancia: $("#color-mercancia").val(),
      nombre_mercancia: $("#nombre-mercancia").val(),
      largo_mercancia: parseFloat($("#largo-mercancia").val()),
      ancho_radio_mercancia: parseFloat($("#ancho-radio-mercancia").val()),
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
      // validar dimensiones en todas las posiciones (contenedores)
      if (
        ajustesObj.containers[1].w <= objeto.largo_mercancia ||
        ajustesObj.containers[1].h <= objeto.largo_mercancia ||
        ajustesObj.containers[1].d <= objeto.largo_mercancia) {
        error.largo_mercancia.error = true;
        error.largo_mercancia.detalle.push(`El valor excede los limites permitidos del contenedor.`);
      }

      if (
        ajustesObj.containers[1].w <= objeto.ancho_radio_mercancia ||
        ajustesObj.containers[1].h <= objeto.ancho_radio_mercancia ||
        ajustesObj.containers[1].d <= objeto.ancho_radio_mercancia) {
        error.ancho_radio_mercancia.error = true;
        error.ancho_radio_mercancia.detalle.push(`El valor excede los limites permitidos del contenedor.`);
      }

      if (
        ajustesObj.containers[1].w <= objeto.alto_mercancia ||
        ajustesObj.containers[1].h <= objeto.alto_mercancia ||
        ajustesObj.containers[1].d <= objeto.alto_mercancia) {
        error.alto_mercancia.error = true;
        error.alto_mercancia.detalle.push(`El valor excede los limites permitidos del contenedor.`);
      }
    }

    else if (parseInt($("[name='pallets']:checked").val()) == 1) {
      // validar dimensiones en todas las posiciones (pallets)
      if (
        ajustesObj.pallets.ancho <= objeto.largo_mercancia ||
        ajustesObj.containers[1].h <= objeto.largo_mercancia ||
        ajustesObj.pallets.largo <= objeto.largo_mercancia) {
        error.largo_mercancia.error = true;
        error.largo_mercancia.detalle.push(`El valor excede los limites permitidos del pallet.`);
      }

      if (
        ajustesObj.pallets.ancho <= objeto.ancho_radio_mercancia ||
        ajustesObj.containers[1].h <= objeto.ancho_radio_mercancia ||
        ajustesObj.pallets.largo <= objeto.ancho_radio_mercancia) {
        error.ancho_radio_mercancia.error = true;
        error.ancho_radio_mercancia.detalle.push(`El valor excede los limites permitidos del pallet.`);
      }

      if (
        ajustesObj.pallets.ancho <= objeto.alto_mercancia ||
        ajustesObj.containers[1].h <= objeto.alto_mercancia ||
        ajustesObj.pallets.largo <= objeto.alto_mercancia) {
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
      o.unidad_medida = 2
    }

    // milimetros a centimetros
    else if (o.unidad_medida == 3) {

      // convertir...
      o.ancho_radio_mercancia = this.convertir.milimetros_a_cm(o.ancho_radio_mercancia);
      o.alto_mercancia = this.convertir.milimetros_a_cm(o.alto_mercancia);
      o.largo_mercancia = this.convertir.milimetros_a_cm(o.largo_mercancia);

      // indicar la actual unidad de medida es centimetros 
      o.unidad_medida = 3
    }

    // metros a centimetros
    else if (o.unidad_medida == 4) {

      // convertir...
      o.ancho_radio_mercancia = this.convertir.metros_a_cm(o.ancho_radio_mercancia);
      o.alto_mercancia = this.convertir.metros_a_cm(o.alto_mercancia);
      o.largo_mercancia = this.convertir.metros_a_cm(o.largo_mercancia);

      // indicar la actual unidad de medida es centimetros 
      o.unidad_medida = 4
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
              <li><span class="font-weight-bold">Largo:</span> ${objeto.largo_mercancia}</li>
              <li><span class="font-weight-bold">Ancho:</span> ${objeto.ancho_radio_mercancia}</li>
              <li><span class="font-weight-bold">Alto:</span>  ${objeto.alto_mercancia}</li>
              <li><span class="font-weight-bold">Peso:</span> ${objeto.peso_mercancia}</li>
              <li><span class="font-weight-bold">Cantidad:</span> ${objeto.cantidad_mercancia}</li>
            </ul>
  
            <div class="float-right p-3">
              <button type="button" class="btn btn-outline-info btn" onclick = "procesar.copiar('${objeto.id}')" >Copiar</button>
              <button type="button" class="btn btn-outline-primary btn" onclick ="procesar.editar('${objeto.id}')" >Editar</button>
              <button type="button" class="btn btn-outline-secondary btn" onclick = "procesar.eliminar('${objeto.id}')">Eliminar</button>
            </div>
          </div>
        </div>  
    `;


    $("#acordion-container").append(acordion);
    new Accordion('.accordion-container');

  }



  makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
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
      html: `
        <div class="animated pulse infinite cargando-img "></div>
        <span class="d-block pt-3">Cargando...</span>
      `,
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      onClose: function () {
        setTimeout(function () {
          var elmnt = document.getElementById("div-sim-3d");
          elmnt.scrollIntoView(true);
        }
          , 1000);
      },

    });




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

    if (a.box.length < p.box.length) {
      if (a.box.length != 0) {
        InitNewProblem(a);
      }
    }
    else if (p.box.length != 0) {
      InitNewProblem(p);
    }


  }

}