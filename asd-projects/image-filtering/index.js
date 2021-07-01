// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here
    applyFilter(reddify);
    applyFilterNoBackground(decreaseBlue);
    applyFilterNoBackground(increaseGreenByBlue);

    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1 & 3: Create the applyFilter function here
function applyFilter(filterFunction) {
    for (var r = 0; r < image.length; r++) { 
        for (var c = 0; c < image[r].length; c++) { 
            var rgbString = image[r][c];
            var rgbNumbers = rgbStringToArray(rgbString);
            filterFunction(rgbNumbers);
            rgbString = rgbArrayToString(rgbNumbers);
            image[r][c] = rgbString;
        }
    }
}

// TODO 5: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction) {
    for (var r = 0; r < image.length; r++) {
        for (var c = 0; c < image[r].length; c++) {
            var rgbString = image[r][c];
            var rgbNumbers = rgbStringToArray(rgbString);
            var background = rgbArrayToString(rgbStringToArray(image[0][0]));
            if (rgbString != background) {
                filterFunction(rgbNumbers);
            }
            rgbString = rgbArrayToString(rgbNumbers);
            image[r][c] = rgbString;
        }
    }
}

// TODO 2 & 4: Create filter functions
function reddify(array) {
    array[RED] = 255;
}

function decreaseBlue(array) {
    array[BLUE] = Math.max(array[BLUE] - 100, 0);
}

function increaseGreenByBlue(array) {
    array[GREEN] = Math.min(array[BLUE] + array[GREEN], 255)
}

// CHALLENGE code goes below here
