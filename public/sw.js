if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let r={};const t=e=>a(e,c),g={module:{uri:c},exports:r,require:t};s[c]=Promise.all(n.map((e=>g[e]||t(e)))).then((e=>(i(...e),r)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"14e96c10a8014fbfc7d8b31fed8df802"},{url:"/_next/static/chunks/218-35833a8e7cbc0c49.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/23-0af10ce61363e178.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/291-cb03ea1ca533aaab.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/297-1881fa2b4d519a0b.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/336-54b363bbdfffdd7c.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/45-798dfde67e3c9726.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/472-3c3de4471950c051.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/513-895023f7af211429.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/52-16c1906fac74f39e.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/634-ba9da44a4f8d08c7.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/648-2507341a585dc92a.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/746-2f7fc8b5727c419a.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/800-161245f3d6c513bc.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/831-a77603335074c0d6.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/853-0c42f56ec4fc51e5.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/@modal/%5B...catchAll%5D/page-1432200b45c087f5.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/@modal/(.)modals/%5Btype%5D/page-0f074e25285bba43.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/@modal/default-b5bec51c4d2b0c3c.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/_not-found/page-29f4d4c5613779b0.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/challenge/%5Bid%5D/deposit/page-118fd8b062d012b7.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/challenge/%5Bid%5D/page-d86b389a244f6efe.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/challenge/list/page-6b5a534ff80e0166.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/challenge/my/%5BchallengeId%5D/page-4203c9004d3b439f.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/challenge/my/page-6093703f4abfe394.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/challenge/result/%5Bid%5D/page-66dd53d9a9e332f5.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/chat/%5Bid%5D/page-84262599b532cb8c.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/enroll/page-d4a261c9758e73cb.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/home/page-44b6f027f14bc04f.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/layout-c1290d1d217fc266.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/modals/%5Btype%5D/page-a58900b56aef5298.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/mypage/page-0c8695a80ab669e9.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/mypage/settings/notification/page-58b68958cee14d1b.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/mypage/settings/page-79fd1c41780f15b5.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/mypage/settings/profile/page-e26116239bf70877.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/page-4b5182dd85ea309f.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/quiz/page-593453af9a569250.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/recommendation/page-6732ad5378f309b7.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/signup/%5Bstep%5D/page-cd47f4f55ad5e5ab.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/app/transfer/%5Btype%5D/%5Bstep%5D/page-1b82f9c32d72a1d1.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/ca377847-7898a999adf03bdd.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/dc112a36-9edc46463b5fd305.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/fd9d1056-23fca4e06eb90b6b.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/main-0da2b718234419f5.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/main-app-35718635e76836ec.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-b983b043ac51d1f0.js",revision:"uX00Aqy99JH9nLygIbFGq"},{url:"/_next/static/css/29f63c5cd718ed2d.css",revision:"29f63c5cd718ed2d"},{url:"/_next/static/media/2c1ad0e1c1e2bcc1-s.p.woff",revision:"bd94b933c6839371baa27f7950ef3784"},{url:"/_next/static/media/55b46aeaa15ab587-s.p.woff",revision:"4750a6d12c26201887eee28ae55ed037"},{url:"/_next/static/media/78df9e04dd358ae4-s.p.woff",revision:"f897fa3ff216e4be74648184144780b1"},{url:"/_next/static/media/a963592cbe26c116-s.p.woff",revision:"e02072832a9d8ef22f3d1d08bb917f9d"},{url:"/_next/static/uX00Aqy99JH9nLygIbFGq/_buildManifest.js",revision:"27f8c2119a3cd98ea1d8b0331aa1116a"},{url:"/_next/static/uX00Aqy99JH9nLygIbFGq/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/firebase-messaging-sw.js",revision:"36f755ee6bc5439d4ce50c0ccddeb6da"},{url:"/gif/100.gif",revision:"cd4503686e019a3cb2f7b8e708fba060"},{url:"/gif/Partying-face.gif",revision:"cb82c90197450b673c5ab71dc6e5ee1e"},{url:"/gif/bell.gif",revision:"bfd9c6b51008ff2c8a9e575cde41cfb8"},{url:"/gif/check.gif",revision:"37865d1b9f20d85499c2e3e97057e784"},{url:"/gif/crying-face.gif",revision:"595c9574d1516ec6c5adfc75381a4ee6"},{url:"/gif/heart-face.gif",revision:"d07f25dfda372eadf1f0bc0538c1f165"},{url:"/gif/money-flying.gif",revision:"b7b8b931b7390f4e535079d207a1166c"},{url:"/image/bank-logo/004.png",revision:"9e577c1a6fe4850d03e92f77686cc349"},{url:"/image/bank-logo/011.png",revision:"ff9fbcccf5a59be88d90ffaba7fcc224"},{url:"/image/bank-logo/020.png",revision:"bdc36b2ce9886614be6032c1c42b03bc"},{url:"/image/bank-logo/081.png",revision:"362aa7455c90fea1cd03ebebafdce031"},{url:"/image/bank-logo/088.png",revision:"ca031df89c3064a490f829a6c5bb8fbf"},{url:"/image/bank-logo/090.png",revision:"aa1cde96ec0827b9bb9abb8340f03143"},{url:"/image/challenge/coffee_challenge.jpg",revision:"47a09a4d38a9f6e7a0c096915d112642"},{url:"/image/challenge/delivery_challenge.jpg",revision:"661349e55b520119792f62e4e94f186c"},{url:"/image/challenge/drink_challenge.jpg",revision:"ffe4facd9f0d66e921d88273772e38fa"},{url:"/image/challenge/quiz_challenge.jpg",revision:"4ef5caeb9bf26e2143097ac9ab8bfe03"},{url:"/image/challenge/savings_challenge.jpg",revision:"5a0a9724d2566587e4596c4c5066f389"},{url:"/image/icon-192x192.png",revision:"9a391ff9b34b50b849904bd167c1581a"},{url:"/image/toss-logo.png",revision:"6ebc42306cc5c5188a950239244cd325"},{url:"/manifest.json",revision:"7c9e356510f9b49f1faca45a74c0d36e"},{url:"/svg/Bookmark.svg",revision:"19cb489da7f89c4fd0b06fcb963baaac"},{url:"/svg/announcement.svg",revision:"cdda2ab41e72be088917664f108916ef"},{url:"/svg/arrow-down.svg",revision:"ae0ee022e14abc54f047fbcbb9fac9d3"},{url:"/svg/arrow-left.svg",revision:"57170300b7d0c75077cd49642d0fe482"},{url:"/svg/arrow-right.svg",revision:"23136206c1c477719158d7bbacb64497"},{url:"/svg/arrow-send.svg",revision:"36a771b9aef380ca11c0fa569e322721"},{url:"/svg/arrow.svg",revision:"0b93ad5bc529766b8b392a939ea17011"},{url:"/svg/calendar.svg",revision:"55460095a58c8f8fe18f05d886b31ba1"},{url:"/svg/challenge.svg",revision:"478378dd93da68c0c75e84094efa8a0d"},{url:"/svg/chart-up.svg",revision:"198ebc2fb095729fb0555046c5e4ee36"},{url:"/svg/chat.svg",revision:"7321db7a027131f105a4c1b2480316e8"},{url:"/svg/close.svg",revision:"c7bbb95cc5d9df101a1d26279d09a90b"},{url:"/svg/contact.svg",revision:"59f990172bcb2faba84f54c2cae6b9f4"},{url:"/svg/correct.svg",revision:"92e730dfda82264440a88df0ef9c0ac9"},{url:"/svg/delete.svg",revision:"8abd620dc260fbff314f444cccc0f6b9"},{url:"/svg/document.svg",revision:"55ddfb482db2025f06275b779a10392b"},{url:"/svg/dollars-flying.svg",revision:"7bdf9d451925efc8e6c7c2247ee771ae"},{url:"/svg/edit-profile.svg",revision:"0dcf2f45d144ad88bada0fa45a19f25f"},{url:"/svg/flag.svg",revision:"ab33fadf4c7328ec15245860362a3663"},{url:"/svg/home.svg",revision:"1fbb355f51994c959d579682c36899ea"},{url:"/svg/incorrect.svg",revision:"2d5755dc04160007e8123f915cc12506"},{url:"/svg/index.ts",revision:"0ff24f23a8e3d94e91499650d17f88ce"},{url:"/svg/info-circle.svg",revision:"e54387f2e700248320e73693e1a306f1"},{url:"/svg/landing-logo.svg",revision:"ae31d80d38c6a55416a4af058a51e96b"},{url:"/svg/lay.svg",revision:"495eff40223c3c9bee449faad6e65bd2"},{url:"/svg/logout.svg",revision:"24e8a8aada76d7e66a4e1e96e5bf9885"},{url:"/svg/moli.svg",revision:"49c2493decc308b23f3eed020f1d05bf"},{url:"/svg/money-bag.svg",revision:"faad121611dab1b360b7375f52f1da98"},{url:"/svg/money-stack.svg",revision:"1c39704a8874ce746b49e2843ba66d78"},{url:"/svg/one-finger.svg",revision:"fc06c7a1e82c6cd08f6dde5d46e1d6d1"},{url:"/svg/people.svg",revision:"ef571d3455722e3ef13c050e82553daa"},{url:"/svg/pli.svg",revision:"ccf98c006796523baf7623078844fc77"},{url:"/svg/profile-setting.svg",revision:"4ff50881513889d71db6ea1e40d58160"},{url:"/svg/profile.svg",revision:"3c6b7722fa047a9823a038c7e9577ced"},{url:"/svg/prohibition.svg",revision:"9824863bc362fa49dd32cceff7df419d"},{url:"/svg/push-notification.svg",revision:"8777774247c33eb1e8caee93a94c2e02"},{url:"/svg/rocket.svg",revision:"f55c30c4df1a2a4b981908a932de1b96"},{url:"/svg/score-detail.svg",revision:"102d9560123dc61349656b62a5782f22"},{url:"/svg/score-down.svg",revision:"956963bbdd219b09ec4c2518fe8bf3e9"},{url:"/svg/score-up.svg",revision:"3f588e0b7887f3adea527a28abe1f0b3"},{url:"/svg/settings.svg",revision:"481eaf01182f9351c4c1b8c622ae4d9b"},{url:"/svg/sol.svg",revision:"33e34ab054157ae73eb9e9ccca52bda4"},{url:"/svg/success-modal-chart.svg",revision:"a4c35923fe80031e5e11c7c66f429dc0"},{url:"/svg/trophy.svg",revision:"33ddca28d47bb49d6cdeedddf2cf8a11"},{url:"/svg/two-finger.svg",revision:"b683ecfe2d3d84616c91883b57ca6e07"},{url:"/svg/version.svg",revision:"e896b3ef6622ff841d1bc857f0d97b45"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
