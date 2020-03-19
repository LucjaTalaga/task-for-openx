import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import MainField from "./components/MainField";
import getDataFromAPI from './components/api/GetDataFromAPI';

jest.mock("./components/api/GetDataFromAPI");

describe('<App />', () => {

  let appWrapper;
  let appInstance;
  let mainField;
  let mainFieldWrapper;

  const mountApp = (disableLifecycleMethods = false) =>
      mount(<App />, { disableLifecycleMethods });

  const getMainFieldWrapper = () => {
    if (!appWrapper) {
      appWrapper = mountApp();
    }
    return appWrapper.find('MainField');
  };

  beforeEach(() => {
    appWrapper = mountApp();
    appInstance = appWrapper.instance();
  });

  afterEach(() => {
    appWrapper = undefined;
    appInstance = undefined;
  });

  it('renders without crashing', () => {
    expect(appWrapper.exists()).toBe(true);
  });
  it('only shows "data-loading" until posts and users are get from API', () => {
    appWrapper = mountApp(true);
    expect(getMainFieldWrapper().find('#data-loading').length).toBe(1);
    expect(getMainFieldWrapper().find('section').length).toBe(0);
  });

  it('hides "data-loading" after posts and users had fetched', () => {
    appWrapper.update();
    expect(getMainFieldWrapper().find('#data-loading').length).toBe(0);
    expect(getMainFieldWrapper().find('section').length).toBe(1);
  });

});