/// <reference path='../../tools/typings/angular2/angular2.d.ts' />

import {Component, View, bootstrap, For, If} from 'angular2/angular2';
import {FriendsStore} from 'friends-store';

@Component({
    selector: 'display',
    injectables: [FriendsStore]
})
@View({
    templateUrl: 'display.tpl.html',
    directives: [For, If]
})
class DisplayComponent {
    myName:string;
    names:Array<string>;
    foo:String;
    friendsStore:FriendsStore;

    constructor(friendsStore:FriendsStore) {
        this.myName = 'Alice';
        this.friendsStore = friendsStore;
        this.initTimer();
    }

    initTimer = function () {
        setInterval(function () {
            this.time = (new Date()).toString();
        }.bind(this), 1000);
    };


    addNewFriend = function () {
        console.log('addNewFriend');
    };

    myControllerMethod = function () {
        console.log('myControllerMethod');
    };

    addFriend($event, newFriend) {
        if ($event.which === 13 || $event instanceof MouseEvent) {
            this.friendsStore.addFriend(newFriend);
            newFriend.value = '';
        }
    }

    removeFriend(noMoreFriend) {
        console.log('remove', noMoreFriend);
        this.friendsStore.removeFriend(noMoreFriend);
    }
}

bootstrap(DisplayComponent);
