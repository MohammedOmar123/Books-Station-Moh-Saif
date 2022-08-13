const search = (arr,value) => {
    let counter = 0;
    let filtered = JSON.parse(arr).filter((ele) => {
        if (value != '' && ele.bookName.toLowerCase().includes(value.toLowerCase()) && counter <= 10) {
            counter++;
            return true
        }
    })
    return filtered
}



module.exports = {search}