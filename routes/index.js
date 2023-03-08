import userRoutes from './v1/user.js';
import adminRoutes from './v1/admin.js';
const initializeRoutes = (app) => {
    app.use('/v1/api/user', userRoutes);
    app.use('/v1/api/admin', adminRoutes);
};

export default initializeRoutes