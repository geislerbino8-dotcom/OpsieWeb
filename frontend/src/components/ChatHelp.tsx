import TextType from './TextType'

function ChatHelp() {
  return (
    // Decorative teaser only (no click handler) — never intercept taps meant
    // for the footer links / booking calendar underneath it.
    <div className='pointer-events-none fixed z-20 px-7 py-3 rounded-3xl right-10 bottom-6 bg-[#0a0a0a] shadow-[0_0_30px_rgba(139,92,246,0.15)] border border-[#8B5CF6]/30'>
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
