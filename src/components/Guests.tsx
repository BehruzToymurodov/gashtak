import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EPISODES } from '../data/episodes'
import type { Guest } from '../data/guests'
import GUESTS from '../data/guests'
import FadeIn from './FadeIn'

const SOCIAL_ICONS: Record<string, string> = {
	Instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
	Telegram: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
	YouTube: 'M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1C4.5 20.5 12 20.5 12 20.5s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.8 15.5V8.5l6.3 3.5-6.3 3.5z',
	Twitter: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
	TikTok: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z',
	Spotify: 'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z',
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
	const { t } = useTranslation()
	const bio = t(`guests.bios.${g.id}`, { defaultValue: g.bio ?? '' })
	const role = g.role ? t(`guests.roles.${g.role}`, { defaultValue: g.role }) : ''

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
					<span className='font-barlow text-xs text-white/40 uppercase'>{role}</span>
				</div>
				<p className='font-barlow text-sm text-white/60 line-clamp-2'>{bio}</p>
			</div>
		</button>
	)
}

export default function Guests() {
	const { t } = useTranslation()
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
				<FadeIn className='mb-8 flex items-center justify-between gap-4'>
					<div>
						<h2 className='section-title'>{t('guests.title')}</h2>
						<p className='font-barlow text-sm text-white/60'>{t('guests.subtitle')}</p>
					</div>
					<div className='w-64'>
						<input
							value={query}
							onChange={e => setQuery(e.target.value)}
							placeholder={t('guests.searchPlaceholder')}
							className='w-full bg-black/60 border border-white/10 px-3 py-2 text-sm outline-none focus:border-neon/50'
						/>
					</div>
				</FadeIn>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
					{filtered.map((g, i) => (
						<FadeIn key={g.id} delay={i * 0.1}>
							<GuestCard g={g} onOpen={setSelected} />
						</FadeIn>
					))}
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
										<p className='font-barlow text-sm text-white/40 mt-1 uppercase tracking-widest'>
											{selected.role ? t(`guests.roles.${selected.role}`, { defaultValue: selected.role }) : ''}
										</p>
									</div>

									<p className='font-barlow text-base text-white/80'>
										{t(`guests.bios.${selected.id}`, { defaultValue: selected.bio ?? '' })}
									</p>

									{selected.socials && selected.socials.length > 0 && (
										<div className='flex flex-wrap gap-2'>
											{selected.socials.map(s => <SocialLink key={s.type} type={s.type} url={s.url} />)}
										</div>
									)}

									{selected.appearedIn && selected.appearedIn.length > 0 && (
										<div>
											<h4 className='font-oswald text-sm text-white/90 uppercase tracking-wider mb-3'>
												{t('guests.appearedIn')}
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
																<div className='font-barlow text-xs text-white/50'>{t('watch.label')}</div>
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
