require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);

require('./core/db');

require('./models/userModel');
require('./models/surveyModel');
require('./services/passport');

const createRoutes = require('./core/routes');
const createSocket = require('./core/socket');
const bot = require('./core/telegram');

const io = createSocket(server);

createRoutes(app, io, bot);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
