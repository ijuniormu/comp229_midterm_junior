const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

let sports = ['Soccer', 'Handball', 'Volleyball', 'Cricket', 'Swimming'];

const withIds = () => sports.map((sportName, id) => ({ id, sportName }));

app.get('/', (req, res) => {
res.json({
message: 'Welcome to Junior’s Sports API!',
endpoints: 
[
    'GET    /api/junioritems',
    'GET    /api/junioritems/:id',
    'POST   /api/junioritems',
      'PUT    /api/junioritems/:id',
      'DELETE /api/junioritems/:id'
    ]
  });
});


app.get('/api/junioritems', (req, res) => {
  res.json(withIds());
});

app.get('/api/junioritems/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id) || id < 0 || id >= sports.length) {
    return res.status(404).json({ error: 'put the righ item' });
  }
  res.json({ id, sportName: sports[id] });
});

app.post('/api/junioritems', (req, res) => {
  const { sportName } = req.body;
if (!sportName) {
    return res.status(400).json({ error: 'Incorrect sport name field' });
  }
  sports.push(sportName);
  res.status(201).json({ id: sports.length - 1, sportName });
});

app.put('/api/junioritems/:id', (req, res) => {
  const id = Number(req.params.id);
  const { sportName } = req.body;
if (isNaN(id) || id < 0 || id >= sports.length) {
    return res.status(404).json({ error: 'The Item does not exist' });
  }
if (!sportName) {
    return res.status(400).json({ error: 'Incorrect sport nae field' });
  }
  sports[id] = sportName;
  res.json({ id, sportName });
});

app.delete('/api/junioritems/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id) || id < 0 || id >= sports.length) {
    return res.status(404).json({ error: 'Please enter the right item' });
  }
const removed = sports.splice(id, 1)[0];
  res.json({ id, removed });
});


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`running port is ${PORT}`);
});
