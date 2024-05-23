const { Op } = require('sequelize');
const Inchiriere = require('../models/Inchiriere');
const Masina = require('../models/Masina')
const { sequelize } = require('../config/database');

exports.inchiriazaMasina = async (req, res) => {
    const { id_masina, data_inchiriere, numar_zile} = req.body;
    const data_predare = new Date(data_inchiriere);
    data_predare.setDate(data_predare.getDate() + numar_zile);

    try {
        // Verifică dacă mașina este deja închiriată în perioada dorită
        const inchiriereExista = await Inchiriere.findOne({
            where: {
                id_masina,
                [Op.or]: [
                    {
                        data_inchiriere: { [Op.lte]: data_predare },
                        data_predare: { [Op.gte]: data_inchiriere }
                    }
                ]
            }
        });

        if (inchiriereExista) {
            return res.status(409).send({ message: 'Mașina nu este disponibilă în intervalul selectat.' });
        }

        // Crearea închirierii
        const inchiriere = await Inchiriere.create({
            id_client: req.user.id,  // Utilizatorul autentificat
            id_masina,
            data_inchiriere,
            data_predare
        });

        res.status(201).send({ message: 'Mașina a fost închiriată cu succes.', inchiriere });
    } catch (error) {
        console.error('Eroare la închirierea mașinii:', error);
        res.status(500).send({ message: 'Eroare internă', error });
    }
};


// Filtrare dup amarca
exports.masiniDupaMarca = async (req, res) => {
  const { marca } = req.params;

  try {
      const masini = await Masina.findAll({
          where: { marca },
          attributes: ['id', 'marca', 'model']
      });

      if (masini.length === 0) {
          return res.status(404).send({ message: 'Nu există mașini pentru marca specificată.' });
      }

      res.send({ masini });
  } catch (error) {
      console.error('Eroare la căutarea mașinilor:', error);
      res.status(500).send({ message: 'Eroare internă', error });
  }
};


exports.toateMarcile = async (req, res) => {
  try {
      const marci = await Masina.findAll({
          attributes: [[sequelize.fn('DISTINCT', sequelize.col('marca')), 'marca']]
      });

      res.send({ marci });
  } catch (error) {
      console.error('Eroare la extragerea mărcilor:', error);
      res.status(500).send({ message: 'Eroare internă', error });
  }
};

