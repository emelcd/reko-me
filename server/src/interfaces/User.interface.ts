interface IUser {
  name: string;
  email: string;
  password: string;
  friends: string[];
  avatar?: string;
  followers: string[];
}

export default IUser;
