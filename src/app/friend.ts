/// <reference path='../../tools/typings/angular2/angular2.d.ts' />

import {Component, View, bootstrap, For, If} from 'angular2/angular2';

@Component({
    selector: 'friend',
    properties: {
        'name': 'name'
    }
})
@View({
    templateUrl: 'friend.tpl.html',
    directives: [For, If]
})
export class FriendComponent {
    name:string;

    constructor() {
        this.name = this.name || 'Tom';
    }

}

