import OpsieLogo from '../assets/opsie/opsie_full_inverted.jpg'

const Footer = () => {

  const redirectToFacebook = () => {
    window.open('https://www.facebook.com/', '_blank', 'noopener noreferrer');
  };

  const redirectToInstagram = () => {
    window.open('https://www.instagram.com/', '_blank', 'noopener noreferrer');
  };

  const redirectToLinkedIn = () => {
    window.open('https://www.linkedin.com/', '_blank', 'noopener noreferrer');
  };

  const redirectToTiktok = () => {
    window.open('https://www.tiktok.com/', '_blank', 'noopener noreferrer');
  };

  return (
    <div className='w-[99%] z-5 m-auto my-3 flex flex-col gap-4 py-4 rounded-2xl shadow-xl/30'>

      <div className='flex flex-col min-[550px]:flex-row w-full'>

        <div className='w-full min-[550px]:w-[40%] flex flex-col px-4 items-center'>
          <div className='w-full flex justify-center'>
            <img
              src={OpsieLogo}
              className='w-[200px] object-fill'
              alt='logo'
            />
          </div>
        </div>

        <div className='w-full min-[550px]:w-[60%] flex flex-col min-[550px]:flex-row justify-between gap-12 mb-6 px-6 py-4'>

          <div className='w-full flex flex-col justify-between gap-3 min-[550px]: w-[30%]'>
            <div className='h-[37.5%] flex items-center justify-center mb-3 text-2xl font-bold text-center cursor-pointer transition-all duration-200 transform hover:text-[#3CBDE6] hover:scale-105'>
              Home
            </div>
            <div className='h-[15%] flex justify-center text-center cursor-pointer transition-all duration-200 transform hover:text-[#3CBDE6] hover:scale-105'>Lorem Ipsum</div>
            <div className='h-[15%] flex justify-center text-center cursor-pointer transition-all duration-200 transform hover:text-[#3CBDE6] hover:scale-105'>Lorem Ipsum</div>
            <div className='h-[15%] flex justify-center text-center cursor-pointer transition-all duration-200 transform hover:text-[#3CBDE6] hover:scale-105'>Lorem Ipsum</div>
            <div className='h-[15%] flex justify-center text-center cursor-pointer transition-all duration-200 transform hover:text-[#3CBDE6] hover:scale-105'>Lorem Ipsum</div>
          </div>

          <div className='w-full flex flex-col justify-between gap-3 min-[550px]: w-[30%]'>
            <div className='h-[37.5%] flex items-center justify-center mb-3 text-2xl font-bold text-center cursor-pointer transition-all duration-200 transform hover:text-[#3CBDE6] hover:scale-105'>
              What We Do
            </div>
            <div className='h-[15%] flex justify-center text-center cursor-pointer transition-all duration-200 transform hover:text-[#3CBDE6] hover:scale-105'>Lorem Ipsum</div>
            <div className='h-[15%] flex justify-center text-center cursor-pointer transition-all duration-200 transform hover:text-[#3CBDE6] hover:scale-105'>Lorem Ipsum</div>
            <div className='h-[15%] flex justify-center text-center cursor-pointer transition-all duration-200 transform hover:text-[#3CBDE6] hover:scale-105'>Lorem Ipsum</div>
            <div className='h-[15%] flex justify-center text-center cursor-pointer transition-all duration-200 transform hover:text-[#3CBDE6] hover:scale-105'>Lorem Ipsum</div>
          </div>

          <div className='w-full flex flex-col justify-between gap-3 min-[550px]: w-[30%]'>
            <div className='h-[37.5%] flex items-center justify-center mb-3 text-2xl font-bold text-center cursor-pointer transition-all duration-200 transform hover:text-[#3CBDE6] hover:scale-105'>
              Who We Are
            </div>
            <div className='h-[15%] flex justify-center text-center cursor-pointer transition-all duration-200 transform hover:text-[#3CBDE6] hover:scale-105'>Lorem Ipsum</div>
            <div className='h-[15%] flex justify-center text-center cursor-pointer transition-all duration-200 transform hover:text-[#3CBDE6] hover:scale-105'>Lorem Ipsum</div>
            <div className='h-[15%] flex justify-center text-center cursor-pointer transition-all duration-200 transform hover:text-[#3CBDE6] hover:scale-105'>Lorem Ipsum</div>
            <div className='h-[15%] flex justify-center text-center cursor-pointer transition-all duration-200 transform hover:text-[#3CBDE6] hover:scale-105'>Lorem Ipsum</div>
          </div>

        </div>
      </div>

      <hr className='w-[95%] mx-auto' />

      <div className='w-full flex flex-col min-[550px]:flex-row items-center min-[550px]:justify-evenly gap-6 mt-4'>

        <div className='flex gap-4 items-center'>
          <img
            className='cursor-pointer transition-all duration-200 hover:scale-110'
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACzklEQVR4nO2Zz2sTQRTHF/Iv1My8TTY2SY2obW0b0NpsdhITkCiKUiPB1mPx5kHas4UK4qEHQaWCnjyoN4UWMc3ivyDeRc0vtEdtPBVGZqPJkibpzm52k+h+4TGwG2bf5+28N5s3guDKlStXAy2M5UMIyAbCSgmDsoeBUHtN2UOYFLVnonjQkvMIxc9iIN/td5p0sh9ekaRNOQ9ARjAo3/roPGWGgOwgdMbLH30gG81JlC8YJ4ggZD2C7cp6AIiMQfmse/5j7mnYOmxEQnPeWSGkJBsAmHzlnkCfsM5EvlVZjz6xBV7p12HrvTm1fDSmVt7KheovWa1SuwzrfJC3y5GeAPxxfpfboUKFTt9/Q8MXl6nv+GUKUopif4qKY+ep/8QVGllY6woQK1R+KvnSEe4cYKP+uhZ5TufnNj/R0Llb3SuOmOj+BupB2DIM4PXJkwjIXTbqr8tqtcYLEL60YqhkygcBqNWaYFW8zkcfqoZrvnwwAHUcIJK7Y8h5kFKDCRCIXu/ocCS3So8trWs2s77VWwC2kSBQnrPRCoAYyrQFmLr3mq+McgMA2fn7LWIFgFWXtus9X7QXoNM+wA1gMGFlF6BF/yVAUFkyXPNbbTRxs/8AZp3HQLRqNdQAh0/d2DefNHVNu8fGgQcIX7i9b77TLz/Q8eWn2ugIwCgxlwMgpejJ1ReGEnuoqpA87AATK8+oNJ3TxqEEgEC6vsQC6eEEwO5ODC4A7SOA0rax5RRALF9q7hO+JD+AvrXIepVOA0QfNZsB/ol5EwBAnuibu/W/llmP3QCx7bLWyZAmrzZ+G1lcMwGA4kHWnzfzadBLE0MZOvvqIz8AEztc6OcZgRjK0JkH75pvR63sCmYOOlh/nrW4nThiAl+S+sfntWWjj7wGUKhsClbFusSs0cqbC1Ytxtvc7SY2EWu0mumTmrAai/zs++JYT5x35eof028tiWgnA1knqAAAAABJRU5ErkJggg=='
            alt='facebook'
            onClick={redirectToFacebook} />

          <img 
            className='cursor-pointer transition-all duration-200 hover:scale-110' 
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFQElEQVR4nO1Z62/bVBRPef0DW+frpFlHH+sjEkvTBW2xY9MJ8VxfW1cKSIiNwacNpIqKAR+QkEinbh1C6zQhxIZ4fIG+tHVFW2zgA4/y+MjoOnUgRuzv0Gpo0rSLzm1iXzuJfe08QKJXOkpk+557fj6/c869x4HA+lgf6+N/NWp4XhY5Xj7O8dKPCMka4qVbiJexP5FugQ7QBTpBN6xREcs5LrmLGO3bWDbhAAyX3FVG0/fdiZB8tNKGozwg8ruBgHxXGYyXZm1uX0W8PLEpKD+4IZwIwjOl6N8QTgRBF+jM6jbXQtJsSfo5Xh63uXeytlZGgQqN2loZwRo2T4z7UgY8tL35sYoFmHXUwFoWEJzUFfA4auiA5Xjps2LGd/6E7xYVfUBU9Y9FRV8UVG1VVHXsVwRFWxHTmcUtD7zwOx3Ynl4ez0tJ6s2vFKNN8gutV1D1q6UYHBu/gOsi/URiJ+aN6ztnFnGw4RHDC9kUyzYgJ1MunMh74A18h6joo6UYnpO6SL9hZF1kj+VeyzMp417D48MLsC4rgB9yEyFD2O8XNf7SdRxNTeHm/iM4HBvCwS0PEYH/zXtexdG3psgzrABi71w07tULB7Co6CkmAIiX9dzEjRuTvJ02oqLdthsfTU3j8H37XPN7eNsg7jg6axp5Yp4YDhJ7+3OLzh1Tl01wbX0Y1k2omR4GAOb2gM7DELB2zgvpDG49MOa5ULU+d4zMdQzodMaMgVBX9rp2rf3Tn+9x84Ax0UadAfsiduNDLT048uIpHD+7gBPzvxGJn/kWRw6fwqGW7jwQokuM0M8b1xV9wC+ATyy0GZ2xLNDU9wpOzF0rakxibhk39Y5Y5nRQdGIFIKjaR44AOCTfJPkXyTfp64KqL9EBS3O+qf8IcNQ98yiaBUQ4OpgX2AweuOLsASSlOCT9Db8WAFBkjKCdstDG6c0X8gRNp2hq2psHFG0l4GfQiiEt5hQD573m/8ihCdN7e18vXifa+swsRF0vGcDm6BOGAfEPFjwDuP/MdyaNYkNFn4u/9zVufXaU/JYVQPDehw0DEhd+9QwA5qDsfNDldb6joZt46SUOyUvwWzEAc8smgIZHywuAQ/KNbBa6UQxAuGPIpNBZ7xSC2oAqRaGidYAO4r2vmUF82HsQtx86acxvHihzELMAgI2ZmUa7CSVYjd95fhmHtu420+jojLc6UA4ApJBtGzRTYe8IYyHL4Mbuly2FTLh4/V8AoOpkG2DZSvSOOHoC3jxtPIKtxNg5R8AVBQDSevCYbTPXTYoUBClkJ5D4+98QztO0AWk7eNzVYz4BFN5OF1qAbKdtIFik7flxQifv22kWAKRluDZxrfdTHABNJ+Czm+HwTHTsPFuwT5oHmlC7hyxU7Ejpuig5Uk6TFBvufJIUO5DNnU+R/Q5kG6eAFW2Sd6T0AKDgoZ514XJJC3Wotx9+HAFAC8MEIK3mzsXVNH7H5GXSEMjZsf30V+wACjS2JuGaqGh/VQWAouHGHvPQUy/st9UY7U9frUUxrV2phvGttqzWeTJte0ZfdAVQqLkL7T5wbSVp00i9+ULcBxEU7UPf7XXgJQQXZAjo27i1RpxESGeIDtAFOmnOk8q+e7iwfreuxH/hA8fWp9/EwqU/8kGr+hL0pzwAqO4npnphfz7nzfhg68y5feRreGz4eygssEeHEu/XWD7URXSALgjc7ae/dN7RsvZGXcdadzpVqEdaocx0mxjP2p1mHeDOUr8PiG6BrupXS6WN48j7QkM1v3wZrGgrgqr9Au1D0OsrYNdHoHrjH9QZPjpKKCJUAAAAAElFTkSuQmCC'
            alt='instagram-new'
            onClick={redirectToInstagram} 
          />

          <img 
            className='cursor-pointer transition-all duration-200 hover:scale-110' 
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC5klEQVR4nO2Yz28SQRTHN+mfoOm8Wahs8Vc8UJNqDJVhBoT+OitHf8TWmGh75268mtjUHzd7MqmNVxOBTf+HJp6twKIxNLE9N46ZpcACC+2y7ABmX/IyJDO8+X5m3sxsnqL45ptvvo20YczOI0zfIqAlwPQYMOPeOj1GwIoIs/cAyZAr8QjRJGD6y3vRrJsfIRS/0/fKD1k8F44w+43Q3KTz1cf0XSMIsB9iNxQlM6F4bpkJgDhFmO5bIN44DiPysBHAFC/XJtVEqglA9x0HsB5Y68qz3VIwphs7pGAcEb3CvfJYvtxMpUDiL82VLjsEaOahVTzRKwdeCicWt2oQ80YLxYArAHPl9QqPbu/xcPoZV7UFHk4/59FPezIAOCkY264A6mkjxFv7w/NrUgBiuvHHHcBJYHV6sSW4Gl6SswN6hQ8EQKTNMHaADArAPAPza+ZOTC+syzsD+oAAZDm4AUBAq7VXmFbHEgDjxCIA/SjadoBQ7HFLcC2+wnv1xb4WeSS7xTW6al69wsXvSHaLk1zRGwA7swvcPoFdX+jW/a4fa6HoQx79/G20AU7z0Nwj251wd4iB3QRgr0XrNQBgxiPZDwMHMMw/AzPcAkzNZPjsRo7f/vKdz27k+dTMvY4xGl2Vd406BRDircIERPsY1eY1h2Cq1h9MDRegI79zxZ4xyIlfe/qK4wtpsx0uwCk3DPQY1+4+APEBKmced/3FDtfYE7MdSwA1vNRxQ40VAIzKOzByABpZ6fqK9uqz+lnGgVcAshzcAXQWtmSKj+VKDfE4kHQOYC0tYkzjsgFubBYaAMHI3T4A2oq7olYpyn2er3y+bIoXouvzX33wsg8AxDRRn7e7LWR64OJyS9VDcV4hpj+HJV4NL5uf3o3dcVKZq5uqps4BZpsijUSV2GvROJA000ekTXu9SdRmFTdG8uUrRK9UZV+npOYH0d3iJcWtiRK3qBIT3TiUI9w4FCs/EPG++fYf2j8q4ekOtpPVDwAAAABJRU5ErkJggg=='
            alt='linkedin'  
            onClick={redirectToLinkedIn}
          />

          <img 
            className='cursor-pointer transition-all duration-200 hover:scale-110' 
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADc0lEQVR4nO2Z30/TUBTHm/DsE0rvLZuToZgRxAGJsK30MkBh8cUEpzxI9M0A+sK/oIL6YPihBk141ZiomxNjhDX6H5D4gghGhW1RHxUwBpJrTje6srG5du3amJ3k5CZr2n4/555z1pzLMGUrW9nKZmlDiD/AYjLNImENYWEbYUKNdWGbRWRVeifbXlOUeJZt70SYfDdeNMnlP6s40q1JPMZkP8LCNxPFU3AWkx8s66lSH31MptMPEb4g1EEYJljBGG7BCowJj7DwWfH++6ofA3koR0ISX1pjWcEvAyDyVf0DENlM3fynNJHPtGCFsrAZtYaQMMoi4Tesmde8YuyoT4y/5qOJTV5MUKMcKWqBn4/VMXpYSvy6GiGuy3coPtgtrVoBfNH4L2Fu7UjRAFLk1UbS1pUUYuuivvmYth0QE5SPxl+pEltZ6d2X+RsvJjaKSYXWxwvaAcTERsHiESIzyQ5EZjIAisrl+itTxQDQwgGwsJXqAFt6AmDHSdoy/a4UAES+WU+AHYj64Una+mghb01YFmAXjK0zZ3eyJIDDcykLgjt0ylwAT2iRugbHqaN1QBJjbwxK6bGnkGiMHr/+lNaeHqE21xmK7V3m7oB79DnlnL1ZUW0YeZhXiCWK2D0WoojryBKfdwesAuAJLe6KvL25nzbdjlDv7KeChJgO4Boc3yXe+3JFlRDTARwnBuTrEHm1QgpxzhlIdilnQH8ArqZHvr5X2ugB4L7xjDp7rkqraQDe2ZV0v3f2qgLg93DdAKDnyyl060XuKI6F039ibRetA+AamkgXcVM/9UaWs6MfWaZ297n0l+jwlHUAPKEPcpGBH3Sfp003w1LKgEPkleKrawPUE16yDgCf548syzl/3jTjc9VP5KN0H6yGAOzkOEQ3l3i4pkU8D3WW+vCD1TAAKZ3CS1JNQJFCdwKHl9YPTRaVNsgqn9MmAQjyJFo52CqVeN/cmiweV/vVAyhHizCrLDVAyz1RBrAd69MAgMkD5XAXZpWwE4ZHfj5GW+6K1N54Vgaou3BNAwDbXgPz+X+2SIOdcwZo25P36gHA4HDBzDMCzhmgzRNv0rsjxtcZLQcdMJ+HEXcpjphwtZ/aGvqktFFGXgKIxmeZYg2mxDBoLWU75ZPi9RnugsGDYNCqZU6qwTcg8m1vVw/rIr5sZfvP7C/9OeXVR31XUgAAAABJRU5ErkJggg=='
            alt='tiktok'  
            onClick={redirectToTiktok} 
          />
        </div>

        <div className='font-semibold text-center'>
          Copyright © {new Date().getFullYear()} Opsie Software Solutions Inc.
        </div>

      </div>
    </div>
  )
}

export default Footer
