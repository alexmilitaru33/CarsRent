const Specificatii = require('../models/Specificatii');
const Masina = require('../models/Masina')

exports.addMasina = async (req, res) => {
  try {
    const { marca, model,  pret, win,  id_specificatii } = req.body;
    const specificatii = await Specificatii.findByPk(id_specificatii);
    if (!specificatii) {
      console.error('Package of specifications was not found: ', error);
      return res.status(404).send({ message: 'Package of specifications not found' });
    }
    const masina = await Masina.create({ marca,model, pret,win, id_specificatii });
    res.status(201).send({ message: 'Car added successfully', masina });
  } catch (error) {
    console.error('Error adding masina:', error);
    res.status(500).send({ message: 'Error adding masina', error });
  }
};

exports.deleteMasina = async (req, res) => {
  try {
    const { id } = req.params;
    const masina = await Masina.findByPk(id);
    if (!masina) {
      return res.status(404).send({ message: 'Car was not found' });
    }
    await masina.destroy();
    res.send({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).send({ message: 'Error deleting Car', error });
  }
};

exports.updateMasina = async (req, res) => {
  try {
    const { id } = req.params;
    const {marca, model,  pret,win,  id_specificatii} = req.body;
    const masina = await Masina.findByPk(id);
    if (!masina) {
      return res.status(404).send({ message: 'Car was not found' });
    }
    masina.marca = marca || masina.marca;
    masina.model = model || masina.model;
    masina.pret = pret || masina.pret;
    masina.win = model || masina.win;
    const specificatii = await Specificatii.findByPk(id_specificatii);
    if(!specificatii) {
      throw new Error("Thre is no such set of specification");
    }
    masina.id_specificatii =  id_specificatii || masina.id_specificatii;
    await masina.save();
    res.send({ message: 'Car  updated successfully', masina });
  } catch (error) {
    console.error('Error updating masina :', error);
    res.status(500).send({ message: 'Error updating masina', error });
  }
};

exports.getMasiniCrescator = async (req, res) => {
  try {
    const masini = await Masina.findAll({
      order: [[ 'pret', 'ASC']]
    });
    res.status(200).send(masini);
  } catch (error) {
    throw new Error('A apărut o eroare la obținerea mașinilor sortate crescător.');
  }
};


exports.getMasiniDescrescator = async (req, res) => {
  try {
    const masini = await Masina.findAll({
      order: [['pret', 'DESC']]
    });
    res.status(200).send(masini);
  } catch (error) {
    throw new Error('A apărut o eroare la obținerea mașinilor sortate descrescător.');
  }
};
