export const formData = () => {
    
    const addDestination = document.getElementById('addDestination');

    addDestination.addEventListener('submit', (e) => {
        e.preventDefault();
        let destination = {};
        const city = document.getElementById('city').value;
        const date = document.getElementById('date').value;
        const payload = {
            city
        };
        fetch('http://localhost:8080/destination', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(response => {
            destination = {
                date,
                ...response
            };
            console.log(destination);
        });
    });
};