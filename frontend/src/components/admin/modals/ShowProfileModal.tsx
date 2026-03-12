import { useEffect } from 'react'

type ShowProfileModalProps = {
  user: {
    _id: string
    name: string
    username: string
    role: string
    tickets: number
    createdAt: string
  }
  onClose: () => void
}

const ShowProfileModal = ({ user, onClose }: ShowProfileModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6'>

      <div className='bg-white rounded-lg shadow-lg min-w-55 max-w-md p-5'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-lg font-semibold text-gray-800'>
            Profile
          </h2>

          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 text-xl cursor-pointer'
          >
            ✕
          </button>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-11 items-center'>
          <div className='h-full mt-1 flex items-start justify-center gap-4'>
            <div className='w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center text-white text-2xl font-bold'>
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className='text-lg font-semibold text-gray-800'>
                {user.name}
              </p>

              <p className='text-sm text-gray-500'>
                @{user.username}
              </p>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-4 text-sm w'>
            <div>
              <p className='text-gray-500'>Role</p>
              <p className='font-medium text-gray-800 capitalize'>
                {user.role}
              </p>
            </div>

            <div>
              <p className='text-gray-500'>Assigned Tickets</p>
              <p className='font-medium text-gray-800'>
                {user.tickets}
              </p>
            </div>

            <div>
              <p className='text-gray-500'>Member Since</p>
              <p className='font-medium text-gray-800'>
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowProfileModal