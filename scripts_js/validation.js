const VALID_CLASS_ID = "valid";
const INVALID_CLASS_ID = "invalid";
const ERROR_CLASS_ID = "error";
const ERROR_CLASS_ID_ACTIVATE = "error active";
const STRING_EMPTY = "";

const form = document.querySelector("form");
const x_radios = document.querySelectorAll('input[name="x-select"]');
const y_select  = document.getElementById("y-select");
const r_select = document.getElementById("r-select");

const y_error = y_select.nextElementSibling;
const r_error = r_select.nextElementSibling;

window.addEventListener("load", () => {
    let storage_values = localStorage.getItem("table").split("~~~");
    storage_values.splice(0,1);
    storage_values.forEach(element => {
        let values = element.split(";");
        addToTable(values[0], values[1], values[2], values[3], values[4], values[5]);
    });
});

function newX(){
    for (const f of x_radios) {
        if (f.checked) {
          x = f.value;
        }
      }
}

y_select.addEventListener("input", () => {
    const y = +y_select.value;

    const isValid = y_select.value.length === 0 || y_select.value === "-"
        || (!Number.isNaN(y) && y >= -3 && y <= 5);
    if (isValid) {
        y_select.className = VALID_CLASS_ID;
        y_error.textContent = STRING_EMPTY;
        y_error.className = ERROR_CLASS_ID;
    } else {
        y_select.className = INVALID_CLASS_ID;
    }
});

r_select.addEventListener("input", () => {
    const r = +r_select.value;

    const isValid = r_select.value.length === 0 || y_select.value === "-"
        || (!Number.isNaN(r) && r >= 2 && r <= 5);
    if (isValid) {
        r_select.className = VALID_CLASS_ID;
        r_error.textContent = STRING_EMPTY;
        r_error.className = ERROR_CLASS_ID;

        drawShapesByR(r); 
    } else {
        r_select.className = INVALID_CLASS_ID;
    }
});

form.addEventListener("submit", (event) => {
    const y = +y_select.value;
    const r = +r_select.value;

    event.preventDefault();

    const isValidY = y_select.value.length === 0 || !Number.isNaN(y);
    const isAcceptableY = y >= -3 && y <= 5;
    if (!isValidY) {
        y_select.className = INVALID_CLASS_ID;
        y_error.textContent = "Введите число, например 1";
        y_error.className = ERROR_CLASS_ID_ACTIVATE;
    } else if (!isAcceptableY) {
        y_select.className = INVALID_CLASS_ID;
        y_error.textContent = "Число должно быть между -3 и 5";
        y_error.className = ERROR_CLASS_ID_ACTIVATE;
    } else {
        y_select.className = VALID_CLASS_ID;
        y_error.textContent = STRING_EMPTY;
        y_error.className = ERROR_CLASS_ID;
    }

    const isValidR = r_select.value.length === 0 || !Number.isNaN(r);
    const isAcceptableR = r >= 2 && r <= 5;
    if (!isValidR) {
        r_select.className = INVALID_CLASS_ID;
        r_error.textContent = "Введите число, например 4";
        r_error.className = ERROR_CLASS_ID_ACTIVATE;
    } else if (!isAcceptableR) {
        r_select.className = INVALID_CLASS_ID;
        r_error.textContent = "Число должно быть между 2 и 5";
        r_error.className = ERROR_CLASS_ID_ACTIVATE;
    } else {
        r_select.className = VALID_CLASS_ID;
        r_error.textContent = STRING_EMPTY;
        r_error.className = ERROR_CLASS_ID;
    }

    if (isValidY && isValidR && isAcceptableY && isAcceptableR) {
        drawPoint(x, y, r);
        getIsIntersects(x, y, r);
    }
});

function clear_table(){
    localStorage.clear();
    location.reload();
}