import TextType from './TextType'

function ChatHelp() {
  return (
    <div className='fixed z-20 px-7 py-3 rounded-3xl right-10 bottom-6 bg-white'>
      <TextType 
        className='mr-7'
        text={["How may i help you"]}
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
