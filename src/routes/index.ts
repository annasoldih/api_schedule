import { Router } from 'express';
import Validation from '../helpers/Validation';
import CreateRuleController from '../controllers/CreateRuleController';
import DeleteRuleController from '../controllers/DeleteRuleController';
import ScheduleController from '../controllers/ScheduleController';
import AvailableController from '../controllers/AvailableController';

const routes = Router();

routes
  .route('/rule')
  .post(Validation.checkCreate, CreateRuleController.create);

routes
  .route('/rule/:id')
  .delete(Validation.checkDelete, DeleteRuleController.get);

routes
  .route('/rules')
  .get(ScheduleController.get);

routes
  .route('/available')
  .post(Validation.checkInterval, AvailableController.get);

export default routes;
