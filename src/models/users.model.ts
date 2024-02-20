export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export type ValidatedUserData = {
  username?: string;
  age?: number;
  hobbies?: string[];
} | null;

export const users: User[] = []