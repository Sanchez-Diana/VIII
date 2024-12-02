const express = require('express')
const app = express ()
const port = 4000

app.use(express.json())
app.use(express.urlencoded({extended:false})) 

app.listen (port, () => {

    console.log(`servidor corriendo en puerto ${port}`)

});


let productos = []

app.get('/productos', (req, res) =>{

    console.log('listado de productos')
    res.json(productos)

})
app.post('/productos', (req, res) =>{
   
    console.log(productos.length)
    nuevoProd = {id : productos.length + 1, ...req.body}


    productos.push(nuevoProd)
   
    res.json({
              "mensaje": 'producto agregado',
              "producto": req.body})
})



app.put('/productos/:id', (req, res) =>{

    const prodEncontrado = productos.find((p) => p.id==req.params.id)
    if(!prodEncontrado){
      return  res.status(404).json('no se encuentra el producto')
    }
    console.log(req.params.id)
    console.log(req.body)
    const newData=req.body;
    productos = productos.map(p=> p.id==req.params.id ?{...p, ...newData} : p ) 
 
    res.json('producto actualizado')

})


// ... significa copia

// elimina producto
app.delete('/productos/:id', (req, res) =>{
 
    const prodEncontrado = productos.find((p) => p.id==req.params.id)
    if(!prodEncontrado){
      return  res.status(404).json('no se encuentra el producto')
    }
    // lee todo el vector y crear uno nuevo sin el que dice el parametro (si pones constante se rompe qn lo diria..)
    productos = productos.filter((p)=>p.id!=req.params.id)
    console.log(productos)
    res.json('producto eliminado')

})


// mirar un solo producto
app.get('/productos/:id', (req, res) =>{

    console.log(req.params.id)
    
    
// formato largo
    // const prodEncontrado = productos.find((producto) =>{
    //     return producto.id == req.params.id
    // })

   // se eliminan las llaves y el return
   const prodEncontrado = productos.find((p) => p.id==req.params.id)
    if(!prodEncontrado){
      return  res.status(404).json('no se encuentra el producto')
    }
    res.json({
            "mensaje": "producto encontrado",
            "prod": prodEncontrado
        })
    
})

