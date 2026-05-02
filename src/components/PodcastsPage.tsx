import { useEffect, useMemo, useState } from 'react'
import { EPISODES, type Episode } from '../data/episodes'
import { EpisodeCard } from './Episodes'

interface EpisodeMeta extends Episode {
	title: string
	author: string
}

async function fetchOEmbed(ep: Episode): Promise<EpisodeMeta> {
	try {
		const res = await fetch(
			`https://www.youtube.com/oembed?url=https://youtu.be/${ep.youtubeId}&format=json`,
		)
		if (!res.ok) throw new Error('oEmbed failed')
		const data = await res.json()
		return {
			...ep,
			title: data.title ?? `Podkast ${ep.ep}`,
			author: data.author_name ?? 'GASHTAK',
		}
	} catch {
		return { ...ep, title: `GASHTAK EP${ep.ep}`, author: 'GASHTAK' }
	}
}

function getEpisodeViews(ep: Episode) {
	return ep.views ?? 0
}

export default function PodcastsPage({
	onWatch,
	onBack,
}: {
	onWatch: (id: string) => void
	onBack: () => void
}) {
	const [metas, setMetas] = useState<Record<string, EpisodeMeta>>({})

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'instant' })
		Promise.allSettled(EPISODES.slice(3).map(fetchOEmbed)).then(results => {
			const map: Record<string, EpisodeMeta> = {}
			results.forEach((r, i) => {
				const ep = EPISODES.slice(3)[i]
				if (r.status === 'fulfilled') map[ep.youtubeId] = r.value
			})
			setMetas(map)
		})
	}, [])

	const rest = useMemo(() => EPISODES.slice(3), [])

	return (
		<div className='min-h-screen pt-28 pb-24 px-6'>
			<div className='max-w-7xl mx-auto'>
				<div className='mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
					<div>
						<p className='font-barlow text-xs uppercase tracking-[0.4em] text-white/40'>
							To'liq arxiv
						</p>
						<h1 className='section-title mt-3'>Podkastlar</h1>
						<p className='mt-3 max-w-2xl font-barlow text-sm text-white/60'>
							Bu sahifada asosiy sahifadagi birinchi 3 podkastdan keyingi
							epizodlar joylashgan.
						</p>
					</div>
					<button
						onClick={onBack}
						className='btn-outline inline-flex self-start'
					>
						Orqaga qaytish
					</button>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
					{rest.map(ep => (
						<EpisodeCard
							key={ep.youtubeId}
							ep={ep}
							views={getEpisodeViews(ep)}
							meta={metas[ep.youtubeId] ?? null}
							onWatch={() => onWatch(ep.youtubeId)}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
