export interface UserObject {
  about: string;
  avatar: string;
  cohort?: string;
  name: string;
  _id: string;
}

export interface CardObject {
  createdAt: string;
  likes: UserObject[];
  link: string;
  name: string;
  owner: UserObject;
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

export interface MyInfoResponse {
  data: MyInfo;
}

export interface MyInfo {
  _id: string;
  email: string;
}
