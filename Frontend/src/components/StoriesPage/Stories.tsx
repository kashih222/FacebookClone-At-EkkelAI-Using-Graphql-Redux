import { Link } from 'react-router-dom';

const Stories = () => {
  const stories = [
    { 
      user: 'You', 
      label: 'Create story', 
      hasStory: false, 
      color: 'bg-gray-100',
      link: '/create-story'
    },
    { 
      user: 'Jaquelin De Aza', 
      hasStory: true, 
      color: 'bg-linear-to-r from-pink-500 to-purple-500',
      link: '#' 
    },
    { 
      user: 'Madiha Guil*', 
      hasStory: true, 
      color: 'bg-linear-to-r from-green-500 to-teal-500',
      link: '#' 
    },
    { 
      user: 'Makrishan Ali Azjiz*', 
      hasStory: true, 
      color: 'bg-linear-to-r from-yellow-500 to-orange-500',
      link: '#' 
    },
    { 
      user: 'Ahsan Mian', 
      hasStory: true, 
      color: 'bg-linear-to-r from-purple-500 to-blue-500',
      link: '#' 
    },
    { 
      user: 'Asif Gujjar', 
      hasStory: true, 
      color: 'bg-linear-to-r from-red-500 to-pink-500',
      link: '#' 
    },
  ];

  return (
    <div className="bg-white rounded-lg p-2 sm:p-4 mb-3 sm:mb-4 shadow-sm">
      <div className="flex space-x-2 sm:space-x-3 overflow-x-auto py-3 sm:py-5 scrollbar-hide">
        {stories.map((story, index) => (
          <Link
            key={index}
            to={story.link}
            className="shrink-0 w-20 sm:w-28"
          >
            <div className={`relative h-32 sm:h-40 rounded-lg sm:rounded-xl overflow-hidden ${
              story.hasStory 
                ? 'ring-2 ring-purple-500 ring-offset-1 sm:ring-offset-2' 
                : 'border border-gray-300'
            }`}>
              {/* Story Background */}
              <div className={`h-full ${story.color} flex items-end p-2 sm:p-3`}>
                <p className="text-white font-bold text-xs sm:text-sm line-clamp-2">
                  {story.label || story.user}
                </p>
              </div>
              
              {/* Profile Circle */}
              <div className={`absolute top-2 sm:top-3 left-2 sm:left-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 sm:border-4 ${
                story.hasStory ? 'border-blue-500' : 'border-white'
              } ${story.hasStory ? 'bg-linear-to-r from-purple-500 to-pink-500' : 'bg-blue-500'}`}>
                <div className="flex items-center justify-center h-full">
                  <span className="text-white text-xs sm:text-sm font-bold">
                    {index === 0 ? '+' : story.user.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Stories;