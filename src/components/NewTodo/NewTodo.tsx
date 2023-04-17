import { useRef, useState } from "react";
import classes from "./NewTodo.module.css";

export default function NewTodo() {
	return (
		<form className={classes.form}>
			<div className={classes.control}>
				<input type="text" id="text" className={classes.input} placeholder="Enter new task" />
			</div>
			<div className={classes.control}>
				<select name="category" id="category" className={classes.input} placeholder="Select a category">
					<option value="work">Work</option>
					<option value="personal">Personal</option>
				</select>
			</div>
      <button className={classes.submit}>New Task</button>
		</form>
	)
}