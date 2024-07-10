import z from "zod";

export const auth_validation = z.object({
  username: z.string().nonempty({ message: "username is required" }),
  email: z.string().nonempty({ message: "email is required" }).email("Invalid email format"),
  password: z.string().nonempty({ message: "password is required" }).min(6, "password must be at least 6 characters long").max(25, "password must be at most 25 characters long"),
});

export const login_validation = z.object({
  email: z.string().nonempty({ message: "email is required" }).email("Invalid email format"),
  password: z.string().nonempty({ message: "password is required" }).min(6, "password must be at least 6 characters long").max(25, "password must be at most 25 characters long"),
});
