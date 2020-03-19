import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import MainField from "./components/MainField";

describe('<App />', () => {

  it('renders without crashing', () => {
    shallow(<App/>);
  });

  it('includes MainField', () => {
    const app = shallow(<App/>);
    expect(app.containsMatchingElement(<MainField/>)).toEqual(true);
  });

});