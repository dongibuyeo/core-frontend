importScripts(
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js',
)
importScripts(
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js',
)

const firebaseConfig = {
  apiKey: 'AIzaSyDCqTj-dPCgVkrWdGZ2vOBRKhlYXBhfFZc',
  authDomain: 'dongibuyeo-8eeff.firebaseapp.com',
  projectId: 'dongibuyeo-8eeff',
  storageBucket: 'dongibuyeo-8eeff.appspot.com',
  messagingSenderId: '1072686987816',
  appId: '1:1072686987816:web:c47b4586a929bc0a20531d',
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json().notification
    const options = {
      body: data.body,
      icon: data.image,
      image: data.image,
      data: {
        click_action: data.click_action,
      },
    }

    event.waitUntil(self.registration.showNotification(data.title, options))
  } else {
    console.log('This push event has no data.')
  }
})

self.addEventListener('notificationclick', function (event) {
  console.log('notification click')
  const url = '/'
  event.notification.close()
  event.waitUntil(clients.openWindow(url))
})
