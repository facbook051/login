const express = require('express');
const app = express();
const port = 3000;

// ✅ تخزين الحالة لكل مستخدم مؤقتًا
const userStatusMap = new Map();

app.use(express.static('public'));

// ✅ تحديث الحالة من البوت
app.get('/update-status', (req, res) => {
    const userId = req.query.userId;
    const status = req.query.status; // 'accept' أو 'reject'
    const reset = req.query.action === 'reset';

    if (!userId) {
        return res.status(400).json({ message: 'userId مفقود' });
    }

    if (reset) {
        userStatusMap.delete(userId);
        console.log(`♻️ تم حذف حالة المستخدم ${userId} يدويًا`);
        return res.send("♻️ تم إعادة تعيين الحالة يدويًا");
    }

    if (!['accept', 'reject'].includes(status)) {
        return res.status(400).json({ message: '⚠️ الحالة غير صالحة' });
    }

    userStatusMap.set(userId, status);

    // ⏱️ حذف الحالة بعد 30 ثانية تلقائيًا
    setTimeout(() => {
        userStatusMap.delete(userId);
        console.log(`🕓 تم حذف حالة المستخدم ${userId} تلقائيًا`);
    }, 30000); // 30 ثانية

    return res.json({ message: `✅ تم تحديث الحالة إلى ${status} للمستخدم ${userId}` });
});

// ✅ جلب حالة مستخدم معين
app.get('/get-status', (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ message: 'userId مفقود' });
    }

    const status = userStatusMap.get(userId) || null;

    return res.json({ status });
});

app.listen(port, () => {
    console.log(`✅ السيرفر يعمل على http://localhost:${port}`);
});
