import { redirect } from 'next/navigation'

export default function Home() {
  // Qui in futuro metteremo il controllo se l'utente è loggato o no.
  // Per ora, se apre la radice, lo mandiamo direttamente al login.
  redirect('/login')
}