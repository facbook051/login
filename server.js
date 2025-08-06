const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// ✅ الحالة العامة المؤقتة
let status = {
    accepted: false,
    rejected: false
};

// ✅ تقديم ملفات من مجلد public
app.use(express.static(path.join(__dirname, 'public')));

// ✅ تحديث الحالة من البوت أو من السكريبت
app.get('/update-status', (req, res) => {
    const action = req.query.action;

    if (action === 'accept') {
        status = { accepted: true, rejected: false };
        console.log('✅ تم التفعيل: ACCEPT');
    } else if (action === 'reject') {
        status = { accepted: false, rejected: true };
        console.log('❌ تم التفعيل: REJECT');
    } else if (action === 'reset') {
        status = { accepted: false, rejected: false };
        console.log('🔁 تم إعادة تعيين الحالة: RESET');
    } else {
        return res.json({ message: '❓ action غير معروف' });
    }

    // 🔄 إعادة تعيين تلقائي بعد 15 ثانية
    setTimeout(() => {
        status = { accepted: false, rejected: false };
        console.log('⏳ الحالة أُعيد تعيينها تلقائيًا');
    }, 15000);

    res.send('✅ الحالة تم تحديثها');
});

// ✅ إعطاء الحالة للواجهة
app.get('/get-status', (req, res) => {
    res.json(status);
});

// ✅ تشغيل السيرفر
app.listen(port, () => {
    console.log(`🚀 السيرفر يعمل على http://localhost:${port}`);
});
