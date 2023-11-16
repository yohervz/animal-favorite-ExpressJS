const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
        
const radios = document.querySelectorAll('input[type="radio"][name="animal"]:checked');
let error = false;

if (radios.length === 0) {
    error = true;
    const errorElement = document.getElementById('error-animal');
    errorElement.textContent = 'Debes seleccionar un animal';
}

if (error) {
    event.preventDefault();
} });