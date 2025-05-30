

export const logIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.find({ email });

        if (!user || user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        

    } catch (error) {
        next(error);
    }
}