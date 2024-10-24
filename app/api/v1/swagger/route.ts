import { NextResponse } from 'next/server';

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Fintraq',
    version: '1.0.0',
    description: 'Documentation for Fintraq API endpoints',
  },
  servers: [
    {
      url: 'https://fintraq.vercel.app',
      description: 'Production server',
    },
  ],
  paths: {
    '/api/v1/auth/signup': {
      post: {
        summary: 'Register a new user',
        tags: ['Auth'],
        description: 'Creates a new user account with the provided details.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['firstName', 'lastName', 'email', 'password'],
                properties: {
                  firstName: {
                    type: 'string',
                    description: 'First name of the user',
                  },
                  lastName: {
                    type: 'string',
                    description: 'Last name of the user',
                  },
                  email: {
                    type: 'string',
                    description: 'Email address of the user',
                  },
                  password: {
                    type: 'string',
                    description: 'Password for the user account',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'User created successfully',
          },
          '400': {
            description: 'User with this email already exists or invalid input',
          },
          '500': {
            description: 'An error occurred during registration',
          },
        },
      },
    },
    '/api/v1/auth/signin': {
      post: {
        summary: 'Authenticate a user',
        tags: ['Auth'],
        description: 'Authenticates a user with the provided email and password.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: {
                    type: 'string',
                    description: 'Email address of the user',
                  },
                  password: {
                    type: 'string',
                    description: 'Password for the user account',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'User signed in successfully',
          },
          '400': {
            description: 'Invalid email or password',
          },
          '500': {
            description: 'An error occurred during sign in',
          },
        },
      },
    },
    '/api/v1/auth/signout': {
      post: {
        summary: 'Sign out a user',
        tags: ['Auth'],
        description: 'Signs out a user by deleting the session cookie.',
        requestBody: {
          required: false,
        },
        responses: {
          '200': {
            description: 'User signed out successfully',
          },
          '500': {
            description: 'An error occurred during sign out',
          },
        },
      },
    },
  },
};

export async function GET() {
  return NextResponse.json(swaggerSpec);
}