export default function (promise, callback, ...rest) {
    
    promise.forEach(function (target) {
        let result = {
            status: false,
            element: target
        };
    
        
        rest.forEach(function (corrent) {
            corrent.map(function (elem, i, arr) {
                if(target.id === elem.id) {
                    result = {
                        status: true,
                        element: target,
                        index: i,
                        array: arr
                    };
                }
            });
        });
        
        callback(result);
    });
    
    // function containsObject (corrent, array) {
    //     for (let i = 0; i < array.length; i++) {
    //         if (corrent.id === array[i].id) {
    //             return i;
    //         }
    //     }
    //     return null;
    // }
    //
    // let index = containsObject(corrent, rest[0]);
    //
    // if (index !== false) {
    //     vkFriendsAll.splice(index, 1, corrent);
    // } else {
    //     let index = containsObject(corrent, vkFriendsFavorite);
    //     if (index !== false) {
    //         vkFriendsFavorite.splice(index, 1, corrent);
    //     } else {
    //         vkFriendsAll.push(corrent);
    //     }
    // }
}