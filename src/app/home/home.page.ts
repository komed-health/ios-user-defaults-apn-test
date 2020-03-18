import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { PushNotificationService } from '../Core/services/push-notification.service';


const { Storage } = Plugins;

declare var NativeStorage;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
  	private platform: Platform,
  	private notif: PushNotificationService
  	) {
  	platform.ready().then(() => {
  		console.log("Initializing...");
  		// Storage.initWithSuiteName("group.com.komed.lbdemo");``````````````````
  		NativeStorage.initWithSuiteName("group.com.komed.lbdemo",
  			value => {
  				console.log("initWithSuiteName, success, value: " + value);
  			},
  			err => {
  				console.log("initWithSuiteName, failure, err: " + err);
  			});
  		notif.init();
  	})
  	
  }


  async setItem() {
 	await Storage.set({
	    key: 'name',
	    value: 'Max'
	  });
	}

	async getItem() {
	  const { value } = await Storage.get({ key: 'name' });
	  console.log('Got item: ', value);
	}


  clicked() {
  	console.log("clicked...");
  	
  	NativeStorage.setItem("MyItem", "MyValue1");

  	NativeStorage.getItem("MyItem", value=> {
  		console.log("Value received: " + value);
  	},
  	err => {
  		console.log("Error receiving value: " + err);
  	});

  }

  clicked2() {
  	console.log("clicked2...");
  	
  	NativeStorage.setItem("MyItem2", "MyValue2");

  	NativeStorage.getItem("MyItem", value=> {
  		console.log("Value received: " + value);
  	},
  	err => {
  		console.log("Error receiving value: " + err);
  	});

  	NativeStorage.getItem("MyItem2", value=> {
  		console.log("Value received2: " + value);
  	},
  	err => {
  		console.log("Error receiving value2: " + err);
  	});

  }

  clicked3() {
  	console.log("clicked3...");

  	NativeStorage.getItem("SentItem", value=> {
  		console.log("Value received: " + value);
  	},
  	err => {
  		console.log("Error receiving value: " + err);
  	});

  }

}
