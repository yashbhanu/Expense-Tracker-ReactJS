const formatDate = (date) => {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;      // +1 bcz it starts wit 0
    let day = `${d.getDate()}`;
    const year = d.getFullYear();

    if(month.length < 2) {
        month = `0${month}`;        //jan-sept are numbered 1-9 // but append '0' to make it 01-09
    }

    if(day.length < 2) {
        day = `0${day}`;        //append 0 to day from 1-9
    }

    return [year,month,day].join('-');
}

export default formatDate;