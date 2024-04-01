import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Card, CardContent, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './Footer';
import data from '../data.json'; // Import the data from data.json
import { deletePost } from './DeletePost'; // Import the deletePost function

const defaultTheme = createTheme({
  typography: {
    // Customize typography colors here
    body1: {
      color: '#000', // Black color for body text
    },
    body2: {
      color: '#000', // Black color for secondary text
    },
    // Add more overrides as needed
  },
});

const ViewPostGrid = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const user= localStorage.getItem('user')

  // Define sections state and setter
  const [sections, setSections] = useState([
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
  ]);

  useEffect(() => {
    const filteredPosts = data.posts.filter(post => post.topic === sectionId);
    setPostContent(filteredPosts);

    // Update isActive property based on the sectionId
    const updatedSections = sections.map(section => ({
      ...section,
      isActive: section.id === sectionId,
    }));
    setSections(updatedSections);
  }, [sectionId]);

  const handleSectionClick = (id) => {
    navigate(`/view-post-grid/${id}`);
  };

  const navigateHome = () => {
    navigate('/');
  };

  const navigateToCreatePost = () => {
    navigate('/create-post');
  };

  const handleCardClick = (postId) => {
    const post = data.posts.find(post => post.id === postId);
    if (post) {
      navigate(`/content/${post.id}`);
    } else {
      console.error(`Post with ID ${postId} not found`);
    }
  };

  const handleDelete = async (postId) => {
    setPostIdToDelete(postId);
    setDeleteConfirmationOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
    setPostIdToDelete(null);
  };

  const handleConfirmDelete = async () => {
    const deleted = await deletePost(postIdToDelete);
    if (deleted) {
      const updatedPosts = postContent.filter(post => post.id !== postIdToDelete);
      setPostContent(updatedPosts);
      setDeleteSuccess(true);
    }
    setDeleteConfirmationOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header
          title="Blog"
          sections={sections.map((section) => ({
            ...section,
            onClick: () => handleSectionClick(section.id),
            
          }))}
          login={localStorage.getItem('login') === 'true'}
          user={localStorage.getItem('user')}
          extra={
            <>
              <Button color="inherit" onClick={navigateHome}>Home</Button>
              <Button color="inherit" onClick={navigateToCreatePost}>Create</Button>
            </>
          }
        />
        <main>
          {postContent.length > 0 ? (
            postContent.map((post, index) => (
              <Card style={{ marginLeft: '20.5px', width: 'calc(100% - 48px)', position: 'relative', margin: '20px', position: 'relative' }}>
                <Link key={index} to={`/content/${post.id}`} style={{ textDecoration: 'none' }} onClick={() => handleCardClick(post.id)}>
                  <CardContent>
                    <Typography variant="h5" component="h2" style={{ fontWeight: 'bold', color: '#000' }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {post.author}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {post.createdDate}
                    </Typography>
                    <br />
                    <Typography variant="body2" component="p" style={{ textAlign: 'justify', color: '#000' }}>
                      {post.shortdescription}
                    </Typography>
                  </CardContent>
                </Link>
                <CardActions style={{ position: 'absolute', top: '5px', right: '5px' }}>
                {user==='john' ? (
                  <IconButton aria-label="delete" onClick={() => handleDelete(post.id)}>
                  <DeleteIcon />
                </IconButton>
                  ) : null}
                </CardActions>
              </Card>
            ))
          ) : (
            <Typography variant="body1">No content available for this section.</Typography>
          )}
        </main>
        <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        />
      </Container>

      <Dialog open={deleteConfirmationOpen} onClose={handleCloseDeleteConfirmation}>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default ViewPostGrid;
