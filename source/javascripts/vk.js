export default function () {
    return new Promise(function(resolve, reject) {
        VK.init({
            // localhost
            apiId: 6194378
            // baglaridis.com
            // apiId: 6201969
        });

        VK.Auth.login(function(response) {
            if (response.session) {

                VK.Api.call('friends.get', {
                    order: 'name',
                    fields: 'nickname, photo_50',
                    v: 5.68
                }, function(data) {
                    resolve(data.response.items);
                });

            } else {
                reject();
            }
        });
    });
}