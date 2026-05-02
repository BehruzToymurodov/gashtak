const STATS = [
	{ value: '5+', label: 'Podkast' },
	{ value: '10M+', label: "Ko'rishlar" },
	{ value: '2024', label: 'Yildan beri' },
]

export default function About() {
	return (
		<section id='haqida' className='py-24 px-6'>
			<div className='max-w-7xl mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
					{/* Text side */}
					<div className='flex flex-col gap-8'>
						<div className='flex flex-col gap-3'>
							<div className='flex items-center gap-4'>
								<div className='h-px w-12 bg-neon/40' />
								<span className='font-barlow text-xs uppercase tracking-[0.4em] text-white/40'>
									Biz haqimizda
								</span>
							</div>
							<h2 className='section-title'>Haqida</h2>
						</div>

						<div className='flex flex-col gap-5 font-barlow text-base md:text-lg text-white/65 leading-relaxed'>
							<p>
								<span className='neon-text-sm font-semibold'>#GASHTAK</span> —
								O'zbekistonning eng mashhur yulduzlari, san'atkorlari va jamoat
								arboblari bilan suhbatlar o'tkaziladigan ko'rsatuv.
							</p>
							<p>
								Har bir podkastda biz taniqli mehmonga shaxsiy hayoti, ijodi va
								dunyo haqidagi qarashlari to'g'risida chuqur savollar beramiz —
								ochiq, samimiy va qiziqarli suhbat formatida.
							</p>
							<p>
								Maqsadimiz — O'zbek madaniyatini va uning buyuk vakillari orqali
								butun dunyoga tanitish.
							</p>
						</div>

						<a
							href='https://www.youtube.com/@gashtak'
							target='_blank'
							rel='noopener noreferrer'
							className='btn-neon self-start'
						>
							Kanalga obuna bo'ling
						</a>
					</div>

					{/* Stats side */}
					<div className='grid grid-cols-3 gap-px bg-white/10'>
						{STATS.map(s => (
							<div
								key={s.label}
								className='flex flex-col items-center justify-center py-12 px-4 bg-black gap-2'
							>
								<span className='font-oswald font-bold text-4xl md:text-5xl neon-text'>
									{s.value}
								</span>
								<span className='font-barlow text-xs uppercase tracking-widest text-white/40'>
									{s.label}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Decorative divider */}
				<div className='mt-24 flex items-center gap-6'>
					<div className='h-px flex-1 bg-white/8' />
					<span className='font-oswald font-bold text-sm neon-text-sm tracking-widest'>
						#GASHTAK
					</span>
					<div className='h-px flex-1 bg-white/8' />
				</div>
			</div>
		</section>
	)
}
