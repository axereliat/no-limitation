# Agent Instructions - NL Fight Club

This document provides architectural guidelines and project-wide instructions for AI development agents.

## Project Overview

**NL Fight Club** - A martial arts gym website built with modern React stack.

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI Framework |
| TypeScript | 5.x | Type Safety |
| Vite | 7 | Build Tool & Dev Server |
| Tailwind CSS | 4 | Styling |
| React Router | 7 | Client-side Routing |
| Supabase | - | Backend (Auth, Database, Storage) |
| i18next | - | Internationalization (BG, EN, RU, IT) |
| shadcn/ui | - | UI Component Library |
| react-hot-toast | - | Toast Notifications |

## Commands

```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # TypeScript compilation + Vite build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Directory Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components (Button, Input, Card, etc.)
│   ├── layout/       # Layout components (Header, Footer, Layout)
│   └── sections/     # Reusable page sections (MartialArtPage, etc.)
├── pages/
│   ├── admin/        # Admin panel pages (Dashboard, Classes, Instructors, MartialArts)
│   └── *.tsx         # Public pages (Home, About, Schedule, Contact, Login, etc.)
├── contexts/         # React Context providers (AuthContext)
├── lib/              # Utilities (supabase.ts, utils.ts)
├── locales/          # Translation files
│   ├── bg/           # Bulgarian (default)
│   ├── en/           # English
│   ├── ru/           # Russian
│   └── it/           # Italian
└── i18n.ts           # i18next configuration
```

## Routing Architecture

Routes are defined in `App.tsx` with nested layout:

| Route | Component | Access |
|-------|-----------|--------|
| `/` | Home | Public |
| `/about` | About | Public |
| `/schedule` | Schedule | Public |
| `/contact` | Contact | Public |
| `/martial-arts/:id` | MartialArtPage | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/profile` | Profile | Protected |
| `/admin` | Dashboard | Admin Only |
| `/admin/classes` | AdminClasses | Admin Only |
| `/admin/instructors` | AdminInstructors | Admin Only |
| `/admin/martial-arts` | AdminMartialArts | Admin Only |

## Coding Standards

### Import Conventions

Always use the `@/` path alias for src imports:

```typescript
// Correct
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

// Incorrect
import { Button } from '../../components/ui/button';
```

### Component Structure Pattern

Follow this pattern for page/admin components:

```typescript
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

interface MyEntity {
    id: number;
    name: string;
    // ... other fields
}

export default function MyPage() {
    const { t } = useTranslation();
    const [items, setItems] = useState<MyEntity[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('my_table')
                .select('*')
                .order('name');

            if (!error) setItems(data || []);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
        );
    }

    return (
        <div className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Content */}
            </div>
        </div>
    );
}
```

### Form State with Validation

```typescript
const [formData, setFormData] = useState({
    title: '',
    description: '',
});

const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
}>({});

const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.title.trim()) {
        newErrors.title = t('validation.titleRequired');
    }
    if (!formData.description.trim()) {
        newErrors.description = t('validation.descriptionRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Submit logic...
    toast.success(t('common.savedChanges'));
};
```

### Delete Confirmation Pattern

```typescript
const [showConfirm, setShowConfirm] = useState(false);
const [itemToDelete, setItemToDelete] = useState<number | null>(null);

const handleDeleteClick = (id: number) => {
    setItemToDelete(id);
    setShowConfirm(true);
};

const handleConfirmDelete = async () => {
    if (itemToDelete) {
        const { error } = await supabase
            .from('table')
            .delete()
            .eq('id', itemToDelete);

        if (!error) {
            setItems(prev => prev.filter(i => i.id !== itemToDelete));
        }
    }
    setShowConfirm(false);
    setItemToDelete(null);
    toast.success(t('common.savedChanges'));
};

const handleCancelDelete = () => {
    setShowConfirm(false);
    setItemToDelete(null);
};

// In JSX:
<ConfirmModal
    show={showConfirm}
    title={t('common.delete')}
    message={t('admin.confirmDelete')}
    confirmText={t('common.delete')}
    cancelText={t('common.cancel')}
    confirmVariant="danger"
    onConfirm={handleConfirmDelete}
    onCancel={handleCancelDelete}
/>
```

## Internationalization (i18n)

### Usage

```typescript
const { t } = useTranslation();

// Simple key
<h1>{t('admin.dashboard')}</h1>

// With interpolation
<p>{t('martialArts.readyToStart', { name: artName })}</p>
```

### Adding Translations

When adding new UI text, add keys to ALL 4 translation files:
- `src/locales/bg/translation.json` (Bulgarian - default)
- `src/locales/en/translation.json` (English)
- `src/locales/ru/translation.json` (Russian)
- `src/locales/it/translation.json` (Italian)

### Translation File Structure

```json
{
  "nav": { },
  "hero": { },
  "home": { },
  "about": { },
  "schedule": { },
  "contact": { },
  "auth": { },
  "admin": { },
  "common": { },
  "martialArts": { },
  "validation": { },
  "footer": { }
}
```

## Styling Guidelines

### Theme Colors (Dark Theme)

| CSS Variable | Hex | Tailwind Class | Usage |
|--------------|-----|----------------|-------|
| `background` | #1a1a1a | `bg-[#1a1a1a]` | Page background |
| `secondary` | #2d2d2d | `bg-secondary` | Cards, elevated surfaces |
| `accent` | #d4af37 | `text-accent`, `bg-accent` | Gold - buttons, links |
| `foreground` | #ffffff | `text-white` | Primary text |
| `muted` | #b3b3b3 | `text-text-muted` | Secondary text |

### Common Styling Patterns

```typescript
// Form inputs
className="bg-[#1a1a1a] border-gray-700 text-white"

// Input with validation error
className={`mt-1 bg-[#1a1a1a] text-white ${
    errors.field ? 'border-red-500 border-2' : 'border-gray-700'
}`}

// Error message
{errors.field && (
    <p className="text-red-500 text-sm mt-1">{errors.field}</p>
)}

// Primary button
<Button variant="default">Primary Action</Button>

// Secondary/outline button
<Button variant="outline" className="border-gray-600 text-white">
    Secondary
</Button>

// Delete button
<button className="border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors">
    {t('common.delete')}
</button>

// Card/container
<div className="bg-secondary rounded-lg p-6">
```

### shadcn/ui Components

Add new components: `npx shadcn@latest add <component>`

Installed: Button, Card, Dialog, Sheet, Input, Textarea, Label, NavigationMenu

## Database Schema (Supabase)

### Core Tables

| Table | Purpose |
|-------|---------|
| `profiles` | User profiles (references auth.users) |
| `martial_arts` | Martial art disciplines |
| `advantages` | Benefits/advantages |
| `training_process` | Training process steps |
| `martial_arts_advantages` | Junction table (M:N) |
| `martial_arts_training_process` | Junction table (M:N) |
| `instructors` | Instructor profiles |
| `classes` | Training schedule |
| `contact_submissions` | Contact form submissions |

### Query Patterns

```typescript
// Simple fetch with ordering
const { data, error } = await supabase
    .from('martial_arts')
    .select('*')
    .order('title');

// Fetch single item by ID
const { data, error } = await supabase
    .from('martial_arts')
    .select('*')
    .eq('id', id)
    .single();

// Many-to-many join
const { data } = await supabase
    .from('martial_arts')
    .select(`
        *,
        martial_arts_advantages(
            position,
            advantages(id, title)
        ),
        martial_arts_training_process(
            position,
            training_process(id, title)
        )
    `)
    .eq('id', id)
    .single();

// Insert
const { data, error } = await supabase
    .from('martial_arts')
    .insert([payload])
    .select()
    .single();

// Update
const { error } = await supabase
    .from('martial_arts')
    .update(payload)
    .eq('id', id);

// Delete
const { error } = await supabase
    .from('martial_arts')
    .delete()
    .eq('id', id);
```

### Storage Buckets

- `instructors` - Instructor photos
- `martial-arts` - Martial art images

## Event Communication

Use custom events for cross-component data refresh:

```typescript
// Dispatch after data changes
window.dispatchEvent(new CustomEvent('refreshData'));

// Listen in another component (e.g., Header)
useEffect(() => {
    const handler = () => fetchData();
    window.addEventListener('refreshData', handler);
    return () => window.removeEventListener('refreshData', handler);
}, []);
```

## Authentication & Authorization

### Route Protection

```typescript
// Protected route (requires login)
<Route path="profile" element={
    <ProtectedRoute><Profile /></ProtectedRoute>
} />

// Admin-only route
<Route path="admin" element={
    <AdminRoute><Dashboard /></AdminRoute>
} />
```

### Using Auth Context

```typescript
import { useAuth } from '@/contexts/AuthContext';

const { user, loading, signIn, signOut } = useAuth();

// Check if user is admin
const isAdmin = user?.role === 'admin';
```

## Toast Notifications

```typescript
import toast from 'react-hot-toast';

// Success
toast.success(t('common.savedChanges'));

// Error
toast.error(t('common.error'));
```

## Security Guidelines

1. Never expose Supabase service role key in frontend
2. Use RLS (Row Level Security) policies for all tables
3. Validate user permissions on both client and server
4. Sanitize user inputs before database operations
5. Use `ProtectedRoute` and `AdminRoute` for access control

## Best Practices Checklist

- [ ] Use translations for ALL user-facing text
- [ ] Define TypeScript interfaces for all data structures
- [ ] Show loading spinners during async operations
- [ ] Use ConfirmModal for destructive actions
- [ ] Show toast notifications for user feedback
- [ ] Clear form state and errors after submission
- [ ] Use responsive Tailwind classes (sm:, md:, lg:)
- [ ] Add validation with visual error feedback
- [ ] Handle errors gracefully with try/catch