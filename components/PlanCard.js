'use client';
import Link from 'next/link';
import styles from './PlanCard.module.css';

export default function PlanCard({ plan, onDelete }) {
  const handleDelete = () => {
    const confirmDelete = confirm('Are you sure you want to delete this plan?');
    if (confirmDelete) {
      onDelete(plan._id);
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{plan.destination}</h2>
      <p className={styles.details}>
        <strong>Start Date:</strong> {plan.startDate?.slice(0, 10)}
      </p>
      <p className={styles.details}>
        <strong>End Date:</strong> {plan.endDate?.slice(0, 10)}
      </p>
      <p className={styles.details}>
        <strong>Activities:</strong> {plan.description || 'No activities listed'}
      </p>
      <div className={styles.actions}>
        <Link href={`/update/${plan._id}`} className={styles.editButton}>
          Edit
        </Link>
        <button className={styles.deleteButton} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}