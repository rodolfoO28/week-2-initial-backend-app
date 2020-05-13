import { ObjectID } from 'mongodb';
import ICreateNotificationDTO from '../../dtos/ICreateNotificationDTO';
import Notification from '../../infra/typeorm/schemas/Notification';

import INotificationsRepository from '../INotificationsRepository';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    recipient_id,
    content,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), recipient_id, content });

    this.notifications.push(notification);

    return notification;
  }
}

export default FakeNotificationsRepository;
