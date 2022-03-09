let errorField = document.getElementById("error");
let regex = /[a-zA-Z]/g;
let lineBreak = document.createElement('br');

// Gets all fields that cannot contain letters and adds to array
const telephoneInput = document.getElementById('telephone');
const guestCount = document.getElementById('guest_count');
const priceInput = document.getElementById('price');
const caseCost = document.getElementById('cse_cost');
const bottleCost = document.getElementById('btl_cost');
const hourlyRate = document.getElementById('hourly_rate');
let elementArray = [telephoneInput, guestCount, priceInput, caseCost, bottleCost, hourlyRate];

// Loop through array, if element is not null, check if letters exist and output error.
elementArray.forEach(element => {
    if (element) {
        console.log(element)
        element.addEventListener('input', (e) => {
            const value = e.target.value;
            if (regex.test(value)) {
                errorField.textContent = "Field cannot contain letters";
                errorField.appendChild(lineBreak);
            } else {
            errorField.textContent = '';
            };
        });
        
    }
});