// express setting starting

const {
    query
} = require("express")
const express = require("express")
const app = express()
const port = 3030

// express settings finished


// other lib settings starting

const open = require("open")

// other lib settings finished


// only variables for app starting

var nft = [

    nftname = [],
    token = [{
            id: "12759817259821575",
            control: false,
            count: 0
        },
        {
            id: "82935798235798237",
            control: false,
            count: 0
        },
        {
            id: "34957934873457345",
            control: false,
            count: 0
        },
        {
            id: "34598734597349578",
            control: false,
            count: 0
        },
        {
            id: "34587349578349875",
            control: false,
            count: 0
        },
        {
            id: "03467808346708367",
            control: false,
            count: 0
        },
        {
            id: "34069856875809854",
            control: false,
            count: 0
        },
    ]

]

// only variables for app finished


app.get("/", (req, res) => {

    res.send("hello world")
})

app.get("/startstake",(req,res) =>{
    var nftid = req.query.id
    var status = req.query.start
    if (nftid && status) {
        for (let index = 0; index < nft[1].length; index++) {
            if(nftid == nft[1][index].id && status == "true"){
                nft[1][index].control = true
            }
            else {
                nft[1][index].control = false
            }
        }
    }
})

app.listen(port, () => {
    console.log(`server has been started on ${port}`)
    console.log(`opening the site`)
    open("http://localhost:3030")
})


setInterval(() => {
    for (let index = 0; index < nft[1].length; index++) {
         if(nft[1][index].control == true){
            nft[1][index].count = nft[1][index].count + 1
            console.log(`staking started on id: ${nft[1][index].id} count: ${nft[1][index].count}`)
         }
    }
}, 5000);