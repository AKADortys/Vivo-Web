import { User } from './user';

export interface ConfirmAccountQuery {
  token: string;
}

export interface PasswordRecoveryQuery {
  token: string;
  newPassword: string;
}

export interface PasswordResetRequest {
  mail: string;
}

export interface AuthentificationRequest {
  mail: string;
  password: string;
}

export interface AuthentificationResponse {
  message: string;
  data?: User;
}
