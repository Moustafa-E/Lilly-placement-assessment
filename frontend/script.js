
document.addEventListener("DOMContentLoaded", () => {
    fetchAllMedicines();
});

function displayAllMedicines(data){
    // Will grab root node in html and change it with a loop, displaying all medicines and their prices. 
    const medicinesList = document.getElementById("all-medicines-list");
    console.log("starting data display")
    console.log(data)

    data.medicines.forEach(med => {
        
        const listItem = document.createElement("li");
        listItem.textContent = `${med.name}: $${med.price}`;
        medicinesList.appendChild(listItem);
    });

}

function fetchAllMedicines() {
    fetch("http://localhost:8000/medicines")
        .then(response => response.json()) // obtain json object from response.
        .then(data => {
            console.log(data)
            displayAllMedicines(data)
        }) // pass response above function for display
        .catch(error => console.error("Error fetching medicines:", error))
}