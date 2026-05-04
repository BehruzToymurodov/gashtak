import FadeIn from './FadeIn'

const PARTNERSHIP_TYPES = [
	{
		title: 'Homiylik',
		desc: "Brendingizni 3.5M+ auditoriyaga taqdim eting. Epizod boshida yoki oxirida reklama integratsiyasi.",
		icon: (
			<svg className='w-6 h-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
				<path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33' />
			</svg>
		),
	},
	{
		title: 'Mehmon sifatida',
		desc: "Jamiyatda izi bor insonlar — san'atkor, biznesmen, sportchi — podkastimizda o'z hikoyasini ulashing.",
		icon: (
			<svg className='w-6 h-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
				<path strokeLinecap='round' strokeLinejoin='round' d='M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3z' />
			</svg>
		),
	},
	{
		title: 'Media hamkorlik',
		desc: "Kontent yaratish, cross-promotion, intervyu almashish va boshqa media loyihalar uchun birgalikda ishlaymiz.",
		icon: (
			<svg className='w-6 h-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
				<path strokeLinecap='round' strokeLinejoin='round' d='M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z' />
			</svg>
		),
	},
]

export default function Contact() {
	return (
		<section id='aloqa' className='py-24 px-6'>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<FadeIn className='mb-16 flex flex-col items-center text-center gap-4'>
					<div className='flex items-center gap-4'>
						<div className='h-px w-12 bg-neon/40' />
						<span className='font-barlow text-xs uppercase tracking-[0.4em] text-white/40'>
							Hamkorlik
						</span>
						<div className='h-px w-12 bg-neon/40' />
					</div>
					<h2 className='section-title'>Hamkorlik qilaylik</h2>
					<p className='font-barlow text-base md:text-lg text-white/55 max-w-xl'>
						#GASHTAK — O'zbekistonning eng yirik celebrity podcast platformasi.
						Brendingiz yoki g'oyangiz bilan bog'laning.
					</p>
				</FadeIn>

				{/* Partnership types */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-5 mb-16'>
					{PARTNERSHIP_TYPES.map((p, i) => (
						<FadeIn key={p.title} delay={i * 0.1}>
							<div className='flex flex-col gap-4 p-8 border border-white/10 bg-white/[0.02] h-full'>
								<div className='w-11 h-11 flex items-center justify-center border border-neon/30 text-neon/70'>
									{p.icon}
								</div>
								<h3 className='font-oswald font-bold text-xl uppercase tracking-wider text-white/90'>
									{p.title}
								</h3>
								<p className='font-barlow text-sm text-white/55 leading-relaxed flex-1'>
									{p.desc}
								</p>
							</div>
						</FadeIn>
					))}
				</div>

				{/* CTA card */}
				<FadeIn>
					<div
						className='relative flex flex-col md:flex-row items-center justify-between gap-8 p-10 border border-neon/25 overflow-hidden'
						style={{
							background: 'linear-gradient(135deg, rgba(125,255,244,0.04) 0%, rgba(0,0,0,0) 60%)',
							boxShadow: '0 0 60px rgba(125,255,244,0.06), inset 0 0 60px rgba(125,255,244,0.02)',
						}}
					>
						{/* Decorative corner */}
						<div className='absolute top-0 left-0 w-16 h-16 pointer-events-none'
							style={{ background: 'linear-gradient(135deg, rgba(125,255,244,0.15) 0%, transparent 60%)' }}
						/>
						<div className='absolute bottom-0 right-0 w-16 h-16 pointer-events-none'
							style={{ background: 'linear-gradient(315deg, rgba(125,255,244,0.15) 0%, transparent 60%)' }}
						/>

						<div className='flex flex-col gap-3'>
							<span className='font-barlow text-xs uppercase tracking-[0.4em] text-white/35'>
								Taklif yuboring
							</span>
							<h3 className='font-oswald font-bold text-2xl md:text-3xl text-white/95'>
								Telegram orqali bog'laning
							</h3>
							<p className='font-barlow text-sm text-white/50 max-w-sm'>
								Tezkor javob uchun Telegram kanalimizga yozing. Barcha takliflar
								ko'rib chiqiladi.
							</p>
						</div>

						<a
							href='https://t.me/hashtag_gashtak'
							target='_blank'
							rel='noopener noreferrer'
							className='btn-neon text-base whitespace-nowrap flex-shrink-0'
						>
							<svg className='w-5 h-5' viewBox='0 0 24 24' fill='currentColor'>
								<path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
							</svg>
							Telegram'da yozing
						</a>
					</div>
				</FadeIn>
			</div>
		</section>
	)
}
