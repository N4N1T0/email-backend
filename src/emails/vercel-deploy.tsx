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

interface DeploymentEmailProps {
  clientName?: string
  previewUrl?: string
  features?: string[]
}

export default function DeploymentEmail({
  clientName = 'Cliente Valorado',
  previewUrl = 'https://example.com',
  features = []
}: DeploymentEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>¡Nuevo Despliegue Exitoso!</Preview>
      <TailwindWrapper>
        <Body className='bg-gray-100 font-sans'>
          <Container className='mx-auto my-8 max-w-2xl rounded-lg bg-white p-5 shadow-lg'>
            <Section className='rounded-t-lg bg-blue-600 py-4'>
              <Heading
                as='h1'
                className='m-0 text-center text-2xl font-bold text-white'
              >
                ¡Nuevo Despliegue Exitoso!
              </Heading>
            </Section>
            <Section className='px-8 py-6'>
              <Text className='text-base leading-6 text-gray-700'>
                Estimado {clientName},
              </Text>
              <Text className='text-base leading-6 text-gray-700'>
                Nos complace informarle que una nueva versión de su proyecto ha
                sido desplegada con éxito en Vercel.
              </Text>
              <Text className='text-base leading-6 text-gray-700'>
                Puede previsualizar los últimos cambios aquí:
              </Text>
              <Button
                className='inline-block w-full rounded-md bg-blue-600 py-3 text-center font-bold text-white no-underline'
                href={previewUrl}
              >
                Ver Previsualización
              </Button>
              <Heading
                as='h2'
                className='mb-4 mt-8 text-xl font-bold text-gray-800'
              >
                Nuevas Características:
              </Heading>
              {features.length > 0 ? (
                features.map((feature, index) => (
                  <Text
                    key={index}
                    className='mb-2 text-base leading-6 text-gray-700'
                  >
                    <strong>{feature}</strong>
                  </Text>
                ))
              ) : (
                <Text className='text-base leading-6 text-gray-700'>
                  No hay nuevas características en este despliegue.
                </Text>
              )}
              <Text className='mt-6 text-base leading-6 text-gray-700'>
                Si tiene alguna pregunta o necesita más ayuda, por favor no dude
                en contactarnos.
              </Text>
              <Text className='text-base leading-6 text-gray-700'>
                Saludos cordiales,
                <br />
                Adrian &quot;Nano&quot; Alvarez
              </Text>
            </Section>
            <Hr className='my-6 border-gray-300' />
            <Section className='text-center'>
              <Text className='text-sm text-gray-500'>
                © 2024 adrian-alvarez.dev. Todos los derechos reservados.
              </Text>
            </Section>
          </Container>
        </Body>
      </TailwindWrapper>
    </Html>
  )
}
