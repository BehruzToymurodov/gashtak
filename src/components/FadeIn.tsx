import { type ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

interface Props {
	children: ReactNode
	delay?: number
	className?: string
	from?: 'bottom' | 'left' | 'right'
}

export default function FadeIn({
	children,
	delay = 0,
	className = '',
	from = 'bottom',
}: Props) {
	const { ref, inView } = useInView(0.12)

	const translate = {
		bottom: 'translateY(36px)',
		left: 'translateX(-36px)',
		right: 'translateX(36px)',
	}[from]

	return (
		<div
			ref={ref as React.RefObject<HTMLDivElement>}
			className={className}
			style={{
				opacity: inView ? 1 : 0,
				transform: inView ? 'translate(0)' : translate,
				transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
			}}
		>
			{children}
		</div>
	)
}
