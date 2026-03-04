type ProductCardProps = {
    itemName: string
    image: string
    bgColor: string
}


function ProductCard({itemName, image, bgColor} : ProductCardProps) {
  return (
    <div className="product-card-container flex-col-center"
        style={{
            width: '20em',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0.5em',
            flexBasis: '2',
            padding: '1em',
            borderRadius: '1em',
            backgroundColor: bgColor

        }}
    >
      <div className="product-card-wrapper flex fd-c ai-c jc-c">
        <div className="product-item-card flex">
          <div>
            <div className="flex-col-center">
            <img src={image} alt="" 
              style={{
                width: '10em',
                height: '10em'
              }}
            />
          </div>
          <h3 style={{
            margin: '0.5em 0',
            width: '100%',
            textAlign: 'center'
          }}>{itemName}</h3>
          <p style={{
            overflow: 'hidden',
            width: '100%',
            textAlign: 'center',
            padding: '0.5em 0'
          }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, error.</p>
          </div>
          <div>
            <button style={{
              padding: '0.5em',
              width: '100%',
              borderRadius: '0.5em',
              fontWeight: 'bold',
              border: '1px solid white',
              color: 'white',
              backgroundColor: 'transparent'
            }}>View Product</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
