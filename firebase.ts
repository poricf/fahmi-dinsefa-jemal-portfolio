import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  getDocsFromServer,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { BlogPost } from './types';
import { blogPosts as defaultPosts } from './data';

const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project';

const finalConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || `${projectId}.firebaseapp.com`,
  projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || `${projectId}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

const firestoreDatabaseId = import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID;

// Client Firebase SDK
const app = initializeApp(finalConfig);
export const db = getFirestore(app, firestoreDatabaseId);

const LOCAL_STORAGE_KEY = 'portfolio_blogs_cache';

// --- Local Storage Cache Fallbacks ---

// Retrieve blogs from browser LocalStorage or static defaults
export const getLocalBlogs = (): BlogPost[] => {
  try {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (local) {
      return JSON.parse(local);
    }
  } catch (e) {
    console.error('Error reading localStorage blogs:', e);
  }
  return defaultPosts;
};

// Save blogs list to browser LocalStorage
const saveLocalBlogs = (posts: BlogPost[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
  } catch (e) {
    console.error('Error writing localStorage blogs:', e);
  }
};

// Parse date string (e.g. "Feb 28, 2025") to sorting number
const parseBlogDate = (dateStr: string): number => {
  try {
    const timestamp = Date.parse(dateStr);
    return isNaN(timestamp) ? 0 : timestamp;
  } catch {
    return 0;
  }
};

/**
 * Fetches blogs directly from Firestore using the client Web SDK.
 * Bypasses the server API to prevent permission issues with default server IAM credentials.
 * Automatically falls back to LocalStorage or default static posts on failure.
 */
export const AMA_QUESTION_MAX_LENGTH = 500;

/**
 * Submits an anonymous question to the `ama_questions` collection.
 * Write-only from the client: Firestore rules block reads, so submissions
 * stay private to the owner (visible only via the Firebase console).
 */
export const submitAmaQuestion = async (text: string): Promise<void> => {
  const trimmed = text.trim();
  if (!trimmed || trimmed.length > AMA_QUESTION_MAX_LENGTH) {
    throw new Error('Question must be between 1 and ' + AMA_QUESTION_MAX_LENGTH + ' characters.');
  }
  await addDoc(collection(db, 'ama_questions'), {
    text: trimmed,
    createdAt: serverTimestamp(),
  });
};

export const getFirestoreBlogs = async (): Promise<BlogPost[]> => {
  try {
    const blogsCollection = collection(db, 'blogs');
    // Fetch directly from server to get fresh data
    const snapshot = await getDocsFromServer(blogsCollection).catch(() => getDocs(blogsCollection));

    if (snapshot.empty) {
      console.log("Client: Blogs collection is empty. Returning default static posts.");
      saveLocalBlogs(defaultPosts);
      return defaultPosts;
    }

    const posts: BlogPost[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as any;
      // Strip out any adminSecret field if present
      const { adminSecret, ...cleanPost } = data;
      posts.push(cleanPost as BlogPost);
    });

    const sorted = posts.sort((a, b) => parseBlogDate(b.date) - parseBlogDate(a.date));
    saveLocalBlogs(sorted);
    return sorted;
  } catch (error) {
    console.warn('Client: Firestore blogs fetch failed, falling back to local storage cache:', error);
    return getLocalBlogs();
  }
};
