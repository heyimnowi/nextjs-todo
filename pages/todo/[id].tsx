import styles from '../../styles/HomePage.module.scss'
import { useRouter } from 'next/router'

export default function IdPage() {
	const router = useRouter()

	console.log(router.query.id)

  return (
    <div>
      <h1>The ID page</h1>
    </div>
  )
}
 