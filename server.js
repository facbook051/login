const express = require('express');
const app = express();
const port = 3000;

let status = {
    accepted: false,
    rejected: false
};

app.use(express.static('public'));

app.get('/update-status', (req, res) => {
    const action = req.query.action;

    if (action === 'accept') {
        status.accepted = true;
        return res.json({ message: 'accepted' });
    }

    if (action === 'reject') {
        status.rejected = true;
        return res.json({ message: 'rejected' });
    }

    return res.json({ message: 'invalid' });
});

app.get('/get-status', (req, res) => {
    res.json(status);
});

app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
