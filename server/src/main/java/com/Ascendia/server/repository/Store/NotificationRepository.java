package com.Ascendia.server.repository.Store;


import com.Ascendia.server.entity.Store.Material;
import com.Ascendia.server.entity.Store.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserId(String userId);

    @Query("SELECT n FROM Notification n WHERE " +
            "n.userId = :userId AND " +
            "n.isAllSeen = false")
    List<Notification> findUserIdWithUnseenNotifications(@Param("userId") String userId);


}
