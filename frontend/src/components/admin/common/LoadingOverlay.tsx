const LoadingOverlay = () => {
  return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-100'>
      
      <div className='bg-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3'>

        <div className='w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin'></div>

        <span className='text-sm text-gray-700'>
          Processing...
        </span>

      </div>

    </div>
  );
}

export default LoadingOverlay;