type ROLE = "user" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  lastName: string;
  location: string;
  role: ROLE;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
};

export type DashboardResponse = {
  user: User;
};
