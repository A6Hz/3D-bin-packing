module.exports = class json {
    constructor() {

    }



    generar_json_sin_pallets(bin) {


        // crear parte del json que guarda los items
        // el formato de salida es similar:
        /*
        {"box":[
          {"w": 296,
            "h": 296,
            "d": 800,
            "tl": 15.25,
            "f": 1,
            "items": [
              {"i": 0, "w": 250, "h": 250,"d": 200,"x": 0,"y": 0, "z": 0,"r": 0},
              {"i": 0, "w": 250, "h": 250,"d": 200,"x": 0,"y": 0, "z": 0,"r": 0},
            ]
          }
        ]}*/




        let json = {
            "box": []
        }

        for (var bi = 0; bi < bin.length; bi++) {
            let peso_total_paquetes = 0;
            let volumen_total_paquetes = 0;
            let total_paquetes = 0;


            // estructurar los items
            let packages = [];
            for (var i = 0; i < bin[bi].items.length; i++) {
                packages.push({
                    "name": bin[bi].items[i].name,
                    "i": i,
                    "w": bin[bi].items[i].width,
                    "h": bin[bi].items[i].height,
                    "d": bin[bi].items[i].depth,
                    "x": bin[bi].items[i].position[0],
                    "y": bin[bi].items[i].position[1],
                    "z": bin[bi].items[i].position[2],
                    "r": (bin[bi].items[i].rotationType != 0) ? 1 : 0,
                    "t": bin[bi].items[i].t,
                    "color": bin[bi].items[i].color,
                    "pallet": 0
                });

                peso_total_paquetes += bin[bi].items[i].weight;

                // volumen total paquetes 
                if (bin[bi].items[i].t == 0 || bin[bi].items[i].t == 2 ) {
                    volumen_total_paquetes += bin[bi].items[i].width * bin[bi].items[i].height * bin[bi].items[i].depth;
                }
                // volumen cilindros 
                else if (bin[bi].items[i].t == 1) {
                    //  V=π(radio)^2(height)
                    volumen_total_paquetes += Math.PI * (Math.pow(bin[bi].items[i].width, 2) * bin[bi].items[i].height)
                }

                total_paquetes += 1;


            }


            // estructurar las dimensiones del container y unificar los items
            // dentro del container
            json.box.push(
                {
                    "name": bin[bi].name,
                    "w": bin[bi].width,
                    "h": bin[bi].height,
                    "d": bin[bi].depth,
                    "tl": 15.25,
                    "f": 1,
                    "items": packages,
                    "volumen_paquetes": volumen_total_paquetes.toFixed(2),
                    "peso_total_paquetes": peso_total_paquetes,
                    "total_paquetes": total_paquetes,
                    "peso_maximo_container": bin[bi].maxWeight
                }
            );



        }




        //console.log("JSON GENERADO ===========================");
        console.log(JSON.stringify(json));
        console.log("%o", json);
        return JSON.stringify(json);

    }




    generar_json_con_pallets(bin, pallets) {
        // crear parte del json que guarda los items
        // el formato de salida es similar:
        /*
        {"box":[
          {"w": 296,
            "h": 296,
            "d": 800,
            "tl": 15.25,
            "f": 1,
            "items": [{
                  "i": 0, 
                  "w": 250, 
                  "h": 250,
                  "d": 200,
                  "x": 0,
                  "y": 0, 
                  "z": 0,
                  "r": 0,
                  "itemsPallet": [
                      {
                        "i": 0, 
                        "w": 250, 
                        "h": 250,
                        "d": 200,
                        "x": 0,
                        "y": 0, 
                        "z": 0,
                        "r": 0,
                    },
                      {
                        "i": 0, 
                        "w": 250, 
                        "h": 250,
                        "d": 200,
                        "x": 0,
                        "y": 0, 
                        "z": 0,
                        "r": 0,
                    },
            ]
            }]
          }
        ]}*/

        //console.log("bin: ",bin)
        //console.log("pallet: ",pallet)


        let json = {
            "box": []
        }


        bin.forEach((vbin, kbin) => {
            let palletFinal = [];
            let total_paquetes = 0;
            let peso_total_paquetes = 0;
            let volumen_total_paquetes = 0;

            vbin.items.forEach((vnitems, knitems) => {

                let items = [];
                let auxColor = "";

                pallets.items[knitems].items.forEach((vpalitm, kpalitm) => {

                    items.push({
                        "name": vpalitm.name,
                        "i": kpalitm,
                        "w": vpalitm.width,
                        "h": vpalitm.height,
                        "d": vpalitm.depth,
                        "x": vpalitm.position[0] + vnitems.position[0],
                        "y": vpalitm.position[1] + vnitems.position[1] + pallets.pallet.alto,
                        "z": vpalitm.position[2] + vnitems.position[2],
                        "r": (vpalitm.rotationType != 0) ? 1 : 0,
                        "t": vpalitm.t,
                        "color": vpalitm.color
                    })

                    auxColor = vpalitm.color;

                    peso_total_paquetes += vpalitm.weight;

                    total_paquetes += 1;



                    // volumen total paquetes 
                    if (vpalitm.t == 0 || vpalitm.t == 2) {
                        volumen_total_paquetes += vpalitm.width * vpalitm.height * vpalitm.depth;
                    }
                    // volumen cilindros 
                    else if (vpalitm.t == 1) {
                        //  V=π(radio)^2(height)
                        volumen_total_paquetes += Math.PI * (Math.pow(vpalitm.width, 2) * vpalitm.height)
                    }


                });



                palletFinal.push({
                    "name": vnitems.name,
                    "i": vnitems.i,
                    "w": vnitems.width,
                    "h": pallets.pallet.alto,
                    "d": vnitems.depth,
                    "x": vnitems.position[0],
                    "y": vnitems.position[1],
                    "z": vnitems.position[2],
                    "r": vnitems.r,
                    "t": vnitems.t,
                    "color": "d0d68a",
                    "items": items,
                    "pallet": 1
                })


            })







            json.box.push({
                "name": vbin.name,
                "w": vbin.width,
                "h": vbin.height,
                "d": vbin.depth,
                "tl": 0,
                "f": 1,
                "items": palletFinal,
                "volumen_paquetes": volumen_total_paquetes.toFixed(2),
                "peso_total_paquetes": peso_total_paquetes,
                "total_paquetes": total_paquetes,
                "peso_maximo_container": vbin.maxWeight

            })

        });



        console.log("RESULTADO PALLET DEMO")
        console.log("%o", json)
        console.log(JSON.stringify(json))

        return JSON.stringify(json);
    }
































    generar_json(bin, pallets) {

        if (pallets == undefined) {
            return this.generar_json_sin_pallets(bin);
        }
        else {
            return this.generar_json_con_pallets(bin, pallets);
        }

    }

}
