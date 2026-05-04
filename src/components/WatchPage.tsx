import { useEffect, useState } from 'react'
import { EPISODES } from '../data/episodes'
import { useEpisodeMeta } from '../lib/episodesMeta'
import CommentSection, { type SiteComment } from './watch/CommentSection'
import RelatedEpisodes from './watch/RelatedEpisodes'
import VideoActions from './watch/VideoActions'
import VideoPlayer from './watch/VideoPlayer'

const likesCountKey = (id: string) => `gashtak:likes-count:${id}`
const likedByMeKey = (id: string) => `gashtak:liked-by-me:${id}`
const commentsKey = (id: string) => `gashtak:comments:${id}`

function loadLikesCount(id: string): number {
	const parsed = Number(localStorage.getItem(likesCountKey(id)) ?? '0')
	return Number.isFinite(parsed) ? Math.max(0, parsed) : 0
}
function loadLikedByMe(id: string): boolean {
	return localStorage.getItem(likedByMeKey(id)) === '1'
}
function loadComments(id: string): SiteComment[] {
	try {
		const raw = localStorage.getItem(commentsKey(id))
		if (!raw) return []
		const parsed = JSON.parse(raw) as SiteComment[]
		return Array.isArray(parsed) ? parsed : []
	} catch { return [] }
}

interface Props { videoId: string; onBack: () => void; onWatch: (id: string) => void }

export default function WatchPage({ videoId, onBack, onWatch }: Props) {
	const meta = useEpisodeMeta(videoId)
	const [likedByMe, setLikedByMe] = useState(() => loadLikedByMe(videoId))
	const [likesCount, setLikesCount] = useState(() => loadLikesCount(videoId))
	const [comments, setComments] = useState<SiteComment[]>(() => loadComments(videoId))

	const current = EPISODES.find(e => e.youtubeId === videoId)
	const others = EPISODES.filter(e => e.youtubeId !== videoId)

	useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [videoId])

	const toggleLike = () => {
		const nextLiked = !likedByMe
		const nextCount = Math.max(0, likesCount + (nextLiked ? 1 : -1))
		setLikedByMe(nextLiked)
		setLikesCount(nextCount)
		localStorage.setItem(likedByMeKey(videoId), nextLiked ? '1' : '0')
		localStorage.setItem(likesCountKey(videoId), String(nextCount))
	}

	const handleAddComment = (comment: SiteComment) => {
		const next = [comment, ...comments]
		setComments(next)
		localStorage.setItem(commentsKey(videoId), JSON.stringify(next))
	}

	const scrollToComments = () => {
		document.getElementById('site-comments')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	return (
		<div className='min-h-screen bg-black text-white'>
			<div
				className='sticky top-0 z-40 border-b border-white/8 backdrop-blur-md px-4 py-3 flex items-center gap-4'
				style={{ background: 'rgba(7,16,39,0.9)' }}
			>
				<button
					onClick={onBack}
					className='flex items-center gap-2 font-oswald text-sm uppercase tracking-widest text-white/50 hover:text-neon transition-colors duration-150'
				>
					<svg className='w-4 h-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
						<path strokeLinecap='round' strokeLinejoin='round' d='M19 12H5M12 5l-7 7 7 7' />
					</svg>
					Orqaga
				</button>
				<span className='font-oswald font-bold text-sm neon-text-sm tracking-wider ml-auto'>#GASHTAK</span>
			</div>

			<div className='max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6'>
				<VideoPlayer videoId={videoId} title={meta?.title ?? 'GASHTAK'} />

				<div className='flex flex-col gap-2'>
					{current && (
						<span className='font-oswald text-xs uppercase tracking-widest neon-text-sm'>
							PODCAST {String(current.ep).padStart(2, '0')}
						</span>
					)}
					<h1 className='font-oswald font-bold text-xl md:text-2xl text-white/90 leading-snug'>
						{meta ? meta.title : <span className='inline-block w-2/3 h-6 bg-white/10 rounded animate-pulse' />}
					</h1>
					{meta && <p className='font-barlow text-sm text-white/35 uppercase tracking-widest'>{meta.author}</p>}
				</div>

				<VideoActions
					videoId={videoId}
					title={meta?.title ?? 'GASHTAK'}
					likedByMe={likedByMe}
					likesCount={likesCount}
					commentsCount={comments.length}
					onToggleLike={toggleLike}
					onScrollToComments={scrollToComments}
				/>

				<CommentSection comments={comments} onAddComment={handleAddComment} />
				<RelatedEpisodes episodes={others} onWatch={onWatch} />
			</div>
		</div>
	)
}
