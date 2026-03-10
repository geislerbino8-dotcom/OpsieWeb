import SunPlazaImg from '../../assets/visuals/SunPlaza.jpg'
import BlackButton from '../buttons/BlackButton'


function SunPlazaCard () {
    return(
     <div className="-mt-3 flex justify-end">
  <div className="w-full m-5 max-w-xl flex flex-col p-6 bg-white rounded-xl shadow-md space-y-4">
    {/* Map Image */}
    <img
      className="w-300 h-100 rounded-xl border border-black object-cover"
      src={SunPlazaImg}
      alt="Img"
    />
      <a href="https://www.google.com/search?q=sun+plaza+mandaluyong&oq=&gs_lcrp=EgZjaHJvbWUqDAgAECMYJxjqAhitBjIMCAAQIxgnGOoCGK0GMgkIARAjGCcY6gIyCQgCECMYJxjqAjIJCAMQIxgnGOoCMgkIBBAjGCcY6gIyCQgFECMYJxjqAjIMCAYQIxgnGOoCGIsDMgwIBxAjGCcY6gIYrQbSAQoxMzAyMjZqMWo3qAIIsAIB8QXW2Sh5JdgpZg&sourceid=chrome&ie=UTF-8#lpg=cid:CgIgAQ%3D%3D,ik:CAoSF0NJSE0wb2dLRUlDQWdJQ2NwYWoxdGdF" 
                target="_blank" rel="noopener noreferrer">
                {/* Visit Office Section */}
                  <div className="flex items-center justify-center rounded-lg">
                  <h1 className="text-lg font-bold text-cyan-800 ">Visit Building</h1>
            </div>
        </a>                        
  </div>
</div>
    )
  }
  export default SunPlazaCard