import express from 'express';
import express_ws from 'express-ws';

const app = express();
const expressWs = express_ws(app);

app.ws('/', (ws) => {
	ws.on('message', (msg) =>{
		expressWs.getWss().clients.forEach(client => {
				client.send(msg);
			}
		);
	});
});

app.listen(3005);
