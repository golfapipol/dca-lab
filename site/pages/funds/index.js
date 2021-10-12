import { useState } from "react"

export default function Funds() {
    const categories = [
        { id: "", name: "ทั้งหมด"},
        { id: "bond-market", name: "ตราสารหนี้"},
        { id: "stock-market", name: "ตราสารทุน"},
        { id: "option-market", name: "ทางเลือก"},
        { id: "global", name: "ลงทุนต่างประเทศ"},
    ]

    const funds = [
        { code: "B-ACTIVE", tags:["stock-market"] },
        { code: "B-INNOTECH", tags:["global"] },
        { code: "B-GOLD", tags:["option-market"] },
        { code: "B-ACTIVE", tags:["stock-market"] },
        { code: "B-INNOTECH", tags:["global"] },
        { code: "B-GOLD", tags:["option-market"] },
        { code: "B-ACTIVE", tags:["stock-market"] },
        { code: "B-INNOTECH", tags:["global"] },
        { code: "B-GOLD", tags:["option-market"] },
        { code: "B-ACTIVE", tags:["stock-market"] },
        { code: "B-INNOTECH", tags:["global"] },
        { code: "B-GOLD", tags:["option-market"] },
        { code: "B-ACTIVE", tags:["stock-market"] },
        { code: "B-INNOTECH", tags:["global"] },
        { code: "B-GOLD", tags:["option-market"] },
        { code: "B-ACTIVE", tags:["stock-market"] },
        { code: "B-INNOTECH", tags:["global"] },
        { code: "B-GOLD", tags:["option-market"] },
        { code: "B-ACTIVE", tags:["stock-market"] },
        { code: "B-INNOTECH", tags:["global"] },
        { code: "B-GOLD", tags:["option-market"] },
    ]
    const [category, setCategory] = useState('')
    const [selected, setSelected] = useState([])
    
    const unique = (array) => [...new Set(array)]

    return (<div className="mt-8 px-3 md:px-4">
        <div className="px-4 sm:px-6 md:px-8 text-center">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl leading-none font-extrabold text-gray-900 tracking-tight mb-6">เลือกกองทุนที่คุณต้องการ</h2>
        </div>
        <div className="relative z-10 bg-white rounded-tl-xl sm:rounded-t-xl lg:rounded-xl shadow-lg divide-y divide-gray-100">
            <nav className="p-4 text-sm font-medium">
                <ul className="flex space-x-2">
                    {categories.map(({id,name}, index) => (
                    <li key={index} onClick={() => { setCategory(id) }}>
                        <div className={`px-4 py-2 cursor-pointer ${id == category ? "rounded-md bg-blue-100 text-blue-700": ""}`}> {name}</div>
                    </li>))}
                </ul>
            </nav>
            <div className="overflow-auto" style={{height: "65vh"}}>
            {funds.filter((fund) => category == "" || fund.tags.includes(category))
                .map(({code}, index) => (<article key={index} className="flex p-4 space-x-4">
                <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
                    <h2 className="text-base sm:text-lg lg:text-base xl:text-lg font-semibold text-black mb-0.5 truncate">{code}</h2>
                    <dl className="flex flex-wrap text-sm font-medium whitespace-pre" onClick={() => {
                        if (selected.includes(code)) {
                            setSelected(selected.filter((select) => select != code))
                        } else {
                            setSelected(unique([...selected, code]))
                        }
                    }}>
                        <div className="absolute top-0 right-0 rounded-full bg-blue-50 text-blue-900 px-2 py-0.5 sm:flex xl:flex items-center space-x-1">
                            <dt className={`${ selected.includes(code) ? "text-blue-500": ""}`}>
                                <svg width="16" height="20" fill="currentColor">
                                    <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z"></path>
                                </svg>
                            </dt>
                        </div>
                    </dl>
                </div>
            </article>))}
            </div>
        </div>
        <div class="flex flex-wrap justify-center mt-5 space-y-0 space-x-4 text-center ">
            <a class="w-full bg-gray-900 hover:bg-gray-700 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200" href={`/funds/${selected.join(",")}`}>Find Out</a>
        </div>
        {/* <h1 className="inline-block text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            กองทุนตราสารหนี้
        </h1>
        <div className="px-3 md:px-4 flex-none"> 
            <figure className="shadow-lg rounded-xl flex-none w-80 md:w-xl">
                <figcaption className="flex items-center space-x-4 p-6 md:px-10 md:py-6 bg-gradient-to-br rounded-xl leading-6 font-semibold text-white bg-blue-500">
                    <div className="flex-auto">
                        Aaron Bushnell
                    </div>
                    <cite className="flex">
                        <a href="https://twitter.com/lukeredpath/status/1316543571684663298?s=21" className="opacity-50 hover:opacity-75 transition-opacity duration-200">
                            <span className="sr-only">Original tweet by Aaron Bushnell</span>
                            <svg width="33" height="32" fill="currentColor"><path d="M32.411 6.584c-1.113.493-2.309.826-3.566.977a6.228 6.228 0 002.73-3.437 12.4 12.4 0 01-3.944 1.506 6.212 6.212 0 00-10.744 4.253c0 .486.056.958.16 1.414a17.638 17.638 0 01-12.802-6.49 6.208 6.208 0 00-.84 3.122 6.212 6.212 0 002.762 5.17 6.197 6.197 0 01-2.813-.777v.08c0 3.01 2.14 5.52 4.983 6.091a6.258 6.258 0 01-2.806.107 6.215 6.215 0 005.803 4.312 12.464 12.464 0 01-7.715 2.66c-.501 0-.996-.03-1.482-.087a17.566 17.566 0 009.52 2.79c11.426 0 17.673-9.463 17.673-17.671 0-.267-.007-.536-.019-.803a12.627 12.627 0 003.098-3.213l.002-.004z"></path>
                            </svg>
                        </a>
                    </cite>
                </figcaption>
            </figure>
        </div> */}
        
    </div>)
}