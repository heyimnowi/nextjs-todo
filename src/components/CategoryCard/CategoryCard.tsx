import React from "react"
import styles from './CategoryCard.module.css';
import { Category } from "../../models/category"

const CategoryCard = (props: { category: Category, total: number }) => {
  return (
		<div className={styles.category}>
			<p className={styles.title}>{props.total} tasks</p>
			<p className={styles.subtitle}>{props.category.title}</p>
			<p className={styles.progressBar}></p>
		</div>
  )
}

export default CategoryCard