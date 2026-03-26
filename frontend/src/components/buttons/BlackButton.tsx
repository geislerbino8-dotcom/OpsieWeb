
type BlackButtonProps = {
    text : string
    color: string
    fontSize: string
    borderRadius: string
    margin: string
    padding: string
    image? : string
    onPress?: ()=> void

}

function BlackButton({text, fontSize, borderRadius, margin, image, onPress} : BlackButtonProps) {
  return (
    <div>
      <button style={{fontSize: `${fontSize}em`, borderRadius: `${borderRadius}em`,
        margin: `${margin}em`, padding: `0.5em 1em`, color: 'white'
        , border: 0, textAlign: 'center', 
        }}
          onClick={onPress}
          className="hover:bg-[#0F4C5C] bg-[#3CBDE6] transition duration-1000"

        >{text}{
      image ? <span><img style={{marginLeft: '0.5em'}} width={15} src={image} alt="" /></span> : null
    }
      
    </button>
    </div>
  )
}

export default BlackButton
