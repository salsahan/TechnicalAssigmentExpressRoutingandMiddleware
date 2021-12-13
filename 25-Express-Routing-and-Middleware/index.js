//import modules
const express = require("express")
const app = express()
const port = 3000

//dataset
const hewan = [
    { id: 1, nama: "Meong", spesies: "kucing" },
    { id: 2, nama: "Gukguk", spesies: "anjing" },
    { id: 3, nama: "Ncing", spesies: "kucing" },
    { id: 4, nama: "Kinci", spesies: "kelinci" },
    { id: 5, nama: "Doraemon", spesies: "kucing" },
];

//middleware

const middlewareLogger = (req, res, next) => {
    console.log("this is logger");
    next();
  };

  const middlewarePostChecker = (req, res, next) => {
    const body = req.body;
    const species = ["kucing", "anjing", "kelinci"];
  
    species.map((spesies) => {
      if (body["spesies"] == spesies) {
        next();
      }
    });
  
    res.status(400).send({ error: "Spesies not valid" });
};
  
app.use(express.json(), middlewareLogger);

//routes

//test server
app.get("/ping", (req,res)=> {
    res.send("server is ready")
})

//get all 
app.get("/hewan", (req,res)=> {
    res.status(200).send({
        message: "success get all data hewan",
        data: hewan
    })
})

//get by id
app.get("/hewan/:id", (req, res) => {
    const id = req.params.id;
    const hewanById = hewan.filter((data) => data.id == id);
  
    res.status(200).send({ message: `success mengambil data hewan dengan id : ${id}`, data: hewanById });
});

//post
app.post("/hewan", middlewarePostChecker, (req, res) => {
    // const body = req.body;
    const body = req.body;
    const data = {
        id: body["id"],
        nama: body["nama"],
        spesies: body["spesies"],
      };
    hewan.push(data)
    res.status(200).send({
        message: `success menambahkan data hewan yaitu nama : ${data.nama}, spesies : ${data.spesies}`,
        data: hewan
    });
  
});

//put
app.put("/hewan/:id", (req, res) => {
    const body = req.body;
    const id = req.params.id;

    const idArray = hewan.findIndex((hewan) => hewan.id == id);
    hewan[idArray].nama = body.nama;
    hewan[idArray].spesies = body.spesies;
    res.status(200).send({
        message: `data hewan dengan id : ${id} success di update`,
        hewan: hewan
    })
  
    
});

//delete
app.delete("/hewan/:id", (req, res) => {
    // const id = req.params.id;
    // result = hewan.filter((data) => data.id == id);
    // res.status(200).send({
    //     message: `data hewan dengan id : ${id} success di delete`,
    //     hewan: result
    // })
    const id = req.params.id;

    const result = hewan.map((value, index) => {
      if (value.id == id) {
        hewan.splice(index, 1);
      }
    });
  
    res.status(200).send({ message: `data hewan dengan id : ${id} success di delete`});
})


//jalankan server
app.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})