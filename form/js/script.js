const labels = document.querySelectorAll('.form__control label')

labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('')
})

// Oтправка почты/пароля на сервер
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Создаем объект с данными
        const data = { email, password };

        // Мокаем fetch
        mockFetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);

            // Сбрасываем форму после успешной отправки
            form.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

    // Функция для мока fetch
    function mockFetch(url, options) {
        return new Promise((resolve, reject) => {
            console.log('Mock fetch called with:', url, options);
            setTimeout(() => {
                // Успешный ответ
                resolve({
                    json: () => Promise.resolve({ message: 'Login successful!' })
                });
            }, 1000);
        });
    }
});

