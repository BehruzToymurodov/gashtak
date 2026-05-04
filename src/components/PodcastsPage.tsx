import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { EPISODES } from '../data/episodes'
import { useEpisodesMeta } from '../lib/episodesMeta'
import { EpisodeCard } from './Episodes'

export default function PodcastsPage({ onWatch, onBack }: { onWatch: (id: string) => void; onBack: () => void }) {
	const { t } = useTranslation()
	const rest = useMemo(() => EPISODES.slice(3), [])
	const metas = useEpisodesMeta(rest)

	useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

	return (
		<div className='min-h-screen pt-28 pb-24 px-6'>
			<div className='max-w-7xl mx-auto'>
				<div className='mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
					<div>
						<p className='font-barlow text-xs uppercase tracking-[0.4em] text-white/40'>{t('episodes.fullArchive')}</p>
						<h1 className='section-title mt-3'>{t('episodes.title')}</h1>
						<p className='mt-3 max-w-2xl font-barlow text-sm text-white/60'>
							{t('episodes.archiveSubtitle')}
						</p>
					</div>
					<button onClick={onBack} className='btn-outline inline-flex self-start'>{t('episodes.back')}</button>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
					{rest.map(ep => (
						<EpisodeCard key={ep.youtubeId} ep={ep} meta={metas[ep.youtubeId] ?? null} onWatch={() => onWatch(ep.youtubeId)} />
					))}
				</div>
			</div>
		</div>
	)
}
