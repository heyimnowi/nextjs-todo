import { useState } from "react";
import classes from "./NewTodo.module.css";
import { addTodo } from "../../helpers/api-utils";

export default function NewTodo() {
	const [text, setText] = useState("");
	const [category, setCategory] = useState("work");

	const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		addTodo(text, category);
	}

	return (
		<form className={classes.form}>
			<div className={classes.control}>
				<input type="text" id="text" className={classes.input} placeholder="Enter new task"  value={text} onChange={(event) => setText(event.target.value)}/>
			</div>
			<div className={classes.control}>
				<select name="category" id="category" className={classes.input} placeholder="Select a category" value={category} onChange={(event) => setCategory(event.target.value)}>
					<option value="work">Work</option>
					<option value="personal">Personal</option>
				</select>
			</div>
      <button  
				type="submit"
				onClick={handleClick}
			className={classes.submit}>New Task</button>
		</form>
	)
}