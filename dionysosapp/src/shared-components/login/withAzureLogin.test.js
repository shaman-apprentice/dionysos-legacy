import 'react-native';
import React from 'React';
import renderer, { act } from 'react-test-renderer';

import { withAzureLogin } from './withAzureLogin';
import { Login } from './Login';

jest.mock('./loginApi', () => ({
  getAzureCredentials: async (username, pw) =>
    (username === 'James' && pw === 'top-secret')
      ? { status: 200, json: async () => ({ sas: 'some-token', host: 'some-host' }) }
      : { status: 403, text: async () => 'some-error' }
}));

const TestComponent = () => null;
let TestComponentWithLogin;

beforeEach(() => {
  TestComponentWithLogin = withAzureLogin(TestComponent);
});

it('shows initially only Login', () => {
  const app = renderer.create(<TestComponentWithLogin />);
  expect(() => app.root.findByType(TestComponent)).toThrow();
  expect(() => app.root.findByType(Login)).not.toThrow();
});

it('enables Login Button if username and password are present', () => {
  const app = renderer.create(<TestComponentWithLogin />);
  expect(app.root.findByProps({ title: 'Login' }).props.disabled).toBe(true);
  
  act(() => {
    app.root.findByProps({ label: 'Username' }).props.onChangeText('James');
    app.root.findByProps({ label: 'Password' }).props.onChangeText('top-secret');
  });
  expect(app.root.findByProps({ title: 'Login' }).props.disabled).toBe(false);
});

it('shows error message on invalid login data', async () => {
  const app = renderer.create(<TestComponentWithLogin />);
  expect(app.root.findByProps({ title: 'Login' }).props.disabled).toBe(true);

  await simulateLogin(app, 'Blond', 'a-little-secret');
  expect(app.root.findByProps({ label: 'Username' }).props.errorMessage).toBe('some-error');
  expect(() => app.root.findByType(TestComponent)).toThrow();
});

it('redirects to app on valid login', async () => {
  const app = renderer.create(<TestComponentWithLogin />);

  await simulateLogin(app, 'James', 'top-secret');

  expect(() => app.root.findByType(Login)).toThrow();
  expect(() => app.root.findByType(TestComponent)).not.toThrow();
});

const simulateLogin = async (app, user, pw) => {
  act(() => {
    app.root.findByProps({ label: 'Username' }).props.onChangeText(user);
    app.root.findByProps({ label: 'Password' }).props.onChangeText(pw);
  });

  app.root.findByProps({ title: 'Login' }).props.onPress();
  await act(async () => await Promise.resolve()); // wait for (mocked) async call to azure and context update afterwards
}
