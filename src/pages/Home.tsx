
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CategoryTabs, { Category } from '../components/CategoryTabs';
import PostCard from '../components/PostCard';
import { mockPosts } from '../mockData';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  
  const filteredPosts = activeCategory === 'all' 
    ? mockPosts 
    : mockPosts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <div className="blog-container py-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to BlogApp</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover opportunities, projects, get help, and stay updated with all the latest events.
            </p>
          </div>
          
          <CategoryTabs 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <div key={post.id} className="h-full">
                <PostCard post={post} />
              </div>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">No posts found in this category.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
