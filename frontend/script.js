function fetchAllMedicines(){
    return fetch("http://localhost:8000/medicines")
        .then(response => response.json()) // obtain json object from response.
        .catch(error => console.error("Error fetching medicines:", error));
}

function filterMedicines(data){
    console.log(data)
    data = data.medicines.filter(med => !(!med.name || !med.price));
    console.log(data)
    return data
    // ^ looks inside medicines and removes any item with an empty name or price. 
}

function generateMedicinesList(data){
    // Will grab root node in html and change it with a loop, displaying all medicines and their prices. 
    const medicinesList = document.getElementById("all-medicines-list");
    //console.log("starting data display")
    //console.log(data)

    medicinesList.innerHTML="" // After turning it into a button I didn't want the list to repeat when pressing the button many times. 
    // Removed ".medicine" because filter function removes it. All data goes through filter first anyway.
    data.forEach(med => {
        const listItem = document.createElement("li");
        listItem.textContent = `${med.name}: $${med.price}`;
        medicinesList.appendChild(listItem);
    });

}

function showAllMedicines(){
    fetchAllMedicines().then(data => {
        const filtered = filterMedicines(data)
        generateMedicinesList(filtered);
    });
}

function checkMedicinePresence(name){
    // Will return to this another time. 
    fetchAllMedicines().then(data => {
        data.forEach(med => {
            if(name === med.name){
                return true // if the name entered in the form is found, return true
            }
        })
        return false // otherwise return false. 
    });
}
