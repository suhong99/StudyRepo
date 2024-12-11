# Friendly Eats with Next.js + Firebase

https://firebase.google.com/codelabs/firebase-nextjs?hl=ko#0

자동 빌드 및 배포: 이 Codelab에서는 구성된 브랜치에 푸시할 때마다 Firebase App Hosting을 사용하여 Next.js 코드를 자동으로 빌드하고 배포합니다.
로그인 및 로그아웃: 완성된 웹 앱을 사용하면 Google 계정으로 로그인하고 로그아웃할 수 있습니다. 사용자 로그인 및 유지는 Firebase 인증을 통해 전적으로 관리됩니다.
이미지: 완성된 웹 앱을 통해 로그인한 사용자는 레스토랑 이미지를 업로드할 수 있습니다. 이미지 애셋은 Firebase용 Cloud Storage에 저장됩니다. Firebase JavaScript SDK는 업로드된 이미지의 공개 URL을 제공합니다. 그러면 이 공개 URL이 Cloud Firestore의 관련 레스토랑 문서에 저장됩니다.
리뷰: 완성된 웹 앱을 통해 로그인한 사용자가 별표 평점과 텍스트 기반 메시지로 구성된 레스토랑 리뷰를 게시할 수 있습니다. 리뷰 정보는 Cloud Firestore에 저장됩니다.
필터: 완성된 웹 앱을 통해 로그인한 사용자는 카테고리, 위치, 가격에 따라 레스토랑 목록을 필터링할 수 있습니다. 사용되는 정렬 방법을 맞춤설정할 수도 있습니다. Cloud Firestore에서 데이터에 액세스하고 사용된 필터를 기반으로 Firestore 쿼리가 적용됩니다.

#### Run the application

1. In your terminal, run:

```sh
firebase emulators:start --project demo-codelab-nextjs
```

2. Copy the file `lib/firebase/config-copy.js` to `lib/firebase/config.js` and fill in the values from the Firebase console.

3. In a new terminal tab/window, run:

```sh
npm i
npm run dev
```

4. In your browser, open the URL: `http://localhost:3000`

#### Use the application

1. While on `http://localhost:3000/` within your browser, click the "Sign in" button in the top right corner and sign in.
2. In the dropdown menu in the top right menu, select "Add sample restaurants".
