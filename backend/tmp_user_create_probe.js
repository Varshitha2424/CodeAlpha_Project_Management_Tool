import UserModel from './src/models/user.model.js';

try {
  const result = await UserModel.create({ email: 'probe_' + Date.now() + '@example.com', password_hash: 'hashed_pw', first_name: 'Probe', last_name: 'User', role: 'member' });
  console.log('INSERT OK', result);
} catch (e) {
  console.error('ERR', e.code || e.message, e);
}
