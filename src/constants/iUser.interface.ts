export interface IUser extends Document {
  fullName: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserInput {
  fullName: string;
  email: string;
  password?: string;
}

export interface ILoginData {
  email: string;
  password?: string;
}

export interface ILoginResponse {
  email: string;
  password?: string;
  token: string;
}
