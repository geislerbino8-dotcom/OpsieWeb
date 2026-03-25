
type ContactsCardType = {
    title: string
    children: any
    
}

function ContactsCard({title, children} : ContactsCardType) {
  return (
    <div className='w-full flex-1 md:ml-10 mb-5 p-5 rounded-2xl text-left flex-col bg-white'>
        <h1 className='font-semibold mb-2'>{title}</h1>
        {children}
    </div>
  )
}

export default ContactsCard
