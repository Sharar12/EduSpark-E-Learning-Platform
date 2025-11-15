



// Pre-populated users for demonstration purposes
export const initialUsers = [
  {
    id: '1',
    fullName: 'Alice Student',
    email: 'student@example.com',
    passwordHash: 'hashed_student_password',
    role: 'student',
    joinDate: '2024-03-15',
    enrolledCourseIds: ['wd-bootcamp', 'ds-python'],
    cart: [],
  },
  {
    id: '2',
    fullName: 'Bob Teacher',
    email: 'teacher@example.com',
    passwordHash: 'hashed_teacher_password',
    role: 'teacher',
    joinDate: '2023-11-01',
    createdCourseIds: ['teacher-course-1'],
  },
  {
    id: '3',
    fullName: 'Charles Admin',
    email: 'admin@example.com',
    passwordHash: 'hashed_admin_password',
    role: 'admin',
    joinDate: '2023-01-01',
  },
];

// In a real application, this would be a connection to a database.
// For this simulation, we'll use an in-memory array.
let users = [...initialUsers];

// --- CRUD Operations ---

export const getAllUsers = () => {
    return [...users];
};

// Simple function to find a user by email
export const findUserByEmail = (email) => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

// Simple function to add a new user
export const addUser = (user) => {
  const newUser = {
    ...user,
    id: (users.length + 1).toString(),
    joinDate: new Date().toISOString().split('T')[0],
  };
  users.push(newUser);
  return newUser;
};

export const updateUser = (id, updatedData) => {
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex > -1) {
        users[userIndex] = { ...users[userIndex], ...updatedData };
        return users[userIndex];
    }
    return null;
};

export const deleteUser = (id) => {
    const initialLength = users.length;
    users = users.filter(u => u.id !== id);
    return users.length < initialLength;
};


// Function to reset the database to its initial state (for demo purposes)
export const resetDB = () => {
    users = [...initialUsers];
};