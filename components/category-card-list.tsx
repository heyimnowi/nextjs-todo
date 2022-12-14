import React from "react"
import CategoryCard from "./category-card"
import styles from './category-card-list.module.scss'

const CategoryCardList = () => {
  return (
		<div className={styles.categories}>
			<CategoryCard category={{ title: 'Business', id: '1' }} total={40} />
			<CategoryCard category={{ title: 'Personal', id: '2' }} total={18} />
		</div>
  )
}

export default CategoryCardList