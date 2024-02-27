import {db} from '.'
import {waitlist} from './schema'

console.info('🌱 Seeding database with initial data')

const insertedWaitlist = await db
  .insert(waitlist)
  .values([
    {
      slug: 'athletes',
      title:
        '<span class="font-semibold">Revolutionize Your Recovery </span>           <span class="font-serif">— Join the Elite</span>.',
      description:
        'Empower your CrossFit journey with our AI-driven recovery app,           tailored for athletes like you. Secure your spot and be the first to           experience unparalleled recovery speed.',
    },
  ])
  .returning({
    slug: waitlist.slug,
  })

insertedWaitlist.forEach(({slug}) =>
  console.log(`📋 Inserted waitlist with slug: /${slug}`),
)

console.info('🌱 Seeding complete')
