import { createContext, useState, useEffect } from 'react'

export enum NotificationStatus {
	SUCCESS = 'success',
	ERROR = 'error',
	PENDING = 'pending',
}

export interface Notification {
	title: string;
	message: string;
	status: NotificationStatus;
}

const NotificationContext = createContext({
	notification: null as Notification | null,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
	showNotification: (notificationData: Notification) => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	hideNotification: () => {},
})

interface NotificationContextProps {
  children: React.ReactNode;
}

const TIMEOUT_NOTIFICATION = 3000

export function NotificationContextProvider(props: NotificationContextProps) {
	const [activeNotification, setActiveNotification] = useState<Notification | null>(null)

	useEffect(() => {
		if (activeNotification && activeNotification.status !== NotificationStatus.PENDING) {
			const timer = setTimeout(() => {
				setActiveNotification(null)
			}, TIMEOUT_NOTIFICATION)

			return () => {
				clearTimeout(timer)
			}
		}
	}, [activeNotification])

	const showNotificationHandler = (notificationData: Notification) => {
		setActiveNotification(notificationData)
	}

	const hideNotificationHandler = () => {
		setActiveNotification(null)
	}

	const context = {
		notification: activeNotification,
		showNotification: showNotificationHandler,
		hideNotification: hideNotificationHandler,
	}

	return (
		<NotificationContext.Provider value={context}>
			{props.children}
		</NotificationContext.Provider>
	)
}

export default NotificationContext
