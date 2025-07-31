# Pokepost 🍃

A Pokémon-themed social media platform where trainers can share their adventures, stories, and connect with fellow Pokémon enthusiasts.

## Features

- **User Authentication**: Secure registration and login system with JWT tokens
- **Profile Management**: Customizable user profiles with image uploads
- **Post Creation**: Share your Pokémon adventures with titles and detailed stories
- **Social Interactions**: Like and unlike posts from other trainers
- **Real-time Feed**: Browse community posts on the dashboard
- **Post Management**: Edit your own posts after publishing
- **Responsive Design**: Beautiful, mobile-friendly interface with Tailwind CSS

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcrypt for password hashing
- **File Upload**: Multer for handling profile image uploads
- **Template Engine**: EJS for server-side rendering
- **Styling**: Tailwind CSS for responsive UI
- **Session Management**: Cookie-parser for handling authentication cookies

## Installation

1. **Clone the repository**
   ```bash
   git clone "https://github.com/ManabBiswas/basic_post_maker_backend"
   cd basic_post_maker_backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   - Make sure MongoDB is installed and running on your system
   - The app connects to `mongodb://127.0.0.1:27017/minibackendProject`
   - Or update the connection string in the model files if needed

4. **Create upload directory**
   ```bash
   mkdir -p public/images/uploads
   ```

5. **Start the application**
   ```bash
   node app.js
   ```

6. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
pokepost/
├── app.js                 # Main application file
├── package.json           # Project dependencies
├── config/
│   └── multerconfig.js    # File upload configuration
├── models/
│   ├── user.js           # User schema and model
│   └── post.js           # Post schema and model
├── views/
│   ├── index.ejs         # Registration page
│   ├── login.ejs         # Login page
│   ├── profile.ejs       # User profile page
│   ├── dashboard.ejs     # Community feed page
│   ├── edit.ejs          # Post editing page
│   └── updateProfile.ejs # Profile update page
└── public/
    └── images/
        └── uploads/      # Directory for uploaded profile images
```

## API Endpoints

### Authentication
- `GET /` - Registration page
- `POST /register` - User registration
- `GET /login` - Login page
- `POST /login` - User login
- `GET /logout` - User logout

### User Profile
- `GET /profile` - View user profile
- `GET /profile/update` - Profile update page
- `POST /update` - Update profile with image upload

### Posts
- `GET /dashboard` - Community feed
- `POST /post` - Create new post
- `GET /edit/:postid` - Edit post page
- `POST /update/:postid` - Update post
- `GET /like/:postid` - Like/unlike post

## Database Schema

### User Model
```javascript
{
  username: String,
  name: String,
  about: String,
  email: String,
  age: Number,
  password: String (hashed),
  profileImage: String (default: "default.png"),
  posts: [ObjectId] (references to posts)
}
```

### Post Model
```javascript
{
  user: ObjectId (reference to user),
  date: Date (default: current date),
  title: String,
  content: String,
  likes: [ObjectId] (references to users who liked)
}
```

## Security Features

- **Password Hashing**: Passwords are hashed using bcrypt with salt
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Middleware to protect authenticated routes
- **File Upload Security**: Secure file naming using crypto for uploaded images

## Environment Setup

Make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.0 or higher)
- npm or yarn package manager

## Dependencies

```json
{
  "bcrypt": "^6.0.0",
  "cookie-parser": "^1.4.7",
  "ejs": "^3.1.10",
  "express": "^5.1.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.16.1",
  "multer": "^2.0.1"
}
```

## Usage

1. **Register**: Create a new account on the homepage
2. **Login**: Access your account through the login page
3. **Create Posts**: Share your Pokémon adventures from your profile
4. **Explore**: Browse community posts on the dashboard
5. **Interact**: Like posts from other trainers
6. **Manage**: Edit your posts and update your profile
<!--
## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request
-->
## Future Enhancements

- [ ] Comment system on posts
- [ ] Follow/Unfollow functionality
- [ ] Image uploads for posts
- [ ] Search functionality
- [ ] User notifications
- [ ] Post categories/tags
- [ ] Dark mode toggle
- [ ] Email verification
- [ ] Password reset functionality

<!-- ## License -->

<!-- This project is open source and available under the [MIT License](LICENSE). -->

## Support

If you encounter any issues or have questions, please create an issue in the repository.

---

**Gotta share 'em all!** 🌟

Made by Manab
