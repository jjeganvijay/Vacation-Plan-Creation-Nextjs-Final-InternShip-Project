'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import styles from './UpdatePlan.module.css';

const UpdatePlan = ({ params: paramsPromise }) => {
  const router = useRouter();
  const params = use(paramsPromise);
  const { id } = params;

  const [plan, setPlan] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await fetch(`/api/plans/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch plan');
        }
        const data = await res.json();
        if (data?.data) {
          setPlan(data.data);
        }
      } catch (error) {
        console.error('Error fetching plan:', error);
      }
    };
    fetchPlan();
  }, [id]);

  const handleChange = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/plans/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plan),
      });

      if (!res.ok) {
        throw new Error('Failed to update plan');
      }

      router.push('/plans');
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Update Vacation Plan</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Destination</label>
        <input
          className={styles.input}
          type="text"
          name="destination"
          placeholder="Destination"
          value={plan.destination}
          onChange={handleChange}
          required
        />
        <label className={styles.label}>Start Date</label>
        <input
          className={styles.input}
          type="date"
          name="startDate"
          value={plan.startDate}
          onChange={handleChange}
          required
        />
        <label className={styles.label}>End Date</label>
        <input
          className={styles.input}
          type="date"
          name="endDate"
          value={plan.endDate}
          onChange={handleChange}
          required
        />
        <label className={styles.label}>Activities / Notes</label>
        <textarea
          className={styles.input}
          name="description"
          placeholder="Activities / Notes"
          value={plan.description}
          onChange={handleChange}
        />
        <button className={styles.button} type="submit">
          Update Plan
        </button>
      </form>
    </div>
  );
};

export default UpdatePlan;