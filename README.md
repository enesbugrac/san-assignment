# Posts Management Application

A modern, responsive Single Page Application for managing posts and comments. This application provides a clean architecture with route-based permissions, internationalization support, and a user-friendly interface for post management.

## Features

- **Authentication & Authorization**

  - Permission-based access control
  - Protected routes
  - Customizable user roles

- **Post Management**

  - View all posts
  - Create new posts
  - Edit existing posts
  - Delete posts
  - View post comments

- **User Interface**

  - Modern, responsive design
  - Toast notifications for actions
  - Loading states and error handling
  - Confirmation dialogs for destructive actions

- **Architecture**
  - Centralized route configuration
  - Navigation helpers
  - Type-safe API integration
  - Environment variable configuration

## Technologies Used

- **Core**

  - React 18
  - TypeScript
  - Vite

- **Routing & State Management**

  - React Router v6
  - TanStack React Query v5

- **Styling**

  - Tailwind CSS

- **API**

  - JSONPlaceholder API integration
  - Custom API client with error handling

- **Development Tools**
  - ESLint
  - TypeScript strict mode

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd san-assignment
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following:

   ```
   VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

## Project Structure

```
src/
├── api/              # API client and service functions
├── assets/           # Static assets
├── components/       # Reusable UI components
│   ├── forms/        # Form-related components
│   ├── layout/       # Layout components
│   ├── ui/           # UI elements
│   └── utils/        # Utility components
├── contexts/         # React contexts
├── hooks/            # Custom React hooks
├── i18n/             # Internationalization setup
├── pages/            # Page components
├── types/            # TypeScript type definitions
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
├── navigation.ts     # Navigation helper
└── routes-config.tsx # Centralized route configuration
```

## Authentication

The application uses a simulated authentication system with predefined user permissions:

- VIEW_POSTS
- VIEW_COMMENTS
- EDIT_POST
- CREATE_POST

Users without the required permissions will be redirected to a 403 error page.

## Navigation

The application provides a convenient navigation helper that is auto-generated from the route configuration:

```typescript
// Example usage
import nav from "./navigation";

// Navigate to a post
nav.post.view.get({ id: 1 });

// Navigate with parameters
nav.post.edit.get({ id: 2 });
```

## Component Usage

```

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the production version
- `pnpm lint` - Run ESLint
- `pnpm preview` - Preview the production build locally

## API Configuration

The application uses the JSONPlaceholder API for demonstration purposes. The API base URL is configurable via environment variables.

## License

This project is licensed under the MIT License.
```
