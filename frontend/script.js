
function displayAllMedicines(data){
    // Will grab root node in html and change it with a loop, displaying all medicines and their prices. 
}

function fetchAllMedicines() {
    fetch("http://localhost:8000/medicines")
        .then(response => response.json) // obtain json object from response.
        .then(data => displayAllMedicines(data)) // pass response above function for display
        .catch(error => console.error("Error fetching medicines:", error))
}