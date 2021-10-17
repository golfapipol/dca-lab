import {useState, useEffect} from 'react'
import dayjs from 'dayjs'
import {
    calculateCost, mergeTransaction, currentValueGroup, currentValue, percentChange
} from '../../dca'

export async function getServerSideProps({query}) {
    return {
        props: {
            codes: query.codes.split(",").map((fund) => ({
                code: fund,
                amount: 500,
            })),
        }
    }
}

export default function Codes({codes}) {
    
    const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    const now = dayjs().startOf('d')
    const durations = [
        {value: now.add(-1, 'd').unix(), label:"เมื่อวาน"}, 
        {value: now.add(-7, 'd').unix(), label:"สัปดาห์ที่แล้ว"}, 
        {value: now.add(-1, 'M').unix(), label:"เดือนที่แล้ว"},
        {value: now.add(-6, 'M').unix(), label:"ครึ่งปีที่แล้ว"},
        {value: now.add(-1, 'y').unix(), label:"ปีที่แล้ว"},
        {value: now.add(-3, 'y').unix(), label:"3 ปีที่แล้ว"}, 
        {value: now.add(-5, 'y').unix(), label:"5 ปีที่แล้ว"},
        {value: now.add(-10, 'y').unix(), label:"10 ปีที่แล้ว"}, 
        {value: now.add(-20, 'y').unix(), label:"20 ปีที่แล้ว"}, 
    ]
    const [since, setSince] = useState(durations[4].value)
    const [day, setDay] = useState(25)
    const [report, setReport] = useState("all")
    const [funds, setFunds] = useState(codes)
    const [totalAmount, setTotalAmount] = useState(codes.reduce((total, fund) => total + fund.amount, 0))
    const formatNumber = (number) => new Intl.NumberFormat().format(number)
    let cost = calculateCost(funds, since, day)
    let valueFunds = currentValueGroup(funds, since, day)
    let networth = currentValue(valueFunds)
    let change = percentChange(networth, cost)
    let fundUnits = mergeTransaction(funds, since, day)

    useEffect(() => {
        setTotalAmount(funds.reduce((total, fund) => total + fund.amount, 0))
        cost = calculateCost(funds, since, day)
        valueFunds = currentValueGroup(funds, since, day)
        networth = currentValue(valueFunds)
        change = percentChange(networth, cost)
        fundUnits = mergeTransaction(funds, since, day)

    }, [funds, day, since])

    console.log("fundUnits", fundUnits)
    return (<div className="mt-8 px-3 md:px-4">
        <div className="px-4 sm:px-6 md:px-8 text-center">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl leading-none font-extrabold text-gray-900 tracking-tight mb-6">ลงทุนยังไงดี?</h2>
        </div>
        <article className="text-gray-600 leading-6">
            <dl className="transition-opacity duration-1500 delay-500 flex flex-wrap divide-y divide-gray-200 border-b border-gray-200">
                <div className="w-full flex-none flex items-baseline px-4 sm:px-6 py-4">
                    <dt className="w-2/5 sm:w-1/3 flex-none uppercase text-xs sm:text-sm font-semibold tracking-wide">ลงทุนทุกวันที่</dt>
                    <dd className="text-black text-sm sm:text-base">
                        <select className="appearance-none" value={day} onChange={(event) => {
                            setDay(event.target.value)
                        }}>
                            {days.map((day,index) => (<option key={index} value={day}>{day}</option>))}
                        </select>
                    </dd>
                </div>
                {codes.length > 1 ? (<div className="w-full flex-none flex items-baseline px-4 sm:px-6 py-4 opacity-25">
                    <dt className="w-2/5 sm:w-1/3 flex-none uppercase text-xs sm:text-sm font-semibold tracking-wide">เดือนละ</dt>
                    <div className="custom-number-input h-10 w-32">
                        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                            <input type="number" className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" 
                                value={totalAmount}
                                onChange={() => {
                                    setTotalAmount(event.target.value)
                                }} disabled={true}/>
                            
                        </div>
                    </div>
                    <dd className="text-black text-sm sm:text-base ml-2">
                        บาท
                    </dd>
                </div>): null}
            </dl>
            <dl className="transition-opacity duration-1500 delay-500 flex flex-wrap ">
                {funds.map((fund, index) => (<div key={index} className="w-full flex-none flex items-baseline px-4 sm:px-6 py-4">
                    <dt className="w-2/5 sm:w-1/3 flex-none uppercase text-xs sm:text-sm font-semibold tracking-wide">{fund.code}</dt>
                    <div className="custom-number-input h-10 w-32">
                        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                            <button data-action="decrement" className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none" onClick={() => {
                                if (fund.amount < 500) {
                                    return
                                }
                                funds[index] = {
                                    code: fund.code,
                                    amount: fund.amount -500,
                                }
                                setFunds([...funds])
                                
                                console.log("decrese funds", funds)
                            }}>
                                <span className="m-auto text-2xl font-thin">−</span>
                            </button>
                            <input type="number" className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" 
                                value={fund.amount}
                                onChange={(event) => {
                                    console.log('onchange', event)
                                    funds[index].amount = event.target.value
                                    setFunds(funds)
                                    console.log("onChange funds", funds)
                                }} />
                            <button data-action="increment" className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer" onClick={() => {
                              funds[index].amount += 500
                              setFunds([...funds])
                              console.log("increase funds", funds)
                            }}>
                                <span className="m-auto text-2xl font-thin">+</span>
                            </button>
                        </div>
                    </div>
                    <dd className="text-black text-sm sm:text-base ml-2">
                        บาท
                    </dd>
                </div>))}
                
            </dl>
        </article>
        <div className="px-4 sm:px-6 md:px-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl leading-none font-extrabold text-gray-900 tracking-tight mb-6">ถ้าเราลงทุนไว้ในอดีต DCA ทุกเดือน </h2>
        </div>
        <article className="leading-6">
            <dl className="transition-opacity duration-1500 delay-500 flex flex-wrap divide-y divide-gray-200 border-b border-gray-200">
                <div className="w-full flex-none flex items-baseline px-4 sm:px-6 py-4">
                    <dt className="w-2/5 sm:w-1/3 flex-none uppercase text-xs sm:text-sm font-semibold tracking-wide">ลงทุนเมื่อ</dt>
                    <dd className="text-black text-sm sm:text-base">
                        <select className="appearance-none" value={since} onChange={(event) => {
                            setSince(event.target.value)
                        }}>
                            {durations.map(({label, value}) => (<option key={value} value={value}>{label}</option>))}
                        </select>
                    </dd>
                </div>
                <div className="w-full flex-none flex items-baseline px-4 sm:px-6 py-4">
                    <dt className="w-2/5 sm:w-1/3 flex-none uppercase text-xs sm:text-sm font-semibold tracking-wide">เงินลงทุนทั้งหมด</dt>
                    <dd className="text-black text-sm sm:text-base">{formatNumber(cost)}</dd>
                </div>
                <div className="w-full flex-none flex items-baseline px-4 sm:px-6 py-4">
                    <dt className="w-2/5 sm:w-1/3 flex-none uppercase text-xs sm:text-sm font-semibold tracking-wide">มูลค่าสุทธิ ณ ปัจจุบัน</dt>
                    <dd className={`${change > 0 ?"text-green-400": "text-red-400"} text-sm sm:text-base`}>{formatNumber(networth)} ({change}%)</dd>
                </div>
                {valueFunds.map((valuefund, index) => {
                    const change = percentChange(valuefund.value, valuefund.cost)
                    return (
                    <div key={index} className="w-full flex-none flex items-baseline px-4 sm:px-6 py-4">
                        <dt className="w-2/5 sm:w-1/3 flex-none uppercase text-xs sm:text-sm font-semibold tracking-wide">{valuefund.code}</dt>
                        <dd className={`${change > 0 ?"text-green-400": "text-red-400"} text-sm sm:text-base`}>{formatNumber(valuefund.cost)} => {formatNumber(valuefund.value)} ({change}%)</dd>
                    </div>)
                })}
                <div className="w-full flex-none flex items-baseline px-4 sm:px-6 py-4 justify-center">
                    <dt className="flex-none uppercase text-xs sm:text-sm font-semibold tracking-wide text-center">
                        <p>"เราย้อนเวลากลับไปลงทุนไม่ได้ แต่เริ่มได้วันนี้"</p>
                        <p>รับปรึกษาการวางแผนการลงทุน ติดต่อ <a className="underline text-blue-400" target="_blank" href="https://www.facebook.com/Grace.Programmable.Wealth">เพจ ความมั่นคั่งออกแบบได้</a></p>
                    </dt>
                </div>
            </dl>
        </article>
        <div className="mt-8 px-3 md:px-4">
            <div className="flex-auto flex space-x-3">
                <button className="w-1/2 flex items-center justify-center rounded-md bg-blue-500 text-white py-4" type="button" onClick={() => {
                    let url = encodeURI(`https://www.facebook.com/sharer/sharer.php?quote=ถ้าฉันลงทุนใน ${codes.map((f) => `${f.code}`).join(", ")} เดือนละ ${formatNumber(totalAmount)} บาท ตั้งแต่ ${dayjs.unix(since).format("YYYY/MM/DD")} มันจะมีมูลค่าเป็น ${formatNumber(networth)} บาท (${change}%) อยากรู้ว่าถ้าเราลง DCA กองทุนจะขาดทุนไหม&u=${window.location.origin}`)
                    window.open(url, "_blank");
                }}>
                    Share
                </button>
                
                <button className="w-1/2 flex items-center justify-center rounded-md bg-blue-500 text-white py-4" type="button" onClick={() => {
                    let url = encodeURI(`https://twitter.com/share?text=ถ้าฉันลงทุนใน ${codes.map((f) => `${f.code}`).join(", ")} เดือนละ ${formatNumber(totalAmount)} บาท ตั้งแต่ ${dayjs.unix(since).format("YYYY/MM/DD")} มันจะมีมูลค่าเป็น ${formatNumber(networth)} บาท (${change}%) อยากรู้ว่าถ้าเราลง DCA กองทุนจะขาดทุนไหม&url=${window.location.origin}`)
                    window.open(url, "_blank");
                }}>
                    <svg className="w-3 h-3 fill-current text-white mr-1" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.2896 16.251C13.8368 16.251 17.9648 9.99824 17.9648 4.57584C17.9648 4.39824 17.9648 4.22144 17.9528 4.04544C18.7559 3.46457 19.4491 2.74534 20 1.92144C19.2511 2.25328 18.4567 2.4709 17.6432 2.56704C18.4998 2.05423 19.1409 1.24766 19.4472 0.29744C18.6417 0.775404 17.7605 1.11225 16.8416 1.29344C16.2229 0.635588 15.4047 0.199975 14.5135 0.0540106C13.6223 -0.0919534 12.7078 0.0598692 11.9116 0.485984C11.1154 0.9121 10.4819 1.58875 10.109 2.41123C9.73605 3.23371 9.64462 4.15616 9.8488 5.03584C8.2174 4.95405 6.62144 4.5301 5.16451 3.79151C3.70759 3.05292 2.42227 2.01619 1.392 0.74864C0.867274 1.65197 0.70656 2.72133 0.942583 3.73899C1.17861 4.75665 1.79362 5.6461 2.6624 6.22624C2.00939 6.20689 1.37062 6.03073 0.8 5.71264C0.8 5.72944 0.8 5.74704 0.8 5.76464C0.800259 6.71201 1.12821 7.63014 1.72823 8.36328C2.32824 9.09642 3.16338 9.59945 4.092 9.78704C3.4879 9.95179 2.85406 9.97588 2.2392 9.85744C2.50141 10.6728 3.01189 11.3858 3.69926 11.8967C4.38662 12.4076 5.21649 12.691 6.0728 12.707C4.61979 13.849 2.82485 14.4689 0.9768 14.467C0.650323 14.4664 0.324163 14.4466 0 14.4078C1.87651 15.6121 4.05993 16.2508 6.2896 16.2478" />
                    </svg>
                    Tweet
                </button>
            </div>
        </div>
        <article className="leading-6 container ">
            <nav className="p-4 text-sm font-medium flex justify-center mx-auto">
                <ul className="flex space-x-2 overflow-x-auto">
                    <li onClick={() => {
                        setReport("all")
                    }}>
                        <div className={`px-4 py-2 cursor-pointer ${report == "all"? "rounded-md bg-blue-100 text-blue-700": ""}`}>รายการทั้งหมด</div>
                    </li>
                    {funds.map(({code}, index) => (
                    <li key={index} onClick={() => {
                        setReport(code)
                    }}>
                        <div className={`px-4 py-2 cursor-pointer ${report == code? "rounded-md bg-blue-100 text-blue-700": ""}`}> {code} </div>
                    </li>))}
                </ul>
            </nav>
            <table className="table-auto justify-center mx-auto w-full divide-y divide-gray-300 border-b shadow my-2 mx-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th>วันที่ลงทุน</th>
                        <th>กองทุน</th>
                        <th>ราคา NAV</th>
                        <th>จำนวนหน่วย</th>
                        <th>กำไร/ขาดทุน</th>
                    </tr>
                </thead>
                <tbody>
                {fundUnits.filter((trx) => report == "all"|| trx.CODE == report).map((transaction, index) => {
                    const percent = percentChange(transaction.latestNAV, transaction.nav)
                    return (
                    <tr key={index}>
                        <td className="text-center">{transaction.DATE}</td>
                        <td className="text-center text-xs sm:text-base">{transaction.CODE}</td>
                        <td className="text-center">{formatNumber(transaction.nav)}</td>
                        <td className="text-center">{formatNumber(transaction.unit)}</td>
                        <td className={`text-center ${percent > 0 ? "text-green-400": "text-red-400"}`}>{percent}%</td>
                    </tr>
                )})}
                    
                </tbody>
            </table>
        </article>

        <style jsx>{`
            input[type='number']::-webkit-inner-spin-button,
            input[type='number']::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            
            .custom-number-input input:focus {
                outline: none !important;
            }
            
            .custom-number-input button:focus {
                outline: none !important;
            }
        `}</style>
    </div>)
  }
  