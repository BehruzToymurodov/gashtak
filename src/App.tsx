import { useEffect, useState } from 'react'
import About from './components/About'
import Episodes from './components/Episodes'
import Footer from './components/Footer'
import Guests from './components/Guests'
import Hero from './components/Hero'
import IntroAnimation from './components/IntroAnimation'
import Navbar from './components/Navbar'
import Platforms from './components/Platforms'
import PodcastsPage from './components/PodcastsPage'
import WatchPage from './components/WatchPage'

export default function App() {
	const [mainVisible, setMainVisible] = useState(false)
	const [introGone, setIntroGone] = useState(false)
	const [watchingId, setWatchingId] = useState<string | null>(null)
	const [podcastsPageOpen, setPodcastsPageOpen] = useState(false)

	const handleIntroComplete = () => {
		setMainVisible(true)
		setTimeout(() => setIntroGone(true), 950)
	}

	const openWatch = (id: string) => {
		setWatchingId(id)
		window.history.pushState({ watchingId: id }, '', `#watch/${id}`)
	}

	const closeWatch = () => {
		setWatchingId(null)
		window.history.pushState({}, '', window.location.pathname)
	}

	const openPodcastsPage = () => {
		setPodcastsPageOpen(true)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const closePodcastsPage = () => {
		setPodcastsPageOpen(false)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	// Handle browser back button
	useEffect(() => {
		const onPop = () => {
			if (!window.location.hash.startsWith('#watch/')) setWatchingId(null)
		}
		window.addEventListener('popstate', onPop)
		return () => window.removeEventListener('popstate', onPop)
	}, [])

	return (
		<div className='min-h-screen bg-black text-white overflow-x-hidden'>
			{!introGone && <IntroAnimation onComplete={handleIntroComplete} />}

			{watchingId ? (
				<WatchPage
					key={watchingId}
					videoId={watchingId}
					onBack={closeWatch}
					onWatch={openWatch}
				/>
			) : podcastsPageOpen ? (
				<div
					className='transition-opacity duration-[900ms]'
					style={{ opacity: mainVisible ? 1 : 0 }}
				>
					<Navbar />
					<main>
						<PodcastsPage onWatch={openWatch} onBack={closePodcastsPage} />
					</main>
					<Footer />
				</div>
			) : (
				<div
					className='transition-opacity duration-[900ms]'
					style={{ opacity: mainVisible ? 1 : 0 }}
				>
					<Navbar />
					<main>
						<Hero />
						<Episodes onWatch={openWatch} onBrowseAll={openPodcastsPage} />
						<Guests />
						<About />
						<Platforms />
					</main>
					<Footer />
				</div>
			)}
		</div>
	)
}
