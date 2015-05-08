export class FriendsStore {
  names:Array<string>;

  constructor() {
    this.names = ['Alice', 'Aarav', 'Martín', 'Shannon', 'Ariana', 'Kai'];
  }

  addFriend(newFriend:string):void {
    this.names.push(newFriend);
  }

  removeFriend(noMoreFriend:string):void {
    this.names.splice(this.names.indexOf(noMoreFriend), 1);
  }
}
