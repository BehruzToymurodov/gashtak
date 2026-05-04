import { useEffect, useState } from 'react'
import { EPISODES, type Episode } from '../data/episodes'

export interface EpisodeMeta extends Episode {
	title: string
	author: string
}

const cache = new Map<string, EpisodeMeta>()

export async function fetchOEmbed(ep: Episode): Promise<EpisodeMeta> {
	if (cache.has(ep.youtubeId)) return cache.get(ep.youtubeId)!
	try {
		const res = await fetch(
			`https://www.youtube.com/oembed?url=https://youtu.be/${ep.youtubeId}&format=json`,
		)
		if (!res.ok) throw new Error('oEmbed failed')
		const data = await res.json()
		const meta: EpisodeMeta = {
			...ep,
			title: data.title ?? `Podkast ${ep.ep}`,
			author: data.author_name ?? 'GASHTAK',
		}
		cache.set(ep.youtubeId, meta)
		return meta
	} catch {
		const fallback: EpisodeMeta = { ...ep, title: `GASHTAK EP${ep.ep}`, author: 'GASHTAK' }
		cache.set(ep.youtubeId, fallback)
		return fallback
	}
}

export function useEpisodesMeta(episodes: Episode[]): Record<string, EpisodeMeta> {
	const [metas, setMetas] = useState<Record<string, EpisodeMeta>>(() => {
		const preloaded: Record<string, EpisodeMeta> = {}
		for (const ep of episodes) {
			if (cache.has(ep.youtubeId)) preloaded[ep.youtubeId] = cache.get(ep.youtubeId)!
		}
		return preloaded
	})

	useEffect(() => {
		const missing = episodes.filter(ep => !cache.has(ep.youtubeId))
		if (missing.length === 0) return
		Promise.allSettled(missing.map(fetchOEmbed)).then(results => {
			setMetas(prev => {
				const next = { ...prev }
				results.forEach((r, i) => {
					if (r.status === 'fulfilled') next[missing[i].youtubeId] = r.value
				})
				return next
			})
		})
	}, [episodes])

	return metas
}

export function useEpisodeMeta(youtubeId: string): EpisodeMeta | null {
	const ep = EPISODES.find(e => e.youtubeId === youtubeId)
	const [meta, setMeta] = useState<EpisodeMeta | null>(() => cache.get(youtubeId) ?? null)

	useEffect(() => {
		if (!ep) return
		if (cache.has(youtubeId)) { setMeta(cache.get(youtubeId)!); return }
		let active = true
		fetchOEmbed(ep).then(data => { if (active) setMeta(data) })
		return () => { active = false }
	}, [youtubeId, ep])

	return meta
}
