import React from 'react';
import { shallow } from 'enzyme';
import ClosestUser from "./ClosestUser";

describe('<ClosestUser />', () => {

    const closestUser = (disableLifecycleMethods = false) =>
        shallow(<ClosestUser />, {disableLifecycleMethods});
    let appWrapper;
    let appInstance;

    beforeEach(() => {
        appWrapper = closestUser();
        appInstance = appWrapper.instance();
    });

    afterEach(() => {
        appWrapper = undefined;
        appInstance = undefined;
    });

    describe('when "users" are false', () => {
        beforeEach(() => {
            appWrapper =  closestUser(true);
            appWrapper.setProps({
                users: false
            });
        });
        it('renders a null', () => {
            expect(appWrapper.first().type()).toBe(null);
        });
    });
    describe('when "users" are not false', () => {
        beforeEach(() => {
            appWrapper.setProps({
                users: []
            })
        });
        it('renders a ul', () => {
            expect(appWrapper.first().type()).toBe('ul');
        });
    });

});