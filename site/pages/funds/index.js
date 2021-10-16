import { useState } from "react"
import funds from "../../funds"

export default function Funds() {
    const categories = [
        { id: "", name: "ทั้งหมด"},
        { id: "bond-market", name: "ตราสารหนี้"},
        { id: "mix-market", name: "แบบผสม"},
        { id: "stock-market", name: "ตราสารทุน"},
        { id: "option-market", name: "ทางเลือก"},
        { id: "global", name: "ลงทุนต่างประเทศ"},
        { id: "rmf", name: "RMF"},
        { id: "ssf", name: "SSF"},
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
                <ul className="flex space-x-2 overflow-x-auto">
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
        <div className="flex flex-wrap justify-center mt-5 space-y-0 space-x-4 text-center ">
            <a className="w-full bg-gray-900 hover:bg-gray-700 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200" href={`/funds/${selected.join(",")}`}>Find Out</a>
        </div>
    </div>)
}