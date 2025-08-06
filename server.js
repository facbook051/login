const express = require('express');
const app = express();
const port = 3000;

// ✅ الحالة المشتركة (مؤقتة)
let status = {
    accepted: false,
    rejected: false
};

app.use(express.static('public'));

// ✅ تحديث الحالة من البوت
app.get('/update-status', (req, res) => {
    const action = req.query.action;

    if (action === 'accept') {
        status.accepted = true;
        status.rejected = false;

        // ⏱️ إعادة تعيين بعد 5 ثواني
        setTimeout(() => {
            status.accepted = false;
            console.log("🔁 تم إعادة تعيين 'accept'");
        }, 5000);

        return res.json({ message: 'accepted' });
    }

    if (action === 'reject') {
        status.rejected = true;
        status.accepted = false;

        // ⏱️ إعادة تعيين بعد 5 ثواني
        setTimeout(() => {
            status.rejected = false;
            console.log("🔁 تم إعادة تعيين 'reject'");
        }, 5000);

        return res.json({ message: 'rejected' });
    }

    if (action === 'reset') {
        status.accepted = false;
        status.rejected = false;
        return res.send("♻️ تم إعادة تعيين الحالة يدويًا");
    }

    return res.json({ message: 'invalid action' });
});

// ✅ يطلب منه front-end للتحقق من الحالة
app.get('/get-status', (req, res) => {
    res.json(status);
});

app.listen(port, () => {
    console.log(`✅ السيرفر يعمل على http://localhost:${port}`);
});
