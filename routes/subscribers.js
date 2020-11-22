const express = require('express')
const router = express.Router()

const Subscriber = require('../models/Subscriber')

router.get('/', async (request, response)=>{
    try {
        const subscribers = await Subscriber.find()
        response.json(subscribers)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
})
router.get('/:id', getSubscriber, (request, response)=>{

    response.json(response.subscriber)
})

router.post('/', async(request, response)=>{
    const subscriber = new Subscriber({
        userName: request.body.userName,
        userChannel: request.body.userChannel
    })

    try {
        const sub = await subscriber.save()

        response.status(201).json(sub)

    } catch (error) {
        response.status(400).json({message: error.message})
    }
   
})

router.patch('/:id', getSubscriber, async (request, response)=>{
    try {
        if(request.body.userName != null) {
            request.subscriber.userName = request.body.userName
        }
        if(request.body.userChannel != null) {
            request.subscriber.userChannel = request.body.userChannel
        }

        
    } catch (error) {
        return response.status(400).json({message: error.message})
    }
})

router.delete('/:id', getSubscriber, async(request, response)=>{
    try {
        await response.subscriber.remove()
        response.json({message: "Subscriber was deleted"})
    } catch (error) {
        return response.status(500).json({message: error.message})
    }
})

async function getSubscriber(request, response, next) {
    try {
        subscriber = await Subscriber.findById(request.params.id)
        
        if(subscriber == null) {
            return response.status(404).json({message: "Not found"})
        }

    } catch (error) {
        return response.status(500).json({message: error.message})
    }

    response.subscriber = subscriber
    next();
}

module.exports = router