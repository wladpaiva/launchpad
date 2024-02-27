import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from 'jsx-email'

import {Tailwind} from '../components/tailwind'

const baseUrl =
  process.env.NEXT_PUBLIC_URL ||
  process.env.VERCEL_URL ||
  'http://localhost:3000'

export type MagicLinkEmailProps = {
  link: string
  config?: {
    BUSINESS_FANTASY_NAME?: string
    BUSINESS_NAME?: string
    BUSINESS_ADDRESS?: string
  }
}

export const Template = ({link, config = {}}: MagicLinkEmailProps) => {
  const {
    BUSINESS_FANTASY_NAME = process.env.BUSINESS_FANTASY_NAME,
    BUSINESS_NAME = process.env.BUSINESS_NAME,
    BUSINESS_ADDRESS = process.env.BUSINESS_ADDRESS,
  } = config

  return (
    <Tailwind>
      <Html className="dark">
        <Head />
        <Preview>Log in with this magic link.</Preview>
        <Body className="dark:bg-background dark:text-foreground font-sans my-auto mx-auto">
          <Container className="mx-auto my-8 border border-solid dark:bg-card rounded p-8 bg-no-repeat bg-bottom">
            <Img
              src={`${baseUrl}/static/logo.svg`}
              width={48}
              height={48}
              alt={BUSINESS_FANTASY_NAME}
            />
            <Heading className="text-2xl font-bold mt-12">
              Your magic link
            </Heading>
            <Section className="my-6">
              <Text className="text-base!">
                <Link className="dark:text-primary! underline!" href={link}>
                  👉 Click here to sign in 👈
                </Link>
              </Text>
              <Text className="text-base!">
                If you didn't request this, please ignore this email.
              </Text>
            </Section>
            <Text className="text-base!">
              Best,
              <br />- {BUSINESS_FANTASY_NAME} Team
            </Text>
            <Hr className="mt-12" />
            <Img
              src={`${baseUrl}/static/logo.svg`}
              width={32}
              height={32}
              className="filter grayscale-100 my-5"
            />
            <Text className="text-sm dark:text-muted-foreground">
              {BUSINESS_NAME}
            </Text>
            <Text className="text-sm dark:text-muted-foreground">
              {BUSINESS_ADDRESS}
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}
Template.PreviewProps = {
  link: 'http://localhost:55420/',
  config: {
    BUSINESS_FANTASY_NAME: 'Logo',
    BUSINESS_NAME: 'My Logo Co.',
    BUSINESS_ADDRESS: '123 Main St, Anytown, USA',
  },
} as MagicLinkEmailProps
