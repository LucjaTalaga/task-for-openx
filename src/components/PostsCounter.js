import React from 'react';

//funkcja licząca ile postów napisali userzy
function PostsCounter(props) {

        const {posts, users} = props;
        if(!posts || !users) {
            return null;
        }
        else {
            const howMany = [];
            users.forEach(user => {
                let postsCounter = 0;
                posts.forEach(post => {
                    if (user.id === post.userId)
                        postsCounter++;
                });
                howMany.push(`${user.name} napisał(a) ${postsCounter} postów`);
            });
            return (
                <ul>{howMany.map((post, index) => <li key={index}>{post}</li>)}</ul>
            );
        }
}

export default PostsCounter;