import React from 'react';

//funkcja, która każdemu użytkownikowi przyporządkowuje użytkownika mieszkającego najbliżej
function ClosestUser(props) {

        const {users} = props;
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
        return (
            <ul>{resultsArray.map((result, index) => <li key={index}>{result}</li>)}</ul>
        )

}

export default ClosestUser;