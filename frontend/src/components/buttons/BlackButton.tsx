
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
        margin: `${margin}em`, padding: `0.5em 1em`, backgroundColor: '#3cbde6', color: 'white'
        , border: 0, textAlign: 'center', 
        }}
          onClick={onPress}

        >{text}{
      image ? <span><img style={{marginLeft: '0.5em'}} width={15} src={image} alt="" /></span> : null
    }
      
    </button>
    </div>
  )
}

export default BlackButton
