const stringToArray = (razas) => {
    let array = []
    array = razas.split(',')
    //console.log(array)
    let array2 = []
    array2=array.map(function (elem) {return elem.trim();})

    //console.log(array2)
    //console.log(array2.length)

    return array2
}

module.exports = stringToArray