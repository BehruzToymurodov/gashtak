import { useNavigate } from 'react-router-dom'

const FEATURED_ID = 'WJr9fLQlrcw' // EP 09
const FEATURED_THUMB = `https://img.youtube.com/vi/${FEATURED_ID}/maxresdefault.jpg`

export default function Hero() {
	const navigate = useNavigate()

	return (
		<section
			id='top'
			className='relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden'
		>
			{/* Video background */}
			<video
				className='absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none'
				src='/videos/tizer.mp4'
				autoPlay
				muted
				loop
				playsInline
			/>

			{/* Dark overlay over video */}
			<div className='absolute inset-0 pointer-events-none bg-black/40' />

			{/* Grid overlay */}
			<div
				className='absolute inset-0 pointer-events-none'
				style={{
					backgroundImage:
						'linear-gradient(rgba(125,255,244,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(125,255,244,0.04) 1px, transparent 1px)',
					backgroundSize: '80px 80px',
				}}
			/>

			{/* Radial spotlight */}
			<div
				className='absolute inset-0 pointer-events-none'
				style={{
					background:
						'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(125,255,244,0.06) 0%, transparent 70%)',
				}}
			/>

			{/* Main content */}
			<div className='relative z-10 flex flex-col items-center gap-6 w-full max-w-4xl'>
				<p
					className='font-barlow text-xs md:text-sm uppercase tracking-[0.4em] text-white/40 animate-fade-up'
					style={{ animationDelay: '0.1s' }}
				>
					O'zbek Celebrity Podcast
				</p>

				<h1
					className='font-oswald font-bold leading-none neon-text
            text-[clamp(4rem,18vw,14rem)] tracking-tight animate-fade-up'
					style={{ animationDelay: '0.2s' }}
				>
					#GASHTAK
				</h1>

				<p
					className='font-barlow text-lg md:text-xl text-white/70 max-w-lg animate-fade-up'
					style={{ animationDelay: '0.35s' }}
				>
					O'zbek yulduzlarini dunyoga tanitamiz
				</p>

				<p
					className='font-barlow text-sm text-white/40 uppercase tracking-widest animate-fade-up'
					style={{ animationDelay: '0.45s' }}
				>
					Mashxur siymolar · Qiziqarli suhbatlar
				</p>

				{/* CTAs */}
				<div
					className='flex flex-wrap items-center justify-center gap-4 mt-2 animate-fade-up'
					style={{ animationDelay: '0.55s' }}
				>
					<a
						href='https://www.youtube.com/@gashtak'
						target='_blank'
						rel='noopener noreferrer'
						className='btn-neon text-base'
					>
						<svg className='w-5 h-5' viewBox='0 0 24 24' fill='currentColor'>
							<path d='M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1C4.5 20.5 12 20.5 12 20.5s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.8 15.5V8.5l6.3 3.5-6.3 3.5z' />
						</svg>
						YouTube'da Ko'ring
					</a>
					<a
						href='https://t.me/hashtag_gashtak'
						target='_blank'
						rel='noopener noreferrer'
						className='btn-outline text-base'
					>
						<svg className='w-5 h-5' viewBox='0 0 24 24' fill='currentColor'>
							<path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
						</svg>
						Telegram
					</a>
				</div>

				{/* Featured EP09 card */}
				<div
					className='w-full max-w-xl mt-6 animate-fade-up'
					style={{ animationDelay: '0.7s' }}
				>
					<div className='flex items-center gap-3 mb-3'>
						<div className='h-px flex-1 bg-neon/30' />
						<span className='font-barlow text-[10px] uppercase tracking-[0.4em] text-white/35'>
							So'nggi mashhur epizod
						</span>
						<div className='h-px flex-1 bg-neon/30' />
					</div>
					<button
						onClick={() => navigate(`/watch/${FEATURED_ID}`)}
						className='group w-full flex items-center gap-4 p-3 border border-white/10 bg-white/[0.03]
              hover:border-neon/50 hover:bg-white/[0.06] transition-all duration-300 text-left'
					>
						<div className='relative w-32 aspect-video flex-shrink-0 overflow-hidden bg-white/5'>
							<img
								src={FEATURED_THUMB}
								alt='EP 09'
								className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
							/>
							<div className='absolute inset-0 flex items-center justify-center'>
								<div className='w-8 h-8 rounded-full border border-neon/60 flex items-center justify-center bg-black/60 backdrop-blur-sm group-hover:bg-neon/10 transition-colors'>
									<svg className='w-3.5 h-3.5 neon-text-sm ml-0.5' viewBox='0 0 24 24' fill='currentColor'>
										<path d='M8 5v14l11-7z' />
									</svg>
								</div>
							</div>
						</div>
						<div className='flex flex-col gap-1 min-w-0'>
							<span className='font-oswald text-[10px] uppercase tracking-widest neon-text-sm'>
								EP 09
							</span>
							<span className='font-oswald font-semibold text-sm text-white/90 group-hover:text-neon transition-colors line-clamp-2'>
								720 000+ ko'rish
							</span>
							<span className='font-barlow text-xs text-white/35 uppercase tracking-widest'>
								Ko'rish uchun bosing →
							</span>
						</div>
					</button>
				</div>
			</div>

			{/* Scroll indicator */}
			<div className='absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25'>
				<span className='font-barlow text-xs uppercase tracking-widest'>Pastga</span>
				<div className='w-px h-12 bg-gradient-to-b from-white/25 to-transparent' />
			</div>
		</section>
	)
}
