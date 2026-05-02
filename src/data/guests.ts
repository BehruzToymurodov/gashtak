export interface Guest {
	id: string
	name: string
	role?: string
	bio?: string
	avatar?: string
	socials?: { type: string; url: string }[]
	appearedIn?: string[] // youtubeIds
}

export const GUESTS: Guest[] = [
	{
		id: 'guest-1',
		name: 'Farruh Asqarov',
		role: 'Singer',
		bio: 'Oʻzbekistonlik mashhur qoʻshiqchi va kompozitor. Musiqiy ijodi bilan mamlakatni zabt etdi.',
		avatar: '/src/assets/images/guest1.jpg',
		socials: [{ type: 'Instagram', url: 'https://instagram.com/farruh' }],
		appearedIn: ['QORbytC_h94'],
	},
	{
		id: 'guest-2',
		name: 'Nilufar Zokirova',
		role: 'Actor',
		bio: 'Teatr va kinoda taniqli aktrisa, soʻnggi intervyularida ijodiy jarayon haqida gapiradi.',
		avatar: '/src/assets/images/guest2.jpg',
		socials: [{ type: 'Instagram', url: 'https://instagram.com/nilufar' }],
		appearedIn: ['Ww1RrOeTq78', '6cp7l0FEYlY'],
	},
	{
		id: 'guest-3',
		name: 'Bekhzod Rahmon',
		role: 'Influencer',
		bio: 'Kontent yaratuvchi, audio va video podkastlarda ommabop mehmon.',
		avatar: '/src/assets/images/guest3.jpg',
		socials: [{ type: 'Telegram', url: 'https://t.me/bekhzod' }],
		appearedIn: ['JqwL7ism1CU'],
	},
]

export default GUESTS
