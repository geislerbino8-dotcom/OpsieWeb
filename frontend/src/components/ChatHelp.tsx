import { MessageCircle } from 'lucide-react'
import TextType from './TextType'

function ChatHelp() {
  return (
    <>
      <style>{`.bpFab, .bpFabWrapper { display: none !important; }`}</style>
      <button
        id="bp-toggle-chat"
        type="button"
        aria-label="Open chat support"
        title="Open chat support"
        onClick={() => window.botpress?.open?.()}
        className="fixed bottom-4 right-4 z-[1000000] inline-flex items-center justify-center rounded-full bg-white p-3 text-[#0B1220] shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00C0E8] lg:bottom-6 lg:right-10 lg:rounded-3xl lg:px-7 lg:py-3"
      >
        <span className="lg:hidden" aria-hidden="true">
          <MessageCircle className="h-6 w-6" />
        </span>
        <span className="hidden lg:inline">
          <TextType
            className="mr-7"
            text={["How may I help you"]}
            typingSpeed={75}
            pauseDuration={10000}
            showCursor
            cursorCharacter="?"
            deletingSpeed={50}
            cursorBlinkDuration={0.5}
          />
        </span>
      </button>
    </>
  )
}

export default ChatHelp
