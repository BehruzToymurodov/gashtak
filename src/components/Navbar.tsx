import { useEffect, useState } from 'react'

const LINKS = [
	{ label: 'Podkastlar', href: '#podkastlar' },
	{ label: 'Mehmonlar', href: '#mehmonlar' },
	{ label: 'Haqida', href: '#haqida' },
	{ label: 'Tinglash', href: '#tinglash' },
	{ label: 'Aloqa', href: '#aloqa' },
]

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false)
	const [mobileOpen, setMobileOpen] = useState(false)

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20)
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	const navBg = scrolled
		? 'bg-black/90 backdrop-blur-md border-b border-white/8'
		: 'bg-transparent'

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navBg}`}
		>
			<div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
				{/* Logo */}
				<a
					href='#top'
					className='font-oswald font-bold text-2xl neon-text-sm tracking-wider'
				>
					#GASHTAK
				</a>

				{/* Desktop links */}
				<nav className='hidden md:flex items-center gap-8'>
					{LINKS.map(l => (
						<a
							key={l.href}
							href={l.href}
							className='font-barlow text-sm uppercase tracking-widest text-white/60 hover:text-neon transition-colors duration-200'
						>
							{l.label}
						</a>
					))}
					<a
						href='https://www.youtube.com/@gashtak'
						target='_blank'
						rel='noopener noreferrer'
						className='btn-neon text-sm py-2 px-5'
					>
						YouTube
					</a>
				</nav>

				{/* Mobile burger */}
				<button
					className='md:hidden flex flex-col gap-1.5 p-2'
					onClick={() => setMobileOpen(v => !v)}
					aria-label='Menyuni ochish'
				>
					{[0, 1, 2].map(i => (
						<span
							key={i}
							className={`block h-0.5 bg-white transition-all duration-200
                ${i === 0 && mobileOpen ? 'rotate-45 translate-y-2' : ''}
                ${i === 1 && mobileOpen ? 'opacity-0' : ''}
                ${i === 2 && mobileOpen ? '-rotate-45 -translate-y-2' : ''}
                ${i === 0 || i === 2 ? 'w-6' : 'w-4'}`}
						/>
					))}
				</button>
			</div>

			{/* Mobile dropdown */}
			<div
				className={`md:hidden overflow-hidden transition-all duration-300 bg-black/95 border-b border-white/10
          ${mobileOpen ? 'max-h-64' : 'max-h-0'}`}
			>
				<nav className='flex flex-col px-6 pb-6 gap-5 pt-4'>
					{LINKS.map(l => (
						<a
							key={l.href}
							href={l.href}
							onClick={() => setMobileOpen(false)}
							className='font-oswald text-lg uppercase tracking-widest text-white/70 hover:text-neon transition-colors'
						>
							{l.label}
						</a>
					))}
					<a
						href='https://www.youtube.com/@gashtak'
						target='_blank'
						rel='noopener noreferrer'
						className='btn-neon self-start text-sm py-2 px-5'
					>
						YouTube
					</a>
				</nav>
			</div>
		</header>
	)
}
