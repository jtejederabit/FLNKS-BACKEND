import jwt from 'jsonwebtoken';

const userPayload = { id: 'testUser', role: 'user' }; // Example payload
const testSecret = process.env.JWT_SECRET || 'testSecret'; // You should use a different secret for testing

export const token = jwt.sign(userPayload, testSecret, { expiresIn: '1h' });

