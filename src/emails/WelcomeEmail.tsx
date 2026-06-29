// src/emails/WelcomeEmail.tsx
import { Html, Body, Container, Heading, Text, Button } from '@react-email/components';
import * as React from 'react';

export default function WelcomeEmail({ userName }: { userName: string }) {
  return (
    <Html>
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f6f9fc', padding: '20px' }}>
        <Container style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
          <Heading style={{ color: '#333' }}>Bienvenue {userName} !</Heading>
          <Text style={{ fontSize: '16px', color: '#555' }}>
            Nous sommes ravis de t'avoir parmi nous. Ton compte est maintenant actif.
          </Text>
          <Button 
            href="https://ton-app.com" 
            style={{ backgroundColor: '#0070f3', color: '#fff', padding: '12px 20px', borderRadius: '5px' }}
          >
            Accéder à mon espace
          </Button>
        </Container>
      </Body>
    </Html>
  );
}