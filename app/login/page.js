'use client';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaGithub } from 'react-icons/fa'; // Using react-icons for GitHub icon
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>User Login</h1>
      <p className={styles.subheading}>Sign in to access your vacation plans</p>
      <button
        onClick={() => signIn('github')}
        className={styles.button}
      >
        <FaGithub className={styles.buttonIcon} />
        Sign in with GitHub
      </button>
    </div>
  );
}