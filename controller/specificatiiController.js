// const { spec } = require('node:test/reporters');
const Specificatii = require('../models/Specificatii');
const Masina = require('../models/Masina')

exports.addSpecificatii = async (req, res) => {
  try {
    const { culoare, nr_kilometrii, anvelope, transmisie, motor, an } = req.body;
    const specificatie = await Specificatii.create({ culoare, nr_kilometrii, anvelope, transmisie, motor, an });
    res.status(201).send({ message: 'Specificatie added successfully', specificatie });
  } catch (error) {
    console.error('Error adding specificatie:', error);
    res.status(500).send({ message: 'Error adding specificatie', error });
  }
};

exports.deleteSpecificatii = async (req, res) => {
  try {
    const { id } = req.params;
    const specificatii = await Specificatii.findByPk(id);
    if (!specificatii) {
      return res.status(404).send({ message: 'Packet of specifications was not found' });
    }
    // update in masina
    await Masina.update({ specificatii_id: null }, { where: { specificatii_id: id } });
    await specificatii.destroy();
    res.send({ message: 'Packet of specifications successfully' });
  } catch (error) {
    console.error('Error deleting Packet of specifications:', error);
    res.status(500).send({ message: 'Error deleting Packet of specifications', error });
  }
};

exports.updateSpecificatii = async (req, res) => {
  try {
    const { id } = req.params;
    const {culoare, nr_kilometrii, anvelope, transmisie, motor, an} = req.body;
    const specificatii = await Specificatii.findByPk(id);
    if (!specificatii) {
      return res.status(404).send({ message: 'Packet of specifications not found' });
    }
    specificatii.culoare = culoare || specificatii.culoare;
    specificatii.nr_kilometrii = nr_kilometrii || specificatii.nr_kilometrii;
    specificatii.anvelope =  anvelope || specificatii.anvelope;
    specificatii.transmisie =  transmisie || specificatii.transmisie;
    specificatii.motor =  motor || specificatii.motor;
    specificatii.an =  an || specificatii.an;
    await specificatii.save();
    res.send({ message: 'Packet of specifications  updated successfully', specificatii });
  } catch (error) {
    console.error('Error updating packet of specifications :', error);
    res.status(500).send({ message: 'Error updating packet of specifications ', error });
  }
};