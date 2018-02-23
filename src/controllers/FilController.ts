
import { Express } from "express";
import { Fil } from '../models/Fil';
import { HTTP_CODES } from '../utils/HTTP_CODES';

export class FilController {

    
    root = "/fils";

    constructor(){
    }

    public setup(app: Express){
        
        app.get(this.root, (request, response) => {
            response.statusCode = HTTP_CODES.OK;
            Fil.findAll().then(
                list =>{
                    response.json(list);
                }
            )
        });

        app.post(this.root, (req, res) => {
            let newObj = Fil.build(req.body);
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

        app.get(this.root + "/byparent", (req, res) => {
            let parentId = req.query.parentId;
            if(parentId == "null"){
                parentId = null;
            }
            Fil.findAll({
                where:{ parentId: parentId},
                include: [{model: Fil, as: "parent"}]
            }).then(
                fils =>{
                    if(fils!=null)
                        res.statusCode = HTTP_CODES.OK;
                    else
                        res.statusCode = HTTP_CODES.NO_CONTENT;
                    res.json(fils);
                }
            )
        });
    }
}