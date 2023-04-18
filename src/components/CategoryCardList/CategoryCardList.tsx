import React from "react"
import styles from './CategoryCardList.module.css'
import CategoryCard from "../CategoryCard/CategoryCard"
import { TodoItem } from "../../models/todoItem"
import { Category } from "../../models/category"

interface CategoryCardListProps {
	todos: TodoItem[]
}

const CategoryCardList: React.FC<CategoryCardListProps> = ({ todos }) => {
	const workTodos = todos.filter((todo) => todo.category === "work").length;
	const personalTodos = todos.filter((todo) => todo.category === "personal").length;

  return (
		<div className={styles.categories}>
			<CategoryCard title={Category.WORK} amount={workTodos} />
			<CategoryCard title={Category.PERSONAL} amount={personalTodos} />
		</div>
  )
}

export default CategoryCardList