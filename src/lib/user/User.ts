export default class User {
    public id: string;
    public name: string;
    public email: string;
    public username?: string;
    public profilePicture?: string;

    constructor(id: string, name: string, email: string, username?: string, profilePicture?: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        
        if (username) {
            this.username = username
        };

        if (profilePicture) {
            this.profilePicture = profilePicture
        };
    }
}