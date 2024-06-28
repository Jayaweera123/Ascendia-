package com.Ascendia.server.mapper.Store;

import com.Ascendia.server.dto.Store.NotificationSeenDto;
import com.Ascendia.server.entity.Store.Notification;

public class NotificationIsSeenMapper {

        public static NotificationSeenDto mapToNotificationSeenDto(Notification notification){
            return new NotificationSeenDto(
                    notification.getNotificationId(),
                    notification.getIsSeen()
            );
        }

        public static Notification mapToNotification(NotificationSeenDto notificationSeenDto){
            return new Notification(
                    notificationSeenDto.getNotificationId(),
                    notificationSeenDto.getIsSeen()
            );
        }
}
