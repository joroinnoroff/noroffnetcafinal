  "use client"



  import React, { useEffect, useState } from 'react';
  import { getPosts } from '../(auth)/(routes)/api/posts/read';
  import PostModal from '@/components/modal';
  import { Button } from '@/components/ui/button';
  import { Heart, MessageCircle, User, X } from 'lucide-react';
  import SettingsPost from './edit/components/SettingsPost';
  import FilterPost from './components/FilterPost';
 
  import NoImage from '@/components/NoImage';
  import { Skeleton } from '@/components/ui/skeleton';
  import { authFetch } from '../(auth)/(routes)/api/authFetch';
  import Pagination from '@/components/Pagination';
  import toast from 'react-hot-toast';
  import SearchPosts from './components/SearchPosts';
  import FollowButton from './components/FollowButton';
import Link from 'next/link';
import { Url } from 'url';
  
interface Post {
  id: number; 
  title: string;
  body: string;
  tags: string[]; 
  media: string | null;
  reactions: Reaction[];
  comments: Comments[];
  created: string;
  updated: string;
  author: Author;
  _count: {
    comments: number;
    reactions: number;
  };
}
  


  interface Author {
      name: string,
      email: string,
      avatar: string,
      banner: string
  
  }

  interface Comments {
    body: string,
    replyToId: string,
    id: number,
    postId: string,
    owner: string,
    created: number,
    author: Author,
  }
  interface Reaction {
    userId: number; 
    [postId: string]: number;
  
  } 

  



  const POSTS_PER_PAGE = 20; 
  

  const PostsPage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  

    const storedProfile = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("profile") || "") : null;
    const [user, setUser] = useState(storedProfile);
  
   
   
    const [filter, setFilter] = useState('Newest');
    const [showMedia, setShowMedia] = useState(false);
    const currentDate = new Date(); 
  
   

    const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});
    
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(''); 

    
  
    useEffect(() => {
      
      async function fetchPosts() {
        
        try {
          const fetchedPosts = await getPosts();
          setPosts(fetchedPosts);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching posts:', error);
          
          setLoading(false);
        }
      }

      if (!user) {
        
        window.location.href = '/'; 
      } else {
        const delayTimeout = setTimeout(() => {
          fetchPosts();
        }, 500);

        return () => {
          clearTimeout(delayTimeout);
        };
      }
    }, [user]);

    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;

    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    const pageRange = [];
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pageRange.push(i);
    }

    const paginatedPosts = posts.slice(startIndex, endIndex);

    const handlePreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        scrollToTop();
      }
    };

    const handleNextPage = () => {
      if (endIndex < posts.length) {
        setCurrentPage(currentPage + 1);
        scrollToTop();
      }
    };

    const handlePageClick = (page: React.SetStateAction<number>) => {

      const pageNumber = typeof page === 'function' ? page(currentPage) : page;
    
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
        scrollToTop();
      }
    };
    

    const handleSearchQueryChange = (query: string) => {
      setSearchQuery(query);
    };
    



    const filteredPosts = posts
      .filter((post) => (!showMedia || post.media !== null))
      .filter((post) => {
        if (filter === 'Newest') {
          return true;
        } else if (filter === 'Oldest') {
          return true;
        } else if (filter === 'MostComments') {
          return post.comments.length > 0;
        } else if (filter === 'MostLiked') {
          return likeCounts[post.id.toString()] > 0;
        } else if (filter === 'Tagged') {
          return post.tags && post.tags.length > 0;
        } else if (filter === 'MyPosts') {
          return post.author.name === user.name;
        }
    
        return true;
      })
      .filter((post) => {
        if (searchQuery) {
          const normalizedQuery = searchQuery.toLowerCase();
          return (
            (post.title?.toLowerCase().includes(normalizedQuery) || false) ||
            (post.body?.toLowerCase().includes(normalizedQuery) || false)
          );
        }
    
        return true;
      })
      .sort((a, b) => {
        const aCreatedDate = new Date(a.created).getTime();
        const bCreatedDate = new Date(b.created).getTime();
      
        if (filter === 'Newest') {
          return bCreatedDate - aCreatedDate;
        } else if (filter === 'Oldest') {
          return aCreatedDate - bCreatedDate;
        } else if (filter === 'MostComments') {
          return b.comments.length - a.comments.length;
        } else if (filter === 'MostLiked') {
          return (likeCounts[b.id] || 0) - (likeCounts[a.id] || 0);
        } else if (filter === 'Tagged') {
          if (a.tags && a.tags.length > 0 && (!b.tags || b.tags.length === 0)) {
            return -1;
          } else if ((!a.tags || a.tags.length === 0) && (b.tags && b.tags.length > 0)) {
            return 1;
          }
        }
        return 0;
      });
      
      
    



    const handleFilterChange = (newFilter: React.SetStateAction<string>, newShowMedia: boolean | ((prevState: boolean) => boolean)) => {
      setFilter(newFilter);
      setShowMedia(newShowMedia);
    };

  
    if (loading) {
      return (
        <div className="flex flex-wrap">
        {Array.from({ length: 30 }, (_, index) => (
          <div key={index} className="w-[400px] md:w-1/2 px-2 mb-4">
            <div className="flex mt-32 flex-col h-[400px] border shadow-md rounded-lg text-center">
              <div className='flex items-center justify-center h-[250px]'>
                <NoImage />
              </div>
              <Skeleton className="w-3/4 mx-auto h-6 p-2" />
              <div className="border my-4">
                <Skeleton className="w-3/4 mx-auto h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      );
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    const openPostModal = (post: Post) => {
      setSelectedPost(post);
    };
    

    const closePostModal = () => {
      setSelectedPost(null);
    };

    posts.forEach((post) => {
      likeCounts[post.id] = post.reactions.length;
    });
 
    const handleLikePost = async (postId: any) => {
      try {

        const response = await authFetch(`https://nf-api.onrender.com/api/v1/social/posts/${postId}/react/👍`, {
          method: 'PUT',
          body: JSON.stringify({}),
        });
    
        if (response.status === 200) {

          const updatedLikeCountResponse = await authFetch(`https://nf-api.onrender.com/api/v1/social/posts/${postId}`);
          const updatedLikeCountData = await updatedLikeCountResponse.json();
    
          if (updatedLikeCountData.count) {

            setLikeCounts((prevCounts) => ({
              ...prevCounts,
              [postId]: updatedLikeCountData.count + 1,
            }));
          }
    
        
          toast.success('Post liked successfully', {
            duration: 3000,
          });
        } else {
          
          toast.error('Error liking the post');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error liking the post');
      }
    };
    
    
    
    return (
      <div className="container mt-[10rem]">
      <Link href="/post/create/">
        <Button  className="hover:m-2 transition-all">
          Lag En Post+
        </Button>
      </Link>
      <h1 className="text-muted-foreground text-2xl p-1">Nye Poster</h1>
      <div className="flex items-center mb-2">
      <div className='flex items-center justify-center gap-3'>
      <FilterPost onFilterChange={handleFilterChange} />
   

          

  <p className='text-muted-foreground   '>Poster: {posts.length}</p>

    </div>


          <div className='absolute right-[15rem]  m-3'>
          <SearchPosts onSearchQueryChange={handleSearchQueryChange} />
          </div>


        </div>
    
        <div className="flex flex-wrap">
    {filteredPosts.length > 0 ? (
      filteredPosts.slice(startIndex, endIndex).map((post) => (
        <div key={post.id} className="w-full md:w-1/2 px-2 mb-4">
          <div className="flex flex-col h-[90%] md:h-full w-full border shadow-md rounded-lg text-center ">
            <div className='h-[250px]'>
              {post.media ? (
                
                <img src={post.media.toString()} alt={post.title} className="w-full h-[17rem] object-cover" />

              ) : (
                <div className='flex items-center justify-center h-[250px]'>
                  <NoImage />
                </div>
              )}
            </div>

            <hr className="border my-6" />
            <div className=' w-[75%] text-center mx-auto'>
              <h2 className='text-xl lg:text-2xl'>{post.title}</h2>
              <p className='text-sm'>{post.body}</p>
            </div>
            <Button onClick={() => openPostModal(post)} variant="default" className="mt-3 border opacity-70 transition-all hover:opacity-100 w-[90px] mx-auto flex items-center justify-center  p-5 w-30">Se Post</Button>
            <div className="relative h-20">
              <div className="absolute inset-x-0 bottom-0 h-10">
                <div className='flex items-end justify-center gap-2 mt-3'>
                  <div className='flex dark:invert'>
                    <button className='' onClick={() => handleLikePost(post.id)}>
                      <Heart size={22} className="mt-3 dark:text-white " color='#000' />  <div className='dark:invert'>{likeCounts[post.id] || 0}</div>
                    </button>
                  </div>
                  <div className='flex flex-col items-center justify-center '>
                    <MessageCircle width={22} height={22} className="dark:text-white"/> <p className='dark:text-white'>{post.comments.length ?? 0}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-40 mt-3">
              <div className="absolute inset-x-0 bottom-10">

              <div className='h-15'>
              {user && post.author.name === user.name ? <SettingsPost post={post as Post} /> : null}

                </div>

                Skrevet Av {post.author.name}
              </div>
            </div>
            Tags: {post.tags}
          </div>
        </div>
        
      ))
    ) : (
      <div>Ingen Resultater...</div>
    )}
  </div>

  <Pagination
   currentPage={currentPage}
   totalPages={totalPages}
   handlePageClick={handlePageClick}
   handlePreviousPage={handlePreviousPage}
   handleNextPage={handleNextPage}
   pageRange={pageRange}
   endIndex={endIndex}  
   
  />


    

        <div className='animation'>
          {selectedPost && (
            <PostModal post={selectedPost} isOpen={true} onClose={closePostModal} onCommentSubmit={() =>{}}>
              
              <div className='absolute left-0 top-0 p-3 dark:invert'>
                <div className='flex flex-col'>
                  Laget Av {selectedPost.author.name}
                  <FollowButton profileName={selectedPost.author.name} />
                </div>
              </div>
              <div className="absolute top-0 right-0 h-16 w-30 text-sm p-3 text-muted-foreground">
                {new Date(selectedPost.created).toLocaleDateString()}
              </div>
              <div className='flex flex-col mt-20 items-center justify-center'>
              {selectedPost.media ? (
    <img src={selectedPost.media.toString()} alt={selectedPost.title} className="w-full h-[17rem] md:h-[40rem] object-cover" />

    
  ) : (
    <div className="flex items-center justify-center">
      <NoImage />
    </div>
  )}

              
                <div className='text-center mt-3'>

                  <h1 className="dark:invert text-xl md:text-2xl">{selectedPost.title}</h1>
                  <p className="dark:invert">{selectedPost.body}</p>
                  
              
                </div>
                  <div className='container mx-0 w-[340px] md:w-[600px] mt-3 p-5 border shadow-md rounded-sm'>
                  <div className='flex items-center justify-center dark:invert'>
                  <button onClick={() => handleLikePost(selectedPost.id)}>
                  <Heart size={16} color="#000" className="mt-3 dark:invert" />  {likeCounts[selectedPost.id] || 0}
                </button>
                  </div>
                    
                        <div className='dark:invert rounded-md flex flex-col gap-3'>
                  <h2 className=''>Kommentarer:</h2>
                  {selectedPost.comments && selectedPost.comments.map((comment: { body: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; author: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; }, index: React.Key | null | undefined) => (
                    <div key={index} className="p-2 border flex flex-col-reverse rounded-sm ">
                      <p className='text-semibold text-1xl'>{comment.body}</p>
                      <div className='text-muted-foreground'>{new Date(selectedPost.created).toLocaleDateString()}</div>
                      <hr className="w-32"/>
                      <div
                      className='flex text-sm m-3'>
                        <User />
                        {comment.author.name}
                      
                      </div>
                    </div>
                  ))}
                </div>
                
                
                        </div>

              </div>
                
    
            </PostModal>
          )}
        </div>
      </div>
    );
  };

  export default PostsPage;