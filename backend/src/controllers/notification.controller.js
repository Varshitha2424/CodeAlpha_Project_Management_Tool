import NotificationModel from '../models/notification.model.js';
import ActivityModel from '../models/activity.model.js';
import { buildPagination, buildSort } from '../utils/pagination.js';
import ApiError from '../utils/api-error.js';

export async function listNotifications(req, res, next) {
  try {
    const pagination = buildPagination(req.query);
    const sort = buildSort('created_at', 'DESC', req.query.sortBy, req.query.sortOrder);
    const filters = {
      recipient_id: req.user.id,
      is_read: req.query.is_read === 'true' ? true : req.query.is_read === 'false' ? false : undefined,
      type: req.query.type,
    };
    const result = await NotificationModel.list({ filters, pagination, sort });
    res.status(200).json({ success: true, data: result.rows, meta: { total: result.total } });
  } catch (error) {
    next(error);
  }
}

export async function markNotificationRead(req, res, next) {
  try {
    const notification = await NotificationModel.markAsRead(req.params.notificationId);
    if (!notification) {
      throw new ApiError(404, 'Notification not found.');
    }
    await ActivityModel.create({
      user_id: req.user.id,
      action: 'notification_read',
      metadata: { notification_id: req.params.notificationId },
    });
    res.status(200).json({ success: true, data: { id: req.params.notificationId, read: true } });
  } catch (error) {
    next(error);
  }
}

export async function markAllNotificationsRead(req, res, next) {
  try {
    await NotificationModel.markAllRead(req.user.id);
    await ActivityModel.create({
      user_id: req.user.id,
      action: 'notifications_marked_read',
      metadata: {},
    });
    res.status(200).json({ success: true, data: { message: 'All notifications marked as read.' } });
  } catch (error) {
    next(error);
  }
}
