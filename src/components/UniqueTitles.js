import React from 'react';

//funkcja sprawdzająca czy tytuły postów są unikalne, zwracająca listę tych, które nie są
function UniqueTitles(props) {

    const {posts} = props;
    if (!posts)  {
        return null;
    }
    else {
        const notUnique = [];
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
        if (notUnique.length > 0) {
            return (
                <>
                    <h2>Posty, których tytuły nie są unikalne: </h2>
                    <ul>{notUnique.map((title, index) => <li key={index}>{title}</li>)}</ul>
                </>
            );
        } else {
            return (
                <h2>Tytuły wszystkich postów są unikalne</h2>
            )
        }
    }
}

export default UniqueTitles;