import { findUserByEmail, addUser } from './db.js';

// --- Sign In ---
export const signIn = (email, password) => {
  const user = findUserByEmail(email);

  // In a real app, you would compare the hashed password.
  // For this demo, we'll just check if the user exists.
  if (!user) {
    throw new Error('Invalid email or password.');
  }

  // In a real app, you'd create a session token. Here, we just return the user.
  return user;
};

// --- Sign Up ---


export const signUp = (data) => {
  const { fullName, email, role } = data;
  
  const existingUser = findUserByEmail(email);
  if (existingUser) {
    throw new Error('An account with this email already exists.');
  }

  // In a real app, you would hash the password before storing it.
  const passwordHash = `hashed_${data.password}`;

  const newUser = addUser({
    fullName,
    email,
    passwordHash,
    role,
  });

  return newUser;
};

// --- Sign Out ---
export const signOut = () => {
  // In a real app, you would invalidate the user's session token.
  // For this simulation, we don't need to do anything.
};