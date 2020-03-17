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
        posts[10].title = 'lewactwu jak zwykle kończą się argumenty';
        posts[22].title = 'lewactwu jak zwykle kończą się argumenty';
        posts[44].title = 'lewactwu jak zwykle kończą się argumenty';
        posts[11].title = 'radzę posłuchać Korwina, lewaku';
        posts[93].title = 'radzę posłuchać Korwina, lewaku';
        let alreadyNotUnique;
        for (let i = 0; i < posts.length; i++) {
            alreadyNotUnique = false;
            for (let j = 0; j < notUnique.length; j++) {
                if (posts[i].title === notUnique[j]) {
                    alreadyNotUnique = true;
                    break;
                }
            }
            if (alreadyNotUnique)
                continue;
            else {
                for (let j = 0; j < posts.length; j++) {
                    if (i !== j && posts[i].title === posts[j].title) {
                        notUnique.push(posts[i].title);
                        break;
                    }
                }
            }
        }
        return notUnique;
    };
    //funkcja, która każdemu użytkownikowi przyporządkowuje użytkownika mieszkającego najbliżej
    closestNeighbour = () => {
        const {users} = this.state;
        const resultsArray = [];
        const degreesToRadians = (degrees) => {
            const PI = Math.PI;
            return degrees * (PI / 180);
        };
        users.forEach(firstUser => {
            let withWhoSmallestDistance;
            let smallestDistance;
            let firstLatitude = degreesToRadians(firstUser.address.geo.lat);
            users.forEach(secondUser => {
                if (firstUser !== secondUser) {
                    let secondLatitude = degreesToRadians(secondUser.address.geo.lat);
                    let longitudeDelta = degreesToRadians(secondUser.address.geo.lng - firstUser.address.geo.lng);
                    let angle = Math.acos(Math.sin(firstLatitude) * Math.sin(secondLatitude) + Math.cos(firstLatitude) * Math.cos(secondLatitude) * Math.cos(longitudeDelta));
                    let distance = 6371 * angle;
                    if (!smallestDistance || distance < smallestDistance) {
                        smallestDistance = distance;
                        withWhoSmallestDistance = secondUser.name;
                    }
                }
            });
            resultsArray.push(`Najbliżej ${firstUser.name} mieszka ${withWhoSmallestDistance}`);
        });
        return resultsArray;
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
            //tu sprawdzam czy są jakieś powtarzające się tytuły postów i w zależności od tego generuję odpowiedni komunikat
            let areUniqueCommunicate;
            const areUniqueData = this.areTitlesUnique();
            if (areUniqueData.length > 0) {
                areUniqueCommunicate = <>
                    <h2>Posty, których tytuły nie są unikalne: </h2>
                    <ul>{areUniqueData.map(title => <li>{title}</li>)}</ul>
                </>
            } else {
                areUniqueCommunicate = <h2>Tytuły wszystkich postów są unikalne</h2>
            }
            return (
                <section>
                    <ul>
                        {this.howManyPosts().map(post => <li>{post}</li>
                        )}
                    </ul>
                    {areUniqueCommunicate}
                    <ul>{this.closestNeighbour().map(result => <li>{result}</li>)}</ul>
                </section>
            )
        }
    }
}

export default MainField;