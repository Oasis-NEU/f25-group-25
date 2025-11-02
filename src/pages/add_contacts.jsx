import React, { useState } from 'react';
import { UserPlus, Search, X } from 'lucide-react';
import NavBar from '../assets/navbar';

export default function AddFriends() {
  const [searchTerm, setSearchTerm] = useState('');
  const [friends, setFriends] = useState([
    { id: 1, name: 'Richard Feng', username: '@richardf', avatar: '👤' },
    { id: 2, name: 'Martin Villa', username: '@martinv', avatar: '👤' },
  ]);
  const [newFriendName, setNewFriendName] = useState('');
  const [newFriendUsername, setNewFriendUsername] = useState('');

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFriend = () => {
    if (newFriendName.trim() && newFriendUsername.trim()) {
      const newFriend = {
        id: friends.length + 1,
        name: newFriendName.trim(),
        username: newFriendUsername.startsWith('@') ? newFriendUsername.trim() : `@${newFriendUsername.trim()}`,
        avatar: '👤'
      };
      setFriends([...friends, newFriend]);
      setNewFriendName('');
      setNewFriendUsername('');
    }
  };

  const handleRemoveFriend = (id) => {
    setFriends(friends.filter(friend => friend.id !== id));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-200">
      <NavBar />
      <div className="max-w-6xl w-full px-8 py-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">Manage Friends</h1>

        {/* Add New Friend Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-2 border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <UserPlus className="w-6 h-6 text-slate-800" />
            <h2 className="text-2xl font-bold text-slate-800">Add New Friend</h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newFriendName}
                  onChange={(e) => setNewFriendName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-slate-800 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={newFriendUsername}
                  onChange={(e) => setNewFriendUsername(e.target.value)}
                  placeholder="@johndoe"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-slate-800 transition"
                />
              </div>
            </div>
            <button
              onClick={handleAddFriend}
              className="cursor-pointer w-full md:w-auto px-8 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition font-medium"
            >
              Add Friend
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search friends by name or username..."
              className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-slate-800 transition bg-white"
            />
          </div>
        </div>

        {/* Friends List */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-800 overflow-hidden">
          <div className="bg-slate-800 text-white px-6 py-4">
            <h2 className="text-xl font-bold">Your Friends ({filteredFriends.length})</h2>
          </div>
          <div className="divide-y divide-slate-200">
            {filteredFriends.length === 0 ? (
              <div className="px-6 py-12 text-center text-slate-500">
                No friends found. Add some friends to start tracking debts!
              </div>
            ) : (
              filteredFriends.map(friend => (
                <div key={friend.id} className="px-6 py-4 hover:bg-slate-50 transition flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-white text-2xl">
                      {friend.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-lg">{friend.name}</h3>
                      <p className="text-slate-500 text-sm">{friend.username}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFriend(friend.id)}
                    className="cursor-pointer p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Remove friend"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}