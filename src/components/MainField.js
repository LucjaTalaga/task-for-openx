import React, {Component} from 'react';


class MainField extends Component {
    state = {
        posts: false,
        users: false
    };
    //funkcja licząca ile postów napisali userzy
    howManyPosts = () => {
        const {posts, users} = this.state;
        const howMany = [];
        users.forEach(user => {
            let postsCounter = 0;
            posts.forEach(post => {
                if (user.id === post.userId)
                    postsCounter++;
            });
            howMany.push(`${user.name} napisał(a) ${postsCounter} postów`);
        });
        return howMany;
    };
    //funkcja sprawdzająca czy tytuły postów są unikalne, zwracająca listę tych, które nie są
    areTitlesUnique = () => {
        const {posts} = this.state;
        const notUnique = [];
        let alreadyNotUnique;
        console.log('funkcja odpalona');
        for (let i = 0; i < posts.length; i++) {
            alreadyNotUnique = false;
            //console.log('główna pętla for działa '+posts[i].title);
            for (let j = 0; j < notUnique.length; j++) {
                console.log('no, elo , pętla for dla alreadynotTrue');
                if (posts[i].title === notUnique[j]) {
                    alreadyNotUnique = true;
                    break;
                }
            }
            if (alreadyNotUnique)
                continue;
            else {
                for (let j = 0; j < posts.length; j++) {
                    let compare = posts[i].title===posts[j].title;
                    //console.log("druga wewn pętla for "+compare);
                    if(i !== j && posts[i].title === posts[j].title){
                        notUnique.push(posts[i].title);
                        break;
                    }
                }
            }
        }
        console.log(notUnique);
        return notUnique;
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
            console.log(resp);
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
            console.log(resp);
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
        } else {
            return (
                <section>
                    <ul>
                        {this.howManyPosts().map(post => <li>{post}</li>
                        )}
                    </ul>
                    <p>{this.areTitlesUnique()}</p>
                </section>
            )
        }
    }
}

export default MainField;