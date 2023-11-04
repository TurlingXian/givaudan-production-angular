export interface Message {
  message: string;
}

export interface BaseEntity {
  id: string | null;
}

export interface Widget extends BaseEntity {
  name: string;
  address: string;
}