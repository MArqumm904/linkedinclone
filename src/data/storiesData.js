export const stories = [
  {
    id: 1,
    name: "Your Story",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=face",
    isYour: true,
    stories: [
      {
        type: "photo",
        url: "https://media.istockphoto.com/id/1465316262/photo/businessman-inspecting-paperwork-document-of-business-data-analysis-working-management-report.jpg?s=612x612&w=0&k=20&c=kpD3aZWVIH0VfOwdG4RX5vPRFPMftg5Dp4xCVo3Lito=",
        duration: 5,
        createdAt: "2023-11-15T10:30:00Z",
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
        url: "https://www.simplilearn.com/ice9/free_resources_article_thumb/Integration_Testing.jpg",
        pagename: "Check out my new setup!",
        duration: 8,
        createdAt: "2023-11-16T09:15:00Z",
      },
    ],
  },
  {
    id: 3,
    name: "Jahved Singh",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
    isYour: false,
    stories: [
      {
        type: "posttextstory",
        text: "Just published a new article about AI trends for 2024",
        avatar:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
        background:"black",
        pagename: "Apple Music",
        postdesc:"Discover new releases, curated playlists, and exclusive content — all in one...",
        duration: 10,
        createdAt: "2023-11-16T11:05:00Z",
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
        url: "",
        pagename: "New coding tutorial is out!",
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
        duration: 7,
        createdAt: "2023-11-16T10:00:00Z",
      },
    ],
  },
  {
    id: 6,
    name: "Lara Code",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=64&h=64&fit=crop&crop=face",
    isYour: false,
    stories: [
      {
        type: "video",
        url: "https://example.com/videos/office-tour.mp4",
        duration: 15,
        createdAt: "2023-11-16T13:25:00Z",
      },
    ],
  },
];