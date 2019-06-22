const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/weather', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  
  fetch("http://api.openweathermap.org/data/2.5/group?units=Imperial&id=1264527,1273865,1264521,1259425,1254361,7603116,1272013,1257629,1253286&appid=d465261d95b43bff6d44b34c18712ba6")
	.then(res => res.json())
	.then(data => {
        console.log(data);
		res.send(JSON.stringify(data));
	})
	.catch(err => {
		res.status(500).send('Something broke!');
	});  
});

app.listen(3001, () =>
  console.log('server is running on localhost:3001')
);