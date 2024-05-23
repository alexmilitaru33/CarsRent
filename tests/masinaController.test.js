const express = require('express');
const bodyParser = require('body-parser');
const request = require('supertest');

// Mock sequelize models
jest.mock('../models/Specificatii', () => ({
  findByPk: jest.fn()
}));
jest.mock('../models/Masina', () => ({
  create: jest.fn(),
  findByPk: jest.fn(),
  belongsTo: jest.fn()
}));

const Specificatii = require('../models/Specificatii');
const Masina = require('../models/Masina');
const carController = require('../controller/masinaController');

// Mock middleware
const authenticate = jest.fn((req, res, next) => next());
const isAdmin = jest.fn((req, res, next) => next());

// Setup Express app and router
const app = express();
app.use(bodyParser.json());

const router = express.Router();
router.post('/add', authenticate, isAdmin, carController.addMasina);
router.delete('/delete/:id', authenticate, isAdmin, carController.deleteMasina);
router.put('/update/:id', authenticate, isAdmin, carController.updateMasina);

app.use('/cars', router);

describe('Car Controller', () => {
  describe('POST /cars/add', () => {
    it('should add a car successfully', async () => {
      Specificatii.findByPk.mockResolvedValue({ id: 1 });
      Masina.create.mockResolvedValue({
        id: 1, marca: 'Test', model: 'Test Model', pret: 10000, win: 'WIN123', id_specificatii: 1
      });

      const response = await request(app)
        .post('/cars/add')
        .send({ marca: 'Test', model: 'Test Model', pret: 10000, win: 'WIN123', id_specificatii: 1 });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Car added successfully');
    });

    it('should return an error if the specifications package is not found', async () => {
      Specificatii.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .post('/cars/add')
        .send({ marca: 'Test', model: 'Test Model', pret: 10000, win: 'WIN123', id_specificatii: 1 });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Package of specifications not found');
    });
  });

  describe('DELETE /cars/delete/:id', () => {
    it('should delete a car successfully', async () => {
      Masina.findByPk.mockResolvedValue({
        destroy: jest.fn().mockResolvedValue({})
      });

      const response = await request(app)
        .delete('/cars/delete/1');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Car deleted successfully');
    });

    it('should return an error if the car is not found', async () => {
      Masina.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .delete('/cars/delete/1');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Car was not found');
    });
  });

  describe('PUT /cars/update/:id', () => {
    it('should update a car successfully', async () => {
      const updatedData = {
        marca: 'New', model: 'New Model', pret: 20000, win: 'WIN456', id_specificatii: 2
      };
      const mockMasina = {
        save: jest.fn().mockResolvedValue(updatedData)
      };
      Masina.findByPk.mockResolvedValue(mockMasina);

      const response = await request(app)
        .put('/cars/update/1')
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Car updated successfully');
    });

    it('should handle errors during update', async () => {
      const mockMasina = {
        save: jest.fn().mockRejectedValue(new Error('Database error'))
      };
      Masina.findByPk.mockResolvedValue(mockMasina);

      const response = await request(app)
        .put('/cars/update/1')
        .send({ marca: 'New', model: 'New Model', pret: 20000, win: 'WIN456', id_specificatii: 2 });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error updating masina');
    });

    it('should return an error if the car is not found', async () => {
      Masina.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .put('/cars/update/1')
        .send({ marca: 'New', model: 'New Model', pret: 20000, win: 'WIN456', id_specificatii: 2 });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Car was not found');
    });
  });
});
