import express from 'express';
import cors from 'cors';
import { environment } from './config.js';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	organization: environment.OPENAI_ORGANIZATION,
	apiKey: environment.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

const idRandonAvatar = Math.floor(Math.random() * 100);
const timer = ms => new Promise( res => setTimeout(res, ms));
const debug = true

app.post('/api/chat', async (req, res) => {
	const { message, user } = req.body;

	console.log('\n\nInput: ', req.body);

	if ( message === '' || message == undefined ) {
		console.log('No message provided');
		res.json({
			data: 'No message provided',
		});
	}

	if( message !== '' ) {
		var data
		if (!debug) {
			try {
				const response = await openai.createCompletion({
					model: 'gpt-3.5-turbo', // 'text-davinci-003', 
					prompt: message,
					max_tokens: 1000,
					temperature: 0.9,
					top_p: 1,
					presence_penalty : 0.6,
					frequency_penalty : 0,
					user: user,
				})
	
				data = {
					id: response.data.id,
					create: response.data.created,
					model: response.data.model,
					text: response.data.choices[0].text.replace("\n\n", ""),
					usage: response.data.usage,
					user: {
						name: 'chatgpt',
						avatar: 'https://i.pravatar.cc/100?img=' + idRandonAvatar,
					}
				}
			} catch (error) {
				data = {
					id: getUuid(),
					create: 0,
					model: 'model',
					text: 'Sorry but there\'s an error: [' + error.message + '] \nPlease try again later🤕',
					usage: 0,
					user: {
						name: 'chatgpt',
						avatar: 'https://i.pravatar.cc/100?img=' + idRandonAvatar,
					}
				}
			}
		} else {
			await timer(1000)

			data = {
				id: getUuid(),
				create: 0,
				model: 'model',
				text: 'Reply to [' + message + ']' + randomString(),
				usage: {},
				user: {
					naame: 'chatgpt',
					avatar: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.2paoGWldKxa6dW28dZRKVAAAAA',
				}
			}
		}

		res.json({
			data: data,
		});

		console.log('\n\nOutput: ', data);
	
	}
	
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

function getUuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	  var r = (Math.random() * 16) | 0,
		v = c == 'x' ? r : (r & 0x3) | 0x8;
	  return v.toString(16);
	});
}

function randomString() {
	var chars = ' 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var result = '';
	var length = Math.floor(Math.random() * 100)
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}