import express from "express";
import produtos from "./produtoRoutes.js"
import cors from "cors"

const routes = (app) => {
app.use(cors())

  app.route('/').get((req, res) => {
    res.status(200).send({titulo: "Loja DevBlusas"})
  })

  app.use(
    express.json(),
    produtos,
  )
}

export default routes
