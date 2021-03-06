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
    console.log(selected, funds)

    return (<div className="mt-8 px-3 md:px-4">
        <div className="px-4 sm:px-6 md:px-8 text-center">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl leading-none font-extrabold text-gray-900 tracking-tight mb-6">
                เลือกกองทุนที่คุณต้องการ
            </h2>
        </div>
        <div className="relative z-10 bg-white rounded-tl-xl sm:rounded-t-xl lg:rounded-xl shadow-lg divide-y divide-gray-100">
            <div className="flex flex-wrap text-sm font-medium whitespace-pre">
                <div className="absolute top-0 right-0 rounded-full bg-blue-50 text-blue-900 px-2 py-0.5 sm:flex xl:flex items-center space-x-1">
                    เลือกกองทุนทั้งหมด {selected.length} กอง
                </div>
            </div>
            <nav className="p-4 text-sm font-medium">
                <ul className="flex space-x-2 overflow-x-auto">
                    {categories.map(({id,name}, index) => (
                    <li key={index} onClick={() => { setCategory(id) }}>
                        <div className={`px-4 py-2 cursor-pointer ${id == category ? "rounded-md bg-blue-100 text-blue-700": ""}`}> 
                            {name} ({funds.filter((fund) => fund.tags.includes(id) || id == "").length})
                        </div>
                    </li>))}
                </ul>
            </nav>
            <div className="overflow-auto" style={{height: "65vh"}}>
            {funds.filter((fund) => category == "" || fund.tags.includes(category))
                .map(({code, tags}, index) => (<article key={index} className="flex p-4 space-x-4">
                <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
                    <h2 className="text-base sm:text-lg lg:text-base xl:text-lg font-semibold text-black mb-0.5 truncate">
                        {code}
                    </h2>
                    {tags.map((tag) => <p key={tag} className="text-xs sm:text-base inline m-1 p-1 rounded bg-blue-300">{categories.find((i) => i.id == tag).name}</p>)}
                    <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
                        <div className="absolute top-0 right-0 rounded-full text-blue-900 px-2 py-0.5 sm:flex xl:flex items-center space-x-1">
                            <input type="checkbox" name={`${code}-selected`} id={`${code}-selected`} value={selected.includes(code)} onChange={() => {
                                if (selected.includes(code)) {
                                    setSelected(selected.filter((select) => select != code))
                                } else {
                                    setSelected(unique([...selected, code]))
                                }
                            }} />
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