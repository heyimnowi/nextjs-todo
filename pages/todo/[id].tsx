import styles from '../../styles/HomePage.module.css'
import { useRouter } from 'next/router'

export default function IdPage() {
	const router = useRouter()

	console.log(router.query.id)

  return (
    <div className={styles.container}>
      <h1>The ID page</h1>
    </div>
  )
}
 