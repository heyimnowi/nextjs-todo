import styles from './Layout.module.css';
import { useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import Notification from '../Notification/Notification';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;
  
  return (
      <div className={styles.container}>
        <main>{children}</main>
        {activeNotification &&
        <Notification title={activeNotification.title} message={activeNotification.message} status={activeNotification.status} /> }
      </div>
  );
}

export default Layout;