const express = require('express')
const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY
const authenticate = (req, res, next)=>{
    const token = req.header('token').split(' ')[1]
    try {
        const {username, password} = jwt.verify(token, SECRET_KEY)
        res.user = {username, password}
        next();    
    } catch (err) {
        console.error(err)
        res.status(401).send({err})
    }
} 

module.exports = authenticate