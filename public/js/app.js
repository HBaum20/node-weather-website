console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    message1.textContent = 'Loading...';
    message2.textContent = '';

    fetch(`/weather?address=${search.value}`)
        .then(response => response.json()
            .then(data => {
                if(data.error) {
                    message1.textContent = data.error;
                    message2.textContent = '';
                } else {
                    message1.textContent = `Location: ${data.location}`;
                    message2.textContent = `Forecast: ${data.forecast}`;
                }
    }));
});