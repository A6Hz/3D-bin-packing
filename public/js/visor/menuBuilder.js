"use strict"

function  CreateMenu() {
  if (boxIndex == -1) { return; }
  var b = document.getElementById('containers');
  var i = 0;

  FlickityItems.destroy();
  FlickityContainers.destroy();

  
  $("#containers >  div").remove();
  

  resultadosGenerales();


  var myNode = document.getElementById("items");
  while (myNode.firstChild) { myNode.removeChild(myNode.firstChild); }
  for (i = 0; i < Boxes.box.length; ++i) {
      document.getElementById('containers').appendChild(CreateBoxMenu(i, Boxes.box[i]));
      if (i == boxIndex) {
          CreateItemsMenu(Boxes.box[i].items);
      }
  }



  FlickityItems = new Flickity('#items', {cellAlign: 'left',});
  FlickityContainers = new Flickity('#containers', {cellAlign: 'left',});


}






function doLi(text, className) {
    var element = document.createElement('li');
    element.textContent = text;
    element.className = className;
    return element;
}

function doP(text, className) {
    var element = document.createElement('p');
    element.innerHTML = text;
    element.className = className;
    return element;
}

function doPre(text, className) {
    var element = document.createElement('pre');
    element.textContent = text;
    element.className = className;
    return element;
}

function doA(text, className) {
    var element = document.createElement('a');
    element.textContent = text;
    element.href = text;
    element.className = className;
    return element;
}



// contenedores cajas 
function CreateBoxMenu(index, box) { 

  var iDiv = document.createElement('div');
  iDiv.id = index;
  iDiv.className = ( index == boxIndex) ? "card text-center bg-secondary text-white" : " card text-center";
  iDiv.style = `width: 200px; height: 200px; margin: 5px;`;
  

  var iDiv2 = document.createElement('div');
  iDiv2.className = "card-body";

  var img = document.createElement('div');
  img.className = "contenedor-40-img";
  iDiv2.appendChild(img);

  var text = box.name;
  iDiv2.appendChild(doP("Container: " + text, 'mt-3'));


  iDiv.appendChild(iDiv2);
  iDiv.onclick = function () { chnBox(index); };
  if (index == boxIndex) {
      iDiv2.onmouseover = function () { overBox(index, true); }
      iDiv2.onmouseout = function () { overBox(index, false); }
  }
  return iDiv;
}


function CreateItemsMenu(items) {
    for (var j = 0; j < items.length; ++j) {
        document.getElementById('items').appendChild(CreateItem(j, items[j]));
    }
    itemStopIndex = items.length;

    
}

function CreateItem(j, item) {
  
  var iDiv = document.createElement('div');
  iDiv.id = "item" + item.i;
  iDiv.className = 'carousel-cell';
  
  var iDiv2 = document.createElement('div');
  iDiv2.className = 'card card-hover-item';
  iDiv2.style=`border-top-color: #${item.color}; border-top-width: 10px;border-top-style: solid;
  width: 200px; height: 160px; margin: 5px;`;

  var iDiv3 = document.createElement('div');
  iDiv3.classList.add('card-body', "text-center");

  // imagen segun el tipo de item 
  var iDiv4 = document.createElement('div');
  switch (item.t) {
    case 0:{
      iDiv4.className = 'paquete-img';
      iDiv3.appendChild(iDiv4);
      break;
    }
    case 1:{
      iDiv4.className = 'barril-img';
      iDiv3.appendChild(iDiv4);
      break;
    }
    case 2:{
      iDiv4.className = 'saco-img';
      iDiv3.appendChild(iDiv4);
      break;
    }
    
    default:
      break;
  }

  


  if (item.r == 1) {     
      var title = document.createAttribute("title");
      title.value =  "Item rotado";


      var img = document.createElement('div');
      img.className = "imgRotated";

      img.setAttributeNode(title);

      iDiv3.appendChild(img);
  }

  var radio = document.createElement("input");
  radio.type = "radio";
  radio.id = "stop" + (j + 1);
  radio.name = "stop";
  radio.value = j + 1;
  radio.className = "radioItem";
  radio.setAttribute('checked', 'checked');
  radio.onclick = function () { chnStop(j + 1); };
  radio.style = "display: none;";
  iDiv3.appendChild(radio);
  
  // titulo 
  var text = item.name;
  var p = doP(text, '');
  p.classList.add("mt-4", "font-weight-bold");
  iDiv3.appendChild(p);
  
  
  iDiv2.appendChild(iDiv3);
  iDiv.appendChild(iDiv2);
  iDiv2.onmouseover = function () { overItem(j, true, item.color); }
  iDiv2.onmouseout = function () { overItem(j, false, item.color); }
  iDiv2.onclick = function () { chnStop(j + 1); };
  return iDiv;
}


/*---------------------------
    ACTIONS
/*-------------------------*/

function chnBox(index) {
    boxIndex = index;
    CreateMenu();
    drawScene();
}

function chnStop(index) {
    document.getElementById("stop" + index).checked = true;
    itemStopIndex = index;
    drawBox();
}

function overBox(index, InOut) {
    
    if (document.getElementById("typeWireFrame").checked) {
        var element = scene.getObjectByName("box");
        element.material = InOut ? materialTypeWireFrame_selected : material0;
    } else {
        var element = scene.getObjectByName("box");
        element.material = InOut ? materialTypeSolid_selected : material0;
    }
    render();
}

function overItem(index, InOut, color) {
    
    if (index < itemStopIndex) {
        var element = scene.getObjectByName("box");
        var element2 = element.getObjectByName("itemBox" + index);
        if (document.getElementById("typeWireFrame").checked) {
            element2.material = InOut ? materialTypeWireFrame_selected : new THREE.MeshPhongMaterial({ color: parseInt(color, 16), transparent: true, opacity: 0.5 });
        } else {

            var materialTypeSolid_Item = new THREE.MeshPhongMaterial({ color: parseInt(color, 16), shininess: 10 });
            materialTypeSolid_Item.shading = THREE.FlatShading;


                element2.material = InOut ? materialTypeSolid_selected : (materialTypeSolid_Item);


        }
        render();
    }
}




function desactivar_largo(val){
  if($(val).val() == 1){
    $("#largo-mercancia").val(null);
    $("#largo-mercancia").attr("disabled", true);
  }
  else{
    $("#largo-mercancia").removeAttr("disabled");
  }
}