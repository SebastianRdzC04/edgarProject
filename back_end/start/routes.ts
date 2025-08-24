/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'
import MaterialsController from '#controllers/materials_controller'
import QuotesController from '#controllers/quotes_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})


router.post('/register', [AuthController, 'register']);
router.post('/login', [AuthController, 'login']);
router.post('/logout', [AuthController, 'logout']);
router.post('/me', [AuthController, 'me']);

// Materials Routes

router.post('/materials', [MaterialsController, 'create']);
router.get('/materials', [MaterialsController, 'getAll']);
router.get('/materials/:id', [MaterialsController, 'getById']);
router.put('/materials/:id', [MaterialsController, 'update']);


//Quotes Routes

router.post('/quotes', [QuotesController, 'create']);
router.get('/quotes', [QuotesController, 'getAll']);
router.get('/quotes/:id', [QuotesController, 'getById']);