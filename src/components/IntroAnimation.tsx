import { useEffect, useRef, useState } from 'react'
import backgroundImg from '../assets/images/background.webp'
import gashtakSoundSrc from '../assets/sounds/gashtak_sound.mp3'

type LetterState = 'unlit' | 'randomizing' | 'flickering' | 'lit'

interface Props {
	onComplete: () => void
}

const TITLE = '#GASHTAK'
const RANDOM_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?'

const START_DELAY = 250
const LETTER_INTERVAL = 300
const RANDOMIZE_DURATION = 400
const RANDOMIZE_TICK = 70
const FLICKER_DURATION = 520
const HOLD_AFTER_LIT = 1200

export default function IntroAnimation({ onComplete }: Props) {
	const [started, setStarted] = useState(false)
	const [phase, setPhase] = useState<'idle' | 'animating' | 'exiting'>('idle')
	const [letters, setLetters] = useState<LetterState[]>(
		Array(TITLE.length).fill('unlit'),
	)
	const [displayChars, setDisplayChars] = useState<string[]>(TITLE.split(''))
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const timeoutsRef = useRef<number[]>([])
	const onCompleteRef = useRef(onComplete)
	onCompleteRef.current = onComplete

	const allLit = letters.every(letter => letter === 'lit')

	useEffect(() => {
		if (!started) return

		const addTimeout = (cb: () => void, delay: number) => {
			const id = window.setTimeout(cb, delay)
			timeoutsRef.current.push(id)
		}

		const audio = new Audio(gashtakSoundSrc)
		audio.volume = 0.9
		audioRef.current = audio
		void audio.play().catch(() => {})

		const titleChars = TITLE.split('')

		titleChars.forEach((finalChar, i) => {
			const letterDelay = START_DELAY + i * LETTER_INTERVAL

			addTimeout(() => {
				setLetters(prev => {
					const next = [...prev]
					next[i] = 'randomizing'
					return next
				})

				const tickCount = Math.floor(RANDOMIZE_DURATION / RANDOMIZE_TICK)
				for (let t = 0; t < tickCount; t++) {
					addTimeout(() => {
						const randomChar =
							RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)]
						setDisplayChars(prev => {
							const next = [...prev]
							next[i] = randomChar
							return next
						})
					}, t * RANDOMIZE_TICK)
				}
			}, letterDelay)

			addTimeout(() => {
				setDisplayChars(prev => {
					const next = [...prev]
					next[i] = finalChar
					return next
				})
				setLetters(prev => {
					const next = [...prev]
					next[i] = 'flickering'
					return next
				})
			}, letterDelay + RANDOMIZE_DURATION)

			addTimeout(
				() => {
					setLetters(prev => {
						const next = [...prev]
						next[i] = 'lit'
						return next
					})
				},
				letterDelay + RANDOMIZE_DURATION + FLICKER_DURATION,
			)
		})

		const totalDelay =
			START_DELAY +
			(TITLE.length - 1) * LETTER_INTERVAL +
			RANDOMIZE_DURATION +
			FLICKER_DURATION +
			HOLD_AFTER_LIT

		addTimeout(() => {
			setPhase('exiting')
			addTimeout(() => onCompleteRef.current(), 900)
		}, totalDelay)

		return () => {
			timeoutsRef.current.forEach(id => clearTimeout(id))
			timeoutsRef.current = []
			if (audioRef.current) {
				audioRef.current.pause()
				audioRef.current.currentTime = 0
			}
		}
	}, [started])

	const handleStart = () => {
		setStarted(true)
		setPhase('animating')
	}

	return (
		<div
			className={`fixed inset-0 z-50 flex flex-col items-center justify-center
        transition-opacity duration-[900ms]
        ${phase === 'exiting' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
			style={{
				backgroundImage: `url(${backgroundImg})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			{/* Vignette */}
			<div
				className='absolute inset-0 pointer-events-none'
				style={{
					background:
						'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 28%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.96) 100%)',
				}}
			/>

			{/* Neon glow behind title */}
			<div
				className='absolute pointer-events-none'
				style={{
					width: '70vw',
					height: '40vh',
					background:
						'radial-gradient(ellipse at 50% 50%, var(--neon-glow-2) 0%, transparent 70%)',
				}}
			/>

			{/* Scanline */}
			<div
				className='absolute inset-0 pointer-events-none overflow-hidden'
				style={{ opacity: 0.04 }}
			>
				<div
					className='w-full animate-scanline'
					style={{
						height: '2px',
						background: 'var(--neon-accent)',
						boxShadow: '0 0 8px var(--neon-accent)',
					}}
				/>
			</div>

			{/* Title */}
			<div
				className={`relative z-10 flex items-center justify-center gap-2 md:gap-4 select-none
          ${allLit && phase === 'animating' ? 'intro-title-glitch' : ''}`}
			>
				{TITLE.split('').map((_, i) => (
					<span
						key={i}
						className={`font-oswald font-bold leading-none transition-none
              text-[clamp(2.8rem,13vw,10rem)]
              ${letters[i] === 'unlit' ? 'letter-unlit' : ''}
              ${letters[i] === 'randomizing' ? 'letter-randomizing' : ''}
              ${letters[i] === 'flickering' ? 'letter-flickering' : ''}
              ${letters[i] === 'lit' ? 'letter-lit' : ''}
            `}
					>
						{displayChars[i]}
					</span>
				))}
			</div>

			{/* Bottom: button + subtitle */}
			<div className='absolute bottom-12 left-0 right-0 z-10 flex flex-col items-center gap-5'>
				<button
					onClick={handleStart}
					className={`btn-neon text-base md:text-lg px-10 py-4 tracking-widest transition-all duration-500
            ${started ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'}`}
					style={{
						boxShadow: started
							? 'none'
							: '0 0 32px rgba(125,255,244,0.3), 0 0 64px rgba(125,255,244,0.12)',
					}}
				>
					Gashtaklashamiz
				</button>

				<p
					className={`font-barlow text-sm md:text-base uppercase tracking-[0.35em] text-center
            transition-opacity duration-500
            ${started ? 'opacity-0' : 'opacity-60'}`}
					style={{ color: 'var(--text)' }}
				>
					O'zbek yulduzlarini dunyoga tanitamiz
				</p>
			</div>
		</div>
	)
}
