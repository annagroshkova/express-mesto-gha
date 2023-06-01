export interface UserObject {
  about: string;
  avatar: string;
  // cohort?: string;
  name: string;
  email: string;
  _id: string;
}

export interface CardObject {
  createdAt: string;
  // likes: UserObject[];
  likes: string[];
  link: string;
  name: string;
  // owner: UserObject;
  owner: string;
  _id: string;
}

export interface CardInput {
  name: string;
  link: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface SigninResponse {
  token: string;
}

export interface MyInfo {
  _id: string;
  email: string;
}
