import React from 'react';
import { shallow } from 'enzyme';
import PostsCounter from "./ClosestUser";


describe('<PostsCounter />', () => {

    const postsCounter = (disableLifecycleMethods = false) =>
        shallow(<PostsCounter />, {disableLifecycleMethods});
    let appWrapper;
    let appInstance;

    beforeEach(() => {
        appWrapper = postsCounter();
        appInstance = appWrapper.instance();
    });

    afterEach(() => {
        appWrapper = undefined;
        appInstance = undefined;
    });

    describe('when "users" are false', () => {
        beforeEach(() => {
            appWrapper =  postsCounter(true);
            appWrapper.setProps({
                users: false
            })
        });
        it('renders a null', () => {
            expect(appWrapper.first().type()).toBe(null);
        });
    });

    describe('when "posts" are false', () => {
        beforeEach(() => {
            appWrapper =  postsCounter(true);
            appWrapper.setProps({
                posts: false
            })
        });
        it('renders a null', () => {
            expect(appWrapper.first().type()).toBe(null);
        });
    });
    describe('when "users" and are not false', () => {
        beforeEach(() => {
            appWrapper.setProps({
                users: [],
                posts: []
            })
        });
        it('renders a ul', () => {
            expect(appWrapper.first().type()).toBe('ul');
        });
    });

});