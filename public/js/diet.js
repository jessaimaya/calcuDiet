const HOMBRE = "HOMBRE";
const MUJER = "MUJER";
const ACTIVIDAD = {
    sedentaria: 1.2,
    ligera: 1.375,
    moderada: 1.55,
    mucha: 1.725,
    extra: 1.9,
};
window.onload = function() {
    init();

};
const init = () => {
     var select = NiceSelect.bind(document.getElementById("actividad"));
    var vNotify=function(){var a={topLeft:"topLeft",topRight:"topRight",bottomLeft:"bottomLeft",bottomRight:"bottomRight",center:"center"},b={fadeInDuration:2e3,fadeOutDuration:1e3,fadeInterval:50,visibleDuration:5e3,postHoverVisibleDuration:500,position:a.topRight,sticky:!1,showClose:!0},c=function(a){return a.notifyClass="vnotify-info",i(a)},d=function(a){return a.notifyClass="vnotify-success",i(a)},e=function(a){return a.notifyClass="vnotify-error",i(a)},f=function(a){return a.notifyClass="vnotify-warning",i(a)},g=function(a){return a.notifyClass="vnotify-notify",i(a)},h=function(a){return i(a)},i=function(a){if(!a.title&&!a.text)return null;var b=document.createDocumentFragment(),c=document.createElement("div");c.classList.add("vnotify-item"),c.classList.add(a.notifyClass),c.style.opacity=0,c.options=p(a),a.title&&c.appendChild(k(a.title)),a.text&&c.appendChild(j(a.text)),c.options.showClose&&c.appendChild(l(c)),c.visibleDuration=c.options.visibleDuration;var d=function(){c.fadeInterval=r("out",c.options.fadeOutDuration,c)},e=function(){clearTimeout(c.interval),clearTimeout(c.fadeInterval),c.style.opacity=null,c.visibleDuration=c.options.postHoverVisibleDuration},f=function(){c.interval=setTimeout(d,c.visibleDuration)};b.appendChild(c);var g=m(c.options.position);return g.appendChild(b),c.addEventListener("mouseover",e),r("in",c.options.fadeInDuration,c),c.options.sticky||(c.addEventListener("mouseout",f),f()),c},j=function(a){var b=document.createElement("div");return b.classList.add("vnotify-text"),b.innerHTML=a,b},k=function(a){var b=document.createElement("div");return b.classList.add("vnotify-title"),b.innerHTML=a,b},l=function(a){var b=document.createElement("span");return b.classList.add("vn-close"),b.addEventListener("click",function(){q(a)}),b},m=function(a){var b=o(a),c=document.querySelector("."+b);return c?c:n(b)},n=function(a){var b=document.createDocumentFragment();return container=document.createElement("div"),container.classList.add("vnotify-container"),container.classList.add(a),container.setAttribute("role","alert"),b.appendChild(container),document.body.appendChild(b),container},o=function(b){switch(b){case a.topLeft:return"vn-top-left";case a.bottomRight:return"vn-bottom-right";case a.bottomLeft:return"vn-bottom-left";case a.center:return"vn-center";default:return"vn-top-right"}},p=function(a){return{fadeInDuration:a.fadeInDuration||b.fadeInDuration,fadeOutDuration:a.fadeOutDuration||b.fadeOutDuration,fadeInterval:a.fadeInterval||b.fadeInterval,visibleDuration:a.visibleDuration||b.visibleDuration,postHoverVisibleDuration:a.postHoverVisibleDuration||b.postHoverVisibleDuration,position:a.position||b.position,sticky:null!=a.sticky?a.sticky:b.sticky,showClose:null!=a.showClose?a.showClose:b.showClose}},q=function(a){a.style.display="none",a.outerHTML="",a=null},r=function(a,c,d){function e(){g=f?g+i:g-i,d.style.opacity=g,g<=0&&(q(d),s()),(!f&&g<=h||f&&g>=h)&&window.clearInterval(j)}var f="in"===a,g=f?0:d.style.opacity||1,h=f?.8:0,i=b.fadeInterval/c;f&&(d.style.display="block",d.style.opacity=g);var j=window.setInterval(e,b.fadeInterval);return j},s=function(){var a=document.querySelector(".vnotify-item");if(!a)for(var b=document.querySelectorAll(".vnotify-container"),c=0;c<b.length;c++)b[c].outerHTML="",b[c]=null};return{info:c,success:d,error:e,warning:f,notify:g,custom:h,options:b,positionOption:a}}();
};

const getValues = () => {
    let $name = document.getElementById("name");
    let $genero = document.querySelector('input[type=radio]:checked');
    let $edad = document.getElementById("edad");
    let $estatura = document.getElementById("estatura");
    let $peso = document.getElementById("peso");
    let $cintura = document.getElementById("cintura");
    let $cadera= document.getElementById("cadera");
    let $actividad= document.getElementById("actividad");
    let $pesoIdeal = document.getElementById("pesoIdeal");
    let $gastoEnergetico = document.getElementById("gastoEnergetico");
    let $grasaCorporal = document.getElementById("grasaCorporal");
    let $imc= document.getElementById("imc");
    let $icc= document.getElementById("icc");
    let $gia= document.getElementById("gia");
    let $bmr= document.getElementById("bmr");

    return {
        name: $name.value,
        genero: $genero.id,
        edad: Number($edad.value || 0),
        estatura: Number($estatura.value || 0),
        peso: Number($peso.value || 0),
        cintura: Number($cintura.value || 0),
        cadera: Number($cadera.value || 0),
        actividad: Number(ACTIVIDAD[$actividad.value] || 0),
        pesoIdeal: $pesoIdeal,
        gastoEnergetico: $gastoEnergetico,
        grasaCorporal: $grasaCorporal,
        imc: $imc,
        icc: $icc,
        gia: $gia,
        bmr: $bmr,
    }
}

const update = () => {
    let valores = getValues();
    updateAvatar(valores.genero);
    updatePesoIdeal(valores);
    updateGastoEnergetico(valores);
    updateGrasaCorporal(valores);
    updateIMC(valores);
    updateICC(valores);
    updateGIA(valores);
    updateBMR(valores);
};

const updateAvatar = (genero) => {
    let $avatar= document.getElementById("avatar");

    if(genero === MUJER) {
        $avatar.classList.remove("he");
        $avatar.classList.add("she");
    } else {
        $avatar.classList.remove("she");
        $avatar.classList.add("he");
    }
}

const getPesoIdeal = val => {
    if (val.estatura > 0) {
        let ind = val.genero === MUJER ? 2 : 4;
        let result = val.estatura - 100 - ((val.estatura - 150) / ind);
        return result.toFixed(2);
    }
    return 0.0;
}
const updatePesoIdeal = val => {
    if(val.estatura > 0) {
        val.pesoIdeal.textContent = getPesoIdeal(val);
    }
};

const getGastoEnergetico = val => {
    if(val.peso > 0 && val.estatura > 0 && val.edad > 0) {
        let result = 0.0;
        if (val.genero === MUJER) {
            result = 655.1 + (9.56 * val.peso) + (1.85 * val.estatura) - (4.68 * val.edad);
        } else {
            result = 66.47 + (13.75 * val.peso) + (5 * val.estatura) - (6.76 * val.edad);
        }
        return result.toFixed(2);
    }
    return 0.0;
}

const updateGastoEnergetico = val => {
    if (val.peso > 0 && val.estatura > 0 && val.edad > 0) {
        val.gastoEnergetico.textContent = getGastoEnergetico(val);
    }
};

const getGrasaCorporal = val => {
    if(val.cintura > 0 && val.edad > 0) {
        let result = 0.0;
        if (val.genero === MUJER) {
            result = .439 * val.cintura + .221 * val.edad - 9.4;
        } else {
            result = .567 * val.cintura + .101 * val.edad - 31.8;
        }
        return result.toFixed(2);
    }
    return 0.0;
}

const updateGrasaCorporal = val => {
    if (val.cintura > 0 && val.edad > 0) {
        val.grasaCorporal.textContent = getGrasaCorporal(val);
    }
};

const getIMC = val => {
    if (val.peso > 0 && val.estatura ) {
        return (val.peso / ((val.estatura / 100) * (val.estatura / 100))).toFixed(2);
    }
    return 0.0;
}

const updateIMC = (val) => {
    if(val.peso > 0 && val.estatura > 0 ) {
        val.imc.textContent = getIMC(val);
    }
};

const getICC = val => {
    if (val.cintura > 0 && val.cadera > 0) {
        return (val.cintura / val.cadera).toFixed(2);
    }
    return 0.0;
};

const updateICC = val => {
    if(val.cintura > 0 && val.cadera > 0) {
        val.icc.textContent = getICC(val);
    }
};

const getGIA = val => {
    if(val.edad > 0 && val.cintura > 0) {
        let result = (2.125 * val.edad) + (2.843 * val.cintura) - 225.39;
        return result.toFixed(2);
    }
    return 0.0;
};

const updateGIA = val => {
  if(val.edad > 0 && val.cintura > 0) {
      val.gia.textContent = getGIA(val);
  }
};

const bmr = ({genero, peso, estatura, edad, actividad} = datos) => {
    const harris = genero === HOMBRE ? 5 : 161;
    const prev = 10 * peso + 6.25 * estatura;
    return genero === HOMBRE ? (prev - 5 * edad + 5) : (prev - 5 * edad -161);
}

const getBMR = val => {
    if(val.edad > 0 && val.peso > 0 > 0 && val.estatura > 0 && val.actividad > 0) {
        return (bmr(val) * val.actividad).toFixed(2);
    }
    return 0.0;
}

const updateBMR = val => {
    if(val.edad > 0 && val.peso > 0 > 0 && val.estatura > 0 && val.actividad > 0) {
        val.bmr.textContent = getBMR(val);
    }
};

const copy = () => {
    let val = getValues();
    let info = `| Edad | Estatura | Peso | Cintura | Cadera | Actividad|\n| ---- | -------- | ---- | ------- | ------ | ------ |\n| ${val.edad} años    | ${val.estatura} cm        | ${val.peso} kg    | ${val.cintura} cm       | ${val.cadera} cm      | ${document.getElementById("actividad").value}`;
    let resultados  = `| Peso Ideal | Gasto Energético | Grasa Corporal | IMC  | ICC  | GIA  | BMR |\n| ---------- | ---------------- | -------------- | ---- | ---- | ---- | ---- |\n| ${getPesoIdeal(val)} Kg        | ${getGastoEnergetico(val)} Kcal            | ${getGrasaCorporal(val)} %             | ${getIMC(val)} m2   | ${getICC(val)} cm   | ${getGIA(val)} cm   | ${getBMR(val)} Kcal |`;

    let datos = `**Nombre:** ${val.name}\n**Género:** ${val.genero === MUJER ? "Mujer" : "Hombre"}\n\n**Datos:** \n${info}\n\n\n**Resultados:** \n${resultados}`;

    let options = {
        fadeInDuration: 800,
        fadeOutDuration: 1000,
        fadeInterval: 50,
        visibleDuration: 3000,
        postHoverVisibleDuration: 500,
        position: vNotify.positionOption.topRight,
        sticky: false,
        showClose: true
    };

    navigator.clipboard.writeText(datos).then(() => {
        vNotify.success({text: 'Datos copiados', title:'Listo!', ...options});
    }, () => {
        vNotify.error({text: 'Algo anda mal, dile a Jess.', title:'Error', ...options});
    });
};
