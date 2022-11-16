import styles from '../../styles/HomePage.module.scss'
import { Fragment } from 'react';

export default function NewTaskPage() {
  return (
    <Fragment>
      <input type="text" placeholder='Enter a new task'></input>
      <button>Save</button>
    </Fragment>
  )
}
