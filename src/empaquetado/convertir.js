module.exports = class convertir{
    constructor(){

    }

    libras_a_kg(value){
        return parseFloat((value*0.453592).toFixed(2));
    }

    pulgadas_a_cm(value){
        return parseFloat((value*2.54).toFixed(2));
    }

    pies_a_cm(value){
        return parseFloat( (value*30.48).toFixed(2));
    }

    metros_a_cm(value){
        return parseFloat( (value*100).toFixed(2));
    }

    milimetros_a_cm(value){
        return parseFloat( (value/10).toFixed(2));
    }


    tipo_embalaje(a){
      switch (a) {
        case 0:{
          return "Cajas"
          break;
        }
        case 1:{
          return "Barriles"
          break;
        }
        case 2:{
          return "Sacos"
          break;
        }
      }
    }
    
    unidad_medida(a){
      switch (a) {
        case 0:{
          return "Centímetro"
          break;
        }
        case 1:{
          return "Pulgadas"
          break;
        }
        case 2:{
          return "Pies"
          break;
        }
        case 3:{
          return "Milímetro"
          break;
        }
        case 4:{
          return "Metros"
          break;
        }
      }
    }
    unidad_peso(a){
      switch (a) {
        case 0:{
          return "Kilogramos"
          break;
        }
        case 1:{
          return "Libras"
          break;
        }
        
      }
    }
    


    cm3_a_m3(a){
      return (a / 1000000).toFixed(2)
    }

    cm3_a_pies3(a){
      return (a / 28316.84).toFixed(2)
    }

}