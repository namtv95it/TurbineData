import './App.css';
import './assets/css/style.css'
import './assets/css/loading.css'

import { Navigate, useRoutes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import NotPermission from './components/pages/error/NotPermission';
import NotFound from './components/pages/error/NotFound';

import { ToastContainer } from 'react-toastify'

// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging/sw";
// import { getToken, onMessage } from "firebase/messaging";
// import { firebaseConfig, vapidKey } from './conf/firebaseConfig';
// import { WebSocketService } from './services/WebSocketService';

import { layoutRouters } from './routers/layoutRouters';

//_add_import_component_

export const spinner = (
  <div className="progress-spinner text-center">
    <div className="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
)

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// getToken(messaging, { vapidKey: vapidKey }).then(res => {
//   // get token to register
//   console.log(res);
// });

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('./firebase-messaging-sw.js')
//     .then(function (registration) {
//       console.log('Registration successful, scope is:', registration.scope);
//     }).catch(function (err) {
//       console.log('Service worker registration failed, error:', err);
//     });
// } else {
//   console.log('Service worker not sp')
// }

function App() {

  // Get message foreground
  // navigator.serviceWorker.addEventListener('message', event => {
  //   console.log('Received message:', event.data);
  //   toast.success(event.data.notification.body)
  // });

  let router = useRoutes([
    { path: "not-permission", element: <NotPermission /> },
    { path: "/", element: <Navigate to="/dashboard" replace /> },
    layoutRouters,
    { path: "err-network", element: <NotFound /> },
    { path: "*", element: <NotFound /> }
  ])

  return (
    <div>
      <ToastContainer></ToastContainer>
      <Suspense fallback={spinner}>
        {
          router
        }
      </Suspense>
    </div>
  );
}

export default App;

