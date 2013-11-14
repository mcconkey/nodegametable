function log(aTitle, aThing) {

    var sTitle = aTitle;
    var sThing = aThing;

    if (arguments.length == 1) {
        sTitle = '';
        sThing = arguments[0];
    }

    console.log('===' + sTitle + '=====================');
    console.log('    ' + sThing);
    console.log('===END ' + sTitle + '=====================');
}

exports.log = log;