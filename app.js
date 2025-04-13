const express = require('express');
const sequelize = require('./models');
const Car = require('./models/Car');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

app.get('/cars', async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/cars', async (req, res) => {
  try {
    const newCar = await Car.create(req.body);
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/cars/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).json({ error: "Carro não encontrado" });
    }
    await car.update(req.body);
    res.json(car);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/cars/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).json({ error: "Carro não encontrado" });
    }
    await car.destroy();
    res.json({ message: "Carro excluído com sucesso" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = 4000;
app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Banco de dados sincronizado com sucesso");
  } catch (error) {
    console.error("Erro ao conectar no banco:", error);
  }
});