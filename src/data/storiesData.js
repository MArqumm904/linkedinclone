export const stories = [
    {
      id: 1,
      name: "Your Story",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=face",
      isYour: true,
      stories: [
        {
          type: "photo",
          url: "https://images.unsplash.com/photo-1682686580391-615b5f41556b?w=1080&auto=format",
          duration: 5,
          createdAt: "2023-11-15T10:30:00Z",
        },
        {
          type: "text",
          text: "Having a great day at the beach! 🌊☀️",
          background: "#FF9F43",
          duration: 7,
          createdAt: "2023-11-14T18:45:00Z",
        },
      ],
    },
    {
      id: 2,
      name: "Archimedes",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      isYour: false,
      stories: [
        {
          type: "postphotostory",
          url: "https://images.unsplash.com/photo-1698778573682-346d219322b2?w=1080&auto=format",
          caption: "Check out my new setup!",
          postUrl: "https://example.com/posts/123",
          duration: 8,
          createdAt: "2023-11-16T09:15:00Z",
        },
        {
          type: "photo",
          url: "https://images.unsplash.com/photo-1695653422902-1bea566871c6?w=1080&auto=format",
          duration: 5,
          createdAt: "2023-11-15T14:20:00Z",
        },
      ],
    },
    {
      id: 3,
      name: "jahved singh",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
      isYour: false,
      stories: [
        {
          type: "posttextstory",
          text: "Just published a new article about AI trends for 2024",
          postUrl: "https://example.com/articles/ai-2024",
          background: "#3498db",
          duration: 10,
          createdAt: "2023-11-16T11:05:00Z",
        },
        {
          type: "video",
          url: "https://example.com/videos/sunset.mp4",
          duration: 15,
          createdAt: "2023-11-15T19:30:00Z",
        },
      ],
    },
    {
      id: 4,
      name: "Coderlytics",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=64&h=64&fit=crop&crop=face",
      isYour: false,
      stories: [
        {
          type: "postvideostory",
          url: "https://example.com/videos/tutorial.mp4",
          caption: "New coding tutorial is out!",
          postUrl: "https://example.com/tutorials/12",
          duration: 20,
          createdAt: "2023-11-16T08:00:00Z",
        },
      ],
    },
    {
      id: 5,
      name: "ArjitDesigns",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=face",
      isYour: false,
      stories: [
        {
          type: "text",
          text: "Design inspiration for today: Minimalism",
          background: "#2c3e50",
          textColor: "#ffffff",
          duration: 7,
          createdAt: "2023-11-16T10:00:00Z",
        },
        {
          type: "photo",
          url: "https://images.unsplash.com/photo-1698941028543-4a1a89a8f720?w=1080&auto=format",
          duration: 5,
          createdAt: "2023-11-15T16:45:00Z",
        },
        {
          type: "postphotostory",
          url: "https://images.unsplash.com/photo-1698939608026-1109331a5a65?w=1080&auto=format",
          caption: "My latest project - what do you think?",
          postUrl: "https://example.com/portfolio/5",
          duration: 8,
          createdAt: "2023-11-14T12:30:00Z",
        },
      ],
    },
  ];