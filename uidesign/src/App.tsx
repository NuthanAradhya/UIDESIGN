import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import image1 from '../src/images/1.png';
import image2 from '../src/images/2.png';
import image3 from '../src/images/3.png';
import image4 from '../src/images/4.png';
import image5 from '../src/images/5.png';
import image6 from '../src/images/6.png';
interface CardProps {
  title: string;
  description: string;
  media: {
    type: 'image' | 'video';
    src: string;
    alt?: string;
  }[];
  position: 'left' | 'right';
  isDarkMode: boolean;
  websiteLink: string; // Added website link prop
}

const firebaseConfig = {
  apiKey: "AIzaSyC4bM8i1bEbBQ5zAM-eHQqUxtJVsP-rbQY",
  authDomain: "nuthan-portfolios.firebaseapp.com",
  projectId: "nuthan-portfolios",
  storageBucket: "nuthan-portfolios.firebasestorage.app",
  messagingSenderId: "970952974063",
  appId: "1:970952974063:web:f135e5906fe4d98f80051a"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const Card: React.FC<CardProps> = ({ title, description, media, position, isDarkMode, websiteLink }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % media.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const currentMedia = media[currentMediaIndex];

  return (
    <div 
      className={`card card-${position}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        aspectRatio: '3/4', // Maintain aspect ratio for responsiveness
        maxWidth: '450px',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: isHovered 
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)' 
          : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        backgroundColor: isDarkMode ? '#2D3748' : '#fff',
        transition: 'transform 0.5s ease, box-shadow 0.5s ease, background-color 0.3s ease',
        transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <div 
        className="card-media-container"
        style={{
          height: '0',
          paddingBottom: '58.33%', // Maintain 16:9 aspect ratio for media
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {media.length > 1 && (
          <>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                prevMedia();
              }}
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                color: isDarkMode ? '#fff' : '#000',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                border: 'none',
                cursor: 'pointer',
                zIndex: 2,
                display: isHovered ? 'block' : 'none',
                transition: 'opacity 0.3s ease',
              }}
            >
              &lt;
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                nextMedia();
              }}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                color: isDarkMode ? '#fff' : '#000',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                border: 'none',
                cursor: 'pointer',
                zIndex: 2,
                display: isHovered ? 'block' : 'none',
                transition: 'opacity 0.3s ease',
              }}
            >
              &gt;
            </button>
          </>
        )}
        
        {currentMedia.type === 'image' ? (
          <img 
            src={currentMedia.src} 
            alt={currentMedia.alt || title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              transition: 'transform 0.5s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
        ) : (
          <video 
            src={currentMedia.src}
            controls={isHovered}
            autoPlay={isHovered}
            loop
            muted={!isHovered}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        )}
        
        <div 
          className="media-overlay"
          style={{
            position: 'absolute',
            bottom: isHovered ? '0' : '-60px',
            left: '0',
            right: '0',
            padding: '15px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            transition: 'bottom 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {media.map((_, index) => (
              <div 
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentMediaIndex(index);
                }}
                style={{
                  width: '10px',
                  height: '10px',
                  margin: '0 5px',
                  borderRadius: '50%',
                  backgroundColor: index === currentMediaIndex ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div 
        className="card-content"
        style={{
          padding: '20px',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <h2 
          style={{
            margin: '0 0 10px 0',
            fontSize: 'clamp(18px, 5vw, 24px)', // Responsive font size
            color: isDarkMode ? '#E2E8F0' : '#333',
            fontWeight: 'bold',
          }}
        >
          {title}
        </h2>
        <p
          style={{
            margin: '0',
            fontSize: 'clamp(14px, 3vw, 16px)', // Responsive font size
            color: isDarkMode ? '#A0AEC0' : '#666',
            lineHeight: '1.5',
          }}
        >
          {description}
        </p>
        <a 
          href={websiteLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            marginTop: '20px',
          }}
        >
          <button
            style={{
              width: '100%',
              padding: '12px 20px',
              backgroundColor: position === 'left' ? '#4F46E5' : '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
              opacity: isHovered ? 1 : 0.9,
              transform: isHovered ? 'translateY(0)' : 'translateY(5px)',
            }}
          >
            View Portfolio
          </button>
        </a>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Set dark mode as default
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  // Track window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Apply theme to the entire document and remove default scrollbar
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#1A202C' : '#f7f7f7';
    
    // Add custom scrollbar styles
    const style = document.createElement('style');
    style.textContent = `
      /* Hide default scrollbar */
      body::-webkit-scrollbar {
        width: 1px;
      }
      
      /* Custom scrollbar track */
      body::-webkit-scrollbar-track {
        background: transparent;
      }
      
      /* Custom scrollbar thumb */
      body::-webkit-scrollbar-thumb {
        background-color: #1E40AF;
        border-radius: 0;
        width: 1px;
      }
      
      /* For Firefox */
      html {
        scrollbar-width: thin;
        scrollbar-color: #1E40AF transparent;
      }
      
      /* Responsive styles */
      @media (max-width: 768px) {
        .cards-container {
          flex-direction: column !important;
        }
        
        .divider {
          width: 80% !important;
          height: 1px !important;
          margin: 20px 0 !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [isDarkMode]);
  
  const handlePortfolioSelection = (portfolio: string) => {
    // You can add navigation logic here if needed
    console.log(`Selected portfolio: ${portfolio}`);
  };
  
  const uxPortfolioData: Omit<CardProps, 'isDarkMode'> = {
    title: "UX Design Portfolio",
    description: "Explore my user experience design projects, showcasing intuitive interfaces and engaging user journeys across various platforms and industries.",
    media: [
      {
        type: 'image',
        src: image4,
        alt: 'UX Design Project 1'
      },
      {
        type: 'image',
        src: image5,
        alt: 'UX Design Project 2'
      },
      {
        type: 'image',
        src: image6,
        alt: 'UX Design Project 3'
      }
    ],
    position: 'right',
    websiteLink: 'https://nuthan-in.web.app/' // Added UX portfolio link
  };
  
  const pmPortfolioData: Omit<CardProps, 'isDarkMode'> = {
    title: "Product Management Portfolio",
    description: "Discover my product management expertise through case studies of successful product launches, strategy development, and cross-functional team leadership.",
    media: [
      {
        type: 'image',
        src: image3,
        alt: 'PM Project 1'
      },
      {
        type: 'image',
        src: image2,
        alt: 'PM Project 2'
      },
      {
        type: 'image',
        src: image1,
        alt: 'PM Project 3'
      }
    ],
    position: 'left',
    websiteLink: 'https://nuthan-portfolio.web.app/' // Added PM portfolio link
  };

  // Determine if we're in mobile/tablet view
  const isMobileView = windowWidth <= 768;

  return (
    <div 
      className="app-container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: isDarkMode ? '#1A202C' : '#f7f7f7',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: isDarkMode ? '#E2E8F0' : '#333',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        overflowX: 'hidden', // Prevent horizontal scrolling
      }}
    >
      <header
        style={{
          textAlign: 'center',
          marginBottom: '50px',
          position: 'relative',
          width: '100%',
          maxWidth: '1000px',
          padding: '0 20px',
        }}
      >
        {/* Improved Theme Toggle Button with better visibility */}
        <div 
          className="theme-toggle"
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '80px',
            height: '36px',
            backgroundColor: isDarkMode ? '#4A5568' : '#CBD5E0',
            borderRadius: '18px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 4px',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            transition: 'background-color 0.3s ease',
            overflow: 'hidden',
            zIndex: 10,
            border: `2px solid ${isDarkMode ? '#ED8936' : '#6B46C1'}`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: isDarkMode ? '#6B46C1' : '#ED8936',
              transform: isDarkMode ? 'translateX(44px)' : 'translateX(4px)',
              transition: 'transform 0.3s ease, background-color 0.3s ease',
              zIndex: 1,
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '8px',
              color: isDarkMode ? '#A0AEC0' : '#4A5568',
              fontSize: '16px',
              zIndex: 2,
            }}
          >
            ☀️
          </div>
          <div
            style={{
              position: 'absolute',
              right: '8px',
              color: isDarkMode ? '#E2E8F0' : '#718096',
              fontSize: '16px',
              zIndex: 2,
            }}
          >
            🌙
          </div>
        </div>

        <h1
          style={{
            fontSize: 'clamp(24px, 5vw, 36px)', // Responsive font size
            marginBottom: '15px',
            fontWeight: 'bold',
            color: isDarkMode ? '#F7FAFC' : '#333',
          }}
        >
          My Professional Portfolio
        </h1>
        <p
          style={{
            fontSize: 'clamp(16px, 3vw, 18px)', // Responsive font size
            color: isDarkMode ? '#A0AEC0' : '#666',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          Select a portfolio area to explore my work and projects
        </p>
      </header>
      
      <div 
        className="cards-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: isMobileView ? 'column' : 'row',
          gap: isMobileView ? '30px' : '40px',
          width: '100%',
          maxWidth: '1000px',
          position: 'relative',
        }}
      >
        <div 
          onClick={() => handlePortfolioSelection('pm')}
          style={{
            animation: isMobileView ? 'slideInTop 0.8s ease-out' : 'slideInLeft 0.8s ease-out',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Card {...pmPortfolioData} isDarkMode={isDarkMode} />
        </div>
        
        {/* Modified divider that changes orientation based on screen size */}
        <div 
          className="divider"
          style={{
            height: isMobileView ? '1px' : '300px',
            width: isMobileView ? '80%' : '1px',
            backgroundColor: '#1E40AF', // Blue color for the divider
            position: 'relative',
            transition: 'background-color 0.3s ease',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: isDarkMode ? '#6B46C1' : '#333',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
              zIndex: 2,
            }}
          >
            OR
          </div>
        </div>
        
        <div 
          onClick={() => handlePortfolioSelection('ux')}
          style={{
            animation: isMobileView ? 'slideInBottom 0.8s ease-out' : 'slideInRight 0.8s ease-out',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Card {...uxPortfolioData} isDarkMode={isDarkMode} />
        </div>
      </div>
      
      <style>
        {`
          @keyframes slideInLeft {
            from {
              transform: translateX(-100px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @keyframes slideInRight {
            from {
              transform: translateX(100px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @keyframes slideInTop {
            from {
              transform: translateY(-100px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes slideInBottom {
            from {
              transform: translateY(100px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          /* Responsive Grid Layout */
          @media (max-width: 768px) {
            .app-container {
              padding: 15px;
            }
            
            header {
              margin-bottom: 30px;
            }
            
            .theme-toggle {
              top: -10px;
              right: 50%;
              transform: translateX(50%);
              margin-bottom: 20px;
            }
          }
          
          /* Tablet adjustments */
          @media (min-width: 769px) and (max-width: 1024px) {
            .cards-container {
              gap: 20px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default App;