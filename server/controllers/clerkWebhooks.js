import User from "../modules/user.js";
import { Webhook } from "svix";

const clerWebhooks = async (req, res) =>{
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        const heaers = {
            "svix-id": req.headers["svix-d"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        }
        await whook.verify(JSON.stringify(req, res), headers)

        const {data, type} = req.body

        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_addresses,
            username: data.first_name + " " + data.last_name,
            image : data.image_url
        }

        switch (type) {
            case "user.created":{
                await User.created(userData);
                break;
            }
            case "user.updated":{
                await User.findByIdAndUpdate(userData);
                break;
            }
            case "user.deleted":{
                await User.findByIdAndDelete(userData);
                break;
            }
            
            default:
                break;
        }
        res.jason({success: true, message: "Webhook Recieved"})
    } catch (error) {
        console.log(error.message)
        res.jason({success: false, message: error.message})
    }
}

export default clerWebhooks