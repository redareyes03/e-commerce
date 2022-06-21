import React from 'react'

function Alert({type, title, body}) {

    const types = {
        success: () => "bg-green-100 border-green-400 text-green-700",
        error: () => "bg-red-100 border-red-400 text-red-700",
        warning: () => "bg-orange-100 border-orange-400 text-orange-700",
        info: () => "bg-blue-100 border-blue-400 text-blue-700",
    }

    const ref = React.useRef(null)


    return (
        <div ref={ref} className={"border px-4 py-3 rounded relative my-4 " + types[type]()} role="alert">
            {title && <h4 className="font-bold mr-3 text-2xl">{title}</h4>}
            <span className="block sm:inline text-xl">{body}</span>
            <span onClick={() => {
                ref.current.remove()
            }} className="absolute top-1/2 right-[calc(1rem)] -translate-y-1/2">
                <svg className="fill-current h-6 w-6 " role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>
        </div>
    )
}

export default Alert