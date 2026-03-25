import ClientProfile from '../../assets/visuals/Client.png'

function FeedbackSectionCard() {
  return (
    <div className="fb-section-container"
    >
      <div>
             <h1 style={{
                    fontSize: '6em',
                    position: 'relative',
                    bottom: '-0.5em',
                    right: '-0.4em'
                }}>,,</h1>
          </div>
      <div className="fb-section-card-wrapper flex fdc jc-c"
        style={{
            padding: '2em',
            backgroundColor: '#003C4F',
            borderRadius: '1em',
            margin: '1em',
            width: '12em',
            boxSizing: 'content-box'
            
        }}
      >
        <div className="flex fd-c jc-c">
          
            <div className='flex fd-r ai-c'
              style={{
                boxSizing: 'content-box'
              }}
            >
               
                <img width={50} height={50} src={ClientProfile} alt="" 
                style={{
                    borderRadius: '50%',
                    margin: '1em 1em 1em 0'
                }}
            />
                <div className="flex-fd-c jc-c"
                  style={{
                    textAlign: 'left'
                  }}
                >
                    <h3>Lorem Ipsum</h3>
                    <p>Lorem, ipsum dolor.</p>
                </div>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda necessitatibus molestias rem ipsa. Eum voluptate amet quo maiores, ea eaque, illum nam mollitia dolorem debitis alias rerum, natus quisquam excepturi?
            Delectus doloremque incidunt consequatur nam</p>
        </div>
      </div>
    </div>
  )
}

export default FeedbackSectionCard
