import { useMemo, useState } from 'react'
import { EPISODES } from '../data/episodes'
import type { Guest } from '../data/guests'
import GUESTS from '../data/guests'

function GuestCard({ g, onOpen }: { g: Guest; onOpen: (g: Guest) => void }) {
	return (
		<button
			onClick={() => onOpen(g)}
			className='group bg-white/[0.03] border border-white/10 p-4 flex flex-col items-start gap-3 hover:border-neon/40 transition-all duration-200'
		>
			<div className='w-full aspect-[4/3] bg-white/5 overflow-hidden flex items-center justify-center'>
				{g.avatar ? (
					<img
						src={g.avatar}
						alt={g.name}
						className='w-full h-full object-cover'
					/>
				) : (
					<div className='w-full h-full flex items-center justify-center'>
						<span className='font-oswald text-2xl neon-text'>
							{g.name.split(' ')[0]}
						</span>
					</div>
				)}
			</div>

			<div className='flex flex-col gap-1 w-full text-left'>
				<div className='flex items-center justify-between'>
					<h3 className='font-oswald font-semibold text-base text-white/90'>
						{g.name}
					</h3>
					<span className='font-barlow text-xs text-white/40 uppercase'>
						{g.role}
					</span>
				</div>
				<p className='font-barlow text-sm text-white/60 line-clamp-2'>
					{g.bio}
				</p>
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
		return GUESTS.filter(
			g =>
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
						<p className='font-barlow text-sm text-white/60'>
							Podkastimizning mashhur mehmonlari bilan tanishing.
						</p>
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
					{filtered.map(g => (
						<GuestCard key={g.id} g={g} onOpen={setSelected} />
					))}
				</div>

				{selected && (
					<div className='fixed inset-0 z-50 flex items-center justify-center p-6'>
						<div
							className='absolute inset-0 bg-black/80'
							onClick={() => setSelected(null)}
						/>
						<div className='relative max-w-3xl w-full bg-black border border-white/10 p-6'>
							<button
								className='absolute top-3 right-3'
								onClick={() => setSelected(null)}
							>
								✕
							</button>
							<div className='flex gap-6'>
								<div className='w-40 h-40 bg-white/5 overflow-hidden'>
									{selected.avatar ? (
										<img
											src={selected.avatar}
											alt={selected.name}
											className='w-full h-full object-cover'
										/>
									) : (
										<div className='w-full h-full flex items-center justify-center'>
											<span className='font-oswald text-2xl neon-text'>
												{selected.name.split(' ')[0]}
											</span>
										</div>
									)}
								</div>
								<div className='flex-1'>
									<h3 className='font-oswald text-2xl'>{selected.name}</h3>
									<p className='font-barlow text-sm text-white/40 mt-1'>
										{selected.role}
									</p>
									<p className='mt-4 font-barlow text-base text-white/80'>
										{selected.bio}
									</p>

									<div className='mt-6'>
										<h4 className='font-oswald text-sm text-white/90 uppercase tracking-wider'>
											Podkastlarida qatnashgan
										</h4>
										<div className='mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3'>
											{selected.appearedIn?.map(id => {
												const ep = EPISODES.find(e => e.youtubeId === id)
												if (!ep) return null
												return (
													<button
														key={id}
														onClick={() => window.scrollTo({ top: 0 })}
														className='flex items-center gap-3 p-3 bg-white/[0.02] border border-white/10'
													>
														<img
															src={ep.thumb}
															alt={`EP ${ep.ep}`}
															className='w-16 h-9 object-cover'
														/>
														<div className='text-left'>
															<div className='font-oswald text-sm'>
																EP {String(ep.ep).padStart(2, '0')}
															</div>
															<div className='font-barlow text-xs text-white/50'>
																Podkast
															</div>
														</div>
													</button>
												)
											})}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	)
}
