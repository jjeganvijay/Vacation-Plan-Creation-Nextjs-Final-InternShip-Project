'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import styles from './page.module.css';

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Vacation Plan Creator 🏝️</h1>
      <p className={styles.subheading}>Create and explore vacation plans curated just for you.</p>

      {session ? (
        <>
          <p className={styles.welcomeMessage}>Welcome, {session.user?.name} 👋</p>
          <button
            className={styles.button}
            onClick={() => router.push('/plans')}
          >
            View Vacation Plans
          </button>
        </>
      ) : (
        <>
          <p className={styles.welcomeMessage}>Please log in to continue.</p>
          <button
            className={styles.button}
            onClick={() => router.push('/login')}
          >
            <FaGithub className={styles.buttonIcon} />
            Sign In with GitHub
          </button>
        </>
      )}
    </div>
  );
}