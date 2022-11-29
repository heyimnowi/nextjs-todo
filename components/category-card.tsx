import React from "react"
import { Category } from "../models/category"
import styles from './category-card.module.scss'

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