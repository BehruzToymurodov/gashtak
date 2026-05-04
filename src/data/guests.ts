import anvarImg from '../assets/images/guests/anvar_narzullayev.webp'
import azimjonImg from '../assets/images/guests/azimjon_pulatov.webp'
import hasanxonImg from '../assets/images/guests/hasanxon_domla.webp'
import jamshidxonImg from '../assets/images/guests/jamshidxon_ziyoxonov.webp'

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
		id: 'anvar-narzullayev',
		name: 'Anvar Narzullayev',
		role: 'Komediant',
		bio: "O'zbekistonning eng sevimli komediantlaridan biri. Sahna va ekranda o'z uslubi bilan millionlab tomoshabinni kuldirib kelmoqda.",
		avatar: anvarImg,
		socials: [],
		appearedIn: [],
	},
	{
		id: 'azimjon-pulatov',
		name: 'Azimjon Pulatov',
		role: 'Blogger',
		bio: "Kontent yaratuvchi va ijtimoiy tarmoqlarda katta auditoriyaga ega blogger. Yoshlar orasida ommabop shaxsiyat.",
		avatar: azimjonImg,
		socials: [],
		appearedIn: [],
	},
	{
		id: 'hasanxon-domla',
		name: 'Hasanxon Domla',
		role: 'Olim',
		bio: "O'zbekistonning taniqli diniy olimi va ma'ruzachi. Millionlab tinglovchiga ilm va hayot haqida dars beradi.",
		avatar: hasanxonImg,
		socials: [],
		appearedIn: [],
	},
	{
		id: 'jamshidxon-ziyoxonov',
		name: 'Jamshidxon Ziyoxonov',
		role: 'Aktyor',
		bio: "Teatr va kinodagi yorqin rollari bilan tanilgan o'zbek aktyori. Har bir obrazga o'zgacha ruh bag'ishlaydi.",
		avatar: jamshidxonImg,
		socials: [],
		appearedIn: [],
	},
]

export default GUESTS
