const e = require("express");

document.getElementById('username-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const userInputElement = document.getElementById('username');
    const messages = messagesInputElement.value

    try {
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, messages }),
        })


    } catch (error) {
        console.error('Error en la red:', error)
    }

})