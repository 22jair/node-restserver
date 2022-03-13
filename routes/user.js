const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { isRoleValid, notExistEmail, existUserById } = require('../helpers/db-validators');
const { userGet, userPost, userPut, userDelete } = require('../controllers/user');

const router = Router();

router.get('/', userGet );

router.post('/', [
  check('name', 'The name is required').not().isEmpty(),
  check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),  
  check('email', 'This is not a valid email').isEmail(),
  check('email').custom(notExistEmail),
  // check('role', 'The role is not valid').isIn(['USER_ROLE', 'ADMIN_ROLE']),
  check('role').custom( isRoleValid ),
  validateFields
], userPost );

router.put('/:id', [
  check('id', 'Not is a valid mongo id').isMongoId(),
  check('id').custom( existUserById ),
  check('role').custom( isRoleValid ),
  validateFields
], userPut );

router.delete('/:id', [
  check('id', 'Not is a valid mongo id').isMongoId(),
  check('id').custom( existUserById ),
  validateFields
], userDelete );

module.exports = router;
