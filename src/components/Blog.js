import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';
import photo from './mainPage.png.jpg';

// Updated sections array to include an 'id' for each section
const sections = [
  { title: 'Academic Resources', id: 'academic-resources' },
  { title: 'Career Services', id: 'career-services' },
  { title: 'Campus', id: 'campus' },
  { title: 'Culture', id: 'culture' },
  { title: 'Local Community Resources', id: 'local-community-resources' },
  { title: 'Social', id: 'social' },
  { title: 'Sports', id: 'sports' },
  { title: 'Health and Wellness', id: 'health-and-wellness' },
  { title: 'Technology', id: 'technology' },
  { title: 'Travel', id: 'travel' },
  { title: 'Alumni', id: 'alumni' },
];

const defaultTheme = createTheme();

export default function Blog() {
  const navigate = useNavigate();
  const users=localStorage.getItem('users')
  console.log(users)

  // Updated to navigate to dynamic route based on the section id
  const handleSectionClick = (id) => {
    navigate(`/view-post-grid/${id}`);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header
          title="Illinois Institute of Technology Blogging Platform"
          sections={sections.map((section) => ({
            ...section,
            onClick: () => handleSectionClick(section.id),
          }))}
          login={localStorage.getItem('login') === 'true'}
          user={localStorage.getItem('user')}
        />
        <main>
          <div style={{ marginLeft: '24px', width: 'calc(100% - 48px)' }}>
            <img src={photo} style={{ width: '100%', height: 'auto' }} />
            <Typography variant="h5" style={{ marginTop: '16px' }}>
              Welcome to our Illinois Tech blogging platform!
            </Typography>
            <br/>
            <Typography variant="body1" style={{ marginBottom: '24px' }}>
              Explore a diverse range of topics, insights, and experiences shared by our community members, faculty, staff, and students. Whether you're seeking academic guidance, career advice, campus news, or simply want to stay connected with campus life, you'll find it all here.
            </Typography>
            <Typography variant="body1">
              Join the conversation, share your stories, and engage with fellow members of our vibrant community. Together, let's create a platform that fosters collaboration, learning, and growth.
            </Typography>
          </div>
          {/* Rest of your content */}
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}