import React, {Component} from 'react';
import PostsCounter from "./PostsCounter";
import UniqueTitles from "./UniqueTitles";
import ClosestUser from "./ClosestUser";
import getDataFromAPI from './api/GetDataFromAPI'

class MainField extends Component {
    state = {
        posts: false,
        users: false
    };

    //Przy zamontowaniu komponentu pobierane są dane z API i zapisywane w state
    componentDidMount() {
        getDataFromAPI('posts').then(resp => {
            this.setState({
                posts: resp
            });
        }).catch(err => {
            console.log('Błąd!', err);
        });

        getDataFromAPI('users').then(resp => {
            this.setState({
                users: resp
            });
        }).catch(err => {
            console.log('Błąd!', err);
        });
    };


    render() {
        const {posts, users} = this.state;
        if (!posts || !users) {
            return (
                <h1 id='data-loading'>Ładowanie danych ...</h1>
            )
        }
        else {
            return (
                <section>
                    <PostsCounter posts={posts} users={users}/>
                    <UniqueTitles posts={posts}/>
                    <ClosestUser users={users}/>
                </section>
            )
        }
    }
}

export default MainField;