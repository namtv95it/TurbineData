//package egovframework.com.a2m.egov.service.firebase.impl;
//
//import com.google.firebase.messaging.*;
//import egovframework.com.a2m.egov.model.Notice;
//import egovframework.com.a2m.egov.service.firebase.NotificationService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//
///**
// * @author Nguyen Trung Anh
// * @created 3/13/2023
// */
//@Service
//@RequiredArgsConstructor
//@Slf4j
//public class NotificationServiceImpl implements NotificationService {
//    private final FirebaseMessaging firebaseMessaging;
//
//    public BatchResponse sendNotification(Notice notice) {
//        List<String> registrationTokens=notice.getRegistrationTokens();
//        Notification notification = Notification.builder()
//                .setTitle(notice.getSubject())
//                .setBody(notice.getContent())
//                .setImage(notice.getImage())
//                .build();
//
//        MulticastMessage message = MulticastMessage.builder()
//                .addAllTokens(registrationTokens)
//                .setNotification(notification)
//                .putAllData(notice.getData())
//                .build();
//
//        BatchResponse batchResponse = null;
//        try {
//            batchResponse = firebaseMessaging.sendMulticast(message);
//        } catch (FirebaseMessagingException e) {
//            log.info("Firebase error {}", e.getMessage());
//        }
//        if (batchResponse.getFailureCount() > 0) {
//            List<SendResponse> responses = batchResponse.getResponses();
//            List<String> failedTokens = new ArrayList<>();
//            for (int i = 0; i < responses.size(); i++) {
//                if (!responses.get(i).isSuccessful()) {
//                    failedTokens.add(registrationTokens.get(i));
//                }
//            }
//            log.info("List of tokens that caused failures: " + failedTokens);
//        }
//        return batchResponse;
//    }
//}
