function convert() {
    var table = document.getElementById("orario")
    var trs = Array.from(table.getElementsByTagName("tr"))
    var days = trs.shift()
    var days_arr = Array.from(days.getElementsByTagName("td")).map(x=>x.innerText.trim())
    days_arr.shift()
    var days_l = days_arr.length

    var hours = trs.shift()
    var hours_arr = []
    var hours_td = Array.from(hours.getElementsByTagName("td"))
    var hours_arr_dim = Math.ceil(hours_td.length/days_l)
    for (var k=0;k<days_l;k++) {
        var l = []
        for (var j=0;j<hours_arr_dim;j++) {
            var i = (hours_arr_dim*k)+j
            if (i<hours_td.length) {
                l.push(hours_td[i].innerText.trim())
            } else {
                l.push(null)
            }
        }
        hours_arr[k] = l
    }
    console.log(
        days_arr,
        hours_arr,
        hours_arr_dim,  
    )
    /**
     * @type {string[]}
     */
    var classi = []
    var res = {
        
    }
    trs.forEach(x=>{
        var td = Array.from(x.getElementsByTagName("td"))
        var docname = td.shift().innerText.trim().replace(" ","_")
        var res_day = {}
        for (var n in days_arr) {
            var dayname = days_arr[n]
            var res_hour = {}
            for (var m in hours_arr[n]) {
                var h = hours_arr[n][m]
                // console.log(n, hours_arr_dim, m)
                var index = (Number.parseInt(n)*hours_arr_dim)+Number.parseInt(m)
                var e = td[index]
                var classe = e.innerText.trim().toLowerCase()
                if (!classi.includes(classe)&&classe!="") {
                    classi.push(classe)
                }
                res_hour[h]=classe
            }
            res_day[dayname] = res_hour
        }
        res[docname] = res_day
    })
    console.log(res)
    classi.sort()
    console.log(classi)


    var div_res = document.getElementById("result")
    classi.forEach(c=>{
        var table = document.createElement("table")
        table.classList.add("classe")
        table.id = c
            var tr_class=document.createElement("tr")
            tr_class.appendChild(voidTd())
                var th_class = document.createElement("th")
                th_class.innerHTML = c.toUpperCase()
                th_class.colSpan = days_l
            tr_class.appendChild(th_class)
            var tr_days = document.createElement("tr")
            tr_days.appendChild(voidTd())
            for (var d in days_arr) {
                var day = days_arr[d]
                var th_day = document.createElement("th")
                th_day.innerHTML=day
                tr_days.appendChild(th_day)
            }
        table.appendChild(tr_class)
        table.appendChild(tr_days)
        for (var h in hours_arr[0]){
            var hour = hours_arr[0][h]
            var row = document.createElement("tr")
            row.id="hour_row"
                var td_hour = document.createElement("td")
                td_hour.innerHTML = hour
                td_hour.id="hour"
            row.appendChild(td_hour)
                for (var d in days_arr) {
                    var day = days_arr[d]
                    var td_day = document.createElement("td")
                    td_day.id=c+"_"+day+"_"+hour
                    row.appendChild(td_day)
                }
            table.appendChild(row)
        }

        div_res.appendChild(table)
    })


    console.log(res)
    Object.keys(res).forEach(docente=>{
        var docente_obj = res[docente]
        Object.keys(docente_obj).forEach(giorno=>{
            var giorno_obj = docente_obj[giorno]
            Object.keys(giorno_obj).forEach(ora=>{
                var _classe = giorno_obj[ora]
                if (_classe !="") {
                    var id = _classe+"_"+giorno+"_"+ora
                    console.log(_classe)
                    var e = document.getElementById(id)
                    if (_classe.toLowerCase() != "p") {
                        e.innerHTML=docente.replace("_"," ")
                    } else {
                        if (e.innerHTML=="") {
                            e.innerHTML=docente.replace("_"," ")
                        } else {
                            e.innerHTML+="<br>"+docente.replace("_"," ")
                        }
                    }
                }
            })
        })
    })
}




function voidTd() {
    var td = document.createElement("td")
    td.innerHTML=""
    return td
}


convert()