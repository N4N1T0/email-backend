import React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text
} from '@react-email/components'
import { TailwindWrapper } from './tailwind-wrapper'

interface Feature {
  title: string
  description: string
}

interface DeploymentEmailProps {
  clientName?: string
  previewUrl?: string
  features?: Feature[]
}

export default function DeploymentEmail(
  {
    clientName = 'Valued Client',
    previewUrl = 'https://example.com',
    features = []
  }: DeploymentEmailProps
) {
  return (
    <Html>
      <Head />
      <Preview>New Deployment Successful!</Preview>
      <TailwindWrapper>
        <Body className='bg-gray-100 font-sans'>
          <Container className='mx-auto my-8 max-w-2xl rounded-lg bg-white p-5 shadow-lg'>
            <Section className='rounded-t-lg bg-blue-600 py-4'>
              <Heading
                as='h1'
                className='m-0 text-center text-2xl font-bold text-white'
              >
                New Deployment Successful!
              </Heading>
            </Section>
            <Section className='px-8 py-6'>
              <Text className='text-base leading-6 text-gray-700'>
                Dear {clientName},
              </Text>
              <Text className='text-base leading-6 text-gray-700'>
                We&apos;re excited to inform you that a new version of your
                project has been successfully deployed to Vercel.
              </Text>
              <Text className='text-base leading-6 text-gray-700'>
                You can preview the latest changes here:
              </Text>
              <Button
                className='inline-block w-full rounded-md bg-blue-600 text-center font-bold text-white no-underline'
                href={previewUrl}
              >
                View Preview
              </Button>
              <Heading
                as='h2'
                className='mb-4 mt-8 text-xl font-bold text-gray-800'
              >
                New Features:
              </Heading>
              {features.length > 0 ? (
                features.map((feature, index) => (
                  <Text
                    key={index}
                    className='mb-2 text-base leading-6 text-gray-700'
                  >
                    <strong>{feature.title}:</strong> {feature.description}
                  </Text>
                ))
              ) : (
                <Text className='text-base leading-6 text-gray-700'>
                  No new features in this deployment.
                </Text>
              )}
              <Text className='mt-6 text-base leading-6 text-gray-700'>
                If you have any questions or need further assistance, please
                don&apos;t hesitate to contact us.
              </Text>
              <Text className='text-base leading-6 text-gray-700'>
                Best regards,
                <br />
                Your Development Team
              </Text>
            </Section>
            <Hr className='my-6 border-gray-300' />
            <Section className='text-center'>
              <Text className='text-sm text-gray-500'>
                © 2023 Your Company Name. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </TailwindWrapper>
    </Html>
  )
}
