import styles from '../../styles/HomePage.module.scss'

export default function NewTaskPage() {
  return (
    <div className='container'>
      <input type="text" placeholder='Enter a new task'></input>
      <button>Save</button>
    </div>
  )
}
