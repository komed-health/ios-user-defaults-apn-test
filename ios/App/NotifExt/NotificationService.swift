//
//  NotificationService.swift
//  NotifExt
//
//  Created by Laszlo Blum on 2020. 03. 17..
//

import UserNotifications
import UIKit
import os.log

class NotificationService: UNNotificationServiceExtension {

    var contentHandler: ((UNNotificationContent) -> Void)?
    var bestAttemptContent: UNMutableNotificationContent?

    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        os_log("didReceive...")
        
        print("didReceive...")
        
//        let itemKey = "My key"
//        let itemValue = "My secretive bee 🐝"
//        let keychainAccessGroupName = "EK2UJ2WWZ5.com.komed.lbdemo.SharedItems"
//
//
//        guard let valueData = itemValue.data(using: String.Encoding.utf8) else {
//          print("Error saving text to Keychain")
//          return
//        }
//
//        let queryAdd: [String: AnyObject] = [
//          kSecClass as String: kSecClassGenericPassword,
//          kSecAttrAccount as String: itemKey as AnyObject,
//          kSecValueData as String: valueData as AnyObject,
//          kSecAttrAccessible as String: kSecAttrAccessibleWhenUnlocked,
//          kSecAttrAccessGroup as String: keychainAccessGroupName as AnyObject
//        ]
//
//        let resultCode = SecItemAdd(queryAdd as CFDictionary, nil)
//
//        if resultCode != noErr {
//          print("Error saving to Keychain: \(resultCode)")
//          let msg = SecCopyErrorMessageString(resultCode, nil)
//          print("Error saving to Keychain msg: \(msg)")
//        }

        //********** Start example *****************
        // "group.com.komed.lbdemo" is our shared app group
        let defaults = UserDefaults(suiteName: "group.com.komed.lbdemo")
        defaults?.set("This is it", forKey: "SentItem")
        let res = defaults?.synchronize()

        print("synchronize res: " + (res == true ? "SYNC OK" : "SYNC FAILED")) //It is FAILED
        //********** End example *****************
        
        
        
        self.contentHandler = contentHandler
        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
        
        if let bestAttemptContent = bestAttemptContent {
            // Modify the notification content here...
            bestAttemptContent.title = "\(bestAttemptContent.title) [modified]"
            
            contentHandler(bestAttemptContent)
        }
    }
    
    override func serviceExtensionTimeWillExpire() {
        // Called just before the extension will be terminated by the system.
        // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
        if let contentHandler = contentHandler, let bestAttemptContent =  bestAttemptContent {
            contentHandler(bestAttemptContent)
        }
    }

}
