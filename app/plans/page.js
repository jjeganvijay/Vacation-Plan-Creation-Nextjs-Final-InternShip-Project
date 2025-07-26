'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import PlanCard from '../../components/PlanCard'; // Adjust path as needed
import styles from './PlansPage.module.css';

const PlansPage = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await fetch('/api/plans');
      const data = await res.json();
      setPlans(data?.data || []);
    };
    fetchPlans();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm('Are you sure you want to delete this plan?');
    if (!confirmDelete) return;

    const res = await fetch(`/api/plans/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setPlans(plans.filter((plan) => plan._id !== id));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>All Vacation Plans</h1>
      <Link href="/create" className={styles.createButton}>
        + Create New Plan
      </Link>
      {plans.length === 0 ? (
        <p className={styles.noPlans}>No vacation plans found.</p>
      ) : (
        <ul className={styles.planList}>
          {plans.map((plan) => (
            <PlanCard key={plan._id} plan={plan} onDelete={handleDelete} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlansPage;