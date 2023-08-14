const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

//signup for new farmer user
app.post(`/signup`, async (req, res) => {
  // const { name, email, password, posts } = req.body
  const { name, email, password} = req.body

  // const postData = posts
  //   ? posts.map((post) => {
  //       return { title: post.title, content: post.content || undefined }
  //     })
  //   : []

  const result = await prisma.user.create({
    data: {
      name,
      email,
      password
      // posts: {
      //   create: postData,
      // },
    },
  })
  res.json(result)
})

//post a new post about the details of a coffee, must have correct email and password
app.post(`/post`, async (req, res) => {
  const { type, origin, treeHeight, latitude, longitude, altitude, avgTemp, humidity, rainfall, lightIntensity, nutrition, moisture, conductivity, authorEmail } = req.body
  const result = await prisma.post.create({
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
  res.json(result)
})

//update the contents of a new post
app.put(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const { type, origin, treeHeight, latitude, longitude, altitude, avgTemp, humidity, rainfall, lightIntensity, nutrition, moisture, conductivity, authorEmail } = req.body

  const updatePost = await prisma.post.update({
    where: { id: Number(id) },
    // where: {
    //   id,
    // },
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
  res.json(updatePost)
})

//retrieves the posts
app.get(`/post/:id`, async (req, res) => {
  const { id } = req.params

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  })
  res.json(post)
})

//delete a post
app.delete(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  })
  res.json(post)
})

//see all users or farmers
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

//delete user credentials
app.delete(`/user/:id`, async (req, res) => {
  const { id } = req.params
  const deletedUser = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  })
  res.json(deletedUser)
})

/*
//see number of views, can disable
app.put('/post/:id/views', async (req, res) => {
  const { id } = req.params

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        viewCount: {
          increment: 1,
        },
      }, //is this comma a
    })

    res.json(post)
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` })
  }
})

//publish a post, not needed
app.put('/publish/:id', async (req, res) => {
  const { id } = req.params

  try {
    const postData = await prisma.post.findUnique({
      where: { id: Number(id) },
      select: {
        published: true,
      },
    })

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) || undefined },
      data: { published: !postData.published || undefined },
    })
    res.json(updatedPost)
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` })
  }
})


//see the drafts of the users, not needed
app.get('/user/:id/drafts', async (req, res) => {
  const { id } = req.params

  const drafts = await prisma.user
    .findUnique({
      where: {
        id: Number(id),
      },
    })
    .posts({
      where: { published: false },
    })

  res.json(drafts)
})


//can disable
app.get('/feed', async (req, res) => {
  const { searchString, skip, take, orderBy } = req.query

  const or = searchString
    ? {
        OR: [
          { title: { contains: searchString } },
          { content: { contains: searchString } },
        ],
      }
    : {}

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...or,
    },
    include: { author: true },
    take: Number(take) || undefined,
    skip: Number(skip) || undefined,
    orderBy: {
      updatedAt: orderBy || undefined,
    },
  })

  res.json(posts)
})

app.post('/user/:id/profile', async (req,res) => {
  const {id} = req.params
  const {bio} = req.body

  const profile = await prisma.profile.create({
    data: {
      bio,
      user: {
        connect: {
          id: Number(id)
        }
      }
    }
  })

  // const profile = await prisma.profile.create({
  //   data: {
  //     bio: 'Hello World',
  //     user: {
  //       connect: { email: 'alice@prisma.io'}
  //     },
  //   },
  // })

  res.send(profile)
  }
)
*/

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/js/rest-express#3-using-the-rest-api`),
)
