module.exports = class packing {

  constructor(items, ajustes) {

    // libreria 
    const BinPacking = require('./bp3d');

    // generar el json compatible con el viewer 
    const json = require("./json.js");

    const conv = require("./convertir.js");

    this.Item = BinPacking.Item;
    this.Bin = BinPacking.Bin;
    this.Packer = BinPacking.Packer;

    this.packer = new this.Packer();
    this.j = new json();

    this.c = new conv();


    this.ajustesObj = require("../ajustes.js");
    
    this.items = items;

    // definir dimensiones  containers en cm 
    this.containers = [];


    // lista de containers generados por bp3d
    this.containersFinal = [];

    this.itemsPacker = [];




    this.ajustes = ajustes;



    this.medidaPallet = this.ajustesObj.default.pallets;



  }

  verificar_si_entran_en_unode_40(forzar40) {
    let volumen = 0;
    let peso = 0;

    this.itemsPacker.forEach((value, index) => {
      if (value.t == 0 || value.t == 2) {
        volumen += (value.width * value.height * value.depth);
        peso += (value.weight);
      }
      else if (value.t == 1) {
        volumen += Math.PI * (Math.pow(value.width, 2) * value.height);
        peso += value.weight;
      }
    });

    // container de 20 pies 
    let volumen_container = (this.containers[0].w * this.containers[0].h * this.containers[0].d);





    // si el volumen o el peso de la mercancia es mayor al del container de 20 pies, devolver el de 40
    if (forzar40) {
      return this.containers[1];
    }
    else {
      if (volumen > volumen_container || peso > this.containers[0].mw) {
        return this.containers[1];
      }
      else {
        return this.containers[0];
      }

    }

  }




  // las medidas base estan en cm 
  inicializar_containers() {
    let containers = this.ajustesObj.default.containers;

    // modo de seleccion automatica del container 
    if (this.ajustes.containers == 0) {
      this.containers = containers;
    }

    // modo de seleccion manual. Es definido por el usuario 
    else if (this.ajustes.containers == 1) {

      let aux = [];
      this.ajustes.containers_tipo.forEach((value, index) => {
        aux.push(containers[value]);
      })

      this.containers = aux;

    }

  }



  // ======================================================================
  // recorrer lista de items para agregarlos al packer
  // ======================================================================
  insertar_items_packer() {
    if (this.itemsPacker.length == 0) {
      //this.identificar("ITEMS CREADOS");

      this.items.forEach((value, index) => {

        // paralelepidos 
        if (value.t == 0 || value.t == 2) {
          for (let a = 0; a < this.items[index].q; a++) {
            let item = new this.Item(
              this.items[index].name + " " + (a + 1),
              this.items[index].w,
              this.items[index].h,
              this.items[index].d,
              this.items[index].wg,
              this.items[index].t,
              this.ajustes.apilable,
              this.ajustes.rotacion,
              this.items[index].color,
            );

            this.packer.addItem(item);
            this.itemsPacker.push(item)
            //console.log(item.id);
          }
        }
        // cilindros 
        else if (value.t == 1) {
          for (let a = 0; a < this.items[index].q; a++) {
            let item = new this.Item(
              this.items[index].name + " " + (a + 1),
              this.items[index].w,
              this.items[index].h,
              this.items[index].w,
              this.items[index].wg,
              this.items[index].t,
              this.ajustes.apilable,
              this.ajustes.rotacion,
              this.items[index].color,
            );

            this.packer.addItem(item);
            this.itemsPacker.push(item)
            //console.log(item.id);
          }
        }




      });


    }
    else {
      for (let i = 0; i < this.itemsPacker.length; i++) { 
        this.itemsPacker[i].position = [];
        this.packer.addItem(this.itemsPacker[i]);
      }
    }



  }






  insertar_items_packer_pallets() {
    if (this.itemsPacker.length == 0) {
      //this.identificar("ITEMS CREADOS");

      this.items.forEach((value, index) => {

        // paralelepidos 
        if (value.t == 0 || value.t == 2) {
          for (let a = 0; a < this.items[index].q; a++) {
            let item = new this.Item(
              this.items[index].name /*+ " " + (a + 1)*/,
              this.items[index].w,
              this.items[index].h,
              this.items[index].d,
              this.items[index].wg,
              this.items[index].t,
              this.ajustes.apilable,
              this.ajustes.rotacion,
              this.items[index].color,
            );

            this.packer.addItem(item);
            this.itemsPacker.push(item)
            //console.log(item.id);
          }
        }
        // cilindros 
        else if (value.t == 1) {
          for (let a = 0; a < this.items[index].q; a++) {
            let item = new this.Item(
              this.items[index].name /*+ " " + (a + 1)*/,
              this.items[index].w,
              this.items[index].h,
              this.items[index].w,
              this.items[index].wg,
              this.items[index].t,
              this.ajustes.apilable,
              this.ajustes.rotacion,
              this.items[index].color,
            );

            this.packer.addItem(item);
            this.itemsPacker.push(item)
            //console.log(item.id);
          }
        }




      });


    }
    else {
      for (let i = 0; i < this.itemsPacker.length; i++) { console.log(this.itemsPacker[i]) // demo
        this.itemsPacker[i].position = [];
        this.packer.addItem(this.itemsPacker[i]);
      }
    }


  }





  identificar(string) {
    let final = string + " ";
    let cantidad = 50 - string.length;
    for (let i = 0; i < cantidad; i++) {
      final += "=";
    }
    console.log("\n" + final);
  }



  verificarItemsNoEntraron() {


    for (let i = 0; i < this.containersFinal.length; i++) {
      for (let a = 0; a < this.containersFinal[i].items.length; a++) {

        let aux = [];
        for (let c = 0; c < this.itemsPacker.length; c++) {
          aux.push(this.itemsPacker[c].id);
        }

        let index = aux.findIndex(valor => valor == this.containersFinal[i].items[a].id);

        if (index >= 0) {
          //console.log("Elinado: ", this.itemsPacker[index].id);
          this.itemsPacker.splice(index, 1);
        }

      }
    }

    //this.identificar("ITEMS RESTANTES EN LA LISTA ");
    //console.log(this.itemsPacker);
  }

  generarContainers_old(auxContadorContainer) {
    let container = "";
    for (var i = 0; i < this.containers.length; i++) {
      container = new this.Bin(
        this.containers[i].name + " " + auxContadorContainer,
        this.containers[i].w,
        this.containers[i].h,
        this.containers[i].d,
        this.containers[i].mw
      );
      this.containersFinal.push(container);
      this.packer.addBin(container);
    }

  }


  generarContainers(container, auxContadorContainer) {
    let containerax = new this.Bin(
      container.name + " " + auxContadorContainer,
      container.w,
      container.h,
      container.d,
      container.mw);

    this.containersFinal.push(containerax);
    this.packer.addBin(containerax);
  }


  // implementacion del algoritmo Ordenamiento_de_burbuja.
  // de mayor a menor
  // https://es.wikipedia.org/wiki/Ordenamiento_de_burbuja 
  ordenar_items() {
    for (let z = 1; z < this.items.length; ++z) {
      for (let v = 0; v < (this.items.length - z); ++v) {
        if (this.items[v].w < this.items[v + 1].w && this.items[v].h < this.items[v + 1].h && this.items[v].d < this.items[v + 1].d) {
          let aux = this.items[v]
          this.items[v] = this.items[v + 1];
          this.items[v + 1] = aux;
        }
      }
    }
  }

  estandarizar_items() {
    this.items.forEach((value, index) => {
      // libras a kg 
      if (value.uw == 1) {
        this.items[index].wg = this.c.libras_a_kg(value.wg);
      }

      // pulgadas a cm 
      if (value.ul == 1) {
        console.log("entrada: ", value.w)
        console.log("salida: ", this.c.pulgadas_a_cm(value.w))

        this.items[index].w = this.c.pulgadas_a_cm(value.w)
        this.items[index].h = this.c.pulgadas_a_cm(value.h)
        this.items[index].d = this.c.pulgadas_a_cm(value.d)
      }

      // pies a cm 
      if (value.ul == 2) {
        this.items[index].w = this.c.pies_a_cm(value.w)
        this.items[index].h = this.c.pies_a_cm(value.h)
        this.items[index].d = this.c.pies_a_cm(value.d)
      }

      // milemetros a cm 
      if (value.ul == 3) {
        this.items[index].w = this.c.milimetros_a_cm(value.w)
        this.items[index].h = this.c.milimetros_a_cm(value.h)
        this.items[index].d = this.c.milimetros_a_cm(value.d)
      }
      // metros a cm 
      if (value.ul == 4) {
        this.items[index].w = this.c.metros_a_cm(value.w)
        this.items[index].h = this.c.metros_a_cm(value.h)
        this.items[index].d = this.c.metros_a_cm(value.d)
      }





    });


    console.log("items procesadal \n ", this.items)
  }


  rotar_items(containersCreados) {



    containersCreados.forEach((valueBin, indexBin) => {


      valueBin.items.forEach((valueItem, indexItem) => {
        let w = valueItem.width;
        let h = valueItem.height;
        let d = valueItem.depth;

        switch (valueItem.rotationType) {
          case 1:
            // HWD 
            containersCreados[indexBin].items[indexItem].width = h;
            containersCreados[indexBin].items[indexItem].height = w;
            containersCreados[indexBin].items[indexItem].depth = d;
            break;
          case 2:
            // HDW 
            containersCreados[indexBin].items[indexItem].width = h; //d;
            containersCreados[indexBin].items[indexItem].height = d; //h;
            containersCreados[indexBin].items[indexItem].depth = w; //w;
            break;
          case 3:
            // DHW 
            containersCreados[indexBin].items[indexItem].width = d;
            containersCreados[indexBin].items[indexItem].height = h;
            containersCreados[indexBin].items[indexItem].depth = w;
            break;
          case 4:
            // DWH 
            containersCreados[indexBin].items[indexItem].width = d;
            containersCreados[indexBin].items[indexItem].height = w;
            containersCreados[indexBin].items[indexItem].depth = h;
            break;
          case 5:
            // WDH 
            containersCreados[indexBin].items[indexItem].width = w;
            containersCreados[indexBin].items[indexItem].height = d;
            containersCreados[indexBin].items[indexItem].depth = h;
            break;

        }


      });



    });


    return containersCreados;
  }








  empaquetar_sin_pallets(forzar40) {

    // empaquetar 
    let auxContadorContainer = 1;

    while (true) {

      // insertar items 
      this.insertar_items_packer();

      if (this.ajustes.containers == 0) {
        let bin = this.verificar_si_entran_en_unode_40(forzar40);
        // generar los containers
        this.generarContainers(bin, auxContadorContainer++);
      }
      else {
        this.generarContainers_old(auxContadorContainer++)
      }

      // empaquetar los items dentro de los containers
      this.packer.pack();
      //this.identificar("ITEMS EMPAQUETADOS");

      // comprobar items que no entraron 
      this.verificarItemsNoEntraron();

      console.log(this.itemsPacker);

      if (this.itemsPacker.length == 0 || auxContadorContainer > 50) { break; }


    }


    // Guardar en "containersCreados" solo los containers que tengan items dentro 
    this.identificar("\n\n\n\nRESULTADO ");
    let containersCreados = [];
    for (var i = 0; i < this.containersFinal.length; i++) {
      if (this.containersFinal[i].items.length != 0) {
        containersCreados.push(this.containersFinal[i]);
      }
    }


    containersCreados = this.rotar_items(containersCreados);

    console.log(/*"%o",*/ containersCreados)
    return this.j.generar_json(containersCreados);


  }



  crear_contenedor_pallet(container) {
    let containerax = new this.Bin(
      "Pallet para container de " + container.name,
      this.medidaPallet.ancho,
      (container.h - this.medidaPallet.alto),
      this.medidaPallet.largo,
      this.medidaPallet.maximopeso);

    this.containersFinal.push(containerax);
    this.packer.addBin(containerax);
  }









  empaquetar_dentro_de_los_pallets(forzar40) {

    // empaquetar 
    let auxContadorPallets = 1;

    while (true) { 
      
      

      // insertar items 
      this.insertar_items_packer();

      if (this.ajustes.containers == 0) {
        let bin = this.verificar_si_entran_en_unode_40(forzar40);
        // generar los containers para los pallets 
        this.crear_contenedor_pallet(bin, auxContadorPallets++);
      }
      else {
        //this.generarContainers_old(auxContadorContainer++)
        null
      }

      // empaquetar los items dentro de los containers
      this.packer.pack();
      //this.identificar("ITEMS EMPAQUETADOS");

      // comprobar items que no entraron 
      this.verificarItemsNoEntraron();

      console.log(this.itemsPacker);

      if (this.itemsPacker.length == 0 || auxContadorPallets > 50) { break; }


  

    }


    // Guardar en "containersCreados" solo los containers que tengan items dentro 
    this.identificar("\n\n\n\nRESULTADO ");
    let containersCreados = [];
    for (var i = 0; i < this.containersFinal.length; i++) {
      if (this.containersFinal[i].items.length != 0) {
        containersCreados.push(this.containersFinal[i]);
      }
    }


    // todos los items estan empaquetados en estos containers temporales para los pallets 
    containersCreados = this.rotar_items(containersCreados);


    // distribuir los pallets en el container si es posible. 
    return containersCreados;


  }







  // ??????????????

  empaquetar_con_pallets(forzar40, itemsEnPallets) {


    // empaquetar 
    let auxContadorContainer = 1;

    while (true) {

      // insertar items 
      this.insertar_items_packer_pallets();

      if (this.ajustes.containers == 0) {
        let bin = this.verificar_si_entran_en_unode_40(forzar40);
        // generar los containers
        this.generarContainers(bin, auxContadorContainer++);
      }
      else {
        this.generarContainers_old(auxContadorContainer++)
      }

      // empaquetar los items dentro de los containers
      this.packer.pack();
      //this.identificar("ITEMS EMPAQUETADOS");

      // comprobar items que no entraron 
      this.verificarItemsNoEntraron();


      if (this.itemsPacker.length == 0 || auxContadorContainer > 50) { break; }


    }


    // Guardar en "containersCreados" solo los containers que tengan items dentro 
    this.identificar("\n\n\n\nRESULTADO ");
    let containersCreados = [];
    for (var i = 0; i < this.containersFinal.length; i++) {
      if (this.containersFinal[i].items.length != 0) {
        containersCreados.push(this.containersFinal[i]);
      }
    }


    containersCreados = this.rotar_items(containersCreados);

    let aux = {
      items: itemsEnPallets,
      pallet: this.medidaPallet
    }
    
    return this.j.generar_json(containersCreados, aux);



  }





  main(forzar40) {

    this.ordenar_items();

    this.estandarizar_items();

    this.inicializar_containers();





    // empaquetado sin pallets 
    if (this.ajustes.pallets == 0) {
      return this.empaquetar_sin_pallets(forzar40);
    }

    // empaquetar con pallets 
    else if (this.ajustes.pallets == 1) {
      let itemsEnPallets = this.empaquetar_dentro_de_los_pallets(forzar40);
  
      this.items = [];
      itemsEnPallets.forEach((v, k) => {
        this.items.push({
          color: "",
          d: v.depth,
          h: v.height,
          name: v.items[0].name,
          q: 1,
          t: 0,
          ul: 0,
          uw: 0,
          w: v.width,
          wg: 0 //v.maxWeight (debe tener el valor total de los items )
        });

      })

      
    
          this.containersFinal = [];
          this.itemsPacker = [];
          this.packer = new this.Packer();
    
          return this.empaquetar_con_pallets(forzar40, itemsEnPallets);
              
    }


  }
}


