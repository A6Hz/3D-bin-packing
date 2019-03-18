"use strict"

function drawBox() {
    if (boxIndex == -1) { return; }
    scene.remove(box);
    if (document.getElementById("typeSolid").checked) { drawBoxSolid(); }
    else if (document.getElementById("typeWireFrame").checked) { drawBoxWireFrame(); }
    else { drawBoxSubstract(); }
    render();
}

function toPosition(aw, ah, ad, ax, ay, az) {
    var x = (aw / 2) + ax;
    var y = (ah / 2) + ay;
    var z = (ad / 2) + az;
    return new THREE.Matrix4().makeTranslation(x, y, z);
}

function drawBoxSolid() {
    var a = Boxes.box[boxIndex];
    var geometry = new THREE.BoxGeometry(a.w, a.h, a.d);
    geometry.applyMatrix(toPosition(a.w, a.h, a.d, 0, 0, 0));
    box = new THREE.Mesh(geometry, material0);
    box.name = "box";
    box.renderOrder = 1000;
    var egh = new THREE.EdgesHelper(box, 0x000000);
    egh.material.linewidth = 2;
    box.add(egh);
    scene.add(box);
    for (var i = 0; i < itemStopIndex; ++i) {

        var materialTypeSolid_Item = new THREE.MeshPhongMaterial({ color: parseInt(a.items[i].color, 16), shininess:10 });
        materialTypeSolid_Item.shading = THREE.FlatShading;
        if(a.items[i].pallet == 0){
            drawItemSolid(a.items[i], i,  materialTypeSolid_Item);
        }
        else{
            drawPalletSolid(a.items[i], i,  materialTypeSolid_Item);
        }

    }
}





function drawPalletSolid(item, i, m) {
    var geometry = new THREE.BoxGeometry(item.w, item.h, item.d);
    var box1 = new THREE.Mesh(geometry, m);
    box1.name = "itemBox" + i;
    box1.renderOrder = i;
    box1.castShadow = true;
    box1.receiveShadow = true;
    geometry.applyMatrix(toPosition(item.w, item.h, item.d, item.x, item.y, item.z));
    
    
    
    for(var i = 0; i < item.items.length; i++){  
        var materialTypeWireFrame_Item = new THREE.MeshPhongMaterial({ color: parseInt(item.items[i].color, 16), transparent: true, opacity: 0.8 });
        
        var materialTypeSolid_Item = new THREE.MeshPhongMaterial({ color: parseInt(item.items[i].color, 16), shininess:10 });
        materialTypeSolid_Item.shading = THREE.FlatShading;

        var itemm = drawItemSolid_pallets(item.items[i], i, materialTypeSolid_Item)
        box1.add(itemm); 
    }
    
    
    
    
    
    
    box.add(box1);
}



function drawItemSolid(item, i, m) {
    if (item.t == 0 || item.t == 2) {
        var geometry = new THREE.BoxGeometry(item.w, item.h, item.d);
        var box1 = new THREE.Mesh(geometry, m);
        box1.name = "itemBox" + i;
        box1.renderOrder = i;
        box1.castShadow = true;
        box1.receiveShadow = true;
        geometry.applyMatrix(toPosition(item.w, item.h, item.d, item.x, item.y, item.z));
        box.add(box1);
    }
    // items igual a cilindros 
    else if (item.t == 1) {
        var geometry = new THREE.CylinderGeometry((item.w / 2), (item.w / 2), item.h, 8);
        var box1 = new THREE.Mesh(geometry, m);
        box1.name = "itemBox" + i;
        box1.renderOrder = i;
        box1.castShadow = true;
        box1.receiveShadow = true;
        geometry.applyMatrix(toPosition(item.w, item.h, item.d, item.x, item.y, item.z));
        box.add(box1);
    }

}

function drawItemSolid_pallets(item, i, m) {
    if (item.t == 0 || item.t == 2 ) {
        var geometry = new THREE.BoxGeometry(item.w, item.h, item.d);
        var box1 = new THREE.Mesh(geometry, m);
        box1.name = "itemBox" + i;
        box1.renderOrder = i;
        box1.castShadow = true;
        box1.receiveShadow = true;
        geometry.applyMatrix(toPosition(item.w, item.h, item.d, item.x, item.y, item.z));
        return (box1);
    }
    // items igual a cilindros 
    else if (item.t == 1) {
        var geometry = new THREE.CylinderGeometry((item.w / 2), (item.w / 2), item.h, 8);
        var box1 = new THREE.Mesh(geometry, m);
        box1.name = "itemBox" + i;
        box1.renderOrder = i;
        box1.castShadow = true;
        box1.receiveShadow = true;
        geometry.applyMatrix(toPosition(item.w, item.h, item.d, item.x, item.y, item.z));
        return (box1);
    }

}

function drawBoxWireFrame() {
    var a = Boxes.box[boxIndex];
    var geometry = new THREE.BoxGeometry(a.w, a.h, a.d);
    geometry.applyMatrix(toPosition(a.w, a.h, a.d, 0, 0, 0));
    box = new THREE.Mesh(geometry, material0);
    box.name = "box";
    box.renderOrder = 1000;
    var egh = new THREE.EdgesHelper(box, 0x000000);
    egh.material.linewidth = 1;
    box.add(egh);
    scene.add(box);
    for (var i = 0; i < itemStopIndex; ++i) { 

        // si no son pallets 
        if(a.items[i].pallet == 0){
            var materialTypeWireFrame_Item = new THREE.MeshPhongMaterial({ color: parseInt(a.items[i].color, 16), transparent: true, opacity: 0.5 });
            drawItemWireframe(a.items[i], i, materialTypeWireFrame_Item); 
        }
        else{
            var materialTypeWireFrame_Item = new THREE.MeshPhongMaterial({ color: parseInt(a.items[i].color, 16), transparent: false, opacity: 1 });
            drawPalletWireFrame(a.items[i], i, materialTypeWireFrame_Item);  
        }

    }
}

function drawPalletWireFrame(item, i, m) {
    var geometry = new THREE.BoxGeometry(item.w, item.h, item.d);
    var box1 = new THREE.Mesh(geometry, m);
    box1.name = "itemBox" + i;
    box1.renderOrder = i;
    box1.castShadow = true;
    geometry.applyMatrix(toPosition(item.w, item.h, item.d, item.x, item.y, item.z));
    var egh1 = new THREE.EdgesHelper(box1, 0x000000);
    egh1.material.linewidth = 1;
    box1.add(egh1);
    
    
    
    for(var i = 0; i < item.items.length; i++){  
        var materialTypeWireFrame_Item = new THREE.MeshPhongMaterial({ color: parseInt(item.items[i].color, 16), transparent: true, opacity: 0.5 });
        var itemm = drawItemWireframe_pallets(item.items[i], i, materialTypeWireFrame_Item)
        box1.add(itemm); 
    }
       
    
    
    
    
    
    box.add(box1); 
}


function drawItemWireframe_pallets(item, i, m) {
    // items igual a paralelepipedos 
    if (item.t == 0 || item.t == 2) {
        var geometry = new THREE.BoxGeometry(item.w, item.h, item.d);
        var box1 = new THREE.Mesh(geometry, m);
        box1.name = "itemBox" + i;
        box1.renderOrder = i;
        box1.castShadow = true;
        geometry.applyMatrix(toPosition(item.w, item.h, item.d, item.x, item.y, item.z));
        var egh1 = new THREE.EdgesHelper(box1, 0x000000);
        egh1.material.linewidth = 1;
        box1.add(egh1);
        return box1;
    }
    // items igual a cilindros 
    else if (item.t == 1) {
        var geometry = new THREE.CylinderGeometry((item.w / 2), (item.w / 2), item.h, 8);
        var box1 = new THREE.Mesh(geometry, m);
        box1.name = "itemBox" + i;
        box1.renderOrder = i;
        box1.castShadow = true;
        geometry.applyMatrix(toPosition(item.w, item.h, item.d, item.x, item.y, item.z));
        var egh1 = new THREE.EdgesHelper(box1, 0x000000);
        egh1.material.linewidth = 1;
        box1.add(egh1);
        return box1;
    }


}




function drawItemWireframe(item, i, m) {
    // items igual a paralelepipedos 
    if (item.t == 0 || item.t == 2) {
        var geometry = new THREE.BoxGeometry(item.w, item.h, item.d);
        var box1 = new THREE.Mesh(geometry, m);
        box1.name = "itemBox" + i;
        box1.renderOrder = i;
        box1.castShadow = true;
        geometry.applyMatrix(toPosition(item.w, item.h, item.d, item.x, item.y, item.z));
        var egh1 = new THREE.EdgesHelper(box1, 0x000000);
        egh1.material.linewidth = 1;
        box1.add(egh1);
        box.add(box1); 
    }
    // items igual a cilindros 
    else if (item.t == 1) {
        var geometry = new THREE.CylinderGeometry((item.w / 2), (item.w / 2), item.h, 8);
        var box1 = new THREE.Mesh(geometry, m);
        box1.name = "itemBox" + i;
        box1.renderOrder = i;
        box1.castShadow = true;
        geometry.applyMatrix(toPosition(item.w, item.h, item.d, item.x, item.y, item.z));
        var egh1 = new THREE.EdgesHelper(box1, 0x000000);
        egh1.material.linewidth = 1;
        box1.add(egh1);
        box.add(box1);
    }


}


