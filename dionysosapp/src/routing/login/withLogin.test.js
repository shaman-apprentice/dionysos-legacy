import 'react-native';
import React from 'React';
import renderer, { act } from 'react-test-renderer';

import { withLogin } from './withLogin';
import { Login } from './Login';

// todo move mock into azure-api
const { createAzureServices } = require('../../azure-api/azureApi');
jest.mock('../../azure-api/azureApi');

const TestComponent = () => null;
let TestComponentWithLogin;

beforeEach(() => {
  TestComponentWithLogin = withLogin(TestComponent);
  createAzureServices.mockReset();
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

it('calls loginApi not again before first call is finished', async () => {
  const app = renderer.create(<TestComponentWithLogin />);
  act(() => {
    app.root.findByProps({ label: 'Username' }).props.onChangeText('Horst');
    app.root.findByProps({ label: 'Password' }).props.onChangeText('no-body-cares');
  });

  await act(async () => { // async because onPress internal async `login is executed`
    app.root.findByProps({ title: 'Login' }).props.onPress();
    app.root.findByProps({ title: 'Login' }).props.onPress();
  });

  expect(createAzureServices).toHaveBeenCalledTimes(1);
});

const simulateLogin = (app, user, pw) =>
  act(async () => { // this act for the update of `isLoggingIn`
    createAzureServices.mockImplementation(async (username, pw) => {
      if (username === 'James' && pw === 'top-secret')
        return { tableService: null, blobService: null }
    
      throw new Error('some-error');
    });

    act(() => {
      app.root.findByProps({ label: 'Username' }).props.onChangeText(user);
      app.root.findByProps({ label: 'Password' }).props.onChangeText(pw);
    });
  
    await act(async () => { // async because onPress internal async `login is executed`
      app.root.findByProps({ title: 'Login' }).props.onPress();
    });
  });
