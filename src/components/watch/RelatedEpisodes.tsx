import { useState } from 'react'
import { cardThumb, type Episode } from '../../data/episodes'

function RelatedCard({ ep, onClick }: { ep: Episode; onClick: () => void }) {
	const [imgError, setImgError] = useState(false)

	return (
		<button
			onClick={onClick}
			className='group relative aspect-video overflow-hidden border border-white/10 bg-white/5 hover:border-neon/40 transition-all duration-200 focus:outline-none'
		>
			{!imgError ? (
				<img
					src={cardThumb(ep.youtubeId)}
					alt={`EP ${ep.ep}`}
					loading='lazy'
					className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
					onError={() => setImgError(true)}
				/>
			) : (
				<div className='w-full h-full flex items-center justify-center'>
					<span className='font-oswald font-bold neon-text-sm opacity-40'>EP{ep.ep}</span>
				</div>
			)}
			<div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent' />
			<span className='absolute bottom-2 left-2 font-oswald text-xs uppercase tracking-widest neon-text-sm'>
				EP {String(ep.ep).padStart(2, '0')}
			</span>
			<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150'>
				<div className='w-8 h-8 rounded-full border border-neon/60 flex items-center justify-center bg-black/50'>
					<svg className='w-3.5 h-3.5 neon-text-sm ml-0.5' viewBox='0 0 24 24' fill='currentColor'>
						<path d='M8 5v14l11-7z' />
					</svg>
				</div>
			</div>
		</button>
	)
}

interface Props { episodes: Episode[]; onWatch: (id: string) => void }

export default function RelatedEpisodes({ episodes, onWatch }: Props) {
	if (episodes.length === 0) return null
	return (
		<div className='flex flex-col gap-5'>
			<h2 className='font-oswald font-bold text-xs uppercase tracking-[0.4em] text-white/35'>
				Boshqa podkastlar
			</h2>
			<div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
				{episodes.map(ep => (
					<RelatedCard key={ep.youtubeId} ep={ep} onClick={() => onWatch(ep.youtubeId)} />
				))}
			</div>
		</div>
	)
}
