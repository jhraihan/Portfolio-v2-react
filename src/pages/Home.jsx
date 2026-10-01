import { Hero } from '@/sections/Hero'
import { FeaturedProjects } from '@/sections/FeaturedProjects'
import { Approach } from '@/sections/Approach'
import { Skills } from '@/sections/Skills'
import { AboutPreview } from '@/sections/AboutPreview'
import { ContactCTA } from '@/sections/ContactCTA'
import { profile } from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function Home() {
  useDocumentTitle(null, profile.metaDescription)

  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Approach />
      <Skills />
      <AboutPreview />
      <ContactCTA />
    </>
  )
}
