/**
 * Retorna un array con los valores de una propiedad que los objetos del array tengan.
 * @param {Object[]} array El array para recorrer.
 * @param {string} property La propiedad que se necesita para extraer los valores del array.
 * @param {string} [propertyCondition] La propiedad para determinar la inclusión del objeto.
 * @param {string} [inclusionValue] El valor para determinar la inclusión del objeto.
 * @returns {Array}
 */
function getValoresDePropiedadEnArray(array, property, propertyCondition, inclusionValue) {
    var values = [];
    array = (!array) ? [] : array;
    array.forEach(function (element) {
        if (element.hasOwnProperty(property)) {
            if (propertyCondition && inclusionValue) {
                if (element.hasOwnProperty(propertyCondition)) {
                    if (element[propertyCondition] == inclusionValue) {
                        values.push(element[property]);
                    }
                }
            } else {
                values.push(element[property]);
            }
        }
    }, this);
    return values;
}

function getOneValue(obj, propiedadAObtener, propiedadCondicion, condicionValor) {
    var precio = 0;
    if (obj.length > 0) {
        angular.forEach(obj, function (obj_a) {
            if (obj_a[propiedadCondicion] === condicionValor) {
                precio = obj_a[propiedadAObtener];
            }
        });
        return precio;
    }
}

function dias() {
    dias = [];
    for (var i = 1; i < 32; i++) {
        dias.push({id: i, numero: i});
    }
    return dias;
}

function meses() {
    var meses = [];

    meses = [
        {id: 1, nombre: "ene"},
        {id: 2, nombre: "feb"},
        {id: 3, nombre: "mar"},
        {id: 4, nombre: "abr"},
        {id: 5, nombre: "may"},
        {id: 6, nombre: "jun"},
        {id: 7, nombre: "jul"},
        {id: 8, nombre: "ago"},
        {id: 9, nombre: "sep"},
        {id: 10, nombre: "oct"},
        {id: 11, nombre: "nov"},
        {id: 12, nombre: "dic"}
    ];
    return meses;
}

function years() {
    var hoy = new Date();
    var years = [];
    for (var i = 2016; i <= hoy.getFullYear(); i++) {
        years.push({id: i, numero: i});
    }
    return years;
}

function getSumaMedidas(array) {
    var suma = 0;
    if (array.length > 0) {
        for (var i = 0; i < array.length; i++) {
            suma += parseFloat(array[i]);
        }
    }
    return suma;
}