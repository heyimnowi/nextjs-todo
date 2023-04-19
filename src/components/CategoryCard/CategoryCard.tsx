import React from 'react'
import styles from './CategoryCard.module.css'

interface CategoryCardProps {
	title: string;
	amount: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, amount }) => {
	return (
		<div className={styles.category}>
			<p className={styles.title}>{amount} tasks</p>
			<p className={styles.subtitle}>{title}</p>
			<p className={styles.progressBar}></p>
		</div>
	)
}

export default CategoryCard