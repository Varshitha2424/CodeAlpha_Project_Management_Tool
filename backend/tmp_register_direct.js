import { registerUser } from './src/services/auth.service.js';

try {
  const user = await registerUser({ email: `direct_${Date.now()}@example.com`, password: 'Password123!', first_name: 'Direct', last_name: 'User' });
  console.log('REGISTERED', user);
} catch (e) {
  console.error('ERR', e.code || e.message, e);
}
