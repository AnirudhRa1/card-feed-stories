
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CategoryTabs, { Category } from '../components/CategoryTabs';
import PostCard from '../components/PostCard';
import { mockPosts } from '../mockData';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Filter } from 'lucide-react';

type FilterOption = 'recent' | 'oldest' | 'mostLiked';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [filterOption, setFilterOption] = useState<FilterOption>('recent');
  
  // Filter posts by category first
  let filteredPosts = activeCategory === 'all' 
    ? [...mockPosts] 
    : [...mockPosts.filter(post => post.category === activeCategory)];

  // Then apply sorting based on filter option
  filteredPosts = filteredPosts.sort((a, b) => {
    switch (filterOption) {
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'mostLiked':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

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
          
          <div className="flex justify-between items-center mb-6">
            <CategoryTabs 
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-2">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className={filterOption === 'recent' ? 'bg-muted' : ''}
                  onClick={() => setFilterOption('recent')}
                >
                  Most recent
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={filterOption === 'oldest' ? 'bg-muted' : ''}
                  onClick={() => setFilterOption('oldest')}
                >
                  Oldest first
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={filterOption === 'mostLiked' ? 'bg-muted' : ''}
                  onClick={() => setFilterOption('mostLiked')}
                >
                  Most liked
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
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
