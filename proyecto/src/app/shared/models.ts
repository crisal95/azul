export interface PostData {
  key: string;
  creationDate: string;
  content: string;
  img: string;
  created: number;
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
}
