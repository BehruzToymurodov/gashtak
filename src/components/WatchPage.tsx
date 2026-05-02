import { useEffect, useState } from 'react'
import { EPISODES, type Episode } from '../data/episodes'

interface Meta {
	title: string
	author: string
}

async function fetchMeta(youtubeId: string): Promise<Meta> {
	try {
		const res = await fetch(
			`https://www.youtube.com/oembed?url=https://youtu.be/${youtubeId}&format=json`,
		)
		if (!res.ok) throw new Error()
		const data = await res.json()
		return {
			title: data.title ?? 'GASHTAK',
			author: data.author_name ?? 'GASHTAK',
		}
	} catch {
		const ep = EPISODES.find(e => e.youtubeId === youtubeId)
		return { title: `GASHTAK EP${ep?.ep ?? ''}`, author: 'GASHTAK' }
	}
}

interface Props {
	videoId: string
	onBack: () => void
	onWatch: (id: string) => void
}

interface SiteComment {
	id: string
	text: string
	createdAt: number
}

const likesCountKey = (videoId: string) => `gashtak:likes-count:${videoId}`
const likedByMeKey = (videoId: string) => `gashtak:liked-by-me:${videoId}`
const commentsKey = (videoId: string) => `gashtak:comments:${videoId}`

function loadLikesCount(videoId: string): number {
	const raw = localStorage.getItem(likesCountKey(videoId))
	const parsed = Number(raw ?? '0')
	return Number.isFinite(parsed) ? Math.max(0, parsed) : 0
}

function loadLikedByMe(videoId: string): boolean {
	return localStorage.getItem(likedByMeKey(videoId)) === '1'
}

function loadComments(videoId: string): SiteComment[] {
	try {
		const raw = localStorage.getItem(commentsKey(videoId))
		if (!raw) return []
		const parsed = JSON.parse(raw) as SiteComment[]
		return Array.isArray(parsed) ? parsed : []
	} catch {
		return []
	}
}

export default function WatchPage({ videoId, onBack, onWatch }: Props) {
	const [meta, setMeta] = useState<Meta | null>(null)
	const [copied, setCopied] = useState(false)
	const [likedByMe, setLikedByMe] = useState(() => loadLikedByMe(videoId))
	const [likesCount, setLikesCount] = useState(() => loadLikesCount(videoId))
	const [comments, setComments] = useState<SiteComment[]>(() =>
		loadComments(videoId),
	)
	const [commentText, setCommentText] = useState('')

	const current = EPISODES.find(e => e.youtubeId === videoId)
	const others = EPISODES.filter(e => e.youtubeId !== videoId)
	const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'instant' })
		let active = true
		fetchMeta(videoId).then(data => {
			if (active) setMeta(data)
		})
		return () => {
			active = false
		}
	}, [videoId])

	const toggleLike = () => {
		const nextLiked = !likedByMe
		const nextCount = Math.max(0, likesCount + (nextLiked ? 1 : -1))
		setLikedByMe(nextLiked)
		setLikesCount(nextCount)
		localStorage.setItem(likedByMeKey(videoId), nextLiked ? '1' : '0')
		localStorage.setItem(likesCountKey(videoId), String(nextCount))
	}

	const submitComment = (e: React.FormEvent) => {
		e.preventDefault()
		const text = commentText.trim()
		if (!text) return

		const nextComment: SiteComment = {
			id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
			text,
			createdAt: Date.now(),
		}

		const next = [nextComment, ...comments]
		setComments(next)
		setCommentText('')
		localStorage.setItem(commentsKey(videoId), JSON.stringify(next))
	}

	const openComments = () => {
		const section = document.getElementById('site-comments')
		section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	const handleShare = async () => {
		const shareData = { title: meta?.title ?? 'GASHTAK', url: youtubeUrl }
		if (navigator.share) {
			try {
				await navigator.share(shareData)
			} catch {
				/* cancelled */
			}
		} else {
			await navigator.clipboard.writeText(youtubeUrl)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		}
	}

	return (
		<div
			className='min-h-screen'
			style={{ background: 'var(--bg-gradient)', color: 'var(--text)' }}
		>
			{/* Top bar */}
			<div
				className='sticky top-0 z-40 border-b border-white/8 backdrop-blur-md px-4 py-3 flex items-center gap-4'
				style={{ background: 'rgba(7,16,39,0.9)' }}
			>
				<button
					onClick={onBack}
					className='flex items-center gap-2 font-oswald text-sm uppercase tracking-widest text-white/50 hover:text-neon transition-colors duration-150'
				>
					<svg
						className='w-4 h-4'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M19 12H5M12 5l-7 7 7 7'
						/>
					</svg>
					Orqaga
				</button>
				<span className='font-oswald font-bold text-sm neon-text-sm tracking-wider ml-auto'>
					#GASHTAK
				</span>
			</div>

			<div className='max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6'>
				{/* YouTube iframe */}
				<div
					className='w-full aspect-video border border-neon/15 overflow-hidden'
					style={{ boxShadow: '0 0 40px var(--neon-glow-3)' }}
				>
					<iframe
						key={videoId}
						src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
						title={meta?.title ?? 'GASHTAK'}
						className='w-full h-full'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						allowFullScreen
					/>
				</div>

				{/* Podcast badge + title */}
				<div className='flex flex-col gap-2'>
					{current && (
						<span className='font-oswald text-xs uppercase tracking-widest neon-text-sm'>
							PODCAST {String(current.ep).padStart(2, '0')}
						</span>
					)}
					<h1 className='font-oswald font-bold text-xl md:text-2xl text-white/90 leading-snug'>
						{meta ? (
							meta.title
						) : (
							<span className='inline-block w-2/3 h-6 bg-white/10 rounded animate-pulse' />
						)}
					</h1>
					{meta && (
						<p className='font-barlow text-sm text-white/35 uppercase tracking-widest'>
							{meta.author}
						</p>
					)}
				</div>

				{/* Action buttons */}
				<div className='flex flex-wrap gap-3 pb-6 border-b border-white/8'>
					<button
						onClick={toggleLike}
						className='flex items-center gap-2 font-oswald text-xs uppercase tracking-widest px-5 py-2.5
              border border-white/15 text-white/55 hover:border-neon/50 hover:text-neon transition-all duration-150'
					>
						<svg className='w-4 h-4' viewBox='0 0 24 24' fill='currentColor'>
							<path d='M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' />
						</svg>
						{likedByMe ? 'Yoqdi' : 'Like'} · {likesCount}
					</button>

					<button
						onClick={openComments}
						className='flex items-center gap-2 font-oswald text-xs uppercase tracking-widest px-5 py-2.5
              border border-white/15 text-white/55 hover:border-neon/50 hover:text-neon transition-all duration-150'
					>
						<svg
							className='w-4 h-4'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='1.5'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z'
							/>
						</svg>
						Izoh · {comments.length}
					</button>

					<button
						onClick={handleShare}
						className='flex items-center gap-2 font-oswald text-xs uppercase tracking-widest px-5 py-2.5
              border border-white/15 text-white/55 hover:border-neon/50 hover:text-neon transition-all duration-150'
					>
						<svg
							className='w-4 h-4'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='1.5'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z'
							/>
						</svg>
						{copied ? 'Nusxalandi!' : 'Ulashish'}
					</button>

					<a
						href={youtubeUrl}
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center gap-2 font-oswald text-xs uppercase tracking-widest px-5 py-2.5
              border border-neon/30 text-neon/70 hover:border-neon hover:text-neon
              hover:bg-neon/5 transition-all duration-150 ml-auto'
						style={{ boxShadow: '0 0 8px rgba(125,255,244,0.06)' }}
					>
						<svg className='w-4 h-4' viewBox='0 0 24 24' fill='currentColor'>
							<path d='M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1C4.5 20.5 12 20.5 12 20.5s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.8 15.5V8.5l6.3 3.5-6.3 3.5z' />
						</svg>
						YouTube'da ko'rish
					</a>
				</div>

				<section
					id='site-comments'
					className='border border-white/10 bg-white/[0.02] p-4 md:p-5 flex flex-col gap-4'
				>
					<div className='flex items-center justify-between gap-3'>
						<h2 className='font-oswald font-bold text-sm md:text-base uppercase tracking-[0.2em] text-white/85'>
							Saytdagi izohlar
						</h2>
						<span className='font-barlow text-xs text-white/45'>
							{comments.length} ta izoh
						</span>
					</div>

					<form onSubmit={submitComment} className='flex flex-col gap-3'>
						<textarea
							value={commentText}
							onChange={e => setCommentText(e.target.value)}
							placeholder='Bu podkast haqida fikringizni yozing...'
							className='w-full min-h-24 resize-y bg-black/60 border border-white/15 px-3 py-2.5 text-sm font-barlow text-white/90 outline-none focus:border-neon/60'
							maxLength={300}
						/>
						<div className='flex items-center justify-between gap-3'>
							<span className='font-barlow text-xs text-white/35'>
								{commentText.length}/300
							</span>
							<button
								type='submit'
								className='btn-neon text-xs py-2 px-4'
								disabled={!commentText.trim()}
							>
								Izoh qoldirish
							</button>
						</div>
					</form>

					{comments.length > 0 ? (
						<div className='flex flex-col gap-3 pt-2'>
							{comments.map(comment => (
								<div
									key={comment.id}
									className='border border-white/10 bg-black/50 p-3'
								>
									<p className='font-barlow text-sm text-white/80 whitespace-pre-wrap'>
										{comment.text}
									</p>
									<p className='mt-2 font-barlow text-[11px] uppercase tracking-widest text-white/35'>
										{new Date(comment.createdAt).toLocaleString('uz-UZ')}
									</p>
								</div>
							))}
						</div>
					) : (
						<p className='font-barlow text-sm text-white/40'>
							Hozircha izohlar yo'q. Birinchi bo'lib fikr yozing.
						</p>
					)}
				</section>

				{/* Other podcasts */}
				{others.length > 0 && (
					<div className='flex flex-col gap-5'>
						<h2 className='font-oswald font-bold text-xs uppercase tracking-[0.4em] text-white/35'>
							Boshqa podkastlar
						</h2>
						<div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
							{others.map(ep => (
								<OtherEpisodeCard
									key={ep.youtubeId}
									ep={ep}
									onClick={() => onWatch(ep.youtubeId)}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

function OtherEpisodeCard({
	ep,
	onClick,
}: {
	ep: Episode
	onClick: () => void
}) {
	const [imgError, setImgError] = useState(false)

	return (
		<button
			onClick={onClick}
			className='group relative aspect-video overflow-hidden border border-white/10 bg-white/5
        hover:border-neon/40 transition-all duration-200 focus:outline-none'
		>
			{!imgError ? (
				<img
					src={ep.thumb}
					alt={`EP ${ep.ep}`}
					className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
					onError={() => setImgError(true)}
				/>
			) : (
				<div className='w-full h-full flex items-center justify-center'>
					<span className='font-oswald font-bold neon-text-sm opacity-40'>
						EP{ep.ep}
					</span>
				</div>
			)}
			<div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent' />
			<span className='absolute bottom-2 left-2 font-oswald text-xs uppercase tracking-widest neon-text-sm'>
				EP {String(ep.ep).padStart(2, '0')}
			</span>
			<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150'>
				<div className='w-8 h-8 rounded-full border border-neon/60 flex items-center justify-center bg-black/50'>
					<svg
						className='w-3.5 h-3.5 neon-text-sm ml-0.5'
						viewBox='0 0 24 24'
						fill='currentColor'
					>
						<path d='M8 5v14l11-7z' />
					</svg>
				</div>
			</div>
		</button>
	)
}
