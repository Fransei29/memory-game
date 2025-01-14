const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const cardRoutes = require('./routes/cards');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/cards', cardRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await sequelize.authenticate();
    console.log('Database connected!');
    await sequelize.sync({ force: true });
    console.log('Database synchronized!');
  });