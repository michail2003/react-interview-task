import React from 'react'

const CustomButton = ({buttonFunction, bgColor, hoverColor, Icon, label}) => {
    return (

        <button className={`cursor-pointer flex w-40 rounded-lg transition-colors duration-300 group h-10`}
            onClick={buttonFunction}

            style={{backgroundColor: bgColor}}
            onMouseEnter={(e)=> (e.currentTarget.style.backgroundColor = hoverColor)}
            onMouseLeave={(e)=> (e.currentTarget.style.backgroundColor = bgColor)}
            >
            <div className='text-white font-semibold  w-full border-r border-black/10 group-hover:border-white/20 transition-colors duration-300 flex items-center justify-center'>
                {label}
            </div>
            <div className='flex items-center px-1'>{Icon && <Icon color={'white'} />}</div>

        </button>

    )
}

export default CustomButton