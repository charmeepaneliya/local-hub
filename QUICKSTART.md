# LocalHub - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- A modern web browser

### Installation

1. **Navigate to project directory**
```bash
cd local-connect-hub-main
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:8081
```

---

## 📖 Main Routes

| Route | Purpose | Status |
|-------|---------|--------|
| `/` | Home page with shops and search | ✅ Live |
| `/login` | User authentication | ✅ Live |
| `/signup` | Create new account | ✅ Live |
| `/explore` | Advanced discovery page | ✅ Live |
| `/bookings` | Manage appointments | ✅ Available |
| `/saved` | Favorite items | ✅ Available |
| `/messages` | Chat with businesses | ✅ Available |
| `/profile` | User account page | ✅ Live |
| `/business/:id` | Business details | ✅ Live |

---

## 🎯 How to Use the App

### 1. Discovering Businesses

**Home Page Method**:
1. Visit the home page (`/`)
2. Browse featured shops by category
3. Click "View Details" on any shop card

**Advanced Search Method**:
1. Use the search bar at top
2. Enter keywords
3. Use filters (Category, Rating, Distance)
4. Press "Search" button

**Explore Page Method**:
1. Go to Explore (`/explore`)
2. Use category filters
3. Browse trending section
4. View detailed photos

### 2. Viewing Business Details

1. Click on any shop card
2. Navigate through photo gallery
3. Read customer reviews
4. Check business hours and location
5. Click "Call Now" or "Send Message"
6. Add to favorites with heart icon

### 3. Managing Your Account

1. Click your avatar in header
2. Select "My Profile"
3. View your statistics (bookings, favorites, reviews)
4. Check recent bookings and status
5. View saved/favorite businesses
6. Update account settings

### 4. Making a Booking

1. Find desired service on home or explore page
2. Click "View Details"
3. Click "Call Now" or "Send Message"
4. Follow the booking flow
5. Confirm your appointment

### 5. Saving Favorites

1. Click heart icon on shop card
2. Or click heart on detail page
3. Access saved items from profile
4. Quick access to favorite shops

---

## 🎨 Key UI Elements

### Search Bar
- **Keyword Search**: Type shop or service name
- **Category Filter**: Select type of business
- **Rating Filter**: Filter by minimum rating
- **Distance Slider**: Set maximum distance
- **Open Now**: Only show open businesses

### Shop Card
- **Image**: Tap to view full details
- **Rating Badge**: Shows star rating and review count
- **Status Badge**: Shows if open or closed
- **Discount Badge**: Shows active promotions
- **Action Buttons**: Save favorite or share
- **Tags**: Quick info about shop
- **Hours**: Operating times

### Navigation Header
- **Logo**: Click to go home
- **Search**: Desktop search bar
- **Nav Links**: Home, Explore, Bookings, Messages, Saved
- **Notifications**: Bell icon with unread count
- **User Menu**: Avatar dropdown with options
- **Mobile Menu**: Hamburger for mobile devices

### Filters Menu
**Location**: Choose your area

**Category**:
- All
- Shops
- Restaurants
- Services
- Wholesalers

**Rating**:
- All
- 4.0+ stars
- 4.5+ stars
- 4.8+ stars

**Distance**: 1-50 km (adjustable slider)

**Status**:
- Open Now toggle

---

## 💡 Tips & Tricks

### For Faster Navigation
1. Save frequently visited shops
2. Use category filters to narrow results
3. Enable "Open Now" to avoid closed shops
4. Check favorite stars for best-rated options

### For Better Results
1. Set appropriate distance radius
2. Filter by minimum rating for quality
3. Read customer reviews before visiting
4. Check operating hours
5. Use specific keywords in search

### For Account Management
1. Keep profile information updated
2. Regularly check booking confirmations
3. Leave reviews after visiting
4. Save favorite shops for quick access
5. Enable notifications for updates

---

## 🔧 Customization

### Change App Colors
Edit `src/index.css`:
```css
:root {
  --primary: 168 65% 38%;      /* Change primary color */
  --accent: 15 85% 60%;         /* Change accent color */
  --success: 145 60% 42%;       /* Change success color */
}
```

### Add New Shops
Edit `src/pages/Index.tsx`:
```typescript
const shops: ShopData[] = [
  {
    id: newId,
    name: "Shop Name",
    category: "Category",
    rating: 4.5,
    // ... other properties
  }
];
```

### Create New Routes
Edit `src/App.tsx`:
```typescript
<Route path="/new-page" element={<NewPage />} />
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# If port 8080 is in use, Vite will use 8081
# Check the terminal for the correct URL
```

### Components Not Loading
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

### TypeScript Errors
```bash
# Rebuild the project
npm run build
```

### Styling Issues
```bash
# Tailwind CSS may need rebuild
# Try hard refreshing the browser (Ctrl+Shift+R)
```

---

## 📱 Mobile Testing

### Testing Responsive Design
1. Open DevTools (F12)
2. Click device toggle (Ctrl+Shift+M)
3. Select device preset
4. Test interactions

### Common Mobile Issues
- Ensure mobile menu works
- Check touch button sizes
- Verify image loading on mobile
- Test form inputs on phone

---

## 🔗 Important Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main app and routing |
| `src/pages/Index.tsx` | Home page |
| `src/components/layout/Header.tsx` | Navigation header |
| `src/components/search/AdvancedSearchBar.tsx` | Advanced search |
| `src/components/business/ShopCard.tsx` | Business card component |
| `src/pages/BusinessDetail.tsx` | Business detail page |
| `src/pages/UserProfile.tsx` | User profile page |
| `src/index.css` | Global styling |
| `tailwind.config.ts` | Tailwind configuration |

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Build
npm run build

# Deploy dist folder to Netlify
```

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Guide](https://www.typescriptlang.org)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Guide](https://vitejs.dev)

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request
5. Get review and merge

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review documentation files
3. Check the browser console for errors
4. Contact development team

---

## ✨ What's New

### v2.0 (Current)
- ✅ Enhanced UI/UX with animations
- ✅ Advanced search with filters
- ✅ Business detail page
- ✅ User profile page
- ✅ Improved navigation
- ✅ Better responsive design
- ✅ Modern styling system

### v1.0 (Previous)
- Basic shop browsing
- Category filtering
- Login/signup
- Booking page layout
- Message page layout

---

**Version**: 2.0
**Last Updated**: January 29, 2026
**Status**: ✅ Production Ready
