import { Express } from "express";
import { User } from '../models/User';
import { HTTP_CODES } from '../utils/HTTP_CODES';

export class UserController {
    
    root = "/users";


    constructor(){
    }

    public setup(app: Express){

        app.get(this.root, (request, response) => {
            response.statusCode = HTTP_CODES.OK;
            User.findAll().then(
                list =>{
                    response.json(list);
                }
            )
        });

        app.post(this.root, (req, res) => {
            let newObj = User.build(req.body);
            console.log(newObj);
            newObj.save().then(
                obj =>{ 
                    res.statusCode = HTTP_CODES.CREATED;
                    res.json(obj)
                },
                err =>{
                    res.statusCode = HTTP_CODES.SERVER_ERROR;
                    res.end();
                }
            )
        });

        app.get(this.root + "/byusername", (req, res) => {
            let username = req.query.username;
            User.findOne({where:{ username: username}}).then(
                user =>{
                    if(user!=null)
                        res.statusCode = HTTP_CODES.OK;
                    else
                        res.statusCode = HTTP_CODES.NO_CONTENT;
                    res.json(user);
                }
            )
        });
    }
}