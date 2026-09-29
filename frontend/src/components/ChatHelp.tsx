import TextType from './TextType'

function ChatHelp() {
  return (
    <div className='fixed z-20 px-7 py-3 rounded-3xl right-10 bottom-6 bg-[#0a0a0a] shadow-[0_0_30px_rgba(6,182,212,0.15)] border border-cyan-500/20'>
      <TextType 
        className='mr-7'
        text={["How may I help you"]}
        typingSpeed={75}
        pauseDuration={10000}
        showCursor
        cursorCharacter="?"
        deletingSpeed={50}
        cursorBlinkDuration={0.5}
      />
    </div>
  )
}

export default ChatHelp
