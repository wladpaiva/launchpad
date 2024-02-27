import {Body, Head, Html, Link, Text} from 'jsx-email'

import {Tailwind} from '../components/tailwind'

export type ConfirmInterestEmailProps = {
  link: string
  business: string
}

export const TemplateName = 'Confirm interest'

export const Template = ({link, business}: ConfirmInterestEmailProps) => {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Body>
          <Text className="text-base!">Welcome, my friend!</Text>
          <Text className="text-base!">
            I want to personally thank you for your confidence in joining this
            waitlist.
          </Text>
          <Text className="text-base!">
            I'm working hard to get everything ready for you. I want to make
            sure that you have a great experience from the start.
          </Text>
          <Text className="text-base!">
            I'll be in touch soon with more details. For now, I want to ask 2
            things from you.
          </Text>
          <Text className="text-base!">
            1 - Can you click this "confirm" link to let me know that you
            received this email?
          </Text>
          <Text className="text-base!">
            Why? I clean out this email list often. I need to make sure you
            aren't a spam bot that automatically filled out the form on the site
            (Why do people create those bots in the first place? Beats me).
          </Text>
          <Text className="text-base!">All you gotta do is click here:</Text>
          <Link className="dark:text-primary! underline!" href={link}>
            {link}
          </Link>
          <Text className="text-base!">That's it.</Text>
          <Text className="text-base!">
            2 - Drag this email to your inbox if it ended up on the
            Spam/Promotions tab.
          </Text>
          <Text className="text-base!">
            Why? To help me out, and so you receive what you subscribed to.
          </Text>
          <Text className="text-base!">
            If you have any further questions, just let me know.
          </Text>
          <Text className="text-base!">I'm glad to have you here.</Text>
          <Text className="text-base!">— Wlad Paiva</Text>
          <Text className="text-base!">Team {business}</Text>
        </Body>
      </Html>
    </Tailwind>
  )
}

Template.PreviewProps = {
  link: 'http://localhost:55420/',
  business: 'Indie',
} as ConfirmInterestEmailProps
