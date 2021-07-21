window.onload = function() {
    init();
};
const init = () => {

};

const getValues = () => {
    let $name = document.getElementById("name");
    let $genero = document.querySelector('input[type=radio]:checked');
    let $edad = document.getElementById("edad");
    let $estatura = document.getElementById("estatura");
    let $peso = document.getElementById("peso");
    let $cintura = document.getElementById("cintura");
    let $cadera= document.getElementById("cadera");
    let $pesoIdeal = document.getElementById("pesoIdeal");
    let $gastoEnergetico = document.getElementById("gastoEnergetico");
    let $grasaCorporal = document.getElementById("grasaCorporal");
    let $imc= document.getElementById("imc");
    let $icc= document.getElementById("icc");
    let $gia= document.getElementById("gia");

    return {
        name: $name.value,
        genero: $genero.id,
        edad: Number($edad.value || 0),
        estatura: Number($estatura.value || 0),
        peso: Number($peso.value || 0),
        cintura: Number($cintura.value || 0),
        cadera: Number($cadera.value || 0),
        pesoIdeal: $pesoIdeal,
        gastoEnergetico: $gastoEnergetico,
        grasaCorporal: $grasaCorporal,
        imc: $imc,
        icc: $icc,
        gia: $gia
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
    console.log(getValues());
};

const updateAvatar = (genero) => {
    let $avatar= document.getElementById("avatar");

    if(genero === "female") {
        $avatar.classList.remove("he");
        $avatar.classList.add("she");
    } else {
        $avatar.classList.remove("she");
        $avatar.classList.add("he");
    }
}

const getPesoIdeal = val => {
    let ind = val.genero === "female" ? 2 : 4;
    let result = val.estatura - 100 - ((val.estatura - 150) / ind);
     return result.toFixed(2) || 0.0;
}
const updatePesoIdeal = val => {
    if(val.estatura > 0) {
        val.pesoIdeal.textContent = getPesoIdeal(val);
    }
};

const getGastoEnergetico = val => {
    let result = 0.0;
    if (val.genero === "female") {
        result = 655.1 + (9.56 * val.peso) + (1.85 * val.estatura) - (4.68 * val.edad);
    } else {
        result = 66.47 + (13.75 * val.peso) + (5 * val.estatura) - (6.76 * val.edad);
    }
    return result.toFixed(2);
}

const updateGastoEnergetico = val => {
    if (val.peso > 0 && val.estatura > 0 && val.edad > 0) {
        val.gastoEnergetico.textContent = getGastoEnergetico(val);
    }
};

const getGrasaCorporal = val => {
    let result = 0.0;
    if (val.genero === "female") {
        result = .439 * val.cintura + .221 * val.edad - 9.4;
    } else {
        result = .567 * val.cintura + .101 * val.edad - 31.8;
    }
    return result.toFixed(2);
}

const updateGrasaCorporal = val => {
    if (val.cintura > 0 && val.edad > 0) {
        val.grasaCorporal.textContent = getGrasaCorporal(val);
    }
};

const getIMC = val => {
    return (val.peso / ((val.estatura / 100 ) * (val.estatura / 100))).toFixed(2);
}

const updateIMC = (val) => {
    if(val.peso > 0 && val.estatura > 0 ) {
        val.imc.textContent = getIMC(val);
    }
};

const getICC = val => {
    return (val.cintura / val.cadera).toFixed(2);
};

const updateICC = val => {
    if(val.cintura > 0 && val.cadera > 0) {
        val.icc.textContent = getICC(val);
    }
};

const getGIA = val => {
    let result = (2.125 * val.edad) + (2.843 * val.cintura) - 22.539;
    return result.toFixed(2);
};

const updateGIA = val => {
  if(val.edad > 0 && val.cintura > 0) {
      val.gia.textContent = getGIA(val);
  }
};

const copy = () => {
    let val = getValues();
    let info = `| Edad | Estatura | Peso | Cintura | Cadera |\n| ---- | -------- | ---- | ------- | ------ |\n| ${val.edad} años    | ${val.estatura} cm        | ${val.peso} kg    | ${val.cintura} cm       | ${val.cadera} cm      |`;
    let resultados  = `| Peso Ideal | Gasto Energético | Grasa Corporal | IMC  | ICC  | GIA  |\n| ---------- | ---------------- | -------------- | ---- | ---- | ---- |\n| ${getPesoIdeal(val)} Kg        | ${getGastoEnergetico(val)} Kcal            | ${getGrasaCorporal(val)} %             | ${getIMC(val)} m2   | ${getICC(val)} cm   | ${getGIA(val)} cm   |`;

    let datos = `**Nombre:** ${val.name}\n**Género:** ${val.genero === "female" ? "Mujer" : "Hombre"}\n\n**Datos:** \n${info}\n\n\n**Resultados:** \n${resultados}`;

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
