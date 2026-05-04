import { useState } from 'react'

export interface SiteComment {
	id: string
	text: string
	createdAt: number
	nickname: string
}

const NICKNAME_KEY = 'gashtak:nickname'

function getOrCreateNickname(): string {
	const stored = localStorage.getItem(NICKNAME_KEY)
	if (stored) return stored
	const generated = `Mehmon #${Math.floor(1000 + Math.random() * 9000)}`
	localStorage.setItem(NICKNAME_KEY, generated)
	return generated
}

interface Props {
	comments: SiteComment[]
	onAddComment: (comment: SiteComment) => void
}

export default function CommentSection({ comments, onAddComment }: Props) {
	const [commentText, setCommentText] = useState('')
	const [nickname] = useState(getOrCreateNickname)

	const submitComment = (e: React.FormEvent) => {
		e.preventDefault()
		const text = commentText.trim()
		if (!text) return
		onAddComment({
			id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
			text,
			createdAt: Date.now(),
			nickname,
		})
		setCommentText('')
	}

	return (
		<section id='site-comments' className='border border-white/10 bg-white/[0.02] p-4 md:p-5 flex flex-col gap-4'>
			<div className='flex items-center justify-between gap-3'>
				<h2 className='font-oswald font-bold text-sm md:text-base uppercase tracking-[0.2em] text-white/85'>
					Saytdagi izohlar
				</h2>
				<span className='font-barlow text-xs text-white/45'>{comments.length} ta izoh</span>
			</div>

			<form onSubmit={submitComment} className='flex flex-col gap-3'>
				<div className='flex items-center gap-2'>
					<span className='font-oswald text-xs uppercase tracking-widest neon-text-sm'>{nickname}</span>
				</div>
				<textarea
					value={commentText}
					onChange={e => setCommentText(e.target.value)}
					placeholder='Bu podkast haqida fikringizni yozing...'
					className='w-full min-h-24 resize-y bg-black/60 border border-white/15 px-3 py-2.5 text-sm font-barlow text-white/90 outline-none focus:border-neon/60'
					maxLength={300}
				/>
				<div className='flex items-center justify-between gap-3'>
					<span className='font-barlow text-xs text-white/35'>{commentText.length}/300</span>
					<button type='submit' className='btn-neon text-xs py-2 px-4' disabled={!commentText.trim()}>
						Izoh qoldirish
					</button>
				</div>
			</form>

			{comments.length > 0 ? (
				<div className='flex flex-col gap-3 pt-2'>
					{comments.map(comment => (
						<div key={comment.id} className='border border-white/10 bg-black/50 p-3'>
							<div className='flex items-center gap-2 mb-2'>
								<span className='font-oswald text-xs uppercase tracking-widest neon-text-sm opacity-70'>
									{comment.nickname ?? 'Mehmon'}
								</span>
							</div>
							<p className='font-barlow text-sm text-white/80 whitespace-pre-wrap'>{comment.text}</p>
							<p className='mt-2 font-barlow text-[11px] uppercase tracking-widest text-white/35'>
								{new Date(comment.createdAt).toLocaleString('uz-UZ')}
							</p>
						</div>
					))}
				</div>
			) : (
				<p className='font-barlow text-sm text-white/40'>Hozircha izohlar yo'q. Birinchi bo'lib fikr yozing.</p>
			)}
		</section>
	)
}
