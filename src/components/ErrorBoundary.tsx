import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props { children: ReactNode; fallback?: ReactNode }
interface State { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
	state: State = { hasError: false }

	static getDerivedStateFromError(): State {
		return { hasError: true }
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error('[ErrorBoundary]', error, info)
	}

	render() {
		if (this.state.hasError) {
			return (
				this.props.fallback ?? (
					<div className='flex flex-col items-center justify-center py-24 gap-4'>
						<p className='font-oswald text-sm uppercase tracking-widest text-white/40'>
							Kontent yuklanmadi
						</p>
						<button
							className='btn-outline text-xs'
							onClick={() => this.setState({ hasError: false })}
						>
							Qayta urinish
						</button>
					</div>
				)
			)
		}
		return this.props.children
	}
}
