import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TodoItem } from "../../models/todoItem";
import styles from "./TodoForm.module.css";
import { useRouter } from "next/router";
import { Action as ActionType } from "../../models/action";
import { faArrowLeft, faPencil, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";

interface TodoFormProps {
  todo: TodoItem;
  onHandleInputChange: (
    name: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  action: ActionType.UPDATE | ActionType.CREATE;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  todo,
  onHandleInputChange,
  action,
  onSubmit,
}) => {
  const router = useRouter();

  const handleInputChange =
    (name: string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onHandleInputChange(name, event);
    };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <>
      <input
        type="text"
        id="text"
        className={styles.input}
        required
        placeholder="Enter new task"
        value={todo.text}
        onChange={handleInputChange("text")}
      />
      <select
        name="category"
        id="category"
        className={styles.input}
        required
        placeholder="Select a category"
        value={todo.category}
        onChange={handleInputChange("category")}
      >
        <option value="work">Work</option>
        <option value="personal">Personal</option>
      </select>
      <div className={styles.buttons}>
        <button className={styles.cancelButton} onClick={handleCancel}>
        <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button className={styles.submitButton} onClick={onSubmit}>
          {action === ActionType.UPDATE ? (
            <FontAwesomeIcon icon={faSave} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </button>
      </div>
    </>
  );
};

export default TodoForm;
