'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './CreatePlanPage.module.css';

export default function CreatePlanPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (status === 'loading' || status === 'unauthenticated') {
    return null;
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('Saving...');

    try {
      const res = await fetch('/api/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          createdBy: session.user.email,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMsg('Plan created!');
        router.push('/plans');
      } else {
        setMsg(data.message || 'Error creating plan');
      }
    } catch (err) {
      setMsg('Server error');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create Vacation Plan</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          name="title"
          placeholder="Plan Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="text"
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
          required
        />
        <label className={styles.label}>Start Date</label>
        <input
          className={styles.input}
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
        />
        <label className={styles.label}>End Date</label>
        <input
          className={styles.input}
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
        />
        <textarea
          className={styles.input}
          name="description"
          placeholder="Activities / Notes"
          value={form.description}
          onChange={handleChange}
        />
        <button className={styles.button} type="submit">
          Save Plan
        </button>
      </form>
      {msg && <p className={styles.message}>{msg}</p>}
    </div>
  );
}