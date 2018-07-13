[
    {
        id: '/#12poihfhhdhdf',
        name: 'Jude',
        room: 'The Office Fans'
    }
];

// addUser(id, name, room)
// removeUser(id)
// getUser(id) : user
// getUserList(room)

class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        // return user that was removed
        var user = this.getUser(id);

        if(user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }

    getUser (id) {
        return this.users.filter((user)=> user.id === id)[0];
    }

    getUserList (room){
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }

    getRoomList () {
        var rooms = []
        this.users.forEach(user => {
            rooms.push(user.room)
        });
        return rooms;
    }
}

module.exports = {Users};
// class Person {
//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     getUserDescription () {
//         return `${this.name} is ${this.age} year(s) old`
//     }
// }
// var me = new Person('Jude', 23);
// var description = me.getUserDescription();
// console.log(description);