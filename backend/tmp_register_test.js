try {
  const url = 'http://127.0.0.1:5000/api/auth/register';
  const body = { email: `testuser_${Date.now()}@example.com`, password: 'Password123!', first_name: 'Test', last_name: 'User' };
  const resp = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const text = await resp.text();
  console.log('STATUS', resp.status);
  console.log('BODY_START');
  console.log(text);
  console.log('BODY_END');
} catch (e) {
  console.error('ERR', e);
}
