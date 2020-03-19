import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import MainField from "./MainField";
import PostsCounter from "./PostsCounter";
import UniqueTitles from "./UniqueTitles";
import ClosestUser from "./ClosestUser";
import getDataFromAPI from "./api/GetDataFromAPI";

jest.mock("./api/GetDataFromAPI");

describe('<MainField />', () => {

    const mainField = (disableLifecycleMethods = false) =>
        shallow(<MainField />, {disableLifecycleMethods});
    let appWrapper;
    let appInstance;

    beforeEach(() => {
        appWrapper = mainField();
        appInstance = appWrapper.instance();
    });

    afterEach(() => {
        appWrapper = undefined;
        appInstance = undefined;
    });

    it('renders without crashing', () => {
        expect(mainField().exists()).toBe(true);
    });

    describe('when "posts" are false', () => {
        beforeEach(() => {
            appWrapper =  mainField(true);
            appInstance = appWrapper.instance();
            appInstance.setState({ posts: false });
        });
        it('renders a h1', () => {
            expect(appWrapper.first().type()).toBe('h1');
        });
    });

    describe('when "users" are false', () => {
        beforeEach(() => {
            appWrapper =  mainField(true);
            appInstance = appWrapper.instance();
            appInstance.setState({ users: false });
        });
        it('renders a h1', () => {
            expect(appWrapper.first().type()).toBe('h1');
        });
    });

    describe('when "posts" and "users" are not false', () => {
        beforeEach(() => {
            appWrapper =  mainField(true);
            appInstance = appWrapper.instance();
            appInstance.setState({
                posts: ['posts'],
                users: ['users']
            });
        });

        it('renders a section', () => {
            expect(appWrapper.first().type()).toBe('section');
        });

        describe('the rendered section', () => {
            const section = () => appWrapper.first();

            it('contains everything else that gets rendered', () => {
                expect(section().children()).toEqual(appWrapper.children());
            });
        });

        it('renders <PostsCounter />', () => {
            expect(appWrapper.find(PostsCounter).length).toBe(1);
        });

        describe('the rendered <PostsCounter />', () => {
            const postsCounter = () => appWrapper.find(PostsCounter);

            it('receives state.posts as a "posts" prop', () => {
                expect(postsCounter().prop('posts')).toEqual(appInstance.state.posts);
            });

            it('receives state.users as a "users" prop', () => {
                expect(postsCounter().prop('users')).toEqual(appInstance.state.users);
            });
        });

        it('renders <UniqueTitles />', () => {
            expect(appWrapper.find(UniqueTitles).length).toBe(1);
        });

        describe('the rendered <UniqueTitles />', () => {
            const uniqueTitles = () => appWrapper.find(UniqueTitles);

            it('receives state.posts as a "posts" prop', () => {
                expect(uniqueTitles().prop('posts')).toEqual(appInstance.state.posts);
            });
        });

        it('renders <ClosestUser />', () => {
            expect(appWrapper.find(ClosestUser).length).toBe(1);
        });

        describe('the rendered <ClosestUser />', () => {
            const closestUser = () => appWrapper.find(ClosestUser);

            it('receives state.users as a "users" prop', () => {
                expect(closestUser().prop('users')).toEqual(appInstance.state.users);
            });
        });

    });

    describe('componentDidMount method', () => {
        it('fetches data from external api', done => {
            setTimeout(() => {
                appWrapper.update();
                const state = appInstance.state;
                expect(state.posts.length).toBe(3);
                expect(state.users.length).toBe(3);

                done();
            });
        });
    });
});