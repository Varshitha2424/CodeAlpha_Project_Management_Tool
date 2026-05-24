import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import projectRoutes from './project.routes.js';
import taskRoutes from './task.routes.js';
import commentRoutes from './comment.routes.js';
import notificationRoutes from './notification.routes.js';
import activityRoutes from './activity.routes.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Project Management API is online' });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);
router.use('/tasks/:taskId/comments', commentRoutes);
router.use('/notifications', notificationRoutes);
router.use('/activity-logs', activityRoutes);

export default router;
