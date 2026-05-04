import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
	videoId: string
	title: string
	likedByMe: boolean
	likesCount: number
	commentsCount: number
	onToggleLike: () => void
	onScrollToComments: () => void
}

export default function VideoActions({
	videoId, title, likedByMe, likesCount, commentsCount, onToggleLike, onScrollToComments,
}: Props) {
	const { t } = useTranslation()
	const [copied, setCopied] = useState(false)
	const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`

	const handleShare = async () => {
		if (navigator.share) {
			try { await navigator.share({ title, url: youtubeUrl }) } catch { /* cancelled */ }
		} else {
			await navigator.clipboard.writeText(youtubeUrl)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		}
	}

	return (
		<div className='flex flex-wrap gap-3 pb-6 border-b border-white/8'>
			<button
				onClick={onToggleLike}
				className='flex items-center gap-2 font-oswald text-xs uppercase tracking-widest px-5 py-2.5 border border-white/15 text-white/55 hover:border-neon/50 hover:text-neon transition-all duration-150'
			>
				<svg className='w-4 h-4' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' />
				</svg>
				{likedByMe ? t('actions.liked') : t('actions.like')} · {likesCount}
			</button>

			<button
				onClick={onScrollToComments}
				className='flex items-center gap-2 font-oswald text-xs uppercase tracking-widest px-5 py-2.5 border border-white/15 text-white/55 hover:border-neon/50 hover:text-neon transition-all duration-150'
			>
				<svg className='w-4 h-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
					<path strokeLinecap='round' strokeLinejoin='round' d='M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z' />
				</svg>
				{t('actions.comment')} · {commentsCount}
			</button>

			<button
				onClick={handleShare}
				className='flex items-center gap-2 font-oswald text-xs uppercase tracking-widest px-5 py-2.5 border border-white/15 text-white/55 hover:border-neon/50 hover:text-neon transition-all duration-150'
			>
				<svg className='w-4 h-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
					<path strokeLinecap='round' strokeLinejoin='round' d='M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z' />
				</svg>
				{copied ? t('actions.copied') : t('actions.share')}
			</button>

			<a
				href={youtubeUrl}
				target='_blank'
				rel='noopener noreferrer'
				className='flex items-center gap-2 font-oswald text-xs uppercase tracking-widest px-5 py-2.5 border border-neon/30 text-neon/70 hover:border-neon hover:text-neon hover:bg-neon/5 transition-all duration-150 ml-auto'
				style={{ boxShadow: '0 0 8px rgba(125,255,244,0.06)' }}
			>
				<svg className='w-4 h-4' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1C4.5 20.5 12 20.5 12 20.5s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.8 15.5V8.5l6.3 3.5-6.3 3.5z' />
				</svg>
				{t('actions.watchYoutube')}
			</a>
		</div>
	)
}
