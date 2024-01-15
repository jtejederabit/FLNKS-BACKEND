import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { usersDataStore, IUser } from '../database/nedb';

const router: Router = Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    usersDataStore.findOne({ username: username }, (err: Error | null, user: IUser) => {
        if (err) {
            return res.status(500).json({ message: "Internal server error" });
        }

        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        const passwordIsValid: boolean = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token: string = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: '24h'
        });

        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: token
        });
    });
});

export default router;
