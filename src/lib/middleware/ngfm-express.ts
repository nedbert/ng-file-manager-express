//import express, { Router } from 'express'
const express = require('express');
import { NgfmConnector } from '../connectors/ngfm-connector';
const multipart = require('connect-multiparty');
import { NGFM_VERBS } from './verbs/index';
export class NgfmExpress {
    public express;

    constructor(public connector: NgfmConnector) {
        this.express = express();
    }
    public get router() {
        const router = express.Router();
        router.head('/**', NGFM_VERBS.head(this.connector));
        router
            .get('/**', NGFM_VERBS.get(this.connector))
            .post('/**', multipart(), NGFM_VERBS.post(this.connector))
            .delete('/**', NGFM_VERBS.delete(this.connector))
            .use((error, req, res, next) => {
                res.status(400).send(error);
            });
        return router;
    }

}