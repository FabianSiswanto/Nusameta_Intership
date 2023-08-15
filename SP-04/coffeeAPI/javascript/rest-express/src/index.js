const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

//signup for new farmer user
app.post(`/signup`, async (req, res) => {
  const { name, email, password} = req.body
  try{
    console.log(name)
    console.log(email)
    console.log(password)
    const result = await prisma.user.create({
      data: {
        name,
        email,
        password
      },
    })
    res.json(result)  
  } catch (err){
    console.error(err)
    res.status(500).send()
  }
})

//post a new coffee data
app.post(`/coffee`, async (req, res) => {
  const { type, origin, treeHeight, latitude, longitude, altitude, avgTemp, humidity, rainfall, lightIntensity, nutrition, moisture, conductivity, authorEmail } = req.body
  try{
    console.log(type)
    console.log(origin)
    console.log(treeHeight)
    console.log(latitude)
    console.log(longitude)
    console.log(altitude)
    console.log(avgTemp)
    console.log(humidity)
    console.log(rainfall)
    console.log(lightIntensity)
    console.log(nutrition)
    console.log(moisture)
    console.log(conductivity)
    console.log(authorEmail)

    const newCoffee = await prisma.coffee.create({
      data: {
        type,
        origin, 
        treeHeight,
        latitude, 
        longitude, 
        altitude, 
        avgTemp, 
        humidity, 
        rainfall, 
        lightIntensity, 
        nutrition, 
        moisture, 
        conductivity,
        author: { connect: { email: authorEmail } }
      },
    })
    res.json(newCoffee)  
  } catch (err){
    console.error(err)
    res.status(500).send()
  }
})

//update the contents of a coffee data
app.put(`/coffee/:id`, async (req, res) => {
  const { id } = req.params
  const { type, origin, treeHeight, latitude, longitude, altitude, avgTemp, humidity, rainfall, lightIntensity, nutrition, moisture, conductivity, authorEmail } = req.body
  
  try{
    console.log(type)
    console.log(origin)
    console.log(treeHeight)
    console.log(latitude)
    console.log(longitude)
    console.log(altitude)
    console.log(avgTemp)
    console.log(humidity)
    console.log(rainfall)
    console.log(lightIntensity)
    console.log(nutrition)
    console.log(moisture)
    console.log(conductivity)
    console.log(authorEmail)
    
    const editCoffee = await prisma.coffee.update({
      where: { id: Number(id) },
      data: {
        type,
        origin, 
        treeHeight,
        latitude, 
        longitude, 
        altitude, 
        avgTemp, 
        humidity, 
        rainfall, 
        lightIntensity, 
        nutrition, 
        moisture, 
        conductivity,
        author: { connect: { email: authorEmail } }
      },
    })
    res.json(editCoffee)  
  } catch (err){
    console.error(err)
    res.status(500).send()
  }
})

//retrieves the coffee data
app.get(`/coffee/:id`, async (req, res) => {
  const { id } = req.params
  try{
    const getCoffee = await prisma.coffee.findUnique({
      where: { id: Number(id) },
    })
    res.json(getCoffee)  
  } catch (err){
    console.error(err)
    res.status(500).send()
  }
})

//delete a coffee data
app.delete(`/coffee/:id`, async (req, res) => {
  const { id } = req.params
  try{
    const deleteCoffee = await prisma.coffee.delete({
      where: { id: Number(id) },
    })
    res.json(deleteCoffee)  
  } catch (err){
    console.error(err)
    res.status(500).send()
  }
})

//see all users or farmers
app.get('/users', async (req, res) => {
  try{
    const users = await prisma.user.findMany()
    res.json(users)
    } catch (err){
    console.error(err)
    res.status(500).send()
  }
})

//delete user credentials
app.delete(`/user/:id`, async (req, res) => {
  const { id } = req.params
  try{
    console.log()
    const deleteUser = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    })
    res.json(deleteUser)  
  } catch (err){
    console.error(err)
    res.status(500).send()
  }
})

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/js/rest-express#3-using-the-rest-api`),
)
