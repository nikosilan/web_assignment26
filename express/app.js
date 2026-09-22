import express from 'express';

const app = express();
const PORT = 3000;

app.get('/api/v1/cats', (req, res) => {
  res.json({
    cat_id: 1,
    name: 'Matti',
    birthdate: '2020-01-01',
    weight: 5,
    owner: 'Ilkka',
    image: 'https://loremflickr.com/320/240/cat'
  });
});

app.use('/public', express.static('public'));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});