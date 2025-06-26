import { factory, primaryKey } from '@mswjs/data';
import { faker } from '@faker-js/faker';

// src/api/mockDb.ts
export const db = factory({
  user: {
    id: primaryKey(faker.string.uuid),
    firstName: () => faker.helpers.arrayElement([
      'Arun', 'Anjali', 'Vishnu', 'Sneha', 'Rahul', 'Neha', 'Akhil', 'Reshma', 'Jithin', 'Divya',
      'Sreejith', 'Athira', 'Manu', 'Lekshmi', 'Nithin', 'Parvathy', 'Sandeep', 'Meera', 'Anoop', 'Revathi'
    ]),
    lastName: () => faker.helpers.arrayElement([
      'Nair', 'Menon', 'Pillai', 'Varma', 'Kurian', 'Warrier', 'Panicker', 'Kumar', 'Das', 'Rajan',
      'Chandran', 'Krishnan', 'Mohan', 'Suresh', 'Ravi', 'George', 'Mathew', 'Joseph', 'Thomas', 'John'
    ]),
    email: () => `${faker.string.alphanumeric(6).toLowerCase()}@reflections.in`,
    role: () => ['admin', 'user', 'partner'][Math.floor(Math.random() * 3)] as 'admin' | 'user' | 'partner',
    contactNo: () => `+91 9${faker.string.numeric(9)}`,
    address: () => faker.helpers.arrayElement([
      'Kochi', 'Trivandrum', 'Kozhikode', 'Thrissur', 'Kannur', 'Kollam', 'Alappuzha', 'Palakkad', 'Malappuram', 'Kottayam'
    ]) + ', Kerala',
    status: () => (Math.random() > 0.3 ? 'active' : 'inactive') as 'active' | 'inactive',
    password: () => 'password123',
  },
});

db.user.create({
  id: 'test-admin',
  email: 'arun.nair@reflections.in',
  password: 'password123',
  role: 'admin',
  firstName: 'Arun',
  lastName: 'Nair',
  contactNo: '+91 9876543210',
  address: 'Kochi, Kerala',
  status: 'active'
});

db.user.create({
  id: 'test-user',
  email: 'sneha.warrier@reflections.in',
  password: 'password123',
  role: 'user',
  firstName: 'Sneha',
  lastName: 'Warrier',
  contactNo: '+91 9123456789',
  address: 'Thrissur, Kerala',
  status: 'active'
});

db.user.create({
  id: 'test-partner',
  email: 'rahul.kumar@reflections.in',
  password: 'password123',
  role: 'partner',
  firstName: 'Rahul',
  lastName: 'Kumar',
  contactNo: '+91 9988776655',
  address: 'Kollam, Kerala',
  status: 'active'
});

// Update random user generation to only use allowed roles
export const allowedRoles = ['admin', 'user', 'partner'];
db.user.create = ((originalCreate => (data) => {
  if (!data || !data.role) {
    data = { ...data, role: allowedRoles[Math.floor(Math.random() * allowedRoles.length)] as 'admin' | 'user' | 'partner' };
  }
  return originalCreate(data);
})(db.user.create));

Array.from({ length: 20 }).forEach(() => db.user.create({}));