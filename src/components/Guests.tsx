import { useMemo, useState } from 'react'
import { EPISODES } from '../data/episodes'
import type { Guest } from '../data/guests'
import GUESTS from '../data/guests'

const SOCIAL_ICONS: Record<string, string> = {
	Instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
	Telegram: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
	YouTube: 'M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1C4.5 20.5 12 20.5 12 20.5s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.8 15.5V8.5l6.3 3.5-6.3 3.5z',
	Twitter: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
}

function SocialLink({ type, url }: { type: string; url: string }) {
	const path = SOCIAL_ICONS[type]
	return (
		<a
			href={url}
			target='_blank'
			rel='noopener noreferrer'
			className='flex items-center gap-2 font-oswald text-xs uppercase tracking-widest px-3 py-1.5 border border-white/15 text-white/55 hover:border-neon/50 hover:text-neon transition-all duration-150'
		>
			{path && <svg className='w-3.5 h-3.5' viewBox='0 0 24 24' fill='currentColor'><path d={path} /></svg>}
			{type}
		</a>
	)
}

function GuestCard({ g, onOpen }: { g: Guest; onOpen: (g: Guest) => void }) {
	return (
		<button
			onClick={() => onOpen(g)}
			className='group bg-white/[0.03] border border-white/10 p-4 flex flex-col items-start gap-3 hover:border-neon/40 transition-all duration-200'
		>
			<div className='w-full aspect-[4/3] bg-white/5 overflow-hidden flex items-center justify-center'>
				{g.avatar ? (
					<img src={g.avatar} alt={g.name} loading='lazy' className='w-full h-full object-cover' />
				) : (
					<div className='w-full h-full flex items-center justify-center'>
						<span className='font-oswald text-2xl neon-text'>{g.name.split(' ')[0]}</span>
					</div>
				)}
			</div>
			<div className='flex flex-col gap-1 w-full text-left'>
				<div className='flex items-center justify-between'>
					<h3 className='font-oswald font-semibold text-base text-white/90'>{g.name}</h3>
					<span className='font-barlow text-xs text-white/40 uppercase'>{g.role}</span>
				</div>
				<p className='font-barlow text-sm text-white/60 line-clamp-2'>{g.bio}</p>
			</div>
		</button>
	)
}

export default function Guests() {
	const [query, setQuery] = useState('')
	const [selected, setSelected] = useState<Guest | null>(null)

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase()
		if (!q) return GUESTS
		return GUESTS.filter(g =>
			g.name.toLowerCase().includes(q) ||
			(g.role ?? '').toLowerCase().includes(q) ||
			(g.bio ?? '').toLowerCase().includes(q),
		)
	}, [query])

	return (
		<section id='mehmonlar' className='py-24 px-6'>
			<div className='max-w-7xl mx-auto'>
				<div className='mb-8 flex items-center justify-between gap-4'>
					<div>
						<h2 className='section-title'>Mehmonlar</h2>
						<p className='font-barlow text-sm text-white/60'>Podkastimizning mashhur mehmonlari bilan tanishing.</p>
					</div>
					<div className='w-64'>
						<input
							value={query}
							onChange={e => setQuery(e.target.value)}
							placeholder="Ism, rol yoki kalit so'z..."
							className='w-full bg-black/60 border border-white/10 px-3 py-2 text-sm outline-none focus:border-neon/50'
						/>
					</div>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
					{filtered.map(g => <GuestCard key={g.id} g={g} onOpen={setSelected} />)}
				</div>

				{selected && (
					<div className='fixed inset-0 z-50 flex items-center justify-center p-6'>
						<div className='absolute inset-0 bg-black/80' onClick={() => setSelected(null)} />
						<div className='relative max-w-3xl w-full bg-black border border-white/10 p-6 overflow-y-auto max-h-[90vh]'>
							<button
								className='absolute top-3 right-3 font-oswald text-sm text-white/40 hover:text-neon transition-colors'
								onClick={() => setSelected(null)}
							>✕</button>

							<div className='flex flex-col sm:flex-row gap-6'>
								<div className='w-full sm:w-40 h-40 bg-white/5 overflow-hidden flex-shrink-0'>
									{selected.avatar ? (
										<img src={selected.avatar} alt={selected.name} className='w-full h-full object-cover' />
									) : (
										<div className='w-full h-full flex items-center justify-center'>
											<span className='font-oswald text-2xl neon-text'>{selected.name.split(' ')[0]}</span>
										</div>
									)}
								</div>

								<div className='flex-1 flex flex-col gap-4'>
									<div>
										<h3 className='font-oswald text-2xl text-white/90'>{selected.name}</h3>
										<p className='font-barlow text-sm text-white/40 mt-1 uppercase tracking-widest'>{selected.role}</p>
									</div>

									<p className='font-barlow text-base text-white/80'>{selected.bio}</p>

									{selected.socials && selected.socials.length > 0 && (
										<div className='flex flex-wrap gap-2'>
											{selected.socials.map(s => <SocialLink key={s.type} type={s.type} url={s.url} />)}
										</div>
									)}

									{selected.appearedIn && selected.appearedIn.length > 0 && (
										<div>
											<h4 className='font-oswald text-sm text-white/90 uppercase tracking-wider mb-3'>
												Podkastlarida qatnashgan
											</h4>
											<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
												{selected.appearedIn.map(id => {
													const ep = EPISODES.find(e => e.youtubeId === id)
													if (!ep) return null
													return (
														<div key={id} className='flex items-center gap-3 p-3 bg-white/[0.02] border border-white/10'>
															<img src={ep.thumb} alt={`EP ${ep.ep}`} loading='lazy' className='w-16 h-9 object-cover' />
															<div className='text-left'>
																<div className='font-oswald text-sm'>EP {String(ep.ep).padStart(2, '0')}</div>
																<div className='font-barlow text-xs text-white/50'>Podkast</div>
															</div>
														</div>
													)
												})}
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	)
}
