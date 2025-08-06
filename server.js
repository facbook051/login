const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

// هذا المسار يستقبل تحديثات القبول أو الرفض من البوت لكنه لا يخزن أي حالة
app.get('/update-status', (req, res) => {
    // فقط نرسل رد تأكيد، لا نخزن أي حالة
    return res.json({ message: 'تم استقبال تحديث الحالة، لا يوجد حفظ للحالة' });
});

// المسار الذي يتحقق منه frontend من أجل معرفة الحالة دائماً يعيد حالة فارغة (لا قبول ولا رفض)
app.get('/get-status', (req, res) => {
    return res.json({ accepted: false, rejected: false });
});

app.listen(port, () => {
    console.log(`✅ السيرفر يعمل على http://localhost:${port}`);
});
