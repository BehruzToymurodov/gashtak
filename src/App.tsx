import { lazy, Suspense, useState } from 'react'
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import About from './components/About'
import Contact from './components/Contact'
import ErrorBoundary from './components/ErrorBoundary'
import Episodes from './components/Episodes'
import Footer from './components/Footer'
import Guests from './components/Guests'
import Hero from './components/Hero'
import IntroAnimation from './components/IntroAnimation'
import Navbar from './components/Navbar'
import Platforms from './components/Platforms'

const WatchPage = lazy(() => import('./components/WatchPage'))
const PodcastsPage = lazy(() => import('./components/PodcastsPage'))

const INTRO_SEEN_KEY = 'gashtak:intro-seen'

function LoadingScreen() {
	return <div className='min-h-screen bg-black' />
}

function HomePage() {
	const navigate = useNavigate()
	const skipIntro = sessionStorage.getItem(INTRO_SEEN_KEY) === '1'
	const [mainVisible, setMainVisible] = useState(skipIntro)
	const [introGone, setIntroGone] = useState(skipIntro)

	const handleIntroComplete = () => {
		sessionStorage.setItem(INTRO_SEEN_KEY, '1')
		setMainVisible(true)
		setTimeout(() => setIntroGone(true), 950)
	}

	return (
		<div className='min-h-screen bg-black text-white overflow-x-hidden'>
			{!introGone && <IntroAnimation onComplete={handleIntroComplete} />}
			<div
				className='transition-opacity duration-[900ms]'
				style={{ opacity: mainVisible ? 1 : 0 }}
			>
				<Navbar />
				<main>
					<Hero />
					<ErrorBoundary>
						<Episodes
							onWatch={id => navigate(`/watch/${id}`)}
							onBrowseAll={() => navigate('/podcasts')}
						/>
					</ErrorBoundary>
					<ErrorBoundary>
						<Guests />
					</ErrorBoundary>
					<About />
					<Platforms />
					<Contact />
				</main>
				<Footer />
			</div>
		</div>
	)
}

function WatchPageRoute() {
	const { videoId } = useParams<{ videoId: string }>()
	const navigate = useNavigate()
	if (!videoId) return <Navigate to='/' replace />
	return (
		<WatchPage
			videoId={videoId}
			onBack={() => navigate(-1)}
			onWatch={id => navigate(`/watch/${id}`)}
		/>
	)
}

function PodcastsPageRoute() {
	const navigate = useNavigate()
	return (
		<>
			<Navbar />
			<main>
				<PodcastsPage
					onWatch={id => navigate(`/watch/${id}`)}
					onBack={() => navigate(-1)}
				/>
			</main>
			<Footer />
		</>
	)
}

export default function App() {
	return (
		<div className='min-h-screen bg-black text-white overflow-x-hidden'>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route
					path='/watch/:videoId'
					element={
						<ErrorBoundary>
							<Suspense fallback={<LoadingScreen />}>
								<WatchPageRoute />
							</Suspense>
						</ErrorBoundary>
					}
				/>
				<Route
					path='/podcasts'
					element={
						<ErrorBoundary>
							<Suspense fallback={<LoadingScreen />}>
								<PodcastsPageRoute />
							</Suspense>
						</ErrorBoundary>
					}
				/>
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		</div>
	)
}
