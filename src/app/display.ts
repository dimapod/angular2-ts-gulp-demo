/// <reference path='../../tools/typings/angular2/angular2.d.ts' />

import {Component, View, bootstrap, For, If} from 'angular2/angular2';
import {FriendsStore} from 'friends-store';
import {FriendComponent} from 'friend';

@Component({
    selector: 'display',
    injectables: [FriendsStore]
})
@View({
    templateUrl: 'display.tpl.html',
    directives: [For, If, FriendComponent]
})
class DisplayComponent {
    myName:string;
    names:Array<string>;
    foo:String;
    friendsStore:FriendsStore;

    constructor(friendsStore:FriendsStore) {
        this.myName = 'Alice1';
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
            this.friendsStore.addFriend(newFriend.value);
            newFriend.value = '';
        }
    }

    removeFriend(noMoreFriend) {
        console.log('remove', noMoreFriend);
        this.friendsStore.removeFriend(noMoreFriend);
    }
}

// You instantiate an Angular application by explicitly specifying a component to use as the root component
// for your application via the bootstrap() method.
bootstrap(DisplayComponent);
