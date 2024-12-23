import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
  name?: string;
}

export const WelcomeEmail = ({ name }: EmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Fintraq - Your Personal Finance Tracker</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to Fintraq, {name || "<name>"}!</Heading>
        <Text style={text}>
          We're excited to have you on board. Fintraq is here to help you take
          control of your finances and achieve your financial goals.
        </Text>
        <Section style={buttonContainer}>
          <Button
            // pX={20}

            // pY={12}
            style={button}
            href="https://fintraq.app/dashboard"
          >
            Get Started
          </Button>
        </Section>
        <Text style={text}>Here's what you can do with Fintraq:</Text>
        <ul style={list}>
          <li style={listItem}>Track expenses across multiple accounts</li>
          <li style={listItem}>Categorize your spending</li>
          <li style={listItem}>View insightful charts and reports</li>
          <li style={listItem}>Set and monitor financial goals</li>
        </ul>
        <Hr style={hr} />
        <Text style={footer}>
          If you have any questions, feel free to{" "}
          <Link href="mailto:support@fintraq.app" style={link}>
            contact our support team
          </Link>
          .
        </Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

// Styles inspired by shadcn/ui
const main = {
  backgroundColor: "#f6f6f6",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "700",
  lineHeight: "32px",
  margin: "0 0 24px",
};

const text = {
  color: "#444",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
};

const buttonContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#000",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 20px",
};

const list = {
  margin: "0 0 16px",
  padding: "0 0 0 24px",
};

const listItem = {
  color: "#444",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 8px",
};

const hr = {
  borderColor: "#e6e6e6",
  margin: "20px 0",
};

const footer = {
  color: "#888",
  fontSize: "12px",
  lineHeight: "20px",
};

const link = {
  color: "#000",
  textDecoration: "underline",
};
