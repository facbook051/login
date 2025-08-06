const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// ✅ الحالة المؤقتة (reset بعد 15 ثانية)
let status = {
    accepted: false,
    rejected: false
};

// ✅ تقديم ملفات HTML و JS من مجلد public
app.use(express.static(path.join(__dirname, 'public')));

// ✅ تحديث الحالة من البوت (Accept أو Reject)
app.get('/update-status', (req, res) => {
    const action = req.query.action;

    if (action === 'accept') {
        status = { accepted: true, rejected: false };
        console.log('✅ حالة القبول مفعّلة');
    } else if (action === 'reject') {
        status = { accepted: false, rejected: true };
        console.log('❌ حالة الرفض مفعّلة');
    } else {
        return res.json({ message: '❓ action غير معروف' });
    }

    // 🔁 إعادة تعيين الحالة بعد 15 ثانية
    setTimeout(() => {
        status = { accepted: false, rejected: false };
        console.log('🔁 تم إعادة تعيين الحالة');
    }, 15000); // ← 15 ثانية

    res.json({ message: '✅ تم تحديث الحالة' });
});

// ✅ إعطاء الحالة لواجهة المستخدم
app.get('/get-status', (req, res) => {
    res.json(status);
});

// ✅ تشغيل السيرفر
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
