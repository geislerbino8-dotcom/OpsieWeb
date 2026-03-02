

type PrimaryButtonProps = {
    text : string
    color: string
    fontSize: string
    borderRadius: string
    margin: string
    padding: string
    image? : string

}

function PrimaryButton({text, color, fontSize, borderRadius, margin, padding, image} : PrimaryButtonProps) {
  return (
    <div>
      <button style={{fontSize: `${fontSize}em`, borderRadius: `${borderRadius}em`,
        margin: `${margin}em`, padding: `0.5em 1em`, backgroundColor: color, color: 'white'
        , border: 0, textAlign: 'center'
    }}>{text}
    {
      image ? <span><img style={{marginLeft: '0.5em'}} width={15} src={image} alt="" /></span> : null
    }</button>
    </div>
  )
}

export default PrimaryButton
