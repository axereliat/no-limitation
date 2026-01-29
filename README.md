# NL Fight Club - No Limitation

> "Using no way as a way, having No Limitation as limitation." - Bruce Lee

Official website for NL Fight Club, a martial arts gym located in Pleven, Bulgaria. Founded in 2010 by Genko Simeonov and Pantaley Gergov, senior instructors in Jeet Kune Do.

## About the Club

NL Fight Club is inspired by Bruce Lee's philosophy of martial arts without boundaries. We believe everyone can reach their potential through hard work and proper guidance, without limitations - both physical and mental.

## Martial Arts Disciplines

- **Jeet Kune Do** - Bruce Lee's "Way of the Intercepting Fist"
- **MMA** - Mixed Martial Arts
- **Brazilian Jiu-Jitsu** - Ground fighting and submission techniques (in partnership with Twisted Jiu Jitsu)
- **San Da** - Chinese kickboxing
- **Eskrima** - Filipino weapons-based martial art

## Website Features

- Training schedule for adults and kids
- Information about each martial art discipline
- Club history and instructor profiles
- Contact form for trial class bookings
- User authentication (register, login, profile)
- Admin panel for managing classes, submissions, and instructors
- File upload for profile pictures and instructor photos
- Multilingual support (Bulgarian, English, Russian, Italian)

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 7, Tailwind CSS v4
- **Routing**: React Router v7
- **Backend**: Supabase (Database, Auth, Storage)
- **UI Components**: shadcn/ui
- **Internationalization**: i18next

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Supabase account

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd no-limitation

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
```

### Environment Variables

Create a `.env.local` file with:

```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the migration scripts in `supabase/migrations/` in order:
   - `001_create_profiles.sql`
   - `002_create_classes.sql`
   - `003_create_contact_submissions.sql`
   - `004_create_instructors.sql`
   - `005_create_storage_buckets.sql`

### Development

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run linting
npm run preview  # Preview production build
```

## Database Schema

### Tables

| Table | Description |
|-------|-------------|
| `profiles` | User profiles with roles (user/admin) |
| `classes` | Training schedule data |
| `contact_submissions` | Contact form submissions |
| `instructors` | Instructor profiles |

### Storage Buckets

- `avatars` - User profile pictures
- `instructors` - Instructor photos

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, Layout
│   ├── sections/        # Reusable sections
│   └── ui/              # shadcn/ui components
├── contexts/
│   └── AuthContext.tsx  # Authentication context
├── lib/
│   ├── supabase.ts      # Supabase client
│   └── utils.ts         # Utility functions
├── locales/             # Translation files (bg, en, ru, it)
├── pages/
│   ├── admin/           # Admin panel pages
│   └── martial-arts/    # Martial art discipline pages
└── App.tsx              # Routes definition
```

## Demo Credentials

After seeding the database, you can use:

- **User**: `demo@nlfightclub.com` / `demo123`
- **Admin**: `admin@nlfightclub.com` / `admin123`

## Deployment

1. Build the project: `npm run build`
2. Deploy `dist/` folder to Vercel, Netlify, or similar platform
3. Set environment variables in the hosting platform

## License

All rights reserved - NL Fight Club
