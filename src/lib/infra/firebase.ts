import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { clientConfig } from '@/config';

export const app = initializeApp(clientConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);