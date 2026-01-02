const LeftSidebar = () => {
  const menuItems = [
    { icon: '👤', label: 'User Name', active: true },
    { icon: '🫂', label: 'Friends' },
    { icon: '👥', label: 'Groups' },
    { icon: '🏪', label: 'Marketplace' },
    { icon: '📺', label: 'Watch' },
    { icon: '🕐', label: 'Memories' },
    { icon: '💾', label: 'Saved' },
    { icon: '📋', label: 'Pages' },
    { icon: '🎮', label: 'Gaming' },
    { icon: '🎓', label: 'Courses' },
    { icon: '🏢', label: 'Jobs' },
    { icon: '📅', label: 'Events' },
    { icon: '📰', label: 'News' },
    { icon: '🆘', label: 'Crisis response' },
    { icon: '🏫', label: 'Fundraisers' },
    { icon: '💡', label: 'See more' },
  ];

  const shortcuts = [
    { icon: '🎮', label: 'Game Group', color: 'bg-purple-500' },
    { icon: '💻', label: 'Web Dev Community', color: 'bg-blue-500' },
    { icon: '🎵', label: 'Music Lovers', color: 'bg-pink-500' },
    { icon: '⚽', label: 'Sports Fans', color: 'bg-green-500' },
    { icon: '🎬', label: 'Movie Club', color: 'bg-yellow-500' },
  ];

  return (
    <div className="sticky top-20">
      {/* User Profile */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
          <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            U
          </div>
          <span className="font-medium">User Name</span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-1 mb-6">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 ${
              item.active ? 'bg-gray-100' : ''
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Shortcuts */}
      <div className="pt-4 border-t border-gray-300">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-500">Your shortcuts</h3>
          <button className="text-blue-600 hover:underline text-sm">
            Edit
          </button>
        </div>
        <div className="space-y-1">
          {shortcuts.map((shortcut, index) => (
            <button
              key={index}
              className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200"
            >
              <div className={`w-8 h-8 ${shortcut.color} rounded-lg flex items-center justify-center text-white`}>
                <span className="text-lg">{shortcut.icon}</span>
              </div>
              <span className="font-medium">{shortcut.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-6 pt-4 border-t border-gray-300">
        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
          <a href="#" className="hover:underline">Privacy</a> · 
          <a href="#" className="hover:underline">Terms</a> · 
          <a href="#" className="hover:underline">Advertising</a> · 
          <a href="#" className="hover:underline">Ad choices</a> · 
          <a href="#" className="hover:underline">Cookies</a> · 
          <a href="#" className="hover:underline">More</a> · 
          <span className="text-gray-400">Meta © 2026</span>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;