import express from "express";

export const userConfigRouter = express.Router()

userConfigRouter.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

userConfigRouter.post('create', async (req, res)=>{

});

userConfigRouter.pach()
