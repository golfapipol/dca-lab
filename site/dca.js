import dayjs from 'dayjs'

export const sameDay = (begin, day, histories) => (history) => {
    const current = dayjs(history.DATE)
    if (current.isBefore(begin)) {
        return false
    }
    if (current.date() == day) {
        return true
    }

    const dcaDate = dayjs(`${current.year()}/${(current.month()+1).toString().padStart("2", "0")}/${(""+day).padStart("2", "0")}`)
    let index = histories.indexOf(history)
    if (index == histories.length-1) {
        return false
    }
    let previous = dayjs(histories[index+1].DATE)
    // 20 24   26 27
    //    DCA   ^  
    // 25 26 27
    //     ^ DCA  
    if (current.isAfter(dcaDate) && previous.isBefore(dcaDate)) {
        return true
    }
}
export const calculateUnit = (amount, latestNAV) => (transaction) => ({
    ...transaction,
    amount: amount, 
    nav: +transaction.NAV, 
    latestNAV: latestNAV,
    unit: +(amount / +transaction.NAV).toFixed(4)
})

export const calculateCost = (funds, since, day) => {
    const begin = dayjs.unix(since)
    const allFunds = funds.map((fund) => {
        const histories = require(`./funds/${fund.code}`).default
        return histories.filter(sameDay(begin, day, histories))
            .map(calculateUnit(fund.amount, histories[0].NAV))
    })

    console.log("allFunds", allFunds[0])

    return allFunds.reduce((total, fund) => total + fund.reduce((x,y) => x+y.amount, 0), 0).toFixed(2)
}

export const calculateFundUnit = (funds, since, day) => {
    const begin = dayjs.unix(since)
    const allTransactions = funds.map((fund) => {
        const histories = require(`./funds/${fund.code}`).default
        const transactions = histories.filter(sameDay(begin, day, histories))
            .map(calculateUnit(fund.amount, histories[0].NAV))
            
        return {
            code: fund.code,
            latestNAV: histories[0],
            unit: transactions.reduce((total, item) => +(total + item.unit).toFixed(4), 0),
            transactions: transactions,
            cost: transactions.reduce((total, item) => +(total + item.amount).toFixed(2), 0)
        }
    })

    return allTransactions
}

export const mergeTransaction = (funds, since, day) => {
    const fundUnits = calculateFundUnit(funds, since, day)
    return fundUnits.map((fund) => fund.transactions).flat().sort((x,y)=> dayjs(x.DATE).isAfter(y.DATE))
}

export const currentValueGroup = (funds, since, day) => {
    const fundUnits = calculateFundUnit(funds, since, day)
    return fundUnits.map((transaction) => ({
        ...transaction, 
        value: +(transaction.unit * (+transaction.latestNAV.NAV)).toFixed(2)
    }))
}

export const currentValue = (valueGroups) => {
    return valueGroups.reduce((total, fund) => total + fund.value, 0).toFixed(2)
}
export const percentChange = (networth, cost) => {
    if (networth == 0 && cost == 0) {
        return (0).toFixed(2)
    }
    return ((networth/cost-1)*100).toFixed(2)
}

