import React from 'react';
import { shallow } from 'enzyme';
import UniqueTitles from "./UniqueTitles";

describe('<UniqueTitles/>', () => {

    const uniqueTitles = (disableLifecycleMethods = false) =>
        shallow(<UniqueTitles />, {disableLifecycleMethods});
    let appWrapper;
    let appInstance;

    beforeEach(() => {
        appWrapper = uniqueTitles();
        appInstance = appWrapper.instance();
    });

    afterEach(() => {
        appWrapper = undefined;
        appInstance = undefined;
    });

    describe('when "posts" are false', () => {
        beforeEach(() => {
            appWrapper =  uniqueTitles(true);
            appWrapper.setProps({
                posts: false
            });
        });
        it('renders a null', () => {
            expect(appWrapper.first().type()).toBe(null);
        });
    });
    describe('when "posts" are not false', () => {
        beforeEach(() => {
            appWrapper.setProps({
                posts: []
            })
        });
        it('renders a h2', () => {
            expect(appWrapper.first().type()).toBe('h2');
        });
    });

});