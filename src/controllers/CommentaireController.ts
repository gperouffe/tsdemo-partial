import { Express } from "express";
import { Commentaire } from '../models/Commentaire';
import { HTTP_CODES } from '../utils/HTTP_CODES';
import { User } from "../models/User";

export class CommentaireController{

    root = "/commentaires";

    constructor(){
    }

    public setup(app: Express){

        app.get(this.root, (request, response) => {
            response.statusCode = HTTP_CODES.OK;
            Commentaire.findAll().then(
                list =>{
                    response.json(list);
                }
            )
        });

        app.post(this.root, (req, res) => {
            let newObj = Commentaire.build(req.body);
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

        app.get(this.root + "/byfil", (req, res) => {
            let filId = req.query.filId;
            if(filId == "null"){
                filId = null;
            }
            Commentaire.findAll({
                where:{ filId: filId},
                include: [User]
            }).then(
                comms =>{
                    if(comms!=null)
                        res.statusCode = HTTP_CODES.OK;
                    else
                        res.statusCode = HTTP_CODES.NO_CONTENT;
                    res.json(comms);
                }
            )
        });
    }
}