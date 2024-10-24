import { NextResponse } from 'next/server';

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Fintraq',
    version: '1.0.0',
    description: 'API documentation for Fintraq API endpoints',
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
        summary: 'Sign up a new user',
        tags: ['Auth'],
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
                  },
                  lastName: {
                    type: 'string',
                  },
                  email: {
                    type: 'string',
                  },
                  password: {
                    type: 'string',
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
            description: 'Bad request',
          },
        },
      },
    },
    '/api/v1/auth/signin': {
      post: {
        summary: 'Sign in a user',
        tags: ['Auth'],
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
                  },
                  password: {
                    type: 'string',
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
          '401': {
            description: 'Unauthorized',
          },
        },
      },
    },
    'api/v1/auth/signout': {
      post: {
        summary: 'Sign out a user by deleting session cookie',
        tags: ['Auth'],
        requestBody: {
          required: false,
        },
        responses: {
          '200': {
            description: 'User signed out successfully',
          },
          '401': {
            description: 'Something went wrong',
          },
        },
      },
    },
  },
};

export async function GET() {
  return NextResponse.json(swaggerSpec);
}