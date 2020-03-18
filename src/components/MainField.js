import React, {Component} from 'react';
import PostsCounter from "./PostsCounter";
import UniqueTitles from "./UniqueTitles";
import ClosestUser from "./ClosestUser";

class MainField extends Component {
    state = {
        posts: false,
        users: false
    };

    //Przy zamontowaniu komponentu pobierane są dane z API i zapisywane w state
    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/posts").then(resp => {
            if (resp.ok)
                return resp.json();
            else
                throw new Error('Błąd sieci');
        }).then(resp => {
            this.setState({
                posts: resp
            });
        }).catch(err => {
            console.log('Błąd!', err);
        });

        fetch("https://jsonplaceholder.typicode.com/users"
        ).then(resp => {
            if (resp.ok)
                return resp.json();
            else
                throw new Error('Błąd sieci');
        }).then(resp => {
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
                <h1>Ładowanie danych ...</h1>
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