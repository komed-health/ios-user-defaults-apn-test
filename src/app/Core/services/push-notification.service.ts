import { Injectable } from '@angular/core';
import { Plugins, PushNotification, PushNotificationActionPerformed, PushNotificationToken } from '@capacitor/core';

const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  notifications: any = [];

  constructor() { }

  init() {
    console.log('init...');
    PushNotifications.register();
    PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      console.log('token ' + token.value);
    });

    console.log('init, registrationError...');
    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('error on register ' + JSON.stringify(error));
    });

    console.log('init, pushNotificationReceived...');
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
      console.log('notification ' + JSON.stringify(notification));
      this.notifications.push(notification);
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: PushNotificationActionPerformed) => {
      console.log('notification ' + JSON.stringify(notification));
      this.notifications.push(notification);
    });
  }

}
