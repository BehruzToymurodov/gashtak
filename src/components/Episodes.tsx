import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cardThumb, EPISODES, type Episode } from '../data/episodes'
import { type EpisodeMeta, useEpisodesMeta } from '../lib/episodesMeta'
import FadeIn from './FadeIn'

function formatViews(value: number, lang: string) {
	const locale = lang === 'ru' ? 'ru-RU' : lang === 'en' ? 'en-US' : 'uz-UZ'
	return new Intl.NumberFormat(locale).format(value)
}

export function EpisodeCard({
	ep, meta, onWatch, priority,
}: {
	ep: Episode
	meta: EpisodeMeta | null
	onWatch: () => void
	priority?: boolean
}) {
	const { t, i18n } = useTranslation()
	const [imgError, setImgError] = useState(false)
	const views = ep.views ?? 0

	return (
		<button
			onClick={onWatch}
			className='group relative flex flex-col w-full text-left bg-white/[0.03] border border-white/10 overflow-hidden card-hover focus:outline-none focus-visible:ring-1 focus-visible:ring-neon/50'
		>
			<div className='relative aspect-video overflow-hidden bg-white/5'>
				{!imgError ? (
					<img
						src={cardThumb(ep.youtubeId)}
						alt={meta?.title ?? `Podkast ${ep.ep}`}
						loading={priority ? 'eager' : 'lazy'}
						className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
						onError={() => setImgError(true)}
					/>
				) : (
					<div className='w-full h-full flex items-center justify-center'>
						<span className='font-oswald font-bold text-4xl neon-text-sm opacity-40'>EP{ep.ep}</span>
					</div>
				)}
				<div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent' />
				<div className='absolute top-3 left-3 font-oswald font-semibold text-xs uppercase tracking-widest neon-text-sm border border-neon/40 px-2.5 py-1 bg-black/70'>
					EP {String(ep.ep).padStart(2, '0')}
				</div>
				<div className='absolute top-3 right-3 font-barlow text-[11px] uppercase tracking-widest text-white/75 bg-black/70 border border-white/10 px-2 py-1'>
					{formatViews(views, i18n.language)} {t('episodes.views')}
				</div>
				<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
					<div className='w-14 h-14 rounded-full border border-neon/60 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
						<svg className='w-6 h-6 neon-text-sm ml-1' viewBox='0 0 24 24' fill='currentColor'>
							<path d='M8 5v14l11-7z' />
						</svg>
					</div>
				</div>
			</div>

			<div className='p-4 flex flex-col gap-2 flex-1'>
				<h3 className='font-oswald font-semibold text-base text-white/90 line-clamp-2 leading-tight group-hover:text-neon transition-colors duration-200'>
					{meta ? meta.title : <span className='inline-block w-3/4 h-4 bg-white/10 rounded animate-pulse' />}
				</h3>
				{meta && <p className='font-barlow text-xs text-white/40 uppercase tracking-widest'>{meta.author}</p>}
				<div className='mt-auto pt-3 flex items-center gap-1.5 text-xs font-barlow uppercase tracking-widest text-neon/70 group-hover:text-neon transition-colors'>
					<svg className='w-3.5 h-3.5' viewBox='0 0 24 24' fill='currentColor'><path d='M8 5v14l11-7z' /></svg>
					{t('episodes.watch')}
				</div>
			</div>
		</button>
	)
}

export default function Episodes({ onWatch, onBrowseAll }: { onWatch: (id: string) => void; onBrowseAll: () => void }) {
	const { t } = useTranslation()
	const metas = useEpisodesMeta(EPISODES)
	const popular = useMemo(
		() => [...EPISODES].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, 4),
		[],
	)

	return (
		<section id='podkastlar' className='py-24 px-6'>
			<div className='max-w-7xl mx-auto'>
				{popular.length > 0 && (
					<div className='mb-12'>
						<FadeIn>
							<div className='mb-6 flex items-center gap-4'>
								<div className='h-px flex-1 max-w-[3rem] bg-neon/40' />
								<span className='font-oswald text-lg uppercase tracking-[0.35em] neon-text'>{t('episodes.eyebrow')}</span>
								<div className='h-px flex-1 max-w-[3rem] bg-neon/40' />
							</div>
						</FadeIn>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
							{popular.map((ep, i) => (
								<FadeIn key={ep.youtubeId} delay={i * 0.08}>
									<EpisodeCard ep={ep} meta={metas[ep.youtubeId] ?? null} onWatch={() => onWatch(ep.youtubeId)} priority={i === 0} />
								</FadeIn>
							))}
						</div>
					</div>
				)}

				<FadeIn>
					<div className='mb-14 flex flex-col gap-3'>
						<div className='flex items-center gap-4'>
							<div className='h-px flex-1 max-w-[3rem] bg-neon/40' />
							<span className='font-barlow text-xs uppercase tracking-[0.4em] text-white/40'>{t('episodes.all')}</span>
						</div>
						<h2 className='section-title'>{t('episodes.title')}</h2>
					</div>
				</FadeIn>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
					{EPISODES.slice(0, 3).map((ep, i) => (
						<FadeIn key={ep.youtubeId} delay={i * 0.1}>
							<EpisodeCard ep={ep} meta={metas[ep.youtubeId] ?? null} onWatch={() => onWatch(ep.youtubeId)} />
						</FadeIn>
					))}
				</div>

				<FadeIn className='mt-12 text-center'>
					<button onClick={onBrowseAll} className='btn-outline inline-flex'>
						{t('episodes.viewAll')}
						<svg className='w-4 h-4 ml-1' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
							<path d='M5 12h14M12 5l7 7-7 7' />
						</svg>
					</button>
				</FadeIn>
			</div>
		</section>
	)
}
