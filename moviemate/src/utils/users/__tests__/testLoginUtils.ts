import { handleLogin } from '../login';
import { auth } from '../../../config/firebase';
test('properly log in user', async () => {
    expect(await handleLogin(auth, 'test@test.test','123abc')).toBe(true);
});