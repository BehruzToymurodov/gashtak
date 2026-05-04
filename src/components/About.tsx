import { useEffect, useState } from 'react'
import FadeIn from './FadeIn'
import { useInView } from '../hooks/useInView'

interface Stat {
	end: number
	decimals?: number
	suffix: string
	label: string
}

const STATS: Stat[] = [
	{ end: 10, suffix: '+', label: 'Epizod' },
	{ end: 3.5, decimals: 1, suffix: 'M+', label: "Ko'rishlar" },
	{ end: 2024, suffix: '', label: 'Yildan beri' },
]

function AnimatedStat({ stat, active }: { stat: Stat; active: boolean }) {
	const [display, setDisplay] = useState(0)

	useEffect(() => {
		if (!active) return
		const duration = 1800
		const fps = 60
		const steps = (duration / 1000) * fps
		const increment = stat.end / steps
		let current = 0
		let frame = 0

		const tick = () => {
			frame++
			current = Math.min(current + increment, stat.end)
			setDisplay(current)
			if (current < stat.end) requestAnimationFrame(tick)
		}
		requestAnimationFrame(tick)
	}, [active, stat.end])

	const formatted = stat.decimals
		? display.toFixed(stat.decimals)
		: Math.floor(display).toString()

	return (
		<div className='flex flex-col items-center justify-center py-12 px-4 bg-black gap-2'>
			<span className='font-oswald font-bold text-4xl md:text-5xl neon-text'>
				{formatted}{stat.suffix}
			</span>
			<span className='font-barlow text-xs uppercase tracking-widest text-white/40'>
				{stat.label}
			</span>
		</div>
	)
}

export default function About() {
	const { ref, inView } = useInView(0.2)

	return (
		<section id='haqida' className='py-24 px-6'>
			<div className='max-w-7xl mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
					{/* Text side */}
					<FadeIn from='left'>
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
					</FadeIn>

					{/* Stats side — count-up triggers when scrolled into view */}
					<FadeIn from='right'>
						<div
							ref={ref as React.RefObject<HTMLDivElement>}
							className='grid grid-cols-3 gap-px bg-white/10'
						>
							{STATS.map(s => (
								<AnimatedStat key={s.label} stat={s} active={inView} />
							))}
						</div>
					</FadeIn>
				</div>

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
