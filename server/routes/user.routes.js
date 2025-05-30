import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post('/sign-up', createUser);

userRouter.get('', getAllUsers);

userRouter.get('/:id', getUser);

userRouter.put('/:id', updateUser);

userRouter.delete('/:id', deleteUser);

export default userRouter;