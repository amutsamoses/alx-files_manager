import express from 'express'
import AppController from '../controllers/AppController';

function appRouter(app) {
  const router = express.Router();
  app.use('/', router);

  // return if Redis is alive and if the DB is alive
  router.get('/status', (req, res) => {
    AppController.getStatus(req, res);
  });

  // should return the number of users and files in DB
  router.get('/stats', (req, res) => {
    AppController.getStats(req, res);
  });
}
