export type UserBase = {
  username: string;
  age: number;
  hobbies: string[];
}

export type User = UserBase & { id: string }

export type UserData = Partial<UserBase> & Record<string, unknown>

export type ValidatedUserData = Partial<UserBase>

export const users: User[] = []