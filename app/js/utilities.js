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