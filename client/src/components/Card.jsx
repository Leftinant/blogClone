import { useState } from "react";
import {
  FaHeart,
  FaRegComment,
  FaPaperPlane,
  FaBookmark,
  FaEllipsisH,
} from "react-icons/fa";

export default function Card({
  avatarUrl,
  username,
  postImage,
  likes,
  caption,
  hashtag,
  commentsCount,
  onEdit,
  onDelete,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const toggleOptions = () => setShowOptions((prev) => !prev);
  return (
    <div className='w-80 md:w-300 mx-auto rounded-xl shadow-md overflow-hidden border'>
      {/* Header */}
      <div className='flex items-center justify-between px-4 py-2'>
        <div className='flex items-center space-x-2'>
          <img
            src={avatarUrl || "https://i.pravatar.cc/40"}
            alt='avatar'
            className='w-8 h-8 rounded-full'
          />
          <span className='font-semibold text-sm'>
            {username || "User Name"}
          </span>
        </div>
        <div className='relative'>
          <FaEllipsisH
            className='text-gray-500 cursor-pointer'
            onClick={toggleOptions}
          />
          {showOptions && (
            <div className='absolute right-0 mt-2 w-40 bg-white rounded shadow-md z-10'>
              <button
                onClick={() => {
                  toggleOptions();
                  onEdit?.();
                }}
                className='block w-full text-left pr-10 pl-4 py-4 hover:bg-gray-100 text-sm'
              >
                Edit
              </button>
              <button
                onClick={() => {
                  toggleOptions();
                  onDelete?.();
                }}
                className='block w-full text-left pr-10 pl-4 py-4 hover:bg-gray-100 text-sm text-red-600'
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Image */}
      <div className='h-auto w-full'>
        {postImage ? (
          <img
            src={postImage}
            alt='Post'
            className='w-full h-auto object-cover'
          />
        ) : (
          <div className='w-full h-auto  grid place-items-center text-gray-400'>
            Image
          </div>
        )}
      </div>

      {/* Actions */}
      <div className='flex items-center justify-between px-4 pt-2'>
        <div className='flex space-x-4 text-xl text-gray-700'>
          <FaHeart className='text-red-500 cursor-pointer' />
          <FaRegComment className='cursor-pointer' />
          <FaPaperPlane className='cursor-pointer' />
        </div>
        <FaBookmark className='cursor-pointer text-xl' />
      </div>

      {/* Likes */}
      {likes && (
        <div className='px-4 py-1 text-sm font-semibold'>{likes} likes</div>
      )}

      {/* Caption */}
      {caption && (
        <div className='px-4 text-sm'>
          <span className='font-semibold'>{username || "User"}</span>{" "}
          <span className='text-gray-700'>
            {caption}{" "}
            {hashtag && <span className='text-blue-600'>{hashtag}</span>}
          </span>
        </div>
      )}

      {/* Comments */}
      {commentsCount && (
        <div className='px-4 text-sm text-gray-500 cursor-pointer'>
          View all {commentsCount} comments
        </div>
      )}
    </div>
  );
}
