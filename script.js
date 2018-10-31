//DOMContentLoaded means don't do anything before the page is "ready"
document.addEventListener('DOMContentLoaded', function() {
    // Programming the sliders to apply changes to the image
    //This variable ranges gets all the elements with the input type of range
    var ranges = document.querySelectorAll('input[type="range"]');
    //this loop goes through each of the inputs with type range and when they
    //change a function will be called named changeAdjustmentsHandler
    ranges.forEach(function(range) {
        range.onchange = changeAdjustmentsHandler;
    });
    //this function updates the image to the value of the slider
    function changeAdjustmentsHandler(event) {
        Caman("#image", function renderCamen() {
            this.revert(false);
            this[event.target.name](event.target.value).render();
        });
    }

    /* RESET BUTTON */
    var resetBtn = document.querySelector('#reset');
    resetBtn.onclick = resetBtnHandler;
    //this loop goes through each slider and resets it to 0 when the reset
    //button is clicked
    function resetBtnHandler(event) {
        ranges.forEach(function(range) {
            range.value = 0;
        });

        Caman('#image', function() {
            this.revert(true);
        });
    }

    /* SAVE BUTTON */
    var saveBtn = document.querySelector('#save');
    saveBtn.onclick = saveBtnHandler;

    function saveBtnHandler(event) {

        Caman('#image', function() {
            this.render(function() {
                this.save('image.png');
            });
        });
    }

    /* FILTER BUTTONS */
    var filterButtons = document.querySelectorAll('.filter');
    //This loop goes through each filter button and when they are clicked calls
    //the function filterButtonHandler
    filterButtons.forEach(function(filterButton) {
        filterButton.onclick = filterButtonHandler;
    });
    //This function will render the filters on the image
    function filterButtonHandler(event) {
        Caman('#image', function() {
            this.revert(false);
            this[event.target.id]().render();
        });
    }

    /* LOADING AN IMAGE */
    var loadInput = document.querySelector('#load');
    loadInput.onchange = loadInputHandler;
    //This function will load the image  from a picker
    function loadInputHandler(event) {
        var imageFile = event.target.files[0];
        var imageElement = document.querySelector('#image');
        imageElement.setAttribute('src', URL.createObjectURL(imageFile));
    };
}, false);
