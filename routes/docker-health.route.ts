import { Router, Request, Response } from 'express'

const dockerRouter = Router()

dockerRouter.get('/docker-health', (req: Request, res: Response) => {
    try {
        const message = 'Healthy docker container!'
        console.log(message)
        res.json({ message: message})
    } catch (error: any) {
        console.error(error.message)
        res.json({ message: error.message })
    }
})

export default dockerRouter