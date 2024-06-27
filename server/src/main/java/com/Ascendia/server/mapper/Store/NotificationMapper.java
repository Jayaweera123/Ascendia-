package com.Ascendia.server.mapper.Store;

import com.Ascendia.server.dto.Store.NotificationDto;
import com.Ascendia.server.entity.Store.Notification;

public class NotificationMapper {

    public static NotificationDto mapToNotificationDto(Notification notification){
        return new NotificationDto(
                notification.getNotificationId(),
                notification.getUserId(),
                notification.getContent(),
                notification.getNotifyDate()
        );
    }

    public static Notification mapToNotification(NotificationDto notificationDto){
        return new Notification(
                notificationDto.getNotificationId(),
                notificationDto.getUserId(),
                notificationDto.getContent(),
                notificationDto.getNotifyDate()
        );
    }
}
