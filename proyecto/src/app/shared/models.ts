export interface PostData {
  key: string;
  creationDate: string;
  content: string;
  img: string;
  created: number;
  userId: string;
}

export interface UserData {
  userId: string;
  created: number;
  lastUpdate: number;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  fullName: string;
  img: string;
  following: string[];
  followers: string[];
}
