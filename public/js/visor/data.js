"use strict"

var schema = { 
    "type": "object", 
    "required": [ "box" ], 
    "properties": {
        "box": { 
            "description": "Bin", 
            "type": "array", 
            "title": "box", 
            "items": {
                "type": "object", 
                "required": [ "w", "h", "d", "tl", "f", "items"], 
                "properties": {
                    "w": { "description": "Width", "type": "number" }, 
                    "h": { "description": "Height", "type": "number" }, 
                    "d": { "description": "Depth", "type": "number" }, 
                    "tl": { "description": "Trim loss","type": "number" }, 
                    "f": { "description": "frequency", "type": "number" }, 
                    "items": { 
                        "description": "Items in bin", 
                        "type": "array", 
                        "title": "items", 
                        "items": { 
                            "type": "object", 
                            "required": [ "i", "w", "h", "d", "x", "y", "z", "r" ], 
                            "properties": { 
                                "i": { "description": "Identifier", "type": "number" }, 
                                "w": { "description": "Width","type": "number" }, 
                                "h": { "description": "Height","type": "number" }, 
                                "d": { "description": "Depth","type": "number" }, 
                                "x": { "description": "Pos.X","type": "number" }, 
                                "y": { "description": "Pos.Y","type": "number" }, 
                                "z": { "description": "Pos.Z","type": "number" }, 
                                "r": { "description": "Rotated flag","type": "number" },
                                "t": { "description": "object.type", "type": "number" },
                                "color": { "description": "Color dentifier", "type": "string" },  
                            } 
                        } 
                    } 
                } 
            } 
        } 
    } 
};



function InitNewProblem(text) {  
  //Boxes = JSON.parse(text)
  Boxes = text

  FlickityItems.destroy();
  FlickityContainers.destroy();


  DrawNewProblem()

  FlickityItems = new Flickity('#items', {cellAlign: 'left',});
  FlickityContainers = new Flickity('#containers', {cellAlign: 'left',});
  
  //swal.close();


  setTimeout(function () {
    Swal.fire({
      type: 'success',
      title: 'Ok',
      text: 'Proceso completado',
      showConfirmButton: false,
      timer: 2000,
      onClose: function () {
        setTimeout(function () {
          var elmnt = document.getElementById("div-sim-3d");
          elmnt.scrollIntoView(true);
        }
          , 1000);
      },
      
    })
  }, 1000);





}

function DrawNewProblem() {

    boxIndex = 0;
    itemStopIndex = 0;
    CreateMenu();
    drawScene();
}