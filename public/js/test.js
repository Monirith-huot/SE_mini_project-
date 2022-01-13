function editSingleRow(e, evt) {
    let td = e.parentNode;
    let tr = td.parentNode;
    let tds = tr.children;
    let con;
    
    if (e.innerText == "Edit") {
        e.innerText = "Save";
        tds[7].innerHTML = "<td><a href= '#' onclick='Delete(this, event)'>Cancel</a></td>";

        let val1 = tds[0].innerHTML;
        let val2 = tds[1].innerHTML;
        let val3 = tds[2].innerHTML;
        let val4 = tds[3].innerHTML;
        let val5 = tds[4].innerHTML;
        let val6 = tds[5].innerHTML;
        let val7 = tds[6].innerHTML;
        let val8 = tds[7].innerHTML;
        arr = [val1,val2,val3,val4,val5,val6,val7,val8]
        tds[0].innerHTML = "<input type='text' id='No' value='" + val1 + "'>";
        tds[1].innerHTML = "<input type='text' id='Name' value='" + val2 + "'>";
        tds[2].innerHTML = "<input type='text' id='Price' value='" + val3 + "'>";
        tds[3].innerHTML = "<input type='text' id='Proname' value='" + val4 + "'>";
        tds[4].innerHTML = "<input type='text' id='Quantity' value='" + val5 + "'>";
    }
    else {
        con = confirm('Do you want to Save?');
        let val1 = document.getElementById('No');
        let val2 = document.getElementById('Name');
        let val3 = document.getElementById('Price');
        let val4 = document.getElementById('Proname');
        let val5 = document.getElementById('Quantity');
        console.log(val3.value);
        let res = val3.value.substring(1, val3.value.length);
        let total = res * val5.value;

        if (con) {
            tds[0].innerHTML = "<td>" + arr[0] + "</td>";
            tds[1].innerHTML = "<td>" + val2.value + "</td>";
            tds[2].innerHTML = "<td>" + val3.value + "</td>";
            tds[3].innerHTML = "<td>" + val4.value + "</td>";
            tds[4].innerHTML = "<td>" + val5.value + "</td>";
            tds[5].innerHTML = "<td>$" + total + "</td>";
        }
        e.innerText = "Edit";
        tds[7].innerHTML = "<td><a href= '#' onclick='Delete(this, event)'>Cancel</a></td>";
    }
}