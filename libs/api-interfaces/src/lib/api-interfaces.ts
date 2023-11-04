export interface Message {
  message: string;
}

export interface BaseEntity {
  id: string | null;
}

export interface Contact extends BaseEntity {
  id: string;
  name: string;
  gender: string;
  company: string;
  email: string;
  photo?: string;
}