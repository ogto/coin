import "server-only";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// 필수 ENV 체크
const PROJECT_ID = process.env.FIREBASE_ADMIN_PROJECT_ID;
const CLIENT_EMAIL = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const RAW_KEY = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

if (!PROJECT_ID || !CLIENT_EMAIL || !RAW_KEY) {
  throw new Error(
    "[firebaseAdmin] 환경변수 누락: FIREBASE_ADMIN_PROJECT_ID / FIREBASE_ADMIN_CLIENT_EMAIL / FIREBASE_ADMIN_PRIVATE_KEY"
  );
}

// '\n' 이스케이프 처리
const PRIVATE_KEY = RAW_KEY.replace(/\\n/g, "\n");

const app =
  getApps().length > 0
    ? getApps()[0]!
    : initializeApp({
        credential: cert({
          projectId: PROJECT_ID,
          clientEmail: CLIENT_EMAIL,
          privateKey: PRIVATE_KEY,
        }),
      });

export const adminDb = getFirestore(app);
