
const btn = document.getElementById('button')
const updatedata = document.getElementById('update') ///change this
const date = document.getElementById('date');
const task = document.getElementById('task');
const textarea = document.getElementById('textarea')

let row_no = 2;

function add()
{   
    const tas =task.value
    const dat = date.value
    const desc =textarea.value

    task.innerText = ''
    date.innerHTML = ''
    textarea.innerHTML = ''

    console.log(tas,dat,desc)

    if( tas === '' || dat === '' || desc === '' )
    {
        alert("Something is Empty Please Fill This!!!");
    }
    else{
        fetch('/',{
            method:'POST',
            headers: {
                Authorization :'Bhau Parekar',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                dat,
                tas,
                desc
            })
            
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => showdata(data));

        alert("Data Added Successfully:")
        // if(cnt === data.length)
        document. location. reload() 

    }
}
btn.addEventListener('click',function(){ 
    add();
})


function updatedataServ(id)
{
    const tas = task.value
    const dat = date.value
    const desc = textarea.value
    document.getElementById("button").disabled = false;


    task.innerText = ''
    date.innerHTML = ''
    textarea.innerHTML = ''

    console.log("updatedataServ id is =",id)

    
    fetch('/updatedata',{
        method:'POST',
        headers: {
            Authorization :'Bhau Parekar',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            dat,
            tas,
            desc,
            id
        })
        
    }).then((res) => {
        return res.json();
    })
    .then((data) => console.log(data));
    document. location. reload() 
}
updatedata.addEventListener('click',function(){ 
    updatedataServ(updatedata.id);
    console.log("update button")
})


function showdata(data)
{
    
    console.log(data[0].date,data.length)
    let table = document.getElementById("taskTable");

    for(let cnt=0;cnt<data.length;cnt++)
    {
        let row = table.insertRow(row_no);
        let cell1 = row.insertCell(0);
        let cell2= row.insertCell(1);
        let cell3= row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4)

        cell1.innerHTML = data[cnt].date
        cell2.innerHTML = data[cnt].Task
        cell3.innerHTML = data[cnt].Desc

        //Dynamically assign id to buttons - call update/removeRow functions
        cell4.innerHTML = '<input type="button" id="'+data[cnt]._id+'" onclick="update(this)" class="edit" value=&#x270E;>'

        cell5.innerHTML = '<input type="button" id="'+data[cnt]._id+'" onclick="removeRow(this)" class="delete" value="Delete">'
        row_no++;
    }
    // document.getElementById('list').innerText = JSON.stringify(data);
}

function getdata()
{
    fetch('/data', {
        method: 'GET',
        headers:{
            Authorization:"Bhau",
            'Conternt-Type': 'application/json'
        }
    }) .then((res) => {
                return res.json();
          })
             .then((data) => showdata(data));
        
}

document.addEventListener('DOMContentLoaded',function(){
    getdata()
})


function enterdata(data){
    date.value = data.date
    task.value= data.Task
    console.log("Two values=",data.Task,data.date)
    textarea.innerText = data.Desc
    updatedata.setAttribute('id',data._id);   
}

function update(button)
{
    let bid = button.id;
    console.log("You are Pressed=",bid)
    document.getElementById("button").disabled = true;


    fetch('/update',{
        method: 'POST',
        headers:{
            // Authorization: "Bhau",
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            bid,

        })
    })
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log("update data=",data)
        enterdata(data)
});
   // document. location. reload() 
}


function removeRow(button)
{
    let bid=button.id;
    console.log("You are Pressed=",bid)

    fetch('/delete',{
        method: 'POST',
        headers:{
            // Authorization: "Bhau",
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            bid,

        })
    })
    document. location. reload() 
}