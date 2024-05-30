import prisma from './prisma';
import bcrypt from 'bcrypt';

// Example function to create a new user
async function createUser(userData) {
  const { name, email, password, photo, bio, role } = userData;

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user with Prisma
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      photo,
      bio,
      role,
      isVerified: false,
    },
  });

  return newUser;
}

export default createUser;
