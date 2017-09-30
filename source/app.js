require('./stylesheets/style.scss');
require('./stylesheets/flaticon.scss');

let userTemplate = require('./hbs/userTemplate.hbs');

import vk from './javascripts/vk.js';
import sortArray from './javascripts/sort_array.js';
import dnd from './javascripts/dnd.js';
import search from './javascripts/search.js';
import observer from './javascripts/observer.js';

let containerAll = document.getElementsByClassName('drag-content__all')[0];
let containerFavorite = document.getElementsByClassName('drag-content__favorite')[0];
let filterInput = document.getElementsByClassName('search__input');
let saveButton = document.getElementsByClassName('footer_save')[0];
let vkFriendsAll = [];
let vkFriendsFavorite = [];

if (localStorage.all) {
    vkFriendsAll = JSON.parse(localStorage.getItem('all'));
}

if (localStorage.favorite) {
    vkFriendsFavorite = JSON.parse(localStorage.getItem('favorite'));
}

vk()
    // load friends from VK -- ok
    // update all lists of friends
    .then(function (promise) {
        if (promise.length > 0) {
            
            sortArray(promise, function (response) {
                if (response.status) {
                    response.array.splice(response.index, 1, response.element);
                    return true;
                }
                vkFriendsAll.push(response.element);
            }, vkFriendsAll, vkFriendsFavorite);
            
            return promise;
        }
        
        console.log('no friends found');
    })
    // show all friend on the page -- ok
    .then(function (promise) {
        containerAll.innerHTML = userTemplate({ users: vkFriendsAll });
        
        if (vkFriendsFavorite.length > 0) {
            containerFavorite.innerHTML = userTemplate({ users: vkFriendsFavorite });
        }
        
        return promise;
    })
    // set the DnD
    .then(function (promise) {
        dnd({
            dragContainer: 'ff__content',
            dragItem: 'my-friends',
            eventButton: 'my-friends__button'
        }, function (moveFrom, value) {
            let userid = +value.dataset.id;
            let fromArray = vkFriendsAll;
            let toArray = vkFriendsFavorite;
            
            if (moveFrom === 'favorite') {
                fromArray = vkFriendsFavorite;
                toArray = vkFriendsAll;
            }
            
            for (let i = 0; i < fromArray.length; i++) {
                if (fromArray[i].id === userid) {
                    toArray.push(fromArray[i]);
                    fromArray.splice(i, 1);
                }
            }
        });
        
        return promise;
    })
    // set search -- ok
    .then(function (promise) {
        
        [].forEach.call(filterInput, function (corrent) {
            let name = 'drag-content__' + corrent.dataset.input;
            let container = document.getElementsByClassName(name)[0];
            
            observer(container, function () {
                
                let event = new Event('keyup');
                
                corrent.dispatchEvent(event);
            });
            
            corrent.addEventListener('keyup', function (e) {
                
                search(corrent.value, container);
            });
        });
        return promise;
    })
    // set saving button -- ok
    .then(function () {
        saveButton.addEventListener('click', function (e) {
            localStorage.setItem('all', JSON.stringify(vkFriendsAll));
            localStorage.setItem('favorite', JSON.stringify(vkFriendsFavorite));
            alert('Список выбранных друзей сохранён.');
        });
    });
